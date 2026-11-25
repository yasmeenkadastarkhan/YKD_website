# Setup (about 15 minutes, free)

## 1. Make your Google Sheet
Google Drive > New > File upload > `YKD_Website_Sheet.xlsx` > open it > **File > Save as Google Sheets**.
Read the README tab. Your menu, terms, November calendar and settings are already filled in.
Delete the "Example" rows on Orders and Bookings once you have seen how they look.

Day-to-day, you only edit the sheet:
- **Menu**: change prices, add dishes, set Available to `no` to hide one.
- **Specials**: seasonal or limited dishes (Eid, Muharram, Tabaruk box). They show first on the site and expire by their dates.
- **Calendar**: one row per date: Available, Limited (label like "After 6pm"), Booked, Off, Tentative. Add rows for December onward.
- **Terms**: the booking guidelines clients must accept.
- **Settings**: banner message, menu note, calendar note.
- **Bookings**: set Status to `Confirmed` and those dates turn Booked on the site automatically.

## Photos
Upload dish photos to the repo's `images` folder, named after the dish in lowercase with dashes: `beef-samosa.jpg`, `chicken-biryani.jpg`, `gulab-jamun.jpg`. The site finds them by itself. Both sizes of a dish share one photo. If a dish has no photo yet, a hand-drawn bowl is shown. To use a different file name or a web link, type it in the Photo column of the Menu or Specials tab. Keep photos under about 300 KB (square or 4:3 crops look best).

## 2. Add the backend
In the Google Sheet: Extensions > Apps Script > delete the sample code > paste `Code.gs` > Save.
Deploy > New deployment > type **Web app** > Execute as **Me**, Who has access **Anyone** > Deploy > allow permissions.
Copy the Web App URL.

## 3. Connect the site
In `index.html`, set `const API="PASTE_URL_HERE";`.
After editing `Code.gs` later, use Deploy > Manage deployments > edit > New version, so the URL stays the same.

## 4. Publish free
GitHub: push the files to a repo > Settings > Pages > Deploy from branch `main` / root.
Cloudflare Pages: connect the repo, no build command, output directory `/`.
Keep `YKD_Website_Sheet.xlsx` out of the public repo if you prefer; the site only needs `index.html`.
