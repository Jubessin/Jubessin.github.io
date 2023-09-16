import { DEFAULT_THEME } from "./constants.js";

function toggleImageOnThemeChange(theme) {
    const contactIconPrefix = '.contact-icon-';

    document.querySelectorAll(contactIconPrefix + (theme === 'light' ? 'dark' : 'light')).forEach((element) => {
        element.classList.toggle('active', true);
    });

    document.querySelectorAll(contactIconPrefix + theme).forEach((element) => {
        element.classList.toggle('active', false);
    });
}

export function toggleTheme() {
    setTheme(window.localStorage.getItem('theme')=== 'light' 
        ? 'dark'
        : 'light');
}

export function setTheme(theme) {
    if (theme === null) {
        theme = DEFAULT_THEME;
    }
    
    let element = document.documentElement;

    element.classList.add('color-theme-in-transition');

    element.setAttribute('theme', theme);
    
    toggleImageOnThemeChange(theme);
    
    window.localStorage.setItem('theme', theme);

    window.setTimeout(function() {
        element.classList.remove('color-theme-in-transition');
    }, 1000);
}