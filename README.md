# Adolph & Jenisha — Wedding Invitation

## Run locally
Install Node.js 18 or newer, then run these commands from this folder:

    npm install
    npm run dev

Open the local Vite address printed in the terminal. Keep the terminal running; the RSVP service runs alongside the website.

## Production

    npm install
    npm run build
    npm start

Open http://localhost:5000 (or set PORT on your host). The included dist folder is ready to serve. RSVP requires the Node server; a static-only host will not save replies.

## Content
Six slides: invitation, Bible verse, family invitation, combined celebration details and directions, photo carousel, RSVP and closing wishes.

Add your own JPG, PNG or WebP photos inside public/photos, then rebuild for production. No couple photos were included in the supplied archive, so the carousel currently displays decorative memory cards. Existing music is included and begins when the invitation is opened, subject to browser playback settings. Fonts use Google Fonts with local system fallbacks.

RSVP replies are saved to server/rsvps.json. Keep that file backed up and use persistent server storage. Set a private ADMIN_KEY environment variable before public hosting; it controls the existing /api/rsvps?key=... endpoint.

Directions use Google Maps venue searches; confirm map pins before sharing the invitation with guests.
