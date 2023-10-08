const helsinki = new L.LatLng(60.1699, 24.9384);
const zoomLevel = 12;

const map = L.map('map').setView(helsinki, zoomLevel);

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to handle creating a marker with a label
function createMarker(latlng, labelText) {
    const marker = L.marker(latlng, { draggable: true }).addTo(map);

    // Set the label text
    marker.bindPopup(labelText).openPopup();

    // Update marker position
    marker.on('dragend', (event) => {
        const newLatLng = event.target.getLatLng();
        // Todo: Update the marker's position in database
        console.log('New Marker Position:', newLatLng);
    });

    // Editing the label
    marker.on('click', () => {
        const newLabelText = prompt('New label:', labelText);
        if (newLabelText !== null) {
            marker.bindPopup(newLabelText).openPopup();
        }
    });

    return marker;
}

// Event listener for map clicks to create markers
map.on('click', (event) => {
    const labelText = prompt('Enter label:');
    if (labelText) {
        createMarker(event.latlng, labelText);
    }
});
