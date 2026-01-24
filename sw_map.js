/////////////////////////////////////////////////////////////////////////////////////
// Cache name includes a static version string; can be overridden by message events.
// Format: 'mapSW_v<VERSION>'
// dyVersion: Dynamic version extracted from the service worker URL's 'version' parameter.
let dyVersion = 0;
const CACHE_NAME = {name: 'mapSW_v23.0'}

/////////////////////////////////////////////////////////////////////////////////////
// Array of URLs to be cached. Populated by createCache() based on the client's
// spreadsheet ID and target. Contains CSS, fonts, images, JavaScript, and sheet data.
let static_assets = []

let clientUrl = '';
var sheet_Id = '';
let _client = '';
let target = '';

/////////////////////////////////////////////////////////////////////////////////////
/**
 * Builds the static_assets array for caching based on connected client URLs.
 * Extracts spreadsheet ID and target from client URL query parameters, then
 * constructs asset paths for CSS, fonts, images, JavaScript, and sheet data files.
 * Note: This function is called during service worker installation with the
 * version parameter from the URL, but returns early if cacheVersion is null.
 * 
 * @param {string|null} cacheVersion - Version parameter from URL (e.g., '23.0').
 *   If null, function returns without building assets.
 * @returns {void}
 */
function createCache(cacheVersion) {
    console.debug(`createCache, version ${cacheVersion}`)    
    if(cacheVersion == null) {
        return
    }
    self.clients.matchAll({includeUncontrolled: true}).then(clients => {
        for (const client of clients) {
            clientUrl = new URL(client.url);
            sheet_Id = clientUrl.searchParams.get('id');
            target = clientUrl.searchParams.has('target') ? clientUrl.searchParams.get('target') : 'live';
            
            const rootFolder = "./sheets/" + sheet_Id + "/" + target;
            static_assets = [
                `./index.php${clientUrl.search}`,
                //////////////////////////////////////////////////////////////////////////
                // UI CSS
                './css/style.css?version=' + dyVersion,
                // Fonts
                './layout/Horizontal with Combined Events/fonts/HelveticaRegular.otf',
                // Images
                //'./images/maps@300x.webp',
                './images/icon_map.png?version=' + dyVersion,
                './images/conn_good_new.png?version='+ dyVersion,
                './images/conn_moderate_new.png?version='+ dyVersion,
                './images/conn_slow_new.png?version='+ dyVersion,
                './images/conn_no_new.png?version='+ dyVersion,

                './js-package/JSController.js?version=' + dyVersion,
                './js-package/mapMain.js?version='+ dyVersion,
                './js-package/version.js?version='+ dyVersion,

                
                // Sheet data
                rootFolder + '/version.json?version='+ dyVersion,
                rootFolder + '/settings.json?version='+ dyVersion,
                rootFolder + '/directory.json?version='+ dyVersion,
                rootFolder + '/events.json?version='+ dyVersion,
                rootFolder + '/kiosks.json?version='+ dyVersion,
                rootFolder + '/pushstatus.json?version='+ dyVersion,
            ]
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////
/**
 * Pre‑caches all assets listed in static_assets using the current CACHE_NAME.
 * Called during the install event after static_assets has been populated.
 * 
 * @returns {Promise<void>} Resolves when all assets are added to cache.
 */
async function preCache() {
    const cache = await caches.open(CACHE_NAME.name)
    return cache.addAll(static_assets)
}

/////////////////////////////////////////////////////////////////////////////////////
/**
 * Service worker install event.
 * Extracts version parameter from the service worker URL, builds the asset list,
 * skips waiting to activate immediately, and pre‑caches the assets.
 */
self.addEventListener('install', event => {
    console.debug('service worker installed');
    const selfUrl = new URL(self.location);
    dyVersion = selfUrl.searchParams.get('version');
    createCache(dyVersion)
    
    self.skipWaiting();
    event.waitUntil(preCache())
    //event.waitUntil(cleanUpCache())
})

/////////////////////////////////////////////////////////////////////////////////////
/**
 * Service worker activate event.
 * Cleans up old caches from previous versions to free storage.
 */
self.addEventListener('activate', event => {
    console.debug('service worker activated');
    event.waitUntil(cleanUpCache())
    //event.waitUntil(preCache())
})

/////////////////////////////////////////////////////////////////////////////////////
/**
 * Handles fetch events with a network‑first, cache‑fallback strategy.
 * Attempts to fetch from network; on success, caches the response for future use
 * and returns the fresh response. If the network request fails, returns the
 * cached response (if available).
 * 
 * @param {FetchEvent} event - The fetch event to handle.
 * @returns {Promise<Response>} The network response, cloned response, or cached response.
 */
async function fetchAssets(event) {
    try {
        const response = await fetch(event.request)
        const clonedResponse = response.clone();
        // save response to runtime cache for later use
        const runtimeCache = await caches.open(CACHE_NAME.name);
        runtimeCache.put(event.request, response);
        runtimeCache.add(event.request)
        // respond with the cloned network response
        return Promise.resolve(clonedResponse);
    } catch (error) {
        const cache = await caches.open(CACHE_NAME.name)
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        } 
    }
}

/////////////////////////////////////////////////////////////////////////////////////
/**
 * Intercepts GET requests and delegates to fetchAssets for caching logic.
 * Only processes GET requests; other methods pass through to network.
 */
self.addEventListener('fetch', event => {
    console.log(`service worker fetch ${event.request.url}`);
    if (event.request.method === 'GET') { 
        //console.log("FETCH -> ", event)
        event.respondWith(fetchAssets(event))
    }
})

/////////////////////////////////////////////////////////////////////////////////////
/**
 * Deletes all existing caches regardless of name (currently deletes the
 * current cache as well due to commented‑out conditional).
 * Called during activation and when a refresh message is received.
 * 
 * @returns {Promise<boolean[]>} Resolves when all caches have been deleted.
 */
async function cleanUpCache() {
    const keys = await caches.keys();
    const keysToDelete = keys.map(key => {
        //if(key !== CACHE_NAME.name) {
            return caches.delete(key)
        //}
    })
    return Promise.all(keysToDelete)
}

/////////////////////////////////////////////////////////////////////////////////////
/**
 * Listens for external messages (e.g., from the main app) to force a cache refresh.
 * When a message is received, deletes all caches, generates a new random cache name,
 * skips waiting, and triggers a fresh pre‑cache of assets.
 * NOTE: This seems to be un-used
 */
self.addEventListener('message', event => {
    event.waitUntil(cleanUpCache())
    setTimeout(function() {
        CACHE_NAME.name = 'mapSW_v' + Math.random();
        self.skipWaiting();
        preCache()
    }, 300)
});
