const apiUrl = 'http://localhost:8000';

// API functions related to markers
const api = {
    login: (username, password) => {
        const loginData = {
            username: username,
            password: password
        };

        return fetch(`${apiUrl}/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                // Authentication successful, store the token
                const authToken = data.token;
                localStorage.setItem('authToken', authToken);
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('is_staff', data.is_staff);
                localStorage.setItem('user', data);
                window.location.href = 'map.html'; // Redirect to map page URL
            } else {
                console.error('Authentication failed:', data.error);
            }
        })
        .catch(error => {
            console.error('Login error:', error);
        });
    },

    register: (username, password) => {
        const registerData = {
            username: username,
            password: password
        };

        return fetch(`${apiUrl}/api/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                // Registration successful, store the token
                const authToken = data.token;
                localStorage.setItem('authToken', authToken);
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('is_staff', data.is_staff);
                localStorage.setItem('user', data);
                window.location.href = 'map.html'; // Redirect to map page URL
            } else {
                console.error('Registration failed:', data.error);
            }
        })
        .catch(error => {
            console.error('Registration error:', error);
        });
    },

    getAllMarkers: (authToken) => {
        // Send a request to fetch existing markers from the backend
        return fetch(`${apiUrl}/markers/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${authToken}`,
            }
        })
        .then(response => response.json())
        .then(markers => markers)
        .catch(error => {
            console.error('Error fetching markers:', error);
        });
    },

    createMarker: (latlng, labelText, authToken) => {
        const data = {
            lat: latlng.lat,
            lng: latlng.lng,
            label: labelText
        };

        return fetch(`${apiUrl}/markers/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json());
    },

    updateMarkerPosition: (markerId, newLatLng, authToken) => {
        const data = {
            lat: newLatLng.lat,
            lng: newLatLng.lng
        };

        return fetch(`${apiUrl}/markers/${markerId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json());
    },

    updateMarkerLabel: (markerId, newLabelText, authToken) => {
        const data = {
            label: newLabelText
        };

        return fetch(`${apiUrl}/markers/${markerId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json());
    },

    deleteMarker: (markerId, authToken) => {
        return fetch(`${apiUrl}/markers/${markerId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            }
        })
        .then(response => response.status);
    },
};
export default api;
