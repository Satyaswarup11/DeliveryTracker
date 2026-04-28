import { WebView } from 'react-native-webview';

export default function MapView({ latitude, longitude }) {
  const html = `
  <html>
  <body>
  <div id="map" style="height:100vh"></div>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    var map = L.map('map').setView([${latitude}, ${longitude}], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    var marker = L.marker([${latitude}, ${longitude}]).addTo(map);
  </script>
  </body>
  </html>
  `;

  return <WebView source={{ html }} style={{ flex: 1 }} />;
}