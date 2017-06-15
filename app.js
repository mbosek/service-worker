const API_URL = 'https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .catch(error => console.log('Registration failed with ' + error));
}

async function setPhotoURL() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        return json.url;
    } catch(e) {
        console.log(e)
    }
}

async function setImageURL(){
    let myImage = document.querySelector('img');
    const url = await setPhotoURL();
    myImage.src = url
}

setImageURL();
