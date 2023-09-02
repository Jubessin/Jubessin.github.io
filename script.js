const PROJECT_VERSION = 'v0.1.0';

let lastScrollY = window.scrollY;
let nav = document.getElementById('nav');
let project_version = document.getElementById('project-version');

function sendEmail()
{
    var link = "mailto:justinerogun@hotmail.com";
    window.location.href = link;
}

// Hide/Show navigation bar when scrolling.
window.addEventListener('scroll', function()
{
    var scrollY = window.scrollY;

    if (scrollY > lastScrollY)
    {
        nav.classList.add('hidden');
    }
    else
    {
        nav.classList.remove('hidden');
    }
    lastScrollY = scrollY;
});

project_version.textContent = PROJECT_VERSION;