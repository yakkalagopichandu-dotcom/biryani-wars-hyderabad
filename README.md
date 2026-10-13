# 🥘 Biryani Wars Hyderabad

> **Vibe Coding Lounge • Biryani Challenge**  
> An interactive decision micro-app that settles the eternal group argument of where to get the best Hyderabadi biryani right now using live squad voting, distance radius filters, secret food spots AI doesn't know about, and authentic Dakhni street slang alerts.

![Hyderabadi Dum Biryani](hero_biryani.jpg)

---

## 🌟 Key Features

1. **Live Group Voting & Deadlock Solver**:
   - Upvote (`+1`) and Double Masala Super-Vote (`+3`) with live real-time score updates.
   - **Simulated Squad Banter**: Live chatter feed where friends (*Arshad Bhai, Zubair, Sneha, Kashif, Farhan*) jump in with local Dakhni comments and cast votes.
   - **The Sullah Wheel (Spin The Degh)**: Canvas-animated spinning wheel with realistic deceleration, ticking sounds, and victory dhol drums to resolve any tied vote!

2. **Distance Radius & Locality Filters**:
   - Interactive slider from **1 km to 15 km** with humorous Dakhni distance mood markers (*Chappal distance* ➔ *Activa ride* ➔ *Car me AC* ➔ *Biryani ke liye jaan bhi hazir*).
   - Locality pills: *Old City & South, Tolichowki & Mehdipatnam, Banjara & Masab Tank, Gachibowli & IT Corridor, Abids & Basheerbagh*.
   - Filter tags: *🤫 Secret Spots (AI Doesn't Know)*, *👑 Legendary Titans*, *🌙 Open Post-Midnight*, *🔥 High Spice Level*.

3. **Secret List of Real Local Cult Spots**:
   - Hand-curated local gems with insider foodie advice and local warnings:
     - **Hotel Rumaan (Tolichowki)** — Midnight Kalyani & Mutton Dum with Tala Hua Gosht.
     - **Peshawar Restaurant (Malakpet)** — Tender Zafrani Mutton Dum & thick Dahi ki Chutney.
     - **Chicha's (Masab Tank)** — Nawabi wedding-style biryani & Mutton Marag.
     - **Hotel Nayaab (Madina Circle)** — Friday Zafrani Nalli Biryani & Kesar Chai.
     - **Hotel City Diamond (Mehdipatnam Pillar 23)** — Fiery red masala dum biryani (parcel portions 1.5x larger).
     - **Grand Hotel (Abids since 1935)** — 90-year-old vintage dry-spiced mutton biryani.
     - **Al-Saba (Gachibowli)** — IT coders' 1:30 AM lifesaver.
     - **Mataam Al-Arabi (Barkas)** — Authentic Arab quarter juicy lamb Fahham Mandi in floor Majlis.
     - **Mohammedia Hotel (Attapur)** — Pillar 143 chicken 65 & rich broth dum biryani.
     - **Titans**: Café Bahar (Double Masala King), Hotel Shadab, Meridian, Shah Ghouse.

4. **Hyderabadi Street Slang Text Rule Engine**:
   - Pattern-matching rule engine that converts boring developer/system error messages into hilarious local street warnings:
     - **Bad Parking**: *"🚨 ARREY BAAP RE! MAMA LOG KHADE HAI! Ustaad! Wahan gaadi lagaye toh Traffic Police Mama log seedha challan kaatte!"*
     - **Flyover Jam**: *"🛑 DIMAAG KI DAHI! FLYOVER PE JAM BAITH GAYA! Miyan! Flyover pe gaadiyan aisi phasi hui hai jaise degh me chawal!"*
     - **Degh Empty / Sold Out**: *"🥘 PATEELA KHAALI HOGAYA! DEGH SAAF! Khatam miyan! Hotel ka aakhri degh bhi bikaau hogaya!"*
     - **Duplicate Vote**: *"✋ EK BAAR VOTE DAALE NA MIYAN? UNGLI KYU KARRE? Group me heera-pheri kare toh bill poora tumse hi bharwayenge!"*
   - Includes interactive **Slang Rule Lab** with preset chips, text-to-speech voice, and clipboard copy.

5. **WhatsApp Verdict Exporter**:
   - Exports formatted verdict text with emojis, spot lore, parking alerts, and bill-split duties ready to paste into WhatsApp squads.

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser, or serve locally:

```bash
# Using Python
python -m http.server 8080

# Or using Node.js
npx serve .
```

Open `http://localhost:8080` in your browser.

---

## 🛠️ Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Design System**: Midnight Saffron Glassmorphism, Google Fonts (`Outfit`, `Plus Jakarta Sans`, `JetBrains Mono`)
- **Audio Engine**: Web Audio API (zero external asset dependencies)
- **Canvas**: Particle aroma background & 3D Sullah Wheel
