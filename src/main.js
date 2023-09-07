import { PROJECT_VERSION } from "./constants.js";

import { setTheme, toggleTheme } from "./theme.js";

import { observeIntersections } from "./observer.js";

import { startPhotoLoading } from "./photo-loader.js";

function onScroll(element, isIntersecting) {

    if (isIntersecting) {
        if (window.scrollY >= ((element.offsetTop + (element.scrollHeight)) - window.innerHeight)) {
            element.classList.add('scroll-fade-in-up-active');
        }
    }
    else if (window.scrollY < (element.offsetTop - window.innerHeight)) {
        element.classList.remove('scroll-fade-in-up-active');
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
        (entry) => { onScroll(entry.target, entry.isIntersecting); }, 
        (element) => { onScroll(element, true); });

    startPhotoLoading();

    const project_version = document.getElementById('project-version');
    project_version.textContent = PROJECT_VERSION;
});
