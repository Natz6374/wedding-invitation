# Adolph & Jenisha – Wedding Invitation (React + Express + Node)
1. `npm install`
2. Put the song at `public/audio/song.mp3` and couple photos (jpg/png/webp) in `public/photos/` – the carousel picks them up automatically.
3. Dev: `npm run dev` (open http://localhost:5173). Production: `npm run build && npm start` (http://localhost:5000).
RSVPs are saved to `server/rsvps.json`; view them at `/api/rsvps?key=adolph-jenisha` (set ADMIN_KEY env to change).
