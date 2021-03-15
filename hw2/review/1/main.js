const viewer = document.querySelector('#display');
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const source = document.querySelector("#source");
const image = document.querySelector('.image-viewer__display img')

const image_urls = ['https://i.imgur.com/mik2s6P.jpeg', 'https://i.imgur.com/ECLJake.jpeg', 'https://i.imgur.com/MuFus65.jpg',
    'https://i.imgur.com/wspHrlZ.jpeg', 'https://i.imgur.com/UfntLlJ.jpeg', 'https://i.imgur.com/LVKvjL6.gif', 'https://i.imgur.com/vogm3n1.jpeg', 'https://i.imgur.com/cfmHce0.jpeg',
    'https://i.imgur.com/JyaH6IF.jpeg'
];

const urlLen = image_urls.length - 1

window.addEventListener('load', windowOnLoad, false);
image.addEventListener('error', imageLoadError, false);

// 不能直接把changeimg寫成func?
// preview window
let isImgLoaded = false
let urlstate = 0;
previous.classList.add('disabled')
viewer.src = './images/loading.gif'
source.href = image_urls[urlstate]
source.innerHTML = image_urls[urlstate]

// error handling
function imageLoadError() {
    // console.log("" + +new Date() + ": Error fired");
    viewer.src = './images/loading.gif'
};

// image loaded successfully 
function windowOnLoad() {
    viewer.src = image_urls[urlstate]
        // console.log("" + +new Date() + ": Onload fired");
};

next.addEventListener('click', function() {
    urlstate++;
    if (urlstate > urlLen) {
        urlstate = urlLen
        return
    }
    viewer.src = image_urls[urlstate]
    source.href = image_urls[urlstate]
    source.innerHTML = image_urls[urlstate]
    if (urlstate < urlLen) {
        next.classList.remove('disabled')
        previous.classList.remove('disabled')
    } else if (urlstate === urlLen) {
        next.classList.add('disabled')
    }
});

previous.addEventListener('click', function() {
    urlstate--;
    if (urlstate < 0) {
        urlstate = 0
        return
    }
    viewer.src = image_urls[urlstate]
    source.href = image_urls[urlstate]
    source.innerHTML = image_urls[urlstate]
    if (urlstate > 0) {
        next.classList.remove('disabled')
        previous.classList.remove('disabled')
    } else if (urlstate === 0) {
        previous.classList.add('disabled')
    }
});