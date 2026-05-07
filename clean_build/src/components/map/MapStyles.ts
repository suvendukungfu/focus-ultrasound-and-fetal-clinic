/**
 * Custom medical-clinic map theme for Google Maps.
 * Reduces visual clutter, uses soft blue tones, and hides unnecessary POIs.
 */
export const clinicMapStyles: google.maps.MapTypeStyle[] = [
  // Water — soft teal
  { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#c8e6f0' }] },
  // Landscape — soft warm white
  { featureType: 'landscape', elementType: 'geometry.fill', stylers: [{ color: '#f0f4f3' }] },
  // Roads — subtle light gray
  { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#e0e6e4' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#d0d8d5' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#6b7c85' }] },
  // Highways — slightly more visible
  { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#cdd6d3' }] },
  // Hide most POIs except medical/school
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.medical', stylers: [{ visibility: 'on' }] },
  { featureType: 'poi.school', stylers: [{ visibility: 'on' }] },
  // Transit — hidden for clarity
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  // Admin borders — subtle
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#c0d0cd' }] },
  { featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#5a7a7a' }] },
  // Buildings — faint
  { featureType: 'landscape.man_made', elementType: 'geometry.fill', stylers: [{ color: '#e8efed' }] },
];
