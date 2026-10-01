document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const authOverlay = document.getElementById('auth-overlay');
    const appContainer = document.getElementById('app-container');
    const userDisplayName = document.getElementById('user-display-name');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        if (username.trim() !== "") {
            userDisplayName.textContent = username;
        }

        authOverlay.classList.add('hidden');
        appContainer.classList.remove('blur-content');
    });

    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    let mapInitialized = false;
    let map;

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetTab) {
                    section.classList.add('active');
                }
            });

            if (targetTab === 'map-location' && !mapInitialized) {
                setTimeout(() => {
                    initMap();
                    mapInitialized = true;
                }, 100);
            }
        });
    });

    function initMap() {
        // Алматы Энергетика және электронды технологиялар колледжі координатасы (Жандосов, 61)
        const energoCollegeCoords = [43.2140, 76.8872];

        map = L.map('map').setView(energoCollegeCoords, 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        const marker = L.marker(energoCollegeCoords).addTo(map);
        marker.bindPopup("<b>Алматы Энергетика және Электронды Технологиялар Колледжі</b><br>Жандосов көшесі, 61").openPopup();
    }
});