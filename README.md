# MAYDAY / PAN-PAN / DSC Distress Cockpit Card Generator (A4 Lamination)

Open-source, zero-dependency, 100% client-side generator for a **VHF Channel 16 MAYDAY, PAN-PAN & DSC Distress Cockpit Card**.

**Card version: 2026-11-26.** The card is a cockpit memory aid, not an official ITU or IMO document. Replace a printed card that carries no version date.

- **Interactive Web App & Practice Simulator:** [**fairhelm.com/en/free-vhf/mayday-card/**](https://fairhelm.com/en/free-vhf/mayday-card/)
- **Free VHF Listening Practice:** [**fairhelm.com/en/free-vhf/**](https://fairhelm.com/en/free-vhf/)
- **GitHub Pages Mirror:** [**nareyko.github.io/mayday-card/**](https://nareyko.github.io/mayday-card/)

---

## FairHelm Open-Source Seamanship Suite

Sister tool: [**sea-lights**](https://github.com/nareyko/sea-lights) — interactive OpenSeaMap / Shom light sectors chart (MIT), also at [fairhelm.com/en/yachts/tools/sea-lights/](https://fairhelm.com/en/yachts/tools/sea-lights/) and Google Play `com.fairhelm.sealights`.


## Open-data reuse

Educational reuse of the French SECMAR / CROSS open dataset
([Opérations coordonnées par les CROSS](https://www.data.gouv.fr/datasets/operations-coordonnees-par-les-cross))
and the SNSM public alert procedure. Canon URL:
[fairhelm.com/en/free-vhf/mayday-card/](https://fairhelm.com/en/free-vhf/mayday-card/).
data.gouv.fr Réutilisation card: pending owner publish (MGP-W2-10).

## Why Every Yacht & Charter Crew Needs This Card at the Chart Table

During a real offshore or coastal emergency (water ingress, fire, man overboard, dismasting), the person closest to the VHF radio is often **not** the skipper — it may be a crew member, partner, or guest under severe stress.

This generator creates a **single-sheet A4 cockpit reference card** designed to be laminated and mounted right next to the VHF DSC transceiver:

1. **Automatic NATO / ITU Phonetic Expansion:** Enter your Call Sign (e.g. `SD2491`) and Vessel Name (`SY AURORA`) — the card prints the exact spoken phonetic words (`Sierra – Delta – Two – Four – Nine – One`) so anyone on board can read them aloud without hesitation.
2. **9-Digit MMSI 3×3 Formatting & ITU MID Country Verification:** Formats your MMSI into readable triples (`265 418 920`) with ITU spoken pronunciation (`Two Six Five · Four One Eight · Nine Two Zero`) and verifies the Maritime Identification Digits (MID) flag state.
3. **Distress and urgency procedures on one sheet:**
   - **Red Border — `MAYDAY` (Grave & Imminent Danger):** Step-by-step DSC `[DIST / DISTRESS]` 5-second activation + Channel 16 (25W) spoken script + whiteboard/grease-pencil coordinate box (`LAT / LON`).
   - **Amber Border — `PAN-PAN` (Urgency):** Engine/steering failure in clear water, medical advice (`MEDICO`).
   - **False DSC Distress Alert Cancellation:** steps on the radio, then the voice message on Channel 16, ending with OUT. Sources for the steps and the message: [ITU Resolution 349 (Rev.WRC-23)](https://www.itu.int/en/ITU-R/terrestrial/fmd/Documents/WRC_23_Resolutions/E/RES_349(REV.WRC-23)-E.pdf), Annex, section 1, and Radio Regulations (2024) No. 32.53E. OUT closes the message as in the FairHelm VHF course; the two ITU texts do not set a closing word.
   - **Full A–Z NATO Phonetic Alphabet, 0–9 Marine Digits & Distress Traffic Keywords** (`SEELONCE MAYDAY`, `MAYDAY RELAY`, `SEELONCE FEENEE`).
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
