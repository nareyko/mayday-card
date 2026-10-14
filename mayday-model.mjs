/**
 * Pure domain model for the MAYDAY / PAN-PAN / DSC Distress Cockpit Card Generator.
 * Follows ITU Radio Regulations (WRC-07 / Appendix 18 & Chapter VII), IMO GMDSS / SOLAS Ch. IV,
 * and RYA SRC / ISSA VHF operational procedures.
 */

export const NATO_LETTERS = {
  A: { word: "Alfa", phonetic: "AL-FAH" },
  B: { word: "Bravo", phonetic: "BRAH-VOH" },
  C: { word: "Charlie", phonetic: "CHAR-LEE" },
  D: { word: "Delta", phonetic: "DELL-TAH" },
  E: { word: "Echo", phonetic: "ECK-OH" },
  F: { word: "Foxtrot", phonetic: "FOKS-TROT" },
  G: { word: "Golf", phonetic: "GOLF" },
  H: { word: "Hotel", phonetic: "HOH-TEL" },
  I: { word: "India", phonetic: "IN-DEE-AH" },
  J: { word: "Juliett", phonetic: "JEW-LEE-ETT" },
  K: { word: "Kilo", phonetic: "KEY-LOH" },
  L: { word: "Lima", phonetic: "LEE-MAH" },
  M: { word: "Mike", phonetic: "MIKE" },
  N: { word: "November", phonetic: "NO-VEM-BER" },
  O: { word: "Oscar", phonetic: "OSS-CAH" },
  P: { word: "Papa", phonetic: "PAH-PAH" },
  Q: { word: "Quebec", phonetic: "KEH-BECK" },
  R: { word: "Romeo", phonetic: "ROW-ME-OH" },
  S: { word: "Sierra", phonetic: "SEE-AIR-RAH" },
  T: { word: "Tango", phonetic: "TANG-GO" },
  U: { word: "Uniform", phonetic: "YOU-NEE-FORM" },
  V: { word: "Victor", phonetic: "VIK-TAH" },
  W: { word: "Whiskey", phonetic: "WISS-KEY" },
  X: { word: "X-ray", phonetic: "ECKS-RAY" },
  Y: { word: "Yankee", phonetic: "YANG-KEY" },
  Z: { word: "Zulu", phonetic: "ZOO-LOO" },
};

export const ITU_DIGITS = {
  "0": { word: "Zero", phonetic: "ZEE-RO" },
  "1": { word: "One", phonetic: "WUN" },
  "2": { word: "Two", phonetic: "TOO" },
  "3": { word: "Three", phonetic: "TREE" },
  "4": { word: "Four", phonetic: "FOW-ER" },
  "5": { word: "Five", phonetic: "FIFE" },
  "6": { word: "Six", phonetic: "SIX" },
  "7": { word: "Seven", phonetic: "SEV-EN" },
  "8": { word: "Eight", phonetic: "AIT" },
  "9": { word: "Nine", phonetic: "NIN-ER" },
};

/**
 * Common ITU Maritime Identification Digits (MID) for European, Nordic, Mediterranean & Global yachts.
 */
export const ITU_MID_COUNTRIES = {
  "205": { code: "BE", name: "Belgium" },
  "211": { code: "DE", name: "Germany" },
  "218": { code: "DE", name: "Germany" },
  "219": { code: "DK", name: "Denmark" },
  "220": { code: "DK", name: "Denmark" },
  "224": { code: "ES", name: "Spain" },
  "225": { code: "ES", name: "Spain" },
  "226": { code: "FR", name: "France" },
  "227": { code: "FR", name: "France" },
  "228": { code: "FR", name: "France" },
  "230": { code: "FI", name: "Finland" },
  "232": { code: "GB", name: "United Kingdom" },
  "233": { code: "GB", name: "United Kingdom" },
  "234": { code: "GB", name: "United Kingdom" },
  "235": { code: "GB", name: "United Kingdom" },
  "237": { code: "GR", name: "Greece" },
  "238": { code: "HR", name: "Croatia" },
  "239": { code: "GR", name: "Greece" },
  "240": { code: "GR", name: "Greece" },
  "241": { code: "GR", name: "Greece" },
  "244": { code: "NL", name: "Netherlands" },
  "245": { code: "NL", name: "Netherlands" },
  "246": { code: "NL", name: "Netherlands" },
  "247": { code: "IT", name: "Italy" },
  "248": { code: "MT", name: "Malta" },
  "249": { code: "MT", name: "Malta" },
  "250": { code: "IE", name: "Ireland" },
  "255": { code: "PT", name: "Portugal" },
  "256": { code: "MT", name: "Malta" },
  "257": { code: "NO", name: "Norway" },
  "258": { code: "NO", name: "Norway" },
  "259": { code: "NO", name: "Norway" },
  "261": { code: "PL", name: "Poland" },
  "263": { code: "PT", name: "Portugal" },
  "265": { code: "SE", name: "Sweden" },
  "266": { code: "SE", name: "Sweden" },
  "269": { code: "CH", name: "Switzerland" },
  "271": { code: "TR", name: "Turkey" },
  "272": { code: "UA", name: "Ukraine" },
  "273": { code: "RU", name: "Russia" },
  "275": { code: "LV", name: "Latvia" },
  "276": { code: "EE", name: "Estonia" },
  "277": { code: "LT", name: "Lithuania" },
  "278": { code: "SI", name: "Slovenia" },
  "303": { code: "US", name: "USA" },
  "316": { code: "CA", name: "Canada" },
  "319": { code: "KY", name: "Cayman Islands" },
  "338": { code: "US", name: "USA" },
  "366": { code: "US", name: "USA" },
  "367": { code: "US", name: "USA" },
  "368": { code: "US", name: "USA" },
  "369": { code: "US", name: "USA" },
  "378": { code: "VG", name: "British Virgin Islands" },
  "428": { code: "IL", name: "Israel" },
  "470": { code: "AE", name: "UAE" },
  "503": { code: "AU", name: "Australia" },
  "512": { code: "NZ", name: "New Zealand" },
};

export const DEFAULT_CARD_STATE = Object.freeze({
  vesselName: "SY AURORA",
  callSign: "SD2491",
  mmsi: "265418920",
  vesselTypeAndRig: "Sloop · 12.2 m (40 ft)",
  hullAndCanvas: "White hull, navy sprayhood & bimini",
  maxPob: "6",
  epirbHex: "9D0E42A18C001F1",
  homePort: "Stockholm",
  dualLangScript: true,
});

/**
 * Expand a call sign or vessel name into ITU/NATO phonetic tokens.
 * Transliterates common Nordic/German diacritics (Å/Ä->A, Ö/Ø->O, Ü->U, ß->SS) before lookup.
 * @param {string} raw
 * @returns {Array<{ char: string, word: string, phonetic: string }>}
 */
export function spellPhoneticTokens(raw) {
  const normalized = String(raw || "")
    .trim()
    .toUpperCase()
    .replace(/ß/g, "SS")
    .replace(/[ÅÄÀÁÂÃÆ]/g, "A")
    .replace(/[ÖØÒÓÔÕ]/g, "O")
    .replace(/[ÜÙÚÛ]/g, "U")
    .replace(/[ÈÉÊË]/g, "E")
    .replace(/[ÌÍÎÏ]/g, "I")
    .replace(/Ç/g, "C")
    .replace(/Ñ/g, "N");

  const tokens = [];
  for (let i = 0; i < normalized.length; i += 1) {
    const ch = normalized[i];
    if (NATO_LETTERS[ch]) {
      tokens.push({ char: ch, word: NATO_LETTERS[ch].word, phonetic: NATO_LETTERS[ch].phonetic });
    } else if (ITU_DIGITS[ch]) {
      tokens.push({ char: ch, word: ITU_DIGITS[ch].word, phonetic: ITU_DIGITS[ch].phonetic });
    } else if (ch === "-" || ch === "/") {
      tokens.push({ char: ch, word: "Dash", phonetic: "DASH" });
    } else if (ch === " " && tokens.length > 0 && tokens[tokens.length - 1].char !== " ") {
      tokens.push({ char: " ", word: "·", phonetic: " " });
    }
  }
  return tokens;
}

/**
 * Format phonetic tokens into a compact cockpit-readable string: "Sierra – Delta – Two – Four – Nine – One".
 * @param {string} raw
 * @returns {string}
 */
export function spellPhoneticLine(raw) {
  const tokens = spellPhoneticTokens(raw);
  if (tokens.length === 0) return "—";
  const parts = [];
  let currentGroup = [];
  for (const token of tokens) {
    if (token.char === " ") {
      if (currentGroup.length > 0) {
        parts.push(currentGroup.join(" – "));
        currentGroup = [];
      }
    } else {
      currentGroup.push(token.word);
    }
  }
  if (currentGroup.length > 0) {
    parts.push(currentGroup.join(" – "));
  }
  return parts.join("   /   ");
}

/**
 * Clean and format a 9-digit MMSI into 3x3 blocks ("265 418 920") for high-stress voice reading.
 * @param {string} raw
 * @returns {string}
 */
export function formatMmsi(raw) {
  const digits = String(raw || "").replace(/\D/g, "").slice(0, 9);
  if (digits.length === 0) return "___ ___ ___";
  const g1 = digits.slice(0, 3);
  const g2 = digits.slice(3, 6);
  const g3 = digits.slice(6, 9);
  return [g1, g2, g3].filter(Boolean).join(" ");
}

/**
 * Spell MMSI digits aloud using ITU pronunciation ("Two Six Five · Four One Eight · Nine Two Zero").
 * @param {string} raw
 * @returns {string}
 */
export function spellMmsiSpoken(raw) {
  const digits = String(raw || "").replace(/\D/g, "").slice(0, 9);
  if (digits.length === 0) return "—";
  const words = [...digits].map((d) => ITU_DIGITS[d]?.word || d);
  const g1 = words.slice(0, 3).join(" ");
  const g2 = words.slice(3, 6).join(" ");
  const g3 = words.slice(6, 9).join(" ");
  return [g1, g2, g3].filter(Boolean).join("  ·  ");
}

/**
 * Validate a 9-digit MMSI and extract its ITU MID country if recognized.
 * Standard ship station MMSIs start with MID in 200..799; handheld VHF DSC starts with 8 + MID;
 * coast stations start with 00 + MID.
 * @param {string} raw
 * @returns {{ valid: boolean, kind: "ship" | "handheld" | "coast" | "empty" | "invalid", digits: string, formatted: string, mid: string | null, country: { code: string, name: string } | null }}
 */
export function inspectMmsi(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.length === 0) {
    return { valid: true, kind: "empty", digits: "", formatted: "___ ___ ___", mid: null, country: null };
  }
  if (digits.length !== 9) {
    return {
      valid: false,
      kind: "invalid",
      digits,
      formatted: formatMmsi(digits),
      mid: null,
      country: null,
    };
  }

  let kind = "invalid";
  let mid = null;
  const first = digits[0];
  if (first >= "2" && first <= "7") {
    kind = "ship";
    mid = digits.slice(0, 3);
  } else if (first === "8" && digits[1] >= "2" && digits[1] <= "7") {
    kind = "handheld";
    mid = digits.slice(1, 4);
  } else if (digits.startsWith("00") && digits[2] >= "2" && digits[2] <= "7") {
    kind = "coast";
    mid = digits.slice(2, 5);
  }

  if (kind === "invalid") {
    return {
      valid: false,
      kind: "invalid",
      digits,
      formatted: formatMmsi(digits),
      mid: null,
      country: null,
    };
  }

  const country = mid && ITU_MID_COUNTRIES[mid] ? ITU_MID_COUNTRIES[mid] : null;
  return {
    valid: true,
    kind,
    digits,
    formatted: formatMmsi(digits),
    mid,
    country,
  };
}

/**
 * Validate an ITU Call Sign (3..8 alphanumeric characters, e.g. SD2491, 2ABC9, DJ4512).
 * @param {string} raw
 * @returns {{ valid: boolean, normalized: string }}
 */
export function inspectCallSign(raw) {
  const normalized = String(raw || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
  if (normalized.length === 0) return { valid: true, normalized: "" };
  const valid = /^[A-Z0-9-]{3,9}$/.test(normalized);
  return { valid, normalized };
}

/**
 * Validate a 406 MHz Cospas-Sarsat EPIRB / PLB 15-Hex ID (or allow empty / custom notes).
 * @param {string} raw
 * @returns {{ valid: boolean, normalized: string }}
 */
export function inspectEpirbHex(raw) {
  const normalized = String(raw || "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "");
  if (normalized.length === 0) return { valid: true, normalized: "" };
  const valid = /^[0-9A-F]{15}$/.test(normalized);
  return { valid, normalized };
}

/**
 * Repeat a vessel name 3 times for the MAYDAY / PAN-PAN call header.
 * @param {string} vesselName
 * @returns {string}
 */
export function repeatThreeTimes(vesselName) {
  const clean = String(vesselName || "").trim().toUpperCase() || "_______________";
  return `${clean} · ${clean} · ${clean}`;
}

/**
 * Serialize card state into a compact URL hash (#v=...&cs=...&mmsi=...) so skippers can bookmark
 * or share their boat's distress card without sending data to any server.
 * @param {Partial<typeof DEFAULT_CARD_STATE>} state
 * @param {string} [lang]
 * @returns {string}
 */
export function encodeCardHash(state, lang = "en") {
  const params = new URLSearchParams();
  if (lang && lang !== "en") params.set("lang", lang);
  if (state.vesselName != null) params.set("v", String(state.vesselName).trim());
  if (state.callSign != null) params.set("cs", String(state.callSign).trim().toUpperCase());
  if (state.mmsi != null) params.set("mmsi", String(state.mmsi).replace(/\D/g, "").slice(0, 9));
  if (state.vesselTypeAndRig != null) params.set("rig", String(state.vesselTypeAndRig).trim());
  if (state.hullAndCanvas != null) params.set("hull", String(state.hullAndCanvas).trim());
  if (state.maxPob != null) params.set("pob", String(state.maxPob).trim());
  if (state.epirbHex != null) params.set("epirb", String(state.epirbHex).trim().toUpperCase());
  if (state.homePort != null) params.set("port", String(state.homePort).trim());
  if (state.dualLangScript === false) params.set("dual", "0");
  return `#${params.toString()}`;
}

/**
 * Parse a URL hash back into a normalized card state object.
 * @param {string} hash
 * @returns {{ state: typeof DEFAULT_CARD_STATE, lang: string | null }}
 */
export function decodeCardHash(hash) {
  const raw = String(hash || "").replace(/^#/, "");
  const params = new URLSearchParams(raw);
  const hasAny =
    params.has("v") ||
    params.has("cs") ||
    params.has("mmsi") ||
    params.has("rig") ||
    params.has("hull") ||
    params.has("pob") ||
    params.has("epirb") ||
    params.has("port");

  if (!hasAny) {
    return {
      state: { ...DEFAULT_CARD_STATE },
      lang: params.get("lang") || null,
    };
  }

  return {
    state: {
      vesselName: params.get("v") ?? "",
      callSign: params.get("cs") ?? "",
      mmsi: params.get("mmsi") ?? "",
      vesselTypeAndRig: params.get("rig") ?? "",
      hullAndCanvas: params.get("hull") ?? "",
      maxPob: params.get("pob") ?? "",
      epirbHex: params.get("epirb") ?? "",
      homePort: params.get("port") ?? "",
      dualLangScript: params.get("dual") !== "0",
    },
    lang: params.get("lang") || null,
  };
}

/**
 * Build the canonical FairHelm Free VHF Simulator URL for a given locale.
 * @param {string} lang
 * @returns {string}
 */
export function fairhelmVhfUrl(lang = "en") {
  const supported = ["en", "de", "pl", "ru", "es", "sv", "uk", "ar", "zh", "he"];
  const code = supported.includes(lang) ? lang : "en";
  return `https://fairhelm.com/${code}/free-vhf/`;
}

/**
 * Build the canonical FairHelm Mayday Card page URL for a given locale.
 * @param {string} lang
 * @returns {string}
 */
export function fairhelmMaydayCanonicalUrl(lang = "en") {
  const supported = ["en", "de", "pl", "ru", "es", "sv", "uk", "ar", "zh", "he"];
  const code = supported.includes(lang) ? lang : "en";
  return `https://fairhelm.com/${code}/free-vhf/mayday-card/`;
}
