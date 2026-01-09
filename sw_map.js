/////////////////////////////////////////////////////////////////////////////////////
// Cache Name
let version = 1;
let dyVersion = 0;
const CACHE_NAME = {name: 'mapSW_v23.0'}
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
            const clientUrl = new URL(client.url);
            const sheed_id = clientUrl.searchParams.get('id');
            const target = clientUrl.searchParams.has('target') ? clientUrl.searchParams.get('target') : 'live';
            
            _client = client;
            const rootFolder = "./sheets/" + sheed_id + "/" + target;
            STATIC_ASSETS = [
                clientUrl,
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
    //console.log('sw1 fetched');
    if (event.request.method === 'GET') { 
        //console.log("FETCH -> ", event)
        event.respondWith(fetchAssets(event))
    }
})
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

