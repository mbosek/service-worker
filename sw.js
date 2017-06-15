const cacheName = 'v1';
const cacheFiles = [
    './index.html',
    './style.css',
    './app.js',
];

this.addEventListener('install', (e) => {
    console.log('installed');

    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('CACHING files');
            return cache.addAll(cacheFiles);
        })
    )
});

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
