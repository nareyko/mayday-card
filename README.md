# MAYDAY / PAN-PAN / DSC Distress Cockpit Card Generator (A4 Lamination)

Open-source, zero-dependency, 100% client-side generator for an **ITU Radio Regulations (WRC-07) & IMO GMDSS (SOLAS Chapter IV)** compliant **VHF Channel 16 MAYDAY, PAN-PAN & DSC Distress Cockpit Card**.

- **Interactive Web App & Practice Simulator:** [**fairhelm.com/en/free-vhf/mayday-card/**](https://fairhelm.com/en/free-vhf/mayday-card/)
- **Free Interactive VHF & DSC Voice Simulator:** [**fairhelm.com/en/free-vhf/**](https://fairhelm.com/en/free-vhf/)
- **GitHub Pages Mirror:** [**nareyko.github.io/mayday-card/**](https://nareyko.github.io/mayday-card/)

---

## FairHelm Open-Source Seamanship Suite

Sister tool: [**sea-lights**](https://github.com/nareyko/sea-lights) — interactive OpenSeaMap / Shom light sectors chart (MIT), also at [fairhelm.com/en/yachts/tools/sea-lights/](https://fairhelm.com/en/yachts/tools/sea-lights/) and Google Play `com.fairhelm.sealights`.


## Why Every Yacht & Charter Crew Needs This Card at the Chart Table

During a real offshore or coastal emergency (water ingress, fire, man overboard, dismasting), the person closest to the VHF radio is often **not** the skipper — it may be a crew member, partner, or guest under severe stress.

This generator creates a **single-sheet A4 cockpit reference card** designed to be laminated and mounted right next to the VHF DSC transceiver:

1. **Automatic NATO / ITU Phonetic Expansion:** Enter your Call Sign (e.g. `SD2491`) and Vessel Name (`SY AURORA`) — the card prints the exact spoken phonetic words (`Sierra – Delta – Two – Four – Nine – One`) so anyone on board can read them aloud without hesitation.
2. **9-Digit MMSI 3×3 Formatting & ITU MID Country Verification:** Formats your MMSI into readable triples (`265 418 920`) with ITU spoken pronunciation (`Two Six Five · Four One Eight · Nine Two Zero`) and verifies the Maritime Identification Digits (MID) flag state.
3. **Complete ITU WRC-07 Distress & Urgency Procedures:**
   - **Red Border — `MAYDAY` (Grave & Imminent Danger):** Step-by-step DSC `[DIST / DISTRESS]` 5-second activation + Channel 16 (25W) spoken script + whiteboard/grease-pencil coordinate box (`LAT / LON`).
   - **Amber Border — `PAN-PAN` (Urgency):** Engine/steering failure in clear water, medical advice (`MEDICO`).
   - **False DSC Distress Alert Cancellation:** Exact ITU Channel 16 voice cancellation procedure.
   - **Full A–Z NATO Phonetic Alphabet, 0–9 Marine Digits & Distress Traffic Keywords** (`SEELONCE MAYDAY`, `MAYDAY RELAY`, `PRUDSCENCE`, `SEELONCE FEENEE`).
4. **10 Languages Supported:** `EN`, `DE`, `SV`, `RU`, `PL`, `ES`, `UK`, `AR`, `ZH`, `HE` (keeps international ITU English spoken phrases while localizing crew instructions).
5. **100% Privacy & Zero Dependencies:** Pure ES Modules (`mayday-model.mjs`, `qr-svg.mjs`, `ui-copy.mjs`). No vessel data ever leaves your browser. Includes an offline ISO/IEC 18004 vector SVG QR code generator linking to the [FairHelm Free VHF Simulator](https://fairhelm.com/en/free-vhf/).

---

## Running Locally & Running Tests

No build step or npm dependencies required:

```bash
# Run the unit test suite (Node.js 20+ built-in test runner)
node --test mayday-model.test.mjs

# Serve locally with any static HTTP server
python3 -m http.server 8080
```

## License

MIT © [FairHelm](https://fairhelm.com)
