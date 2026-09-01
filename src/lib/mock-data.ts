export const heroStats = [
  { icon: "radar", value: "4,812", label: "Debris Detected" },
  { icon: "map", value: "14.8 km²", label: "Area Surveyed" },
  { icon: "target", value: "93.4%", label: "AI Confidence" },
  { icon: "activity", value: "42", label: "Missions Completed" },
] as const;

export const debrisBreakdown = [
  { name: "Plastic", value: 42, color: "var(--plastic)" },
  { name: "Ghost Net", value: 24, color: "var(--ghostnet)" },
  { name: "Metal", value: 18, color: "var(--metal)" },
  { name: "Fishing Debris", value: 16, color: "var(--fishing)" },
];

export type Scan = {
  id: string;
  location: string;
  date: string;
  depth: string;
  topClass: string;
  confidence: number;
  objects: number;
};

export const scans: Scan[] = [
  {
    id: "SCN-4821",
    location: "Monterey Bay, CA",
    date: "2026-08-28 09:14",
    depth: "62 m",
    topClass: "Plastic",
    confidence: 94,
    objects: 18,
  },
  {
    id: "SCN-4818",
    location: "Bay of Biscay, FR",
    date: "2026-08-26 15:42",
    depth: "118 m",
    topClass: "Ghost Net",
    confidence: 91,
    objects: 12,
  },
  {
    id: "SCN-4809",
    location: "Andaman Coast, IN",
    date: "2026-08-24 07:05",
    depth: "44 m",
    topClass: "Fishing Debris",
    confidence: 88,
    objects: 9,
  },
  {
    id: "SCN-4802",
    location: "Great Barrier Reef, AU",
    date: "2026-08-21 11:33",
    depth: "27 m",
    topClass: "Metal",
    confidence: 90,
    objects: 7,
  },
  {
    id: "SCN-4795",
    location: "Aegean Sea, GR",
    date: "2026-08-19 16:20",
    depth: "83 m",
    topClass: "Plastic",
    confidence: 96,
    objects: 21,
  },
  {
    id: "SCN-4788",
    location: "Puget Sound, WA",
    date: "2026-08-16 08:47",
    depth: "51 m",
    topClass: "Ghost Net",
    confidence: 85,
    objects: 6,
  },
  {
    id: "SCN-4780",
    location: "Sagami Bay, JP",
    date: "2026-08-13 13:58",
    depth: "142 m",
    topClass: "Metal",
    confidence: 92,
    objects: 14,
  },
  {
    id: "SCN-4771",
    location: "Cape Town Shelf, ZA",
    date: "2026-08-10 06:31",
    depth: "76 m",
    topClass: "Fishing Debris",
    confidence: 87,
    objects: 11,
  },
];

export type Detection = {
  id: string;
  type: string;
  kind: "plastic" | "ghostnet" | "metal" | "fishing";
  confidence: number;
  date: string;
  depth: string;
  x: number;
  y: number;
};

export const detections: Detection[] = [
  { id: "DET-01", type: "Plastic Bundle", kind: "plastic", confidence: 94, date: "Aug 28", depth: "62 m", x: 18, y: 26 },
  { id: "DET-02", type: "Ghost Net", kind: "ghostnet", confidence: 91, date: "Aug 28", depth: "68 m", x: 31, y: 44 },
  { id: "DET-03", type: "Metal Drum", kind: "metal", confidence: 89, date: "Aug 27", depth: "74 m", x: 46, y: 33 },
  { id: "DET-04", type: "Fishing Line", kind: "fishing", confidence: 86, date: "Aug 27", depth: "58 m", x: 57, y: 58 },
  { id: "DET-05", type: "Plastic Sheet", kind: "plastic", confidence: 93, date: "Aug 26", depth: "49 m", x: 68, y: 39 },
  { id: "DET-06", type: "Ghost Net", kind: "ghostnet", confidence: 84, date: "Aug 26", depth: "91 m", x: 74, y: 66 },
  { id: "DET-07", type: "Metal Cable", kind: "metal", confidence: 88, date: "Aug 25", depth: "104 m", x: 39, y: 72 },
  { id: "DET-08", type: "Fishing Trap", kind: "fishing", confidence: 82, date: "Aug 25", depth: "63 m", x: 24, y: 62 },
  { id: "DET-09", type: "Plastic Crate", kind: "plastic", confidence: 90, date: "Aug 24", depth: "55 m", x: 84, y: 28 },
  { id: "DET-10", type: "Ghost Net", kind: "ghostnet", confidence: 79, date: "Aug 24", depth: "112 m", x: 62, y: 80 },
  { id: "DET-11", type: "Metal Frame", kind: "metal", confidence: 87, date: "Aug 23", depth: "88 m", x: 51, y: 18 },
  { id: "DET-12", type: "Fishing Net", kind: "fishing", confidence: 81, date: "Aug 23", depth: "71 m", x: 12, y: 48 },
];

export const kindColor: Record<Detection["kind"], string> = {
  plastic: "var(--plastic)",
  ghostnet: "var(--ghostnet)",
  metal: "var(--metal)",
  fishing: "var(--fishing)",
};
