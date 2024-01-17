export async function fetchFromAPI(endpoint) {
    if (endpoint == '/status-endpoint')
        return {
            "routerStatus": {
                "signalStrength": "-67 dBm",
                "connectedDevices": 5,
                "dataUsage": {
                    "download": "1.2 GB",
                    "upload": "300 MB"
                }
            }
        };
    if (endpoint == '/setting-endpoint')
        return {
            "networkSettings": {
                "networkMode": "lte",
                "ssid": "MyRouterSSID",
                "password": "securepassword123"
            }
        };

    try {
        const response = await fetch(`http://localhost:3000${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error: ', error);
    }
}
