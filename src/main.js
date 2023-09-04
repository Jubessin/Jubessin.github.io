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
