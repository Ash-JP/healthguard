import * as THREE from "three";

// ─── Timing (seconds from page load) ─────────────────────────────────────────
export const DELAYS = {
  headline:  0.8,
  paragraph: 1.2,
  buttons:   1.5,
  trust:     2.0,
  globe:     2.3,
  markers:   2.8,
  routes:    3.5,
  particles: 4.0,
  cards:     5.0,
} as const;

// ─── Globe constants ──────────────────────────────────────────────────────────
export const GLOBE_RADIUS         = 1.85;
export const ROTATION_SPEED       = (2 * Math.PI) / 110;     // ~110 s per revolution
export const MAX_MOUSE_ROTATION   = (5  * Math.PI) / 180;    // 5° max parallax

// ─── Location data ────────────────────────────────────────────────────────────
export interface HubLocation {
  id:        string;
  name:      string;
  lat:       number;
  lon:       number;
  hospitals: number;
  products:  number;
  region:    string;
  inventory: number; // %
}

export const LOCATIONS: HubLocation[] = [
  { id: "india",       name: "India",          lat:  20.6, lon:  78.9, hospitals: 186, products:  4200, region: "South Asia",    inventory: 94 },
  { id: "germany",     name: "Germany",         lat:  51.2, lon:  10.5, hospitals:  42, products:  8250, region: "Europe",         inventory: 97 },
  { id: "singapore",   name: "Singapore",       lat:   1.3, lon: 103.8, hospitals:  28, products:  2100, region: "Southeast Asia", inventory: 96 },
  { id: "dubai",       name: "Dubai",           lat:  25.2, lon:  55.3, hospitals:  35, products:  3600, region: "Middle East",    inventory: 91 },
  { id: "saudi",       name: "Saudi Arabia",    lat:  24.0, lon:  45.0, hospitals:  22, products:  1800, region: "Middle East",    inventory: 89 },
  { id: "uk",          name: "United Kingdom",  lat:  55.4, lon:  -3.4, hospitals:  58, products:  5400, region: "Europe",         inventory: 98 },
  { id: "southafrica", name: "South Africa",    lat: -30.6, lon:  22.9, hospitals:  18, products:  1200, region: "Africa",         inventory: 87 },
  { id: "malaysia",    name: "Malaysia",        lat:   4.2, lon: 101.9, hospitals:  24, products:  1900, region: "Southeast Asia", inventory: 93 },
];

// ─── Supply routes ────────────────────────────────────────────────────────────
export interface SupplyRoute {
  from:  string; // location id
  to:    string;
}

export const ROUTES: SupplyRoute[] = [
  { from: "india",     to: "germany"     },
  { from: "india",     to: "dubai"       },
  { from: "india",     to: "singapore"   },
  { from: "germany",   to: "dubai"       },
  { from: "singapore", to: "southafrica" },
  { from: "india",     to: "malaysia"    },
  { from: "uk",        to: "saudi"       },
];

// ─── Shipment ticker ──────────────────────────────────────────────────────────
export const SHIPMENTS = [
  { id: "#5832", product: "Ventilator Unit",    from: "India",   to: "Germany",      status: "Delivered"   },
  { id: "#5889", product: "MRI Scanner",        from: "India",   to: "UAE",          status: "Dispatching" },
  { id: "#5901", product: "Sterilization Unit", from: "Germany", to: "Singapore",    status: "Delivered"   },
  { id: "#5914", product: "ICU Monitor",        from: "India",   to: "Malaysia",     status: "In Transit"  },
  { id: "#5927", product: "Endoscopy System",   from: "UK",      to: "Saudi Arabia", status: "In Transit"  },
  { id: "#5938", product: "CSSD Equipment",     from: "India",   to: "Singapore",    status: "Delivered"   },
  { id: "#5951", product: "Patient Monitor",    from: "Germany", to: "South Africa", status: "Dispatching" },
] as const;

// ─── Floating stat cards ──────────────────────────────────────────────────────
export const STAT_CARDS = [
  { label: "Inventory Status",    value: "98%",     floatDir:  1, delay: 0.0 },
  { label: "Countries Served",    value: "18",      floatDir: -1, delay: 0.2 },
  { label: "Hospitals Connected", value: "500+",    floatDir:  1, delay: 0.4 },
  { label: "Medical Products",    value: "12,500+", floatDir: -1, delay: 0.6 },
  { label: "Global Distribution", value: "24/7",    floatDir:  1, delay: 0.8 },
  { label: "Avg. Delivery",       value: "48 hrs",  floatDir: -1, delay: 1.0 },
] as const;

// ─── Trust metrics ────────────────────────────────────────────────────────────
export const TRUST_METRICS = [
  { label: "Hospitals",   value: 500,   suffix: "+" },
  { label: "Countries",   value: 18,    suffix: ""  },
  { label: "Years",       value: 25,    suffix: "+" },
  { label: "Products",    value: 12500, suffix: "+" },
] as const;

// ─── Utility: lat/lon → 3-D sphere position ───────────────────────────────────
export function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi   = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta),
  );
}
