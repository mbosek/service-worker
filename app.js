if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(function(error) {
    console.log('Registration failed with ' + error);
  }
)}
