import { PROJECT_VERSION } from "./constants.js";

import { setTheme, toggleTheme } from "./theme.js";

import { observeIntersections } from "./observer.js";

import { startPhotoLoading, stopPhotoLoading } from "./photo-loader.js";

function handleScroll(element, isIntersecting, onVisibleCallback, onInvisibleCallback) {

    if (isIntersecting) {
        if (onVisibleCallback && window.scrollY >= ((element.offsetTop + (element.scrollHeight)) - window.innerHeight)) {
            onVisibleCallback();
        }
    }
    else if (onInvisibleCallback && window.scrollY < (element.offsetTop - window.innerHeight)) {
        onInvisibleCallback();
    }
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

function setupThemeToggle() {
    
    document.getElementById('theme-btn')
            .addEventListener('click', toggleTheme);
}

window.addEventListener('DOMContentLoaded', function(_) {

    setupThemeToggle();
    setupNavigationBar();
    
    setTheme(window.localStorage.getItem('theme'));

    observeIntersections(
        document.querySelectorAll('.scroll-fade-in-up'), 
        { threshold: [0, 1] }, 
        (entry) => { 
            let element = entry.target;

            handleScroll(
                element, 
                entry.isIntersecting, 
                () => element.classList.add('scroll-fade-in-up-active'), 
                () => element.classList.remove('scroll-fade-in-up-active')); 
        }, 
        (element) => { 
            handleScroll(
                element, 
                true, 
                () => element.classList.add('scroll-fade-in-up-active'), 
                () => element.classList.remove('scroll-fade-in-up-active')); 
        });

    const nav = this.document.querySelector('.nav-bar');
    const themeToggle = this.document.querySelector('.theme-btn')

    observeIntersections(
        this.document.querySelectorAll('.landing-image-container'),
        {
            threshold: [0.1, 0.25],
            rootMargin: '50px'
        },
        (entry) => { 

            let element = entry.target;

            if (entry.isIntersecting) {
                if (window.scrollY >= ((element.offsetHeight) - window.innerHeight)) {
                    startPhotoLoading();
                    nav.classList.remove('visible');
                    themeToggle.classList.remove('visible');
                }
            }
            else  {
                stopPhotoLoading();
                nav.classList.add('visible');
                themeToggle.classList.add('visible');
            }
        },
    );

    startPhotoLoading();

    const project_version = document.getElementById('project-version');
    project_version.textContent = PROJECT_VERSION;
});
