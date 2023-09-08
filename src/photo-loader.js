import { PHOTOS } from "./constants.js";

const MINIMUM_LOAD_DELAY = 5000;
const MAXIMUM_LOAD_DELAY = 7500;

const photoContext = {};
const container = document.getElementById('landing-image-container');

let isRunning = false;
let incrementingId = 0;

function getId(element) {

    return !element.id 
        ? element.id = ("id_" + incrementingId++)
        : element.id;
}

function fadeToPhoto(child, delay) {

    let ctx = photoContext[getId(child)];

    ctx.index = (ctx.index + container.children.length) % PHOTOS.length;

    let photo = PHOTOS[ctx.index];

    child.style.opacity = 0.05;

    setTimeout(() => {
        child.src = ('src/images/' + photo);
        child.style.opacity = 1;
    }, 1000);
    
    ctx.tid = setTimeout(() => fadeToPhoto(child, delay), delay);
};

export function startPhotoLoading() {

    if (isRunning)
        return;

    let children = container.children;

    for (var i = 0; i < children.length; ++i) {
        let child = children.item(i);
        
        let delay = (Math.random() * (MAXIMUM_LOAD_DELAY - MINIMUM_LOAD_DELAY) + MINIMUM_LOAD_DELAY);
        
        photoContext[getId(child)] = 
        {
            index: i,
            tid: window.setTimeout(() => fadeToPhoto(child, delay), delay),
        };
    }

    isRunning = true;
}

export function stopPhotoLoading() {

    let children = container.children;

    for (var i = 0; i < children.length; ++i) {
        let child = children.item(i);

        clearTimeout(photoContext[getId(child)].tid);
    }

    isRunning = false;
}