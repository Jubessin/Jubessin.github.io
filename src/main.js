import { PROJECT_VERSION } from "./constants.js";

let contact_button = document.getElementById('contact-button');
let project_version = document.getElementById('project-version');

function sendEmail()
{
    var link = "mailto:justinerogun@hotmail.com";
    window.location.href = link;
}

contact_button.onclick = sendEmail;

project_version.textContent = PROJECT_VERSION;

function SetupNavigationBar(){
    const links = document.querySelectorAll('.nav-link');

    if (links.length)
    {
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
            
            if (link.href.includes(location.href)){
                link.classList.add('active');
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', function(evt)
{
    SetupNavigationBar();
});
