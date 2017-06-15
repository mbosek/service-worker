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
    const promises = versions
        .filter(version => version !== cacheVersion)
        .map(version => caches.delete(version))
    return Promise.all(promises)
}

const fetchEvents = async (e, cacheVersion) => {
    const cache = await caches.open(cacheVersion);
    const response = await cache.match(e.request);
    if (response) return response;

    const responseClone = await fetch(e.request.clone());
    if (responseClone.status < 400) return responseClone;

    cache.put(e.request, responseClone.clone());
    return response;
}

this.addEventListener('install', e => e.waitUntil(addCacheFiles(CACHE_VERSION, CACHE_FILES)));
this.addEventListener('activate', e => e.waitUntil(checkCurrentCache(CACHE_VERSION)));
this.addEventListener('fetch', e => e.respondWith(fetchEvents(e, CACHE_VERSION)));
