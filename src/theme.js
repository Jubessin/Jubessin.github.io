import { DEFAULT_THEME } from "./constants.js";

export function ToggleTheme() {
    SetTheme(window.localStorage.getItem('theme')=== 'light' 
        ? 'dark'
        : 'light');
}

export function SetTheme(theme) {
    if (theme === null) {
        theme = DEFAULT_THEME;
    }

    let element = document.documentElement;

    element.classList.add('color-theme-in-transition');

    element.setAttribute('theme', theme);
    
    window.localStorage.setItem('theme', theme);
    
    window.setTimeout(function() {
        element.classList.remove('color-theme-in-transition');
    }, 1000);
}