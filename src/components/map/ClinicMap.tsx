import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Navigation, Clock, ExternalLink, Locate } from 'lucide-react';
import { clinicMapStyles } from './MapStyles';
import {
  CLINIC_LAT,
  CLINIC_LNG,
  CLINIC_ADDRESS,
  CLINIC_PHONE,
  CLINIC_WHATSAPP_URL,
  isClinicOpen,
  getDirectionsUrl,
  getDistanceKm,
  loadGoogleMapsApi,
} from './MapUtils';

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY || '';

// ─── Geo Schema (JSON-LD) ────────────────────────────────────────
const GeoSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MedicalClinic',
        name: 'Focus Ultrasound & Fetal Clinic',
        image: '/images/fetal-ultrasound.webp',
        telephone: CLINIC_PHONE,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Shop No. 05 & 06, UGF, Nirala Estate',
          addressLocality: 'Greater Noida West',
          addressRegion: 'UP',
          postalCode: '201306',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: CLINIC_LAT,
          longitude: CLINIC_LNG,
        },
        url: 'https://focusultrasound.in',
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '15:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '17:00', closes: '20:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '09:00', closes: '14:00' },
        ],
      }),
    }}
  />
);

// ─── Main component ──────────────────────────────────────────────
const ClinicMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const open = isClinicOpen();

  // ── Load map ──
  const initMap = useCallback(() => {
    if (!mapRef.current || !window.google?.maps) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: CLINIC_LAT, lng: CLINIC_LNG },
      zoom: 16,
      styles: clinicMapStyles,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_CENTER },
      gestureHandling: 'cooperative',
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    // Marker
    new google.maps.Marker({
      position: { lat: CLINIC_LAT, lng: CLINIC_LNG },
      map,
      title: 'Focus Ultrasound & Fetal Clinic',
      icon: {
        url: '/images/fetal-ultrasound.webp',
        scaledSize: new google.maps.Size(48, 48),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(24, 48),
      },
      animation: google.maps.Animation.DROP,
    });

    mapInstanceRef.current = map;
    setMapReady(true);
  }, []);

  useEffect(() => {
    if (!MAPS_API_KEY) {
      setMapError(true);
      return;
    }

    loadGoogleMapsApi(MAPS_API_KEY)
      .then(initMap)
      .catch(() => setMapError(true));
  }, [initMap]);

  // ── User location ──
  const handleLocateUser = () => {
    if (!navigator.geolocation) return;
    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserCoords(coords);
        setDistance(getDistanceKm(coords.lat, coords.lng, CLINIC_LAT, CLINIC_LNG));
        setLocating(false);

        // Extend map bounds to show user
        if (mapInstanceRef.current) {
          const bounds = new google.maps.LatLngBounds();
          bounds.extend({ lat: CLINIC_LAT, lng: CLINIC_LNG });
          bounds.extend(coords);
          mapInstanceRef.current.fitBounds(bounds, 80);

          new google.maps.Marker({
            position: coords,
            map: mapInstanceRef.current,
            title: 'Your Location',
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#fff',
              strokeWeight: 2,
            },
          });
        }
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  // ── Fallback: iframe when no API key ──
  const FallbackMap = () => (
    <iframe
      src={`https://maps.google.com/maps?q=${CLINIC_LAT},${CLINIC_LNG}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Focus Ultrasound & Fetal Clinic Location"
      className="w-full h-full"
    />
  );

  return (
    <section className="relative w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
      <GeoSchema />

      {/* Map container */}
      <div className="relative w-full h-[450px] md:h-[600px] group">
        {/* Google Maps canvas / fallback */}
        <div className="absolute inset-0 z-0">
          {mapError ? (
            <FallbackMap />
          ) : (
            <div ref={mapRef} className="w-full h-full" />
          )}
        </div>

        {/* Gradient overlays for depth */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/40 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/60 to-transparent pointer-events-none z-10" />

        {/* ─── Glassmorphism Info Card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto z-20"
        >
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-8 max-w-sm border border-white/30 dark:border-white/10">
            {/* Status badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${open ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${open ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {open ? 'Open Now' : 'Closed'}
                </span>
              </div>
              {distance !== null && (
                <span className="text-xs font-semibold text-muted-foreground bg-muted/80 px-2.5 py-1 rounded-full">
                  {distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`} away
                </span>
              )}
            </div>

            {/* Clinic info */}
            <h3 className="font-display font-bold text-lg text-foreground mb-1">
              Focus Ultrasound & Fetal Clinic
            </h3>
            <p className="text-muted-foreground text-xs font-body leading-relaxed mb-5 flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
              {CLINIC_ADDRESS}
            </p>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <a
                href={getDirectionsUrl(userCoords?.lat, userCoords?.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 group/btn"
              >
                <Navigation className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Directions</span>
              </a>
              <a
                href={`tel:${CLINIC_PHONE}`}
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-all duration-300 group/btn"
              >
                <Phone className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
              </a>
              <a
                href={CLINIC_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 transition-all duration-300 group/btn"
              >
                <MessageCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
              </a>
            </div>

            {/* Locate me button */}
            <button
              onClick={handleLocateUser}
              disabled={locating}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-muted-foreground bg-muted/50 hover:bg-muted hover:text-foreground transition-all duration-300"
            >
              <Locate className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
              {locating ? 'Locating...' : distance !== null ? 'Update Location' : 'Show My Distance'}
            </button>
          </div>
        </motion.div>

        {/* Hours badge (top right) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-20"
        >
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-lg border border-white/30 dark:border-white/10 flex items-center gap-3">
            <Clock className="w-4 h-4 text-primary" />
            <div className="text-xs">
              <p className="font-bold text-foreground">Mon–Sat: 9AM–3PM, 5PM–8PM</p>
              <p className="text-muted-foreground">Sunday: 9AM–2PM</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClinicMap;
