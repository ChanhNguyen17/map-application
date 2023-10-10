import api from './api.js';

const authToken = localStorage.getItem('authToken');

if (!authToken) {
    window.location.href = 'index.html';
}

const user_id = localStorage.getItem('user_id');
const is_staff = localStorage.getItem('is_staff') === 'true';

const helsinki = new L.LatLng(60.1699, 24.9384);
const zoomLevel = 6;

const map = L.map('map').setView(helsinki, zoomLevel);

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to handle creating a marker with a label
function createMarker(latlng, markerData) {
    const state = markerData;
    const isEditable = (user_id === markerData.user.toString()) || is_staff === true;

    const marker = L.marker(latlng, { id: state.id });
    marker.setOpacity(0.4);

    if(isEditable){
        marker.options.draggable = true;
        marker.setOpacity(1)

        // Set the label text
        marker.bindPopup(state.label).openPopup();

        // Update marker position
        marker.on('dragend', (event) => {
            marker.bindPopup(state.label).openPopup();
            const newLatLng = event.target.getLatLng();
            api.updateMarkerPosition(marker.options.id, newLatLng, authToken)
                .then(r => {
                    state.lat = newLatLng.lat;
                    state.lng = newLatLng.lng;
                });
        });
    }

    marker.on('click', () => {
        marker.bindPopup(state.label).openPopup();
        if(isEditable){
            const newLabelText = prompt('Marker label:', state.label);
            marker.bindPopup(newLabelText).openPopup();
            if (newLabelText !== null) {
                api.updateMarkerLabel(marker.options.id, newLabelText, authToken)
                    .then(r => state.label = newLabelText);
            }
        }
    });

    marker.addTo(map);
    return marker;
}

// Event listener for map clicks to create markers
map.on('click', (event) => {
    const labelText = prompt('Enter label:');
    if (labelText) {
        api.createMarker(event.latlng, labelText, authToken)
            .then(newMarker => createMarker(L.latLng(newMarker.lat, newMarker.lng), newMarker));
    }
});

function initializeMap() {
    api.getAllMarkers(authToken).then(markers => {
        markers.forEach(markerData => {
            const latlng = L.latLng(markerData.lat, markerData.lng);
            createMarker(latlng, markerData);
        });
    })
}

// Call the initializeMap function when the page loads
window.addEventListener('load', initializeMap);
