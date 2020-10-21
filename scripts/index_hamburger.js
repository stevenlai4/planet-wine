// Hamburger Menu Toggle
var toggle = document.querySelector('.toggle');
var menu = document.querySelector('.menu');
var centerContent = document.querySelector('.center-content');

function toggleMenu() {
    if (menu.classList.contains('active-menu')) {
        menu.classList.remove('active-menu');
        centerContent.classList.add('active-center-content');

        toggle.querySelector('a').innerHTML =
            "<i class='fas fa-bars fa-2x'></li>";
    } else {
        menu.classList.add('active-menu');
        centerContent.classList.remove('active-center-content');

        toggle.querySelector('a').innerHTML =
            "<i class='fas fa-times fa-2x'></li>";
    }
}

toggle.addEventListener('click', toggleMenu);
