/** Clinic coordinates — Nirala Estate, Greater Noida West */
export const CLINIC_LAT = 28.5965;
export const CLINIC_LNG = 77.4420;

export const CLINIC_ADDRESS =
  'Shop No. 05 & 06, UGF, Nirala Estate, Noida Extension, Greater Noida West - 201306';

export const CLINIC_PHONE = '+918287655133';
export const CLINIC_WHATSAPP_URL =
  'https://wa.me/918287655133?text=Hello%20I%20want%20to%20book%20an%20appointment';

/** Returns true if the clinic is currently open based on IST time. */
export function isClinicOpen(): boolean {
  const now = new Date();
  // Convert to IST (UTC+5:30)
  const istOffset = 5.5 * 60; // minutes
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const istMinutes = utcMinutes + istOffset;
  const istHour = Math.floor((istMinutes % 1440) / 60);
  const day = now.getUTCDay(); // 0 = Sun

  // Sunday: 9 AM – 2 PM
  if (day === 0) return istHour >= 9 && istHour < 14;
  // Mon–Sat: 9 AM – 3 PM  and  5 PM – 8 PM
  return (istHour >= 9 && istHour < 15) || (istHour >= 17 && istHour < 20);
}

/** Returns the Google Maps directions URL. */
export function getDirectionsUrl(
  userLat?: number,
  userLng?: number,
): string {
  const dest = `${CLINIC_LAT},${CLINIC_LNG}`;
  if (userLat !== undefined && userLng !== undefined) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${dest}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
}

/** Calculate straight-line distance (Haversine) between two coordinates in km. */
export function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Load the Google Maps JS API by injecting a <script> tag. Returns a promise. */
let loadPromise: Promise<void> | null = null;

export function loadGoogleMapsApi(apiKey: string): Promise<void> {
  if (window.google?.maps) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });

  return loadPromise;
}
