import express from "express";
import fetch from "node-fetch";
import { writeFileSync } from "fs";
import { default as makeWASocket, useSingleFileAuthState } from "@whiskeysockets/baileys";
import path from "path";
import { fileURLToPath } from "url";

const { state, saveState } = useSingleFileAuthState("./auth_info.json");
const sock = makeWASocket({
  auth: state,
  printQRInTerminal: true,
});
sock.ev.on("creds.update", saveState);

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));

app.get("/dp", async (req, res) => {
  const number = req.query.number;
  if (!number) return res.json({ success: false, error: "Number required" });

  const jid = number + "@s.whatsapp.net";

  try {
    const url = await sock.profilePictureUrl(jid, "image");
    res.json({ success: true, url });
  } catch (e) {
    res.json({ success: false, error: "DP not available or number not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
