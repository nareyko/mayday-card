import {
  DEFAULT_CARD_STATE,
  decodeCardHash,
  encodeCardHash,
  fairhelmMaydayCanonicalUrl,
  fairhelmVhfUrl,
  inspectCallSign,
  inspectEpirbHex,
  inspectMmsi,
  repeatThreeTimes,
  spellMmsiSpoken,
  spellPhoneticLine,
} from "./mayday-model.mjs";
import { renderQrSvg } from "./qr-svg.mjs";
import { copyFor, LOCALES } from "./ui-copy.mjs";

const STORAGE_KEY = "fairhelm_mayday_card_v1";

const PRESETS = {
  sample: { ...DEFAULT_CARD_STATE },
  catamaran: {
    vesselName: "SV CALYPSO",
    callSign: "9A4821",
    mmsi: "238419520",
    vesselTypeAndRig: "Catamaran · 13.7 m (45 ft)",
    hullAndCanvas: "White hulls, grey bimini & solar arch",
    maxPob: "10",
    epirbHex: "9EF042B18C002A4",
    homePort: "Split",
    dualLangScript: true,
  },
  blank: {
    vesselName: "",
    callSign: "",
    mmsi: "",
    vesselTypeAndRig: "",
    hullAndCanvas: "",
    maxPob: "",
    epirbHex: "",
    homePort: "",
    dualLangScript: true,
  },
};

function detectInitialLang() {
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get("lang");
  if (queryLang && LOCALES.includes(queryLang)) return queryLang;

  const hashDecoded = decodeCardHash(window.location.hash);
  if (hashDecoded.lang && LOCALES.includes(hashDecoded.lang)) return hashDecoded.lang;

  const navLang = (navigator.language || "en").slice(0, 2).toLowerCase();
  return LOCALES.includes(navLang) ? navLang : "en";
}

function loadInitialState() {
  if (window.location.hash && window.location.hash.length > 2) {
    const { state } = decodeCardHash(window.location.hash);
    return state;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_CARD_STATE, ...parsed };
    }
  } catch {
    // Ignore storage errors in private/sandboxed frames
  }
  return { ...DEFAULT_CARD_STATE };
}

let currentLang = detectInitialLang();
let state = loadInitialState();

const el = (id) => document.getElementById(id);

function setText(id, text) {
  const node = el(id);
  if (node) node.textContent = text;
}

function syncInputsFromState() {
  el("in-vessel").value = state.vesselName;
  el("in-callsign").value = state.callSign;
  el("in-mmsi").value = state.mmsi;
  el("in-rig").value = state.vesselTypeAndRig;
  el("in-hull").value = state.hullAndCanvas;
  el("in-pob").value = state.maxPob;
  el("in-epirb").value = state.epirbHex;
  el("in-port").value = state.homePort;
  el("in-dual-lang").checked = Boolean(state.dualLangScript);
}

function readStateFromInputs() {
  state = {
    vesselName: el("in-vessel").value,
    callSign: el("in-callsign").value.toUpperCase(),
    mmsi: el("in-mmsi").value.replace(/\D/g, "").slice(0, 9),
    vesselTypeAndRig: el("in-rig").value,
    hullAndCanvas: el("in-hull").value,
    maxPob: el("in-pob").value,
    epirbHex: el("in-epirb").value.toUpperCase(),
    homePort: el("in-port").value,
    dualLangScript: el("in-dual-lang").checked,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors
  }
}

function renderLocaleCopy() {
  const copy = copyFor(currentLang);
  document.documentElement.lang = currentLang;
  document.documentElement.dir = copy.dir;

  const canonical = el("canonical-link");
  if (canonical) canonical.href = fairhelmMaydayCanonicalUrl(currentLang);

  setText("ui-kicker", copy.kicker);
  setText("ui-title", copy.title);
  setText("ui-lede", copy.lede);
  setText("ui-privacy", copy.privacyNote);
  setText("ui-form-heading", copy.formHeading);
  setText("ui-presets-label", `${copy.presetsLabel}:`);

  setText("lbl-vessel", copy.vesselNameLabel);
  el("in-vessel").placeholder = copy.vesselNamePlaceholder;

  setText("lbl-callsign", copy.callSignLabel);
  el("in-callsign").placeholder = copy.callSignPlaceholder;

  setText("lbl-mmsi", copy.mmsiLabel);
  el("in-mmsi").placeholder = copy.mmsiPlaceholder;

  setText("lbl-rig", copy.rigLabel);
  el("in-rig").placeholder = copy.rigPlaceholder;

  setText("lbl-hull", copy.hullLabel);
  el("in-hull").placeholder = copy.hullPlaceholder;

  setText("lbl-pob", copy.pobLabel);
  el("in-pob").placeholder = copy.pobPlaceholder;

  setText("lbl-epirb", copy.epirbLabel);
  el("in-epirb").placeholder = copy.epirbPlaceholder;

  setText("lbl-port", copy.portLabel);
  el("in-port").placeholder = copy.portPlaceholder;

  setText("lbl-dual-lang", copy.dualLangLabel);
  setText("btn-print", copy.printBtn);
  setText("btn-print-bottom", copy.printBtn);
  setText("btn-night", copy.nightBtn);
  setText("btn-sample", copy.resetBtn);
  setText("btn-blank", copy.clearBtn);
  setText("btn-copy-link", copy.copyLinkBtn);

  setText("sheet-header-left", copy.sheetHeaderLeft);
  setText("sheet-header-right", copy.sheetHeaderRight);
  setText("lbl-banner-vessel", copy.idBannerVessel);
  setText("lbl-banner-callsign", copy.idBannerCallSign);
  setText("lbl-banner-mmsi", copy.idBannerMmsi);
  setText("lbl-banner-specs", copy.idBannerSpecs);

  setText("out-mayday-badge", copy.maydayBadge);
  setText("out-mayday-when", copy.maydayWhen);
  setText("out-step1-title", copy.step1Title);
  setText("out-step1-body", copy.step1Body);
  setText("out-step2-title", copy.step2Title);
  setText("out-step2-body", copy.step2Body);
  setText("out-step3-title", copy.step3Title);

  setText("cue-call", copy.scriptCallHeader);
  setText("cue-this-is", copy.scriptThisIs);
  setText("cue-repeat", copy.scriptRepeatMayday);
  setText("cue-position", copy.scriptPosition);
  setText("out-pos-fill", copy.scriptPositionFill);
  setText("cue-nature", copy.scriptNature);
  setText("out-nature-examples", copy.scriptNatureExamples);
  setText("cue-assist", copy.scriptAssistance);
  setText("cue-pob", copy.scriptPobAndDesc);
  setText("cue-over", copy.scriptOver);
  setText("out-over-hint", `— ${copy.scriptOverHint}`);

  setText("out-panpan-badge", copy.panpanBadge);
  setText("out-panpan-when", copy.panpanWhen);
  setText("out-panpan-step", copy.panpanStep);

  setText("out-cancel-title", copy.cancelTitle);
  setText("out-cancel-body", copy.cancelBody);
  setText("out-nato-title", copy.natoStripTitle);
  setText("out-keywords-title", copy.keyWordsTitle);

  setText("out-qr-title", copy.qrCtaTitle);
  setText("out-qr-body", copy.qrCtaBody);

  const vhfUrl = fairhelmVhfUrl(currentLang);
  const creditLink = el("credit-fairhelm");
  if (creditLink) {
    creditLink.href = vhfUrl;
    creditLink.textContent = `${copy.fairhelmCredit} ↗`;
  }
  const sheetLink = el("sheet-fairhelm-link");
  if (sheetLink) {
    sheetLink.href = vhfUrl;
    sheetLink.textContent = vhfUrl.replace(/^https?:\/\//, "");
  }

  const qrContainer = el("qr-container");
  if (qrContainer) {
    qrContainer.innerHTML = renderQrSvg(vhfUrl, {
      label: `QR Code: ${vhfUrl}`,
    });
  }
}

function renderSheetValues() {
  const copy = copyFor(currentLang);
  const vesselDisplay = state.vesselName.trim().toUpperCase() || "_______________";
  const vessel3x = repeatThreeTimes(state.vesselName);
  const vesselPhonetic = spellPhoneticLine(state.vesselName);

  const csCheck = inspectCallSign(state.callSign);
  const csDisplay = csCheck.normalized || "________";
  const csPhonetic = spellPhoneticLine(csCheck.normalized);

  const mmsiInfo = inspectMmsi(state.mmsi);
  const mmsiDisplay = mmsiInfo.formatted;
  const mmsiSpoken = spellMmsiSpoken(state.mmsi);

  const rigDisplay = state.vesselTypeAndRig.trim() || "______________________";
  const hullDisplay = state.hullAndCanvas.trim() || "_______________________________";
  const pobDisplay = state.maxPob.trim() || "___";
  const epirbCheck = inspectEpirbHex(state.epirbHex);
  const epirbDisplay = epirbCheck.normalized || "_______________";
  const portDisplay = state.homePort.trim().toUpperCase();

  // Hints in form
  setText("hint-vessel-phonetic", state.vesselName.trim() ? vesselPhonetic : "");
  setText("hint-callsign-phonetic", csCheck.normalized ? csPhonetic : "");

  const mmsiHint = el("hint-mmsi-status");
  if (mmsiHint) {
    mmsiHint.className = "field-hint";
    if (mmsiInfo.kind === "empty") {
      mmsiHint.textContent = "";
    } else if (mmsiInfo.valid) {
      mmsiHint.classList.add("valid");
      const countryLabel = mmsiInfo.country ? `${mmsiInfo.country.name} · ${mmsiInfo.country.code}` : "";
      mmsiHint.textContent =
        mmsiInfo.kind === "handheld"
          ? copy.mmsiValidHandheld(countryLabel)
          : copy.mmsiValidShip(countryLabel);
    } else {
      mmsiHint.classList.add("invalid");
      mmsiHint.textContent = copy.mmsiInvalid;
    }
  }

  // Port + Flag badge
  const flagSuffix = mmsiInfo.country ? ` · ${mmsiInfo.country.code}` : "";
  setText("out-port-badge", (portDisplay || "YACHT STATION") + flagSuffix);

  // Top Vessel ID cells
  setText("out-vessel-name", vesselDisplay);
  setText("out-vessel-phonetic", vesselPhonetic);
  setText("out-callsign", csDisplay);
  setText("out-callsign-phonetic", csPhonetic);
  setText("out-mmsi", mmsiDisplay);
  setText("out-mmsi-spoken", mmsiSpoken);
  setText("out-rig", rigDisplay);
  setText("out-pob", pobDisplay);
  setText("out-hull", hullDisplay);
  setText("out-epirb", epirbDisplay);

  // MAYDAY spoken script
  setText("out-mayday-vessel-3x", vessel3x);
  setText("out-mayday-cs", csDisplay);
  setText("out-mayday-cs-phonetic", csPhonetic);
  setText("out-mayday-mmsi", mmsiDisplay);
  setText("out-mayday-vessel-1x", vesselDisplay);
  setText("out-mayday-cs-2", csDisplay);
  setText("out-mayday-mmsi-2", mmsiDisplay);
  setText("out-mayday-pob", pobDisplay);
  setText("out-mayday-desc", `${rigDisplay} · ${hullDisplay}`);
  setText("out-mayday-epirb", epirbDisplay);

  // PAN-PAN spoken script
  setText("out-panpan-vessel-3x", vessel3x);
  setText("out-panpan-cs", csDisplay);
  setText("out-panpan-mmsi", mmsiDisplay);
  setText("out-panpan-desc", `${rigDisplay}, ${hullDisplay}, POB ${pobDisplay}`);
}

function init() {
  const langSelect = el("lang-select");
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener("change", () => {
      currentLang = langSelect.value;
      renderLocaleCopy();
      renderSheetValues();
    });
  }

  syncInputsFromState();
  renderLocaleCopy();
  renderSheetValues();

  const form = el("card-form");
  form.addEventListener("input", () => {
    readStateFromInputs();
    renderSheetValues();
  });

  el("btn-sample").addEventListener("click", () => {
    state = { ...PRESETS.sample };
    syncInputsFromState();
    readStateFromInputs();
    renderSheetValues();
  });

  el("btn-catamaran").addEventListener("click", () => {
    state = { ...PRESETS.catamaran };
    syncInputsFromState();
    readStateFromInputs();
    renderSheetValues();
  });

  el("btn-blank").addEventListener("click", () => {
    state = { ...PRESETS.blank };
    syncInputsFromState();
    readStateFromInputs();
    renderSheetValues();
  });

  const triggerPrint = () => window.print();
  el("btn-print").addEventListener("click", triggerPrint);
  el("btn-print-bottom").addEventListener("click", triggerPrint);

  const nightBtn = el("btn-night");
  nightBtn.addEventListener("click", () => {
    const active = document.body.classList.toggle("night-mode");
    nightBtn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  el("btn-copy-link").addEventListener("click", async () => {
    const hash = encodeCardHash(state, currentLang);
    const shareUrl = `${window.location.origin}${window.location.pathname}${hash}`;
    window.history.replaceState(null, "", hash);
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Fallback: URL bar is already updated with hash
    }
    const status = el("copy-status");
    if (status) {
      status.textContent = copyFor(currentLang).linkCopied;
      status.hidden = false;
      setTimeout(() => {
        status.hidden = true;
      }, 3000);
    }
  });
}

init();
