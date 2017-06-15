const cacheName = 'v1';

const addCacheFiles = async () => {
    const cacheFiles = [
        './index.html',
        './style.css',
        './app.js',
    ];

    const cache = await caches.open(cacheName);
    return cache.addAll(cacheFiles);
}

this.addEventListener('install', e => e.waitUntil(addCacheFiles));

this.addEventListener('activate', (e) => {
    console.log('Activated');

    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(cacheNames.map((thisCacheName) => {
                if  (thisCacheName !== cacheName){
                    console.log('Removing Cached files from ', thisCacheName)
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
});
