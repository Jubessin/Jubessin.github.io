import { setTheme, toggleTheme } from "./theme.js";

const sections = document.getElementsByTagName('section');
const scrollInFadeUps = document.querySelectorAll('.scroll-fade-in-up');

function setupThemeToggle() {
    
    document.getElementById('theme-button')
            .addEventListener('click', toggleTheme);
}

function setupNavigationBar() {

    const links = document.querySelectorAll('.nav-link');

    links.forEach((link) => {
        link.addEventListener('click', (_) => {
            if (link.classList.contains('active')) 
                return;

            links.forEach((link) => {
                link.classList.remove('active');
            });
            link.classList.add('active');
        });

        link.classList.toggle('active', link.href === location.href);
    });
}

function handleWindowScroll() {

    let mostVisible = getMostVisible(sections);

    if (mostVisible && mostVisible.id) {
        const links = document.querySelectorAll('.nav-link');

        links.forEach((link) => {
            link.classList.toggle('active', link.href.endsWith(mostVisible.id));
        });
    }

    scrollInFadeUps.forEach((element) => {
        let visiblePercent = getVisibleHeightPercent(element, window.innerHeight);

        if (visiblePercent >= 0.4 || 
            (window.scrollY >= (element.offsetTop + element.scrollHeight - window.innerHeight))) {
            element.classList.add('scroll-fade-in-up-active');
        }
        else if (visiblePercent == 0 && 
                 window.scrollY < (element.offsetTop - window.innerHeight)) {
            element.classList.remove('scroll-fade-in-up-active');
        }
    })
}

// https://stackoverflow.com/a/39576399
function getMostVisible(elements) {
    var element,
        viewportHeight = window.innerHeight,
        max = 0;

    for (var i = 0; i < elements.length; ++i)
    {
        let _element = elements.item(i);
        var visiblePx = getVisibleHeightPx(_element, viewportHeight);

        if (visiblePx > max) {
            max = visiblePx;
            element = _element;
        }
    }

    return element;
}

// https://stackoverflow.com/a/39576399
function getVisibleHeightPx(element, viewportHeight) {
    var rect = element.getBoundingClientRect(),
        height = rect.bottom - rect.top,
        visible = {
            top: rect.top >= 0 && rect.top < viewportHeight,
            bottom: rect.bottom > 0 && rect.bottom < viewportHeight
        },
        visiblePx = 0;

    if (visible.top && visible.bottom) {
        // Whole element is visible
        visiblePx = height;
    } else if (visible.top) {
        visiblePx = viewportHeight - rect.top;
    } else if (visible.bottom) {
        visiblePx = rect.bottom;
    } else if (height > viewportHeight && rect.top < 0) {
        var absTop = Math.abs(rect.top);

        if (absTop < height) {
            // Part of the element is visible
            visiblePx = height - absTop;
        }
    }

    return visiblePx;
}

function getVisibleHeightPercent(element, viewportHeight) {
    var rect = element.getBoundingClientRect(),
        height = rect.bottom - rect.top,
        visible = {
            top: rect.top >= 0 && rect.top < viewportHeight,
            bottom: rect.bottom > 0 && rect.bottom < viewportHeight
        },
        visiblePx = 0;

    if (visible.top && visible.bottom) {
        // Whole element is visible
        return 1;
    } else if (visible.top) {
        visiblePx = viewportHeight - rect.top;
    } else if (visible.bottom) {
        visiblePx = rect.bottom;
    } else if (height > viewportHeight && rect.top < 0) {
        var absTop = Math.abs(rect.top);

        if (absTop < height) {
            // Part of the element is visible
            visiblePx = height - absTop;
        }
    }

    return visiblePx / (isNaN(viewportHeight) ? 1 : viewportHeight);
}

window.addEventListener('DOMContentLoaded', function(_) {

    setupThemeToggle();
    setupNavigationBar();
    
    setTheme(window.localStorage.getItem('theme'));

    handleWindowScroll();
});

window.addEventListener('scroll', (e) => handleWindowScroll());
