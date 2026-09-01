# Ocean Guardian AI

I've attached ONE reference image — this is the landing page ("/") of the app. Replicate it AS EXACTLY AS POSSIBLE: same layout, same whale hero photo (right side, full-bleed underwater scene with light rays), same nav bar (Home/Mission/Technology/Dashboard/Contact + "Launch App" cyan pill button), same logo (circular sonar-wave icon + "DEEPSCAN" + "SONAR AI DETECTION" subtitle), same eyebrow label "SONAR AI DETECTION," same serif headline "Exploring the Ocean. Protecting our Future." (with "Future." in cyan), same paragraph copy, same "Begin Mission →" cyan-outlined pill button, same 4 floating stat cards over the image (4,812 Debris Detected / 14.8 km² Area Surveyed / 93.4% AI Confidence / 42 Missions Completed), same "Scroll to explore" + chevron footer element, and the same abstract glowing particle/wave graphic in the bottom-left corner. Match the exact dark navy background, cyan accent color, font pairing (serif headline / sans-serif body), spacing, and card styling shown in the image.

Below this hero section on the same landing page, add a features strip in a glass card: 5 columns (icon + title + short description): "Advanced Sonar Imaging – High-resolution side-scan sonar data capture," "AI-Powered Detection – Deep learning models trained for marine debris," "Accurate Classification – Multi-class debris classification system," "False Positive Reduction – Intelligent filtering for cleaner results," "Marine Ecosystem Protection – Data-driven insights for a cleaner ocean." To the right, tagline "Every scan tells a story. Every detection makes a difference." with a "Start Your Mission →" cyan button.

Now, using the exact same design system (dark navy #050B14→#0A1420 gradient background, cyan #22D3EE accent, glassmorphism cards with thin cyan borders, Inter for UI text, Playfair Display for large headings, thin-line glowing cyan icons in circular badges, same logo/sidebar/topbar pattern), build the REST of the app as additional pages/routes, fully navigable from the landing page's "Launch App" button and a persistent sidebar on all internal pages:

ROUTES: /dashboard, /upload, /analysis, /analysis/:id, /map, /history, /reports, /settings

Do not pause to ask clarifying questions — build all of it in this one pass, using mock/hardcoded data only (no backend, no real auth, no external image URLs — use gradients/SVG visuals instead of photos except on the landing page).

=== SHARED SHELL (all routes except landing) ===

Sidebar (fixed, ~250px, dark): logo block top; nav icons for Dashboard, Upload Scan, Analysis, Map Tracker, History, Reports, Settings (active = cyan highlight/left border); bottom-fixed "System Status" card (green dot, "All systems operational," cyan sparkline).

Topbar: cyan step number + caps page title + subtitle (left); notification bell w/ badge count, circular avatar, chevron (right).

Build Sidebar and Topbar as single reusable components — do not duplicate per page.

=== /dashboard ===

4 summary stat tiles (same metrics as landing hero). Recent scans mini-table (Scan ID, Location, Date, Top Class, Confidence). "Upload New Scan" CTA card. Small donut chart of debris-type breakdown.

=== /upload ===

Title "UPLOAD SONAR SCAN." Left: dashed drag-drop zone, upload icon in concentric circles, "Drag & Drop your sonar image here / or browse files," format tags (PNG/JPG/TIFF/GeoTIFF), "Browse Files" button, "Your data is secure and encrypted" note. Right: "MISSION PARAMETERS" form — Location, Survey Depth (m), Capture Date & Time, Water Conditions (dropdown), Sonar Frequency (dropdown), Mission Notes (textarea). Footer: "Abort Mission" (outline) + "Begin Ocean Analysis →" (solid cyan) buttons.

=== /analysis ===

Title "PROCESSING PIPELINE." Horizontal 6-node stepper (Uploading, Preprocessing, AI Analysis, Classification, False Positive, Completed) — first two done/green, third active/glowing, rest pending/gray. Below: abstract glowing cyan wave/particle-network SVG visual. Center: large "68%" counter, "Detecting patterns and objects...", "This may take a few moments."

=== /analysis/:id (detection detail) ===

"← Back to Analysis" link. Left: large zoomable sonar image panel (amber particle scan on black) with zoom controls. Right info panel: Object Type + icon, Classification, Confidence Score (91%, green "High", cyan bar), Estimated Size, Estimated Length, Location (lat/long), Timestamp, Depth, Object Detection Probability (bar), Notes. Footer buttons: Download Crop, Add to Report, Share Result.

=== /map ===

Title "MAP TRACKER." Left: dark coastal map with zoom/locate controls, colored pins (red=plastic, purple=ghost net, gold=metal, teal=fishing debris) linked by dashed cyan route with waypoint dots. Right: "Detections (12)" card list (icon, type, confidence %, date, depth) + "View All Detections →". Bottom filter bar: All Types / All Missions / All Time dropdowns + Confidence Threshold slider (70%).

=== /history ===

Title "SCAN HISTORY." Search bar + filters (All Uploads / All Depths / All Zones) + filter icon. Table: Scan ID, Location, Date & Time, Depth, Top Class (icon), Confidence (green %), Objects, Actions (view/share/delete). 8 mock rows, varied coastal locations. Pagination footer "Showing 1 to 8 of 47 scans."

=== /reports ===

Title "REPORT & EXPORT." Left: light-card report preview — DEEPSCAN header, "Ocean Debris Analysis Report," Report ID, Date/Time, 2-image scan strip, legend of debris types w/ confidence %, Summary block (Total Detections, Top Class, Avg Confidence, Survey Area), donut chart. Right: "Export Options" — Download PDF, Download JPEG, Share Report cards, each with file icon.

=== /settings ===

Title "SETTINGS." Cards: Profile (avatar, name, email, edit), Notification Preferences (toggles), Detection Preferences (confidence slider, frequency dropdown), Account & Security (password, 2FA toggle), Danger Zone (export data, delete account — red outline).

=== BUILD RULES ===

- Shared Tailwind theme (colors/radius/fonts) defined once, reused everywhere.

- Complete all routes with working sidebar navigation from a single "Launch App" entry point, in this one generation, before stopping.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://naadii.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/778bdfdd-31ac-475e-a214-dfac3f525a37).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
