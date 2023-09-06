import { PROJECT_VERSION } from "./constants.js";

import { SetTheme } from "./theme.js";
import { ToggleTheme } from "./theme.js";

function SetupNavigationBar() {

    const links = document.querySelectorAll('.nav-link');

    if (links.length) {
        links.forEach((link) => 
        {
            link.addEventListener('click', (e) => {
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

    btn.addEventListener('click', function(e) {
        ToggleTheme();
    });
}

window.addEventListener('DOMContentLoaded', function(evt) {

    SetupThemeToggle();
    SetupNavigationBar();

    SetTheme(window.localStorage.getItem('theme'));

    const project_version = document.getElementById('project-version');
    project_version.textContent = PROJECT_VERSION;
});
