import { PROJECT_VERSION } from "./constants.js";

import { SetTheme } from "./theme.js";
import { ToggleTheme } from "./theme.js";

function OnScroll(elements) {
    elements.forEach(function(element) {
        if (window.scrollY >= ((element.offsetTop + (element.scrollHeight)) - window.innerHeight)) {
            element.classList.add("fade-in-up");
        } else if (window.scrollY < (element.offsetTop - window.innerHeight)) {
            element.classList.remove("fade-in-up");
        }
    });
}

function SetupNavigationBar() {

    const links = document.querySelectorAll('.nav-link');

    if (links.length) {
        links.forEach((link) => 
        {
            link.addEventListener('click', (_) => {
                if (!link.classList.contains('active')){
                    links.forEach((link) => {
                        link.classList.remove('active');
                    });
                    link.classList.add('active');
                }
            });

            if (link.href === location.href) {
                link.classList.add('active');
            }
            else {
                link.classList.remove('active');
            }
        });
    }
}

function SetupThemeToggle() {

    const btn = document.getElementById('theme-btn');

    btn.addEventListener('click', function(_) {
        ToggleTheme();
    });
}

window.addEventListener('DOMContentLoaded', function(_) {

    SetupThemeToggle();
    SetupNavigationBar();

    SetTheme(window.localStorage.getItem('theme'));
    
    const project_version = document.getElementById('project-version');
    project_version.textContent = PROJECT_VERSION;
    
    const elementsToFadeInUpOnScroll = document.querySelectorAll(".fade-in-up-on-scroll");

    if (elementsToFadeInUpOnScroll) {
        window.addEventListener("scroll", function(_) {
            OnScroll(elementsToFadeInUpOnScroll);
        });

        OnScroll(elementsToFadeInUpOnScroll);
    }
});
