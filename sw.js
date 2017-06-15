const CACHE_VERSION = 'v1';
const CACHE_FILES = [
    './',
    './style.css',
    './app.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
];

const addCacheFiles = async (cacheVersion, files) => {
    const cache = await caches.open(cacheVersion);
    return cache.addAll(files);
}

const checkCurrentCache = async (cacheVersion) => {
    const versions = await caches.keys();
    return versions
        .filter(version => version !== cacheVersion)
        .map(version => caches.delete(version))
}

const fetchEvents = async (e, cacheVersion) => {
    const response = await caches.match(e.request);
    if ( response ) {
        return response;
    }
    const requestClone = e.request.clone();
    const mainReponseClone = await fetch(requestClone)
    if ( !mainReponseClone ) {
        return mainReponseClone;
    }
    var responseClone = mainReponseClone.clone();
    const cache = await caches.open(cacheVersion);
    cache.put(e.request, responseClone);
    return responseClone
}

this.addEventListener('install', e => e.waitUntil(addCacheFiles(CACHE_VERSION, CACHE_FILES)));
this.addEventListener('activate', e => e.waitUntil(checkCurrentCache(CACHE_VERSION)));
this.addEventListener('fetch', e e.respondWith(fetchEvents(e, CACHE_VERSION)));
