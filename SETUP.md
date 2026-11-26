# Yasmeen Ka Dastarkhan website update

## Files
- `index.html`: website.
- `logo.png`: brand logo.
- `images/`: optional folder for your own dish photographs.
- `YKD_Website_Sheet.xlsx`: master workbook to upload/convert to Google Sheets.
- `Code.gs`: Apps Script backend (same order/booking data flow).

## Important: reconnect the existing Apps Script URL
The original ZIP supplied for review had an empty API setting. In `index.html`, find:

```js
const API="PASTE_YOUR_EXISTING_APPS_SCRIPT_WEB_APP_URL_HERE";
```

Replace the text inside the quotes with your existing deployed Apps Script **Web app URL** (the URL ending in `/exec`). Do not use the deployment ID by itself. Keep the URL private; do not post it publicly. If you already have a working live URL, reuse that exact URL.

The Apps Script backend is not intentionally changed by this website update. Do not redeploy it unless you separately change `Code.gs`.

## Upload the workbook
Upload `YKD_Website_Sheet.xlsx` to Google Drive, open it with Google Sheets, and use it as the same spreadsheet connected to your Apps Script project. If you already have a live Google Sheet with new orders, do not replace it blindly: first copy the updated `Menu` rows and updated `Settings`/`Terms` values into the existing live sheet, preserving `Orders` and `Bookings`.

## Adding menu items, changing prices and adding photos
Edit the `Menu` tab. Add one row per dish/serving option. Required columns are Category, Item, Unit, Price (USD), Price note, Available, Note and Photo. Set Available to `no` to hide an item.

For photos, paste a publicly viewable image URL into the Photo column. Public Google Drive file links are converted to a display URL by the website; set Drive sharing to **Anyone with the link – Viewer**. Alternatively, put the image file in an `images` folder beside `index.html` and enter its filename, e.g. `chicken-biryani.jpg`. Use photos you own or have permission to use.

The website fetches menu data from Apps Script on page load. After changing the sheet, refresh the website.

## Calendar
The calendar reads the `Calendar` tab. Status values: `Available`, `Limited`, `Booked`, `Off`, `Tentative`. The website requires at least 7 days' notice, so past dates and dates within the next 7 days cannot be selected even if the sheet says Available.

## Deployment
Upload the updated `index.html`, `logo.png`, and optional `images/` folder to your GitHub repository, replacing the old website files. Do not replace your Apps Script URL with the placeholder; insert your existing `/exec` URL first.
