// Yasmeen Ka Dastarkhan backend. Paste into Extensions > Apps Script of the Google Sheet.
// Tabs used: Menu, Specials, Calendar, Terms, Settings (read) and Orders, Bookings (written).
const OWNER = "yasmeendastarkhan@gmail.com";
const ss = () => SpreadsheetApp.getActiveSpreadsheet();
const rows = n => ss().getSheetByName(n).getDataRange().getValues().slice(1);
const day = v => v instanceof Date ? Utilities.formatDate(v, Session.getScriptTimeZone(), "yyyy-MM-dd") : String(v).trim();

function doGet() {
  const today = day(new Date());
  const menu = rows("Menu").filter(r => r[1] && String(r[5]).toLowerCase() !== "no")
    .map(r => ({ cat: r[0], name: r[1], unit: r[2], price: Number(r[3]), pnote: String(r[4]), note: String(r[6]), photo: String(r[7] || "") }));
  const specials = rows("Specials")
    .filter(r => r[0] && String(r[6]).toLowerCase() === "yes" && (!r[4] || day(r[4]) <= today) && (!r[5] || day(r[5]) >= today))
    .map(r => ({ cat: "Specials", name: r[0], note: String(r[1]), unit: r[2], price: Number(r[3]), pnote: "", photo: String(r[7] || "") }));
  const days = {};
  rows("Calendar").forEach(r => { if (r[0]) days[day(r[0])] = { s: String(r[1]), l: String(r[2]) }; });
  rows("Bookings").filter(r => String(r[1]).toLowerCase() === "confirmed")
    .forEach(r => String(r[3]).split(",").forEach(d => { if (d.trim()) days[day(d)] = { s: "Booked", l: "" }; }));
  const settings = {};
  rows("Settings").forEach(r => { if (r[0]) settings[r[0]] = String(r[1]); });
  const terms = rows("Terms").filter(r => r[1]).map(r => ({ h: String(r[0]), t: String(r[1]) }));
  return ContentService.createTextOutput(JSON.stringify({ menu: specials.concat(menu), days, settings, terms }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const p = JSON.parse(e.postData.contents), now = new Date();
  if (p.type === "order") {
    ss().getSheetByName("Orders").appendRow([now, "New", p.name, p.phone, p.email, p.date, p.mode, p.address, p.items, p.notes, p.total]);
  } else if (p.type === "booking") {
    ss().getSheetByName("Bookings").appendRow([now, "Pending", p.name, p.dates, p.event, p.service, p.guests, p.place, p.phone, p.email, p.notes, p.sign, p.agreed_at]);
  } else return ContentService.createTextOutput("ignored");
  MailApp.sendEmail(OWNER, "New " + p.type + " from " + p.name,
    Object.entries(p).filter(([k]) => k !== "contract").map(([k, v]) => k + ": " + v).join("\n"));
  return ContentService.createTextOutput("ok");
}
