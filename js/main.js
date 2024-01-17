import { initTranslation } from './translation.js';
import { fetchFromAPI } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize translation
    initTranslation();

    // Fetch and display status
    fetchStatus();

    // Handle form submission
    document.getElementById('myForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle form data
    });
});

function fetchStatus() {
    fetchFromAPI('/status-endpoint').then(data => {
        // data = { signalStrength: '-54', connectedDevices: 'PC1', dataUsage: '234212' };
        document.getElementById('signalStrength').textContent = i18next.t('signalStrength', { value: data.signalStrength });
        document.getElementById('connectedDevices').textContent = i18next.t('connectedDevices', { value: data.connectedDevices });
        document.getElementById('dataUsage').textContent = i18next.t('dataUsage', { value: data.dataUsage });
    });
}
