import { PROJECT_VERSION } from "./constants.js";

import { SetTheme } from "./theme.js";
import { ToggleTheme } from "./theme.js";

import { Observe } from "./observer.js";

function OnScroll(element, isIntersecting) {

    if (isIntersecting) {
        if (window.scrollY >= ((element.offsetTop + (element.scrollHeight)) - window.innerHeight)) {
            element.classList.add('scroll-fade-in-up-active');
        }
    }
    else if (window.scrollY < (element.offsetTop - window.innerHeight)) {
        element.classList.remove('scroll-fade-in-up-active');
    }
}

function SetupNavigationBar() {

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

function SetupThemeToggle() {

    document.getElementById('theme-btn')
            .addEventListener('click', ToggleTheme);
}

window.addEventListener('DOMContentLoaded', function(_) {

    SetupThemeToggle();
    SetupNavigationBar();
    
    SetTheme(window.localStorage.getItem('theme'));

    Observe(
        document.querySelectorAll('.scroll-fade-in-up'), 
        { threshold: [0, 1] }, 
        (entry) => { OnScroll(entry.target, entry.isIntersecting); }, 
        (element) => { OnScroll(element, true); });

    const project_version = document.getElementById('project-version');
    project_version.textContent = PROJECT_VERSION;
});
