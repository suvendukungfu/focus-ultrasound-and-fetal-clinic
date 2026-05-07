// Minimal Google Maps type declarations for the ClinicMap module.
// A full @types/google.maps install is not required for our usage.

declare namespace google.maps {
  class Map {
    constructor(el: HTMLElement, opts?: MapOptions);
    fitBounds(bounds: LatLngBounds, padding?: number | Padding): void;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
  }

  class LatLngBounds {
    constructor(sw?: LatLngLiteral, ne?: LatLngLiteral);
    extend(point: LatLngLiteral): LatLngBounds;
  }

  class Size {
    constructor(width: number, height: number, widthUnit?: string, heightUnit?: string);
  }

  class Point {
    constructor(x: number, y: number);
  }

  enum SymbolPath {
    CIRCLE = 0,
    FORWARD_CLOSED_ARROW = 1,
    FORWARD_OPEN_ARROW = 2,
    BACKWARD_CLOSED_ARROW = 3,
    BACKWARD_OPEN_ARROW = 4,
  }

  enum Animation {
    BOUNCE = 1,
    DROP = 2,
  }

  namespace ControlPosition {
    const RIGHT_CENTER: number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface Padding {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }

  interface MapOptions {
    center?: LatLngLiteral;
    zoom?: number;
    styles?: MapTypeStyle[];
    disableDefaultUI?: boolean;
    zoomControl?: boolean;
    zoomControlOptions?: { position?: number };
    gestureHandling?: string;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
  }

  interface MapTypeStyle {
    featureType?: string;
    elementType?: string;
    stylers: { [key: string]: string | number | boolean }[];
  }

  interface MarkerOptions {
    position?: LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: string | MarkerIcon | SymbolIcon;
    animation?: Animation;
  }

  interface MarkerIcon {
    url: string;
    scaledSize?: Size;
    origin?: Point;
    anchor?: Point;
  }

  interface SymbolIcon {
    path: SymbolPath;
    scale: number;
    fillColor: string;
    fillOpacity: number;
    strokeColor: string;
    strokeWeight: number;
  }
}
