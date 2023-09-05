import { PROJECT_VERSION } from "./constants.js";

function sendEmail(){
    
    var link = "mailto:justinerogun@hotmail.com";
    window.location.href = link;
}

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

window.addEventListener('DOMContentLoaded', function(evt) {
    
    SetupNavigationBar();
    
    const project_version = document.getElementById('project-version');
    project_version.textContent = PROJECT_VERSION;
});
