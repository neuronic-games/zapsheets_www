/////////////////////////////////////////////////////////////////////////////////////
// Cache Name
let version = 3;
let dyVersion = 0;
const CACHE_NAME = {name: 'mapSW_v25.0'}
const OFFLINE_URL = '/offline.html';
/////////////////////////////////////////////////////////////////////////////////////
// Assets container
let STATIC_ASSETS = []

let clientUrl = ''
var sheet_Id = ''
let _client = ''

/* const STATIC_ASSETS = [
    'index.html',
    'index.html?id=' + sheet_Id,
] */
/////////////////////////////////////////////////////////////////////////////////////
// Get a URL object for the service worker script's location.
/**
 * URL function
 */
const swScriptUrl = new URL(self.location);
/////////////////////////////////////////////////////////////////////////////////////
/**
 * Get URL objects for each client's location.
 */
createCache(null)
function createCache(cacheVersion) {
    if(cacheVersion == null) {
        return
    }
    self.clients.matchAll({includeUncontrolled: true}).then(clients => {
        for (const client of clients) {
            clientUrl = new URL(client.url);
            _client = client;
            sheet_Id = (getUrlVars(clientUrl.href)["id"]) ? getUrlVars(clientUrl.href)["id"].split('/')[0] : '';
            STATIC_ASSETS = [
                clientUrl,
                OFFLINE_URL,    // Critical fallback
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
                './images/map/location.png?version='+ dyVersion,

                './js-package/JSController.js?version=' + dyVersion,
                './js-package/mapMain.js?version='+ dyVersion,
                './js-package/version.js?version='+ dyVersion,

                
                // Sheet data
                './sheets/' + sheet_Id + '/version.json?version='+ dyVersion,
                './sheets/' + sheet_Id + '/settings.json?version='+ dyVersion,
                './sheets/' + sheet_Id + '/directory.json?version='+ dyVersion,
                './sheets/' + sheet_Id + '/events.json?version='+ dyVersion,
                './sheets/' + sheet_Id + '/kiosks.json?version='+ dyVersion,
                './sheets/' + sheet_Id + '/pushstatus.json?version='+ dyVersion,
            ]
        }
    });
}
/////////////////////////////////////////////////////////////////////////////////////
// To precache the data
/**
 * preCache function
 */
async function preCache() {
    const cache = await caches.open(CACHE_NAME.name)
    return cache.addAll(STATIC_ASSETS)
}
/////////////////////////////////////////////////////////////////////////////////////
// To install the SW
/**
 * SW Install event 
 */
self.addEventListener('install', event => {
    console.log('sw1 installed');
    const selfUrl = new URL(self.location);
    dyVersion = selfUrl.searchParams.get('version');
    createCache(dyVersion)
    
    self.skipWaiting();
    event.waitUntil(preCache())
    //event.waitUntil(cleanUpCache())
})
/////////////////////////////////////////////////////////////////////////////////////
// To active the SW
/**
 * SW Activate event 
 */
self.addEventListener('activate', event => {
    console.log('sw1 activated');
    event.waitUntil(cleanUpCache())
    //event.waitUntil(preCache())
})
/////////////////////////////////////////////////////////////////////////////////////
// Function to fetch the data from the passes url from cache
/**
 * 
 * @param {*} event 
 * @returns 
 */
async function fetchAssets(event) {

    try {
        const response = await fetch(event.request)
        // New Logic
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
// To fetch cached data
/**
 * SW Fetch event 
 */
self.addEventListener('fetch', event => {
    // Ignore non-GET requests
    if (event.request.method !== 'GET') return;

    // Always respond with this promise
    event.respondWith(
        // Try network first
        fetch(event.request).catch(() => {
            // If network fails (offline or server down)...

            // For page navigations: immediately return inline offline page
            if (event.request.mode === 'navigate') {
                return new Response(
                    `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <title>No Connection</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 40px; text-align: center; background: #f5f5f5; color: #333; line-height: 1.5; }
                            h1 { font-size: 2.2em; margin-bottom: 0.5em; }
                            p { font-size: 1.1em; max-width: 500px; margin: 20px auto; }
                            button { padding: 12px 28px; font-size: 1.1em; background: #007aff; color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px; }
                            button:hover { background: #0062cc; }
                        </style>
                    </head>
                    <body>
                        <h1>Can't Connect</h1>
                        <p>The server is down or you're currently offline.<br>Please check your connection and try again.</p>
                        <button onclick="location.reload(true)">Retry</button>
                    </body>
                    </html>`,
                    {
                        headers: { 'Content-Type': 'text/html; charset=utf-8' },
                        status: 503,
                        statusText: 'Service Unavailable'
                    }
                );
            }

            // For other resources (JS, CSS, images): try cache, then fail silently
            return caches.match(event.request).then(cached => {
                return cached || new Response(null, { status: 404 });
            });
        })
    );
});
/////////////////////////////////////////////////////////////////////////////////////
// To clean up previous genearated cache
/**
 * 
 * @param {*} params 
 * @returns 
 */
async function cleanUpCache(params) {
    const keys = await caches.keys();
    const keysToDelete = keys.map(key => {
        //if(key !== CACHE_NAME.name) {
            return caches.delete(key)
        //}
    })
    return Promise.all(keysToDelete)
}
/////////////////////////////////////////////////////////////////////////////////////
// Reading addressbars url to get spreadsheet Id
/**
 * 
 * @param {*} url 
 * @returns 
 */
function getUrlVars(url) {
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
    }
    return vars;
}
/////////////////////////////////////////////////////////////////////////////////////
async function cacheRequest (request) {
    // 1. Check if a cached response matches the outgoing request
    const cache = await caches.open(CACHE_NAME.name)
    const cachedResponse = await cache.match(request);

    // 2. If response has been cached before, return it
    if (cachedResponse) {
        return cachedResponse;
    }
};
/////////////////////////////////////////////////////////////////////////////////////
//listen to messages
self.addEventListener('message', event => {
    event.waitUntil(cleanUpCache())
    setTimeout(function() {
        CACHE_NAME.name = 'mapSW_v' + Math.random();
        self.skipWaiting();
        preCache()
    }, 300)
});
/////////////////////////////////////////////////////////////////////////////////////

