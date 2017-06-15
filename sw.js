const CACHE_VERSION = 'v1';

const addCacheFiles = async (cacheVersion) => {
    const cacheFiles = [
        './index.html',
        './style.css',
        './app.js',
    ];

    const cache = await caches.open(cacheVersion);
    return cache.addAll(cacheFiles);
}

const checkCurrentCache = async (cacheVersion) => {
    const versions = await caches.keys();
    return versions
        .filter(version => version !== cacheVersion)
        .map(version => caches.delete(version))
}

this.addEventListener('install', e => e.waitUntil(addCacheFiles(CACHE_VERSION)));
this.addEventListener('activate', e => e.waitUntil(checkCurrentCache(CACHE_VERSION)));
