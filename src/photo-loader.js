import { PHOTOS } from "./constants.js";

const MINIMUM_LOAD_DELAY = 5000;
const MAXIMUM_LOAD_DELAY = 7500;

const photoContext = {};
const container = document.getElementById('landing-image-container');

function fadeToPhoto(child, delay) {
    let ctx = photoContext[child];

    ctx.index = (ctx.index + container.children.length) % PHOTOS.length;

    let photo = PHOTOS[ctx.index];

    $(child).fadeTo(1000, 0.05, function() {
        $(child).attr("src", ('src/images/' + photo));
    }).fadeTo(1000, 1);

    ctx.tid = setTimeout(() => fadeToPhoto(child, delay), delay);
};

export function startPhotoLoading() {

    let children = container.children;

    for (var i = 0; i < children.length; ++i) {
        let child = children.item(i);
        
        $(child).attr("src", ('src/images/') + PHOTOS[i]);

        let delay = (Math.random() * (MAXIMUM_LOAD_DELAY - MINIMUM_LOAD_DELAY) + MINIMUM_LOAD_DELAY);
        
        photoContext[child] = 
        {
            index: i,
            tid: window.setTimeout(() => fadeToPhoto(child, delay), delay),
        };
    }
}