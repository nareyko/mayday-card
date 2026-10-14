import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_CARD_STATE,
  decodeCardHash,
  encodeCardHash,
  fairhelmMaydayCanonicalUrl,
  fairhelmVhfUrl,
  formatMmsi,
  inspectCallSign,
  inspectEpirbHex,
  inspectMmsi,
  repeatThreeTimes,
  spellMmsiSpoken,
  spellPhoneticLine,
  spellPhoneticTokens,
} from "./mayday-model.mjs";
import { encodeQrMatrix, renderQrSvg } from "./qr-svg.mjs";
import { copyFor, LOCALES } from "./ui-copy.mjs";

test("spellPhoneticTokens and spellPhoneticLine expand call signs and vessel names", () => {
  const tokens = spellPhoneticTokens("SD2491");
  assert.equal(tokens.length, 6);
  assert.deepEqual(
    tokens.map((t) => t.word),
    ["Sierra", "Delta", "Two", "Four", "Nine", "One"],
  );
  assert.equal(spellPhoneticLine("SD2491"), "Sierra – Delta – Two – Four – Nine – One");
  assert.equal(
    spellPhoneticLine("SY Åland"),
    "Sierra – Yankee   /   Alfa – Lima – Alfa – November – Delta",
  );
  assert.equal(spellPhoneticLine(""), "—");
});

test("formatMmsi and spellMmsiSpoken format 9-digit MMSI into 3x3 blocks", () => {
  assert.equal(formatMmsi("265418920"), "265 418 920");
  assert.equal(formatMmsi("265-418-920"), "265 418 920");
  assert.equal(formatMmsi(""), "___ ___ ___");
  assert.equal(
    spellMmsiSpoken("265418920"),
    "Two Six Five  ·  Four One Eight  ·  Nine Two Zero",
  );
});

test("inspectMmsi validates ship, handheld, and coast MMSIs and resolves ITU MID country", () => {
  const swedenShip = inspectMmsi("265418920");
  assert.equal(swedenShip.valid, true);
  assert.equal(swedenShip.kind, "ship");
  assert.equal(swedenShip.mid, "265");
  assert.deepEqual(swedenShip.country, { code: "SE", name: "Sweden" });

  const germanyShip = inspectMmsi("211987654");
  assert.equal(germanyShip.valid, true);
  assert.equal(germanyShip.country?.code, "DE");

  const ukHandheld = inspectMmsi("823512345");
  assert.equal(ukHandheld.valid, true);
  assert.equal(ukHandheld.kind, "handheld");
  assert.equal(ukHandheld.country?.code, "GB");

  const invalidShort = inspectMmsi("26541");
  assert.equal(invalidShort.valid, false);
  assert.equal(invalidShort.kind, "invalid");

  const invalidPrefix = inspectMmsi("123456789");
  assert.equal(invalidPrefix.valid, false);
});

test("inspectCallSign and inspectEpirbHex validate maritime identifiers", () => {
  assert.deepEqual(inspectCallSign(" sd 2491 "), { valid: true, normalized: "SD2491" });
  assert.equal(inspectCallSign("A").valid, false);

  assert.deepEqual(inspectEpirbHex("9d0e-42a1-8c00-1f1"), {
    valid: true,
    normalized: "9D0E42A18C001F1",
  });
  assert.equal(inspectEpirbHex("NOT_HEX_15_CHAR").valid, false);
});

test("repeatThreeTimes formats vessel name 3x for ITU distress calls", () => {
  assert.equal(repeatThreeTimes("sy aurora"), "SY AURORA · SY AURORA · SY AURORA");
  assert.equal(repeatThreeTimes(""), "_______________ · _______________ · _______________");
});

test("encodeCardHash and decodeCardHash round-trip vessel state without data loss", () => {
  const custom = {
    ...DEFAULT_CARD_STATE,
    vesselName: "SY BALTIC WIND",
    callSign: "DJ4512",
    mmsi: "211456789",
    homePort: "Kiel",
  };
  const hash = encodeCardHash(custom, "de");
  const decoded = decodeCardHash(hash);
  assert.equal(decoded.lang, "de");
  assert.equal(decoded.state.vesselName, "SY BALTIC WIND");
  assert.equal(decoded.state.callSign, "DJ4512");
  assert.equal(decoded.state.mmsi, "211456789");
  assert.equal(decoded.state.homePort, "Kiel");
});

test("encodeQrMatrix and renderQrSvg produce deterministic valid ISO/IEC 18004 QR SVG for FairHelm URLs", () => {
  for (const lang of LOCALES) {
    const url = fairhelmVhfUrl(lang);
    const matrix = encodeQrMatrix(url);
    assert.ok(matrix.size >= 25 && matrix.size <= 41);
    // Finder pattern top-left 7x7 outer corners must be dark
    assert.equal(matrix.modules[0][0], 1);
    assert.equal(matrix.modules[0][6], 1);
    assert.equal(matrix.modules[6][0], 1);
    assert.equal(matrix.modules[6][6], 1);
    assert.equal(matrix.modules[3][3], 1);

    const svg = renderQrSvg(url, { label: url });
    assert.ok(svg.startsWith("<svg"));
    assert.ok(svg.includes('shape-rendering="crispEdges"'));
    assert.ok(svg.endsWith("</svg>"));
  }
});

test("ui-copy provides complete translations for all 10 FairHelm locales", () => {
  assert.equal(LOCALES.length, 10);
  for (const lang of LOCALES) {
    const pack = copyFor(lang);
    assert.ok(pack.title.length > 5, `missing title for ${lang}`);
    assert.ok(pack.maydayBadge.includes("MAYDAY"), `missing MAYDAY badge for ${lang}`);
    assert.ok(pack.panpanBadge.includes("PAN-PAN"), `missing PAN-PAN badge for ${lang}`);
    assert.ok(pack.qrCtaBody.includes(`fairhelm.com/${lang}/free-vhf/`), `QR CTA URL mismatch for ${lang}`);
    assert.equal(
      fairhelmMaydayCanonicalUrl(lang),
      `https://fairhelm.com/${lang}/free-vhf/mayday-card/`,
    );
  }
});
