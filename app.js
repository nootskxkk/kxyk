(() => {
    'use strict';
    const MYMATE_CONFIG = window.MYMATE_CONFIG || {};
    const IDX = { LABEL: 0, CIRCUIT: 1, POLE: 2, POLE_NZ: 3, SID: 4, TYPE: 5, LAT: 6, LON: 7, K_LABEL: 8, K_CIRCUIT: 9, K_POLE: 10, K_SID: 11, K_COMBO: 12, SITE_NAME: 13, SITE_CODE: 14, K_SITE_NAME: 15, K_SITE_CODE: 16 };
    const DB_NAME = 'dogbones-core-v23';
    const STORE = 'active-index';
    const STORE_KEY = 'current';
    const MODE_KEY = 'dogbones-mode-v23';
    const CREDS_KEY = 'dogbones-pin-v16';
    const RESULT_LIMIT_OPTIONS = [5, 10, 15, 25, 35, 50, 75, 100];
    const DEFAULT_RESULT_LIMIT = 5;
    const RESULT_LIMIT_KEY = 'dogbones-result-limit-v32-default5';
    const LIVE_RESULT_LIMIT = 80;
    const IMPORT_YIELD_EVERY = 2000;
    const LOCAL_INDEX_YIELD_EVERY = 4000;
    const MAX_LOCAL_CANDIDATES = 9000;
    const ACTION_LABELS = [
        "Open Maps"
    ];
    const ACTION_LABEL_KEY = 'dogbones-action-label-index-v24';
    const WARNING_ACCEPT_KEY = 'dogbones-warning-accepted-v255';
    const WARNING_STATE_KEY = 'gridmap-warning-state-v274';
    const WARNING_MAX_DAILY_SHOWS_AFTER_INITIAL = 2;
    const APP_VERSION = String(MYMATE_CONFIG.version || '2.5.87');
    const APP_VERSION_LABEL = String(MYMATE_CONFIG.label || `GridMap v${APP_VERSION}`);
    const APP_CACHE_NAME = String(MYMATE_CONFIG.cacheName || 'gridmap-public-v2-5-87');
    const APP_ASSET_VERSION = String(MYMATE_CONFIG.assetVersion || 'v2-5-87-gridmap');
    const DATA_SCHEMA_VERSION = Number(MYMATE_CONFIG.dataSchemaVersion || 47);
    const RELEASE_INFO_URL = String(MYMATE_CONFIG.releaseInfoUrl || 'version.json');
    const LOCAL_RELEASE_INFO = Object.freeze({
        app: String(MYMATE_CONFIG.app || 'GridMap'),
        version: APP_VERSION,
        label: APP_VERSION_LABEL,
        cacheName: APP_CACHE_NAME,
        dataSchemaVersion: DATA_SCHEMA_VERSION,
        releaseDate: String(MYMATE_CONFIG.releaseDate || '2026-06-09'),
        releaseNotes: Array.isArray(MYMATE_CONFIG.releaseNotes) ? MYMATE_CONFIG.releaseNotes.slice() : [
            'Moved the GridMap icon and title into a compact top-left header layout.',
            'Adjusted the header so Settings stays top-right and the layout scales cleanly on small phones.',
            'Updated manifest and service-worker cache versions so the PWA refreshes cleanly.'
        ]
    });
    const AUTO_UPDATE_KEY = 'mymate-auto-update-enabled-v1';
    const NO_RESULTS_DOG_IMAGE = '';
    const HKEY = 73;
    function decodeHidden(arr) { return new TextDecoder().decode(new Uint8Array(arr.map(v => v ^ HKEY))); }
    const A0 = decodeHidden([33, 61, 61, 57, 58, 115, 102, 102, 61, 38, 34, 44, 39, 103, 58, 37, 32, 57, 103, 62, 40, 103, 46, 38, 63, 103, 40, 60, 102, 40, 59, 42, 46, 32, 58, 102, 61, 38, 34, 44, 39, 58, 102]);
    const A1 = decodeHidden([33, 61, 61, 57, 58, 115, 102, 102, 61, 38, 34, 44, 39, 103, 58, 37, 32, 57, 103, 62, 40, 103, 46, 38, 63, 103, 40, 60, 102, 40, 59, 42, 46, 32, 58, 102, 59, 44, 58, 61, 102, 58, 44, 59, 63, 32, 42, 44, 58, 102, 30, 25, 22, 25, 60, 43, 37, 32, 42, 22, 26, 44, 42, 60, 59, 44, 22, 26, 44, 59, 63, 32, 42, 44, 58, 102, 30, 25, 22, 25, 60, 43, 37, 32, 42, 22, 26, 44, 42, 60, 59, 44, 22, 26, 44, 59, 63, 32, 42, 44, 58, 22, 30, 15, 26, 102, 15, 44, 40, 61, 60, 59, 44, 26, 44, 59, 63, 44, 59, 102, 120]);
    const A2 = decodeHidden([33, 61, 61, 57, 58, 115, 102, 102, 61, 38, 34, 44, 39, 103, 58, 37, 32, 57, 103, 62, 40, 103, 46, 38, 63, 103, 40, 60, 102, 40, 59, 42, 46, 32, 58, 102, 59, 44, 58, 61, 102, 58, 44, 59, 63, 32, 42, 44, 58, 102, 30, 25, 22, 25, 60, 43, 37, 32, 42, 22, 26, 44, 42, 60, 59, 44, 22, 26, 44, 59, 63, 32, 42, 44, 58, 102, 30, 25, 22, 25, 60, 43, 37, 32, 42, 22, 26, 44, 42, 60, 59, 44, 22, 26, 44, 59, 63, 32, 42, 44, 58, 22, 30, 15, 26, 102, 15, 44, 40, 61, 60, 59, 44, 26, 44, 59, 63, 44, 59, 102, 120, 124]);
    const A3 = decodeHidden([33, 61, 61, 57, 58, 115, 102, 102, 61, 38, 34, 44, 39, 103, 58, 37, 32, 57, 103, 62, 40, 103, 46, 38, 63, 103, 40, 60, 102, 40, 59, 42, 46, 32, 58, 102, 59, 44, 58, 61, 102, 58, 44, 59, 63, 32, 42, 44, 58, 102, 30, 25, 22, 25, 60, 43, 37, 32, 42, 22, 26, 44, 42, 60, 59, 44, 22, 26, 44, 59, 63, 32, 42, 44, 58, 102, 7, 10, 4, 29, 22, 25, 60, 43, 37, 32, 42, 22, 26, 44, 42, 60, 59, 44, 22, 26, 44, 59, 63, 32, 42, 44, 58, 22, 30, 15, 26, 102, 15, 44, 40, 61, 60, 59, 44, 26, 44, 59, 63, 44, 59, 102, 121]);
    const B1 = decodeHidden([33, 61, 61, 57, 58, 115, 102, 102, 61, 38, 34, 44, 39, 103, 58, 37, 32, 57, 103, 62, 40, 103, 46, 38, 63, 103, 40, 60, 102, 40, 59, 42, 46, 32, 58, 102, 59, 44, 58, 61, 102, 58, 44, 59, 63, 32, 42, 44, 58, 102, 30, 25, 22, 25, 60, 43, 37, 32, 42, 22, 26, 44, 42, 60, 59, 44, 22, 26, 44, 59, 63, 32, 42, 44, 58, 102, 30, 25, 22, 25, 60, 43, 37, 32, 42, 22, 26, 44, 42, 60, 59, 44, 22, 26, 44, 59, 63, 32, 42, 44, 58, 22, 30, 15, 26, 102, 15, 44, 40, 61, 60, 59, 44, 26, 44, 59, 63, 44, 59]);
    const B2 = decodeHidden([33, 61, 61, 57, 58, 115, 102, 102, 61, 38, 34, 44, 39, 103, 58, 37, 32, 57, 103, 62, 40, 103, 46, 38, 63, 103, 40, 60, 102, 40, 59, 42, 46, 32, 58, 102, 59, 44, 58, 61, 102, 58, 44, 59, 63, 32, 42, 44, 58, 102, 30, 25, 22, 25, 60, 43, 37, 32, 42, 22, 26, 44, 42, 60, 59, 44, 22, 26, 44, 59, 63, 32, 42, 44, 58, 102, 7, 10, 4, 29, 22, 25, 60, 43, 37, 32, 42, 22, 26, 44, 42, 60, 59, 44, 22, 26, 44, 59, 63, 32, 42, 44, 58, 22, 30, 15, 26, 102, 15, 44, 40, 61, 60, 59, 44, 26, 44, 59, 63, 44, 59]);
    const BASE_LAYERS = [
        { id: 'asset-a', url: A1, kind: 'line' },
        { id: 'asset-b', url: A2, kind: 'site' },
        { id: 'asset-c', url: A3, kind: 'site' }
    ];
    const ROOT_SERVICES = [B1, B2];
    const els = {
        installBtn: document.getElementById('installBtn'),
        settingsBtn: document.getElementById('settingsBtn'),
        settingsBtnText: document.getElementById('settingsBtnText'),
        settingsPanel: document.getElementById('settingsPanel'),
        mainLoginSlot: document.getElementById('mainLoginSlot'),
        settingsLoginSlot: document.getElementById('settingsLoginSlot'),
        infoLoginToggle: document.getElementById('infoLoginToggle'),
        infoLoginBody: document.getElementById('infoLoginBody'),
        settingsReturnBtn: document.getElementById('settingsReturnBtn'),
        searchPanel: document.getElementById('searchPanel'),
        waitingDog: document.getElementById('waitingDog'),
        hardResetBtn: document.getElementById('hardResetBtn'),
        homeLogoBtn: document.getElementById('homeLogoBtn'),
        quickMenuBtn: document.getElementById('quickMenuBtn'),
        quickMenu: document.getElementById('quickMenu'),
        warningConfirm: document.getElementById('warningConfirm'),
        warningConfirmBtn: document.getElementById('warningConfirmBtn'),
        circuitMapPanel: document.getElementById('circuitMapPanel'),
        circuitMapTitle: document.getElementById('circuitMapTitle'),
        circuitMapSub: document.getElementById('circuitMapSub'),
        circuitMapCanvas: document.getElementById('circuitMapCanvas'),
        assetPopup: document.getElementById('assetPopup'),
        whatsHerePanel: document.getElementById('whatsHerePanel'),
        fullMapControls: document.getElementById('fullMapControls'),
        mapExitFullscreenBtn: document.getElementById('mapExitFullscreenBtn'),
        whatsHereBtn: document.getElementById('whatsHereBtn'),
        mapLayerBtn: document.getElementById('mapLayerBtn'),
        mapLayerMenu: document.getElementById('mapLayerMenu'),
        streetLayerBtn: document.getElementById('streetLayerBtn'),
        satelliteLayerBtn: document.getElementById('satelliteLayerBtn'),
        zoomFitBtn: document.getElementById('zoomFitBtn'),
        circuitMapList: document.getElementById('circuitMapList'),
        circuitMapCloseBtn: document.getElementById('circuitMapCloseBtn'),
        mapFullscreenBtn: document.getElementById('mapFullscreenBtn'),
        liveModeBtn: document.getElementById('liveModeBtn'),
        localModeBtn: document.getElementById('localModeBtn'),
        loginPanel: document.getElementById('loginPanel'),
        loginState: document.getElementById('loginState'),
        loginTitle: document.getElementById('loginTitle'),
        loginHint: document.getElementById('loginHint'),
        pinLoginFields: document.getElementById('pinLoginFields'),
        fullLoginFields: document.getElementById('fullLoginFields'),
        pinCode: document.getElementById('pinCode'),
        newPin: document.getElementById('newPin'),
        switchLoginBtn: document.getElementById('switchLoginBtn'),
        loginUser: document.getElementById('loginUser'),
        loginPass: document.getElementById('loginPass'),
        loginBtn: document.getElementById('loginBtn'),
        logoutBtn: document.getElementById('logoutBtn'),
        localPanel: document.getElementById('settingsPanel'),
        localCount: document.getElementById('localCount'),
        statusBox: document.getElementById('statusBox'),
        localGeojson: document.getElementById('localGeojson'),
        clearAppCacheBtn: document.getElementById('clearAppCacheBtn'),
        clearDataBtn: document.getElementById('clearDataBtn'),
        deleteAllImportsBtn: document.getElementById('deleteAllImportsBtn'),
        importedFiles: document.getElementById('importedFiles'),
        perfStatus: document.getElementById('perfStatus'),
        updateCurrentVersion: document.getElementById('updateCurrentVersion'),
        updateCacheName: document.getElementById('updateCacheName'),
        updateSwState: document.getElementById('updateSwState'),
        updateLastCheck: document.getElementById('updateLastCheck'),
        updateLatestVersion: document.getElementById('updateLatestVersion'),
        updateReleaseDate: document.getElementById('updateReleaseDate'),
        updateDataSchema: document.getElementById('updateDataSchema'),
        autoUpdateToggle: document.getElementById('autoUpdateToggle'),
        checkUpdateBtn: document.getElementById('checkUpdateBtn'),
        reloadLatestBtn: document.getElementById('reloadLatestBtn'),
        clearUpdateCacheBtn: document.getElementById('clearUpdateCacheBtn'),
        updateStatus: document.getElementById('updateStatus'),
        storageStatus: document.getElementById('storageStatus'),
        searchInput: document.getElementById('searchInput'),
        searchBtn: document.getElementById('searchBtn'),
        resultsInfo: document.getElementById('resultsInfo'),
        noResultDog: document.getElementById('noResultDog'),
        results: document.getElementById('results'),
        settingsPageBtns: Array.from(document.querySelectorAll('[data-settings-page-btn]')),
        settingsPageSections: Array.from(document.querySelectorAll('[data-settings-page]'))
    };
    function getNoResultDogPanel() { return null; }
    function forceWaitingDogVisible() {
        if (!els.waitingDog)
            return;
        els.waitingDog.style.removeProperty('display');
        els.waitingDog.classList.remove('hidden');
        els.waitingDog.dataset.mode = 'normal';
        els.waitingDog.dataset.variant = '0';
    }
    function forceWaitingDogHidden() {
        if (!els.waitingDog)
            return;
        els.waitingDog.classList.add('hidden');
        els.waitingDog.style.setProperty('display', 'none', 'important');
        els.waitingDog.dataset.mode = 'normal';
        els.waitingDog.dataset.variant = '0';
    }
    function noResultDogExists() {
        return Boolean(els.noResultDog || document.getElementById('noResultDog') || stickyNoResultDog || document.body.classList.contains('mymate-noresult-active'));
    }
    function keepNoResultDogVisible() { stickyNoResultDog = false; document.body.classList.remove('mymate-noresult-active'); }
    function removeNoResultDogPanel() {
        stickyNoResultDog = false;
        document.body.classList.remove('mymate-noresult-active', 'mymate-keep-noresult-during-fetch');
        document.querySelectorAll('#noResultDog, .no-result-dog-panel').forEach(panel => {
            if (panel && panel.parentNode)
                panel.parentNode.removeChild(panel);
        });
        if (els.noResultDog)
            els.noResultDog = null;
        if (els.waitingDog)
            els.waitingDog.style.removeProperty('display');
    }
    function showNoResultDogPanel() { stickyNoResultDog = false; document.body.classList.remove('mymate-noresult-active'); }
    function applyDogStateAfterFetch() {
        document.body.classList.remove('mymate-keep-noresult-during-fetch');
        const infoText = String((els.resultsInfo && els.resultsInfo.textContent) || '').trim();
        const hasResults = Array.isArray(lastResults) && lastResults.length > 0;
        if (hasResults) {
            removeNoResultDogPanel();
            forceWaitingDogHidden();
            return;
        }
        if (/^No asset found for/u.test(infoText)) {
            showNoResultDogPanel();
            return;
        }
        if (fetchRequested)
            forceWaitingDogHidden();
    }
    let records = [];
    let importedFiles = [];
    let sourceRefCache = null;
    let localSearchIndex = null;
    let localIndexCount = 0;
    let localIndexBuildId = 0;
    let dataMeta = null;
    let lastResults = [];
    let mode = localStorage.getItem(MODE_KEY) || 'live';
    let sessionKey = '';
    let sessionExpiry = 0;
    let liveAbort = null;
    let liveLayerCache = null;
    const layerInfoCache = new Map();
    let deferredPrompt = null;
    let loginView = 'full';
    let splashVisible = true;
    let splashShownAt = Date.now();
    let loadingCounter = 0;
    let splashHideTimer = null;
    let splashFailSafeTimer = null;
    let splashShowTimer = null;
    let searchStartedAt = 0;
    const SEARCH_READY_LABEL = 'Search';
    const SEARCH_LOADING_BASE_LABEL = 'Searching';
    const SEARCH_LOADING_DOTS = ['.', '..', '...', '..'];
    const MIN_FETCHING_MS = 2000;
    let searchButtonLoadingTimer = null;
    let searchButtonLoadingStep = 0;
    let fetchRequested = false;
    let stickyNoResultDog = false;
    let circuitMap = null;
    let circuitLayerStreet = null;
    let circuitLayerSatellite = null;
    let circuitLayerMode = 'street';
    let circuitMarkerLayer = null;
    let whatsHereLayer = null;
    let whatsHereResults = [];
    const WHATS_HERE_BOX_HALF_METERS = 500;
    const WHATS_HERE_MAX_RESULTS = 80;
    const WHATS_HERE_MAX_MARKERS = 160;
    let currentCircuitPoints = [];
    let currentCircuitBounds = null;
    let selectedMapIndex = null;
    let mapLayerOpen = false;
    let circuitMapFullscreen = false;
    const norm = (value) => String(value || '')
        .toUpperCase()
        .replace(/\b(POLE|STRUCTURE|STRUCT|CIRCUIT|CKT|NO|NUMBER)\b/g, '')
        .replace(/[^A-Z0-9]+/g, '');
    const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
    const sqlText = (value) => String(value || '').toUpperCase().replace(/'/g, "''");
    const SITE_ALIAS_BY_CODE = Object.freeze({ "A": "Arkana", "AFM": "Australian Fused Materials", "AKW": "ALCOA Kwinana", "ALB": "Albany", "AMT": "Amherst", "APJ": "ALCOA Pinjarra", "APM": "Australian Paper Mills", "AWF": "Albany Wind Farm", "AWG": "ALCOA Wagerup", "BCH": "Beechboro", "BCT": "Balcatta", "BDE": "Baandee", "BDP": "Binningup Desalination Plant", "BEC": "Beckenham", "BEL": "BELLEVUE", "BGA": "Badgingarra", "BGM": "Boddington Gold Mine", "BHK": "Broken Hill Kwinana", "BIB": "Bibra Lake", "BKF": "Black Flag", "BLD": "Boulder", "BLW": "Bluewaters Terminal", "BNP": "Beenup", "BNY": "Bounty", "BOD": "Boddington", "BP": "British Petroleum", "BPR": "British Petroleum Refinery", "BSI": "Barrack Silicon Smelter", "BSN": "Busselton", "BTN": "Bridgetown", "BTY": "Bentley", "BUH": "Bunbury Harbour", "BWP": "Bluewaters Power Station", "BYF": "Byford", "CAP": "Capel", "CAR": "Carrabin", "CBN": "Cockburn Power Station", "CBP": "CSBP", "CC": "Cockburn Cement", "CCL": "Cockburn Cement Ltd", "CGT": "Collgar Terminal", "CGW": "Collgar Wind Farm", "CK": "Cook Street", "CKB": "Cockburn Power Station Terminal", "CKN": "Clarkson", "CL": "Clarence Street", "CLP": "Coolup", "CO": "Collie", "COL": "Collier", "CPA": "Collie Power Station", "CPN": "Chapman", "CPS": "Collie Power Station Terminal", "CT": "Cannington Terminal", "CTB": "Cataby", "CTE": "Cottesloe", "CUN": "Cunderdin", "CVE": "Canning Vale", "CVP": "Canning Vale Power Station", "D": "Darlington", "E": "Edmund Street", "EDG": "Edgewater", "EMD": "Emu Downs", "EMO": "Edna May Operations", "ENB": "Eneabba", "ENT": "Eneabba Terminal", "EP": "East Perth", "F": "Forrest Ave", "FFD": "Forrestfield", "FRW": "Flat Rocks Wind Farm", "G": "Gosnells", "GGV": "Golden Grove", "GLT": "Guildford Terminal", "GNI": "Glen Iris", "GNN": "Generation Newgen Neerabup", "GTN": "Geraldton", "H": "Hadfields", "HAY": "Hay Street", "HBK": "Henley Brook", "HZM": "Hazelmere", "JAM": "James Street", "JAN": "Jan", "JDP": "Joondalup", "JTE": "Joel Terrace", "K": "Kalamunda", "KAT": "Katanning", "KBR": "Kalbarri", "KDL": "Kewdale", "KDN": "Kondinin", "KDP": "Kwinana Desalination Plant", "KEL": "Kellerberrin", "KEM": "Kemerton", "KEM132": "Kemerton 132", "KMC": "Kerr McGee Cataby", "KMK": "Kerr McGee Kwinana", "KMM": "Kerr McGee Muchea", "KMP": "Kemerton Power", "KND": "Kwinana Donaldson Road", "KNL": "Kenwick Link", "KOJ": "Kojonup", "KPP": "Kwinana Power Partnership", "KPS": "Kwinana Power Station", "KRA": "Karara", "KW": "Kwinana Terminal", "KWB": "Kwinana Bess", "LDE": "Landsdale", "LTH": "Leath Rd", "LWT": "Landwehr Terminal", "MA": "Manning Street", "MBA": "Mumbida Wind Farm (WP)", "MBR": "Mount Barker", "MCE": "Medical Centre", "MDN": "Maddington", "MDP": "Merredin Power Station", "MDY": "Munday", "MED": "Medina", "MER": "Merredin", "MGA": "Mungarra", "MH": "Mandurah", "MIL": "Milligan Street", "MJ": "Midland Junction", "MJP": "Manjimup", "MLA": "Mount Lawley", "MLG": "Malaga", "MO": "Morley", "MOR": "Moora", "MPS": "Muja Power Station", "MR": "Margaret River", "MRN": "Mason Road North", "MRR": "Marriott Road", "MRS": "Merredin Solar Farm", "MRT": "Merredin Terminal", "MSH": "Marshall Road", "MSR": "Mason Road", "MSS": "Meadow Springs", "MU": "Muja Terminal", "MUC": "Muchea", "MUL": "Mullaloo", "MUR": "Murdoch", "MW": "Mundaring Weir", "MYR": "Myaree", "N": "Nedlands", "NB": "North Beach", "NBT": "Neerabup Terminal", "NF": "North Fremantle", "NGK": "NewGen Kwinana Power Station", "NGN": "Narrogin", "NGS": "Narrogin South", "NOR": "Northam", "NOW": "Nowergup", "NP": "North Perth", "NT": "Northern Terminal", "OC": "O'Connor", "OFE": "Office Rd", "OLY": "Oakley", "OP": "Osborne Park", "PBY": "Padbury", "PCY": "Piccadilly", "PIC": "Picton", "PJR": "Pinjar", "PKS": "Parkeston", "PLD": "Parklands", "PNJ": "Pinjarra", "PRK": "Parkeston Power Station", "QNP": "Quinninup", "RAN": "Rangeway", "RGN": "Regans", "RO": "Rockingham", "RTN": "Riverton", "RVE": "Rivervale 132kV", "SF": "South Fremantle", "SHO": "Shotts", "SNR": "Southern River", "SPK": "Shenton Park", "SRD": "Sutherland", "ST": "Southern Terminal", "SUM": "Summers Street", "SVY": "Sawyers Valley 132kV", "SX": "Southern Cross", "TLA": "Tianqi Lithium Australia", "TLN": "Tomlinson Street", "TPP": "Tiwest Pigment Plant", "TS": "Three Springs", "TST": "Three Springs Terminal", "TT": "Tate Street", "VP": "Victoria Park", "W": "Wellington Street", "WAG": "Wagin", "WAI": "Waikiki", "WCL": "Western Collieries Limited", "WD": "Wembley Downs", "WDW": "Warradarge Wind Farm", "WE": "Welshpool", "WGA": "Wangara", "WGP": "Wagerup", "WGP9": "Wagerup 9 (cust power gen to LWT)", "WHT": "Whiteman Park", "WKT": "West Kalgoorlie Terminal", "WLN": "Willetton", "WLT": "Wells Terminal", "WM": "Western Mining", "WMK": "Western Mining Kambalda", "WMS": "Western Mining Smelter", "WNO": "Wanneroo", "WOR": "Worsley", "WSD": "Westralian Sands", "WT": "Western Terminal", "WUN": "Wundowie", "WWF": "Walkaway Windfarm", "Y": "Yokine", "YDT": "Yandin Terminal", "YDW": "Yandin Wind Farm", "YER": "Yerbillon", "YLN": "Yilgarn", "YP": "Alkimos Desalination Plant" });
    const SITE_ALIAS_BY_NAME = Object.freeze((() => {
        const entries = Object.entries(SITE_ALIAS_BY_CODE).map(([code, name]) => [norm(name), code]);
        for (const [code, name] of Object.entries(SITE_ALIAS_BY_CODE)) {
            if (!code.endsWith('T'))
                entries.push([norm(`${name} Terminal`), `${code}T`]);
        }
        return Object.fromEntries(entries);
    })());
    const DEPOT_ALIAS_BY_CODE = Object.freeze({
        "K": "Koorda"
    });
    function depotAliasNameForCode(code) {
        return DEPOT_ALIAS_BY_CODE[norm(code)] || '';
    }
    function aliasNameForCode(code) {
        code = norm(code);
        if (SITE_ALIAS_BY_CODE[code])
            return SITE_ALIAS_BY_CODE[code];
        if (code.endsWith('T') && code.length > 1) {
            const baseCode = code.slice(0, -1);
            const baseName = SITE_ALIAS_BY_CODE[baseCode];
            if (baseName)
                return `${baseName} Terminal`;
        }
        return '';
    }
    function aliasCodesForQuery(raw) {
        const q = norm(raw);
        if (!q)
            return [];
        const out = new Set();
        if (aliasNameForCode(q))
            out.add(q);
        if (SITE_ALIAS_BY_NAME[q])
            out.add(SITE_ALIAS_BY_NAME[q]);
        if (q.length >= 2) {
            for (const [code, name] of Object.entries(SITE_ALIAS_BY_CODE)) {
                const kName = norm(name);
                const terminalCode = `${code}T`;
                const terminalName = norm(`${name} Terminal`);
                if (code.startsWith(q) || kName.startsWith(q) || kName.includes(q))
                    out.add(code);
                if (terminalCode.startsWith(q) || terminalName.startsWith(q) || terminalName.includes(q))
                    out.add(terminalCode);
            }
        }
        return Array.from(out);
    }
    function stripCircuitNumber(text) {
        text = String(text || '').toUpperCase().trim();
        return text
            .replace(/\s+(?:\d{2}(?:\/\d{2})?|X\d[A-Z]?)$/i, '')
            .replace(/(\D)(?:\d{2}|X\d[A-Z]?)$/i, '$1')
            .replace(/[ -]+$/, '')
            .trim();
    }
    function circuitEndpointTokensFromText(text) {
        const base = stripCircuitNumber(text);
        const out = [];
        const rx = /(^|[-/\\])([A-Z0-9]{1,10})/g;
        let m;
        while ((m = rx.exec(base)) !== null) {
            const sep = m[1] || '';
            const code = norm(m[2]);
            if (!code)
                continue;
            out.push({ code, sep });
        }
        return out;
    }
    function shouldUseAliasToken(token) {
        if (!token || !token.code)
            return false;
        if (token.sep === '/' && token.code.length === 1)
            return false;
        return true;
    }
    function circuitEndpointCodesFromText(text) {
        return circuitEndpointTokensFromText(text).filter(shouldUseAliasToken).map(t => t.code);
    }
    function circuitEndpointCodes(rec) {
        const circuit = recVal(rec, IDX.CIRCUIT) || recVal(rec, IDX.LABEL);
        return circuitEndpointCodesFromText(circuit);
    }
    function circuitEndpointCodesForAliasSearch(rec, raw) {
        const circuit = recVal(rec, IDX.CIRCUIT) || recVal(rec, IDX.LABEL);
        if (isSingleLetterSearch(raw)) {
            return circuitEndpointTokensFromText(circuit)
                .map(t => t.code)
                .filter(code => code && aliasNameForCode(code));
        }
        return circuitEndpointCodes(rec);
    }
    function isCircuitOnlySearch(raw) {
        const s = String(raw || '').toUpperCase().replace(/\s+/g, ' ').trim();
        const compact = norm(s);
        if (/\s+\d{1,4}[A-Z]?$/.test(s) && !/[-/\\][A-Z0-9]+\s*(?:\d{2}|X\d[A-Z]?)$/i.test(s))
            return false;
        if (/^[A-Z0-9]+(?:[-/\\][A-Z0-9]+)+\s*(?:\d{2}(?:\/\d{2})?|X\d[A-Z]?)?$/i.test(s))
            return true;
        return /^[A-Z]{2,}[0-9]{2}(?:\/[0-9]{2})?$/.test(compact);
    }
    function circuitAliasKeys(rec) {
        const keys = [];
        for (const code of circuitEndpointCodes(rec)) {
            keys.push(code);
            const name = aliasNameForCode(code);
            if (name) {
                keys.push(name);
                keys.push(norm(name));
            }
        }
        return keys.filter(Boolean);
    }
    function aliasMatchCodesForRecord(rec, raw) {
        const queryCodes = new Set(aliasCodesForQuery(raw));
        const endpoints = circuitEndpointCodesForAliasSearch(rec, raw);
        return endpoints.filter(code => queryCodes.has(code));
    }
    function aliasQueryMatchesCircuit(rec, raw) {
        return aliasMatchCodesForRecord(rec, raw).length > 0;
    }
    function circuitBaseText(rec) {
        return stripCircuitNumber(recVal(rec, IDX.CIRCUIT) || recVal(rec, IDX.LABEL));
    }
    function isSingleCodeCircuitResult(rec, code) {
        const base = norm(circuitBaseText(rec));
        return Boolean(code && base === norm(code));
    }
    function circuitAliasSubtitle(rec, raw) {
        if (isCircuitOnlySearch(raw))
            return 'Circuit';
        const matched = aliasMatchCodesForRecord(rec, raw).filter(code => aliasNameForCode(code));
        if (matched.length) {
            if (matched.length === 1 && isSingleCodeCircuitResult(rec, matched[0])) {
                return aliasNameForCode(matched[0]);
            }
            return 'Circuit';
        }
        const endpoints = circuitEndpointCodes(rec).filter(code => aliasNameForCode(code));
        if (!endpoints.length)
            return '';
        const q = norm(raw);
        if (aliasCodesForQuery(raw).length)
            return '';
        return endpoints.slice(0, 4).map(code => `${code} - ${aliasNameForCode(code)}`).join(' • ');
    }
    function aliasTextForRecord(rec) {
        return circuitAliasKeys(rec).join(' ');
    }
    function siteCodesForRecord(rec) {
        rec = upgradeRecord(rec);
        const out = new Set();
        const code = norm(recVal(rec, IDX.SITE_CODE));
        const name = norm(recVal(rec, IDX.SITE_NAME));
        const label = norm(recVal(rec, IDX.LABEL));
        const sid = norm(recVal(rec, IDX.SID));
        if (code)
            out.add(code);
        if (name && SITE_ALIAS_BY_NAME[name])
            out.add(SITE_ALIAS_BY_NAME[name]);
        if (label && SITE_ALIAS_BY_NAME[label])
            out.add(SITE_ALIAS_BY_NAME[label]);
        if (sid && aliasNameForCode(sid))
            out.add(sid);
        if (label && /TERMINAL$/.test(label)) {
            const baseName = label.replace(/TERMINAL$/, '');
            if (SITE_ALIAS_BY_NAME[baseName])
                out.add(`${SITE_ALIAS_BY_NAME[baseName]}T`);
        }
        const split = splitSiteName(recVal(rec, IDX.LABEL), recVal(rec, IDX.SID));
        if (split.abbr && aliasNameForCode(split.abbr))
            out.add(norm(split.abbr));
        if (split.name && SITE_ALIAS_BY_NAME[norm(split.name)])
            out.add(SITE_ALIAS_BY_NAME[norm(split.name)]);
        return Array.from(out);
    }
    function realSiteMatchesCode(rec, code) {
        rec = upgradeRecord(rec);
        code = norm(code);
        if (!code || !hasGps(rec) || !isSiteRecord(rec))
            return false;
        if (!looksLikeWA(rec[IDX.LON], rec[IDX.LAT]))
            return false;
        return siteCodesForRecord(rec).includes(code);
    }
    function realSiteScore(rec, code) {
        rec = upgradeRecord(rec);
        let score = 0;
        const kCode = recNorm(rec, IDX.K_SITE_CODE);
        const kName = recNorm(rec, IDX.K_SITE_NAME);
        const label = recNorm(rec, IDX.K_LABEL);
        const sid = recNorm(rec, IDX.K_SID);
        if (kCode === code)
            score += 100000;
        if (sid === code)
            score += 80000;
        if (SITE_ALIAS_BY_CODE[code] && kName === norm(SITE_ALIAS_BY_CODE[code]))
            score += 70000;
        if (SITE_ALIAS_BY_CODE[code] && label.includes(norm(SITE_ALIAS_BY_CODE[code])))
            score += 50000;
        if (/substation|terminal|power\s*station|switchyard/i.test(recVal(rec, IDX.TYPE)))
            score += 30000;
        if (/depot/i.test(recVal(rec, IDX.TYPE)))
            score -= 10000;
        return score;
    }
    function bestRealSiteRecordForCode(code) {
        code = norm(code);
        let best = null;
        let bestScore = -Infinity;
        for (const rec0 of records || []) {
            const rec = upgradeRecord(rec0);
            if (!realSiteMatchesCode(rec, code))
                continue;
            const score = realSiteScore(rec, code);
            if (score > bestScore) {
                best = rec;
                bestScore = score;
            }
        }
        return best;
    }
    function realSiteRecordsForAliasQuery(raw) {
        const out = [];
        const seen = new Set();
        for (const code of aliasCodesForQuery(raw)) {
            const site = bestRealSiteRecordForCode(code);
            if (!site)
                continue;
            const key = assetDedupeKey(site);
            if (seen.has(key))
                continue;
            seen.add(key);
            out.push({ code, rec: site });
        }
        return out;
    }
    function circuitBaseCompact(rec) {
        return norm(stripCircuitNumber(recVal(rec, IDX.CIRCUIT) || recVal(rec, IDX.LABEL)));
    }
    function looksLikePoleSpecificSearch(raw) {
        const s = String(raw || '').toUpperCase().replace(/\s+/g, ' ').trim();
        if (/\b(?:\d{2}|X\d[A-Z]?)\b\D+0*\d{1,4}[A-Z]?$/.test(s))
            return true;
        if (/\s+0*\d{1,4}[A-Z]?$/.test(s) && /[A-Z]/.test(s))
            return true;
        return false;
    }
    function baseQueryMatchesCircuit(rec, raw) {
        const q = norm(raw);
        if (!q || q.length < 3)
            return false;
        if (looksLikePoleSpecificSearch(raw))
            return false;
        if (isCircuitOnlySearch(raw))
            return true;
        const base = circuitBaseCompact(rec);
        return Boolean(base && q === base);
    }
    function queryCircuitNumber(raw) {
        const s = String(raw || '').toUpperCase().replace(/\s+/g, ' ').trim();
        const separated = s.match(/(?:^|[\s-/\\])((?:\d{2}|X\d[A-Z]?)(?:\/\d{2})?)$/i);
        if (separated)
            return norm(separated[1]);
        const compact = norm(s);
        const compactMatch = compact.match(/^[A-Z]+((?:\d{2}|X\d[A-Z]?)(?:\/\d{2})?)$/i);
        return compactMatch ? norm(compactMatch[1]) : '';
    }
    function isHiddenZeroGAsset(rec) {
        const label = recVal(rec, IDX.LABEL).toUpperCase();
        const pole = recVal(rec, IDX.POLE).toUpperCase();
        const text = `${label} ${pole}`;
        return /(?:^|[-\s])0{3,}G\b/.test(text) || /(?:^|[-\s])G0{3,}\b/.test(text);
    }
    function cleanPoleDisplay(pole) {
        const text = String(pole || '').split(',')[0].trim().replace(/\s+/g, '');
        if (!text)
            return '';
        return text.replace(/\d+/g, part => String(Number(part)));
    }
    function isDepotRecord(rec) {
        rec = upgradeRecord(rec);
        return /\bdepot\b/i.test([
            recVal(rec, IDX.TYPE),
            recVal(rec, IDX.LABEL),
            recVal(rec, IDX.SITE_NAME)
        ].join(' '));
    }
    function cleanDepotDisplayName(value) {
        return titleCaseSiteName(cleanSiteWord(value)
            .replace(/^[\s\-–—:]+|[\s\-–—:]+$/g, '')
            .replace(/\s+/g, ' ')
            .trim());
    }
    function depotDisplayName(rec, raw = '') {
        rec = upgradeRecord(rec);
        const split = splitSiteName(recVal(rec, IDX.LABEL), recVal(rec, IDX.SID));
        const abbr = String(recVal(rec, IDX.SITE_CODE) || split.abbr || recVal(rec, IDX.SID) || '').trim().toUpperCase();
        const rawName = cleanDepotDisplayName(raw);
        if (rawName && norm(rawName).length >= 3 && !/^[A-Z0-9]{1,6}$/i.test(rawName)) {
            const blob = norm([
                recVal(rec, IDX.LABEL),
                recVal(rec, IDX.SID),
                recVal(rec, IDX.TYPE),
                recVal(rec, IDX.SITE_NAME),
                recVal(rec, IDX.SITE_CODE)
            ].join(' '));
            if (blob.includes(norm(rawName)))
                return rawName;
        }
        const candidates = [
            recVal(rec, IDX.SITE_NAME),
            split.name,
            recVal(rec, IDX.LABEL)
        ];
        for (const candidate of candidates) {
            const name = cleanDepotDisplayName(candidate);
            if (name && (!abbr || norm(name) !== norm(abbr)) && !/^[A-Z0-9]{1,6}$/i.test(name))
                return name;
        }
        const depotAlias = depotAliasNameForCode(abbr);
        if (depotAlias)
            return depotAlias;
        const label = cleanDepotDisplayName(recVal(rec, IDX.LABEL));
        return label || abbr || 'Unknown';
    }
    function displayLabelForResult(rec, raw = '') {
        rec = upgradeRecord(rec);
        const label = recVal(rec, IDX.LABEL);
        if (isDepotRecord(rec))
            return `Depot - ${depotDisplayName(rec, raw)}`;
        if (!label)
            return 'Unnamed point';
        if (isPoleTowerRecord(rec)) {
            const circuit = recVal(rec, IDX.CIRCUIT);
            const pole = cleanPoleDisplay(recVal(rec, IDX.POLE));
            if (circuit && pole && !/^0+$/.test(pole))
                return `${circuit}-${pole}`;
            try {
                if (circuit && typeof sharedPoleFromCoordForMap === 'function') {
                    const borrowed = cleanPoleDisplay(sharedPoleFromCoordForMap(rec, circuit));
                    if (borrowed && !/^0+$/.test(borrowed))
                        return `${circuit}-${borrowed}`;
                }
            }
            catch { }
        }
        const cleaned = label.replace(/-0+(\d+[A-Z]?)\b/gi, '-$1').replace(/\s+0+(\d+[A-Z]?)\b/gi, ' $1');
        return cleaned.replace(/(?:-|\s)0+$/g, '').trim() || 'Unnamed point';
    }
    function recVal(rec, idx) {
        return String((rec && rec[idx] !== undefined && rec[idx] !== null) ? rec[idx] : '');
    }
    function recNorm(rec, idx) {
        return norm(recVal(rec, idx));
    }
    function inferSiteMetaFromRecord(rec) {
        const label = recVal(rec, IDX.LABEL);
        const sid = recVal(rec, IDX.SID);
        const type = recVal(rec, IDX.TYPE);
        const looksSite = /\b(substation|terminal|power\s*station|station|depot|switchyard|zone|site|facility)\b/i.test(`${label} ${type}`);
        if (!looksSite && (recVal(rec, IDX.POLE) || recVal(rec, IDX.CIRCUIT)))
            return { siteName: '', siteCode: '' };
        const split = typeof splitSiteName === 'function' ? splitSiteName(label, sid) : { name: '', abbr: '' };
        const name = split.name || cleanSiteMetaWord(label);
        const code = split.abbr || fallbackSiteCodeFromName(name);
        return { siteName: name, siteCode: code };
    }
    function upgradeRecord(rec) {
        if (!Array.isArray(rec))
            return rec;
        if (rec.length >= 17) {
            rec[IDX.SITE_NAME] = recVal(rec, IDX.SITE_NAME);
            rec[IDX.SITE_CODE] = recVal(rec, IDX.SITE_CODE).toUpperCase();
            rec[IDX.K_SITE_NAME] = recNorm(rec, IDX.SITE_NAME);
            rec[IDX.K_SITE_CODE] = recNorm(rec, IDX.SITE_CODE);
            return rec;
        }
        const copy = rec.slice();
        while (copy.length < 17)
            copy.push('');
        const meta = inferSiteMetaFromRecord(copy);
        copy[IDX.SITE_NAME] = meta.siteName || '';
        copy[IDX.SITE_CODE] = String(meta.siteCode || '').toUpperCase();
        copy[IDX.K_SITE_NAME] = norm(copy[IDX.SITE_NAME]);
        copy[IDX.K_SITE_CODE] = norm(copy[IDX.SITE_CODE]);
        return copy;
    }
    function upgradeRecords(list) {
        return stripCrossingRecords(list);
    }
    function updatePerfStatus(text) {
        if (els.perfStatus)
            els.perfStatus.textContent = text;
    }
    async function requestPersistentStorage() {
        try {
            if (navigator.storage?.persist)
                await navigator.storage.persist();
        }
        catch { }
    }
    function formatElapsed(ms) {
        if (!Number.isFinite(ms))
            return '';
        if (ms < 1000)
            return `${Math.round(ms)} ms`;
        return `${(ms / 1000).toFixed(1)} s`;
    }
    function addIndexRef(map, key, index) {
        key = norm(key);
        if (!key)
            return;
        let list = map.get(key);
        if (!list) {
            list = [];
            map.set(key, list);
        }
        if (list.length < MAX_LOCAL_CANDIDATES)
            list.push(index);
    }
    function addIndexPrefixes(map, key, index) {
        key = norm(key);
        if (!key)
            return;
        addIndexRef(map, key, index);
        const max = Math.min(14, key.length);
        for (let n = 1; n <= max; n++)
            addIndexRef(map, key.slice(0, n), index);
    }
    function recordSearchKeys(rec) {
        rec = upgradeRecord(rec);
        const borrowedPole = typeof borrowedPoleForSearch === 'function' ? borrowedPoleForSearch(rec) : '';
        const borrowedPadded = /^\d{1,4}$/.test(borrowedPole) ? borrowedPole.padStart(4, '0') : '';
        const borrowedCircuitLabel = borrowedPole ? `${recVal(rec, IDX.CIRCUIT)}-${borrowedPole}` : '';
        const keys = [
            recNorm(rec, IDX.K_LABEL),
            recNorm(rec, IDX.K_CIRCUIT),
            recNorm(rec, IDX.K_SID),
            recNorm(rec, IDX.K_COMBO),
            recNorm(rec, IDX.K_POLE),
            recNorm(rec, IDX.POLE_NZ),
            norm(borrowedPole),
            norm(borrowedPadded),
            norm(borrowedCircuitLabel),
            recNorm(rec, IDX.K_SITE_NAME),
            recNorm(rec, IDX.K_SITE_CODE),
            recNorm(rec, IDX.SITE_NAME),
            recNorm(rec, IDX.SITE_CODE)
        ];
        const labelTokens = recVal(rec, IDX.LABEL).split(/[^A-Z0-9]+/i).map(norm).filter(Boolean);
        return keys.concat(labelTokens, circuitAliasKeys(rec)).filter(Boolean);
    }
    function invalidateLocalIndex() {
        localSearchIndex = null;
        localIndexCount = 0;
        localIndexBuildId++;
        updatePerfStatus(records.length ? 'Local index needs rebuild.' : 'Mobile optimisation ready.');
    }
    async function rebuildLocalSearchIndex(options = {}) {
        if (!records.length) {
            localSearchIndex = null;
            localIndexCount = 0;
            updatePerfStatus('No imported data ready.');
            return;
        }
        const buildId = ++localIndexBuildId;
        const started = performance.now();
        const nextIndex = new Map();
        for (let i = 0; i < records.length; i++) {
            if (buildId !== localIndexBuildId)
                return;
            const keys = recordSearchKeys(records[i]);
            for (const key of keys)
                addIndexPrefixes(nextIndex, key, i);
            if (i > 0 && i % LOCAL_INDEX_YIELD_EVERY === 0) {
                updatePerfStatus(`Optimising local search… ${i.toLocaleString()} / ${records.length.toLocaleString()}`);
                await idleYield();
            }
        }
        if (buildId !== localIndexBuildId)
            return;
        localSearchIndex = nextIndex;
        localIndexCount = records.length;
        updatePerfStatus(`Local search optimised: ${records.length.toLocaleString()} records • ${formatElapsed(performance.now() - started)}`);
    }
    function scheduleLocalIndexRebuild() {
        invalidateLocalIndex();
        if (!records.length)
            return;
        setTimeout(() => {
            rebuildLocalSearchIndex().catch(err => updatePerfStatus(`Local index failed: ${err.message || err}`));
        }, 80);
    }
    function candidateRecordsForLocalSearch(qKey, raw) {
        const compact = norm(raw);
        const knownSingleSiteCode = isSingleLetterSearch(raw) && aliasNameForCode(compact);
        if (knownSingleSiteCode)
            return records;
        if (localSearchIndex && localIndexCount === records.length) {
            const ids = new Set();
            for (const key of [qKey, compact].filter(Boolean)) {
                const list = localSearchIndex.get(key);
                if (Array.isArray(list))
                    for (const idx of list)
                        ids.add(idx);
            }
            if (ids.size)
                return Array.from(ids, idx => records[idx]).filter(Boolean);
            if ((compact.length >= 3 && /^[A-Z]+$/.test(compact)) || aliasCodesForQuery(raw).length)
                return records;
        }
        return records;
    }
    function mapReadyRecord(rec) {
        rec = upgradeRecord(rec);
        return {
            label: rec?.[IDX.LABEL] || '',
            circuit: rec?.[IDX.CIRCUIT] || '',
            pole: rec?.[IDX.POLE] || '',
            siteId: rec?.[IDX.SID] || '',
            type: rec?.[IDX.TYPE] || '',
            lat: Number(rec?.[IDX.LAT]),
            lon: Number(rec?.[IDX.LON])
        };
    }
    function getMapReadyResults() {
        return lastResults.map(mapReadyRecord).filter(item => Number.isFinite(item.lat) && Number.isFinite(item.lon));
    }
    function getResultLimit() {
        const saved = Number(localStorage.getItem(RESULT_LIMIT_KEY) || DEFAULT_RESULT_LIMIT);
        return RESULT_LIMIT_OPTIONS.includes(saved) ? saved : DEFAULT_RESULT_LIMIT;
    }
    function setResultLimit(value) {
        value = Number(value);
        if (!RESULT_LIMIT_OPTIONS.includes(value))
            value = DEFAULT_RESULT_LIMIT;
        localStorage.setItem(RESULT_LIMIT_KEY, String(value));
        renderResultLimitButtons();
    }
    function renderResultLimitButtons() {
        document.querySelectorAll('[data-result-limit]').forEach(btn => {
            const active = Number(btn.dataset.resultLimit) === getResultLimit();
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
    }
    function minSplashDelay() {
        return Math.max(0, 3000 - (Date.now() - splashShownAt));
    }
    function clearSplashTimers() {
        if (splashHideTimer)
            clearTimeout(splashHideTimer);
        if (splashFailSafeTimer)
            clearTimeout(splashFailSafeTimer);
        if (splashShowTimer)
            clearTimeout(splashShowTimer);
        splashHideTimer = null;
        splashFailSafeTimer = null;
        splashShowTimer = null;
    }
    function showSplash(text = 'Searching...', loading = false, kind = 'search') {
        const splash = document.getElementById('splashScreen');
        if (!splash)
            return;
        clearSplashTimers();
        const label = splash.querySelector('.splash-text');
        if (label)
            label.textContent = text;
        splashShownAt = Date.now();
        splashVisible = true;
        splash.dataset.mode = kind;
        splash.setAttribute('aria-hidden', 'false');
        document.body.classList.toggle('mymate-search-loading', Boolean(loading));
        splash.classList.toggle('opening', !loading);
        splash.classList.toggle('loading', Boolean(loading));
        splash.classList.toggle('importing', kind === 'import');
        splash.classList.remove('hidden');
        if (!loading) {
            splashFailSafeTimer = setTimeout(() => {
                loadingCounter = 0;
                hideSplash(true);
            }, 3600);
        }
    }
    function hideSplash(force = false) {
        const splash = document.getElementById('splashScreen');
        if (!splash)
            return;
        const close = () => {
            if (splashHideTimer)
                clearTimeout(splashHideTimer);
            if (splashFailSafeTimer)
                clearTimeout(splashFailSafeTimer);
            if (splashShowTimer)
                clearTimeout(splashShowTimer);
            splashHideTimer = null;
            splashFailSafeTimer = null;
            splashShowTimer = null;
            splash.classList.add('hidden');
            splash.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('mymate-search-loading');
            splashVisible = false;
            window.setTimeout(() => {
                if (!splash.classList.contains('hidden'))
                    return;
                splash.classList.remove('loading');
                splash.classList.remove('importing');
                splash.dataset.mode = 'search';
            }, 0);
        };
        if (force)
            close();
        else {
            if (splashHideTimer)
                clearTimeout(splashHideTimer);
            splashHideTimer = setTimeout(close, minSplashDelay());
        }
    }
    const STABLE_SEARCH_LOADING_DOG = '';
    function prepareStableSearchLoadingDog() {
        const mascot = document.getElementById('splashMascot');
        if (!mascot)
            return;
        mascot.classList.remove('loading-dog-pending');
        if (mascot.getAttribute('src') !== STABLE_SEARCH_LOADING_DOG) {
            mascot.src = STABLE_SEARCH_LOADING_DOG;
        }
        mascot.dataset.loadingDog = STABLE_SEARCH_LOADING_DOG;
    }
    function warmSearchLoadingDogs() {
        const img = new Image();
        img.decoding = 'async';
        img.src = STABLE_SEARCH_LOADING_DOG;
    }
    function setSearchInlineLoading(active, text = 'Searching...') {
        const loader = document.getElementById('searchInlineLoader');
        if (loader) {
            loader.textContent = '';
            loader.classList.add('hidden');
            loader.setAttribute('aria-hidden', 'true');
        }
        document.body.classList.toggle('mymate-search-inline-loading', false);
    }
    function setSearchButtonLoading(active) {
        if (!els.searchBtn)
            return;
        if (searchButtonLoadingTimer) {
            clearInterval(searchButtonLoadingTimer);
            searchButtonLoadingTimer = null;
        }
        if (!active) {
            searchButtonLoadingStep = 0;
            els.searchBtn.classList.remove('fetching-active');
            els.searchBtn.textContent = SEARCH_READY_LABEL;
            els.searchBtn.removeAttribute('aria-busy');
            els.searchBtn.removeAttribute('aria-label');
            return;
        }
        searchButtonLoadingStep = 0;
        els.searchBtn.classList.add('fetching-active');
        els.searchBtn.setAttribute('aria-busy', 'true');
        els.searchBtn.setAttribute('aria-label', 'Searching');
        els.searchBtn.innerHTML = 'Searching<span class="fetch-dot fetch-dot-1" aria-hidden="true">.</span><span class="fetch-dot fetch-dot-2" aria-hidden="true">.</span><span class="fetch-dot fetch-dot-3" aria-hidden="true">.</span>';
    }
    async function startLoading(text = 'Searching...') {
        loadingCounter = 0;
        searchStartedAt = Date.now();
        fetchRequested = true;
        clearSplashTimers();
        const keepNoResult = noResultDogExists();
        document.body.classList.remove('mymate-search-loading');
        document.body.classList.add('mymate-fetching-pending-results');
        document.body.classList.toggle('mymate-keep-noresult-during-fetch', keepNoResult);
        if (keepNoResult) {
            keepNoResultDogVisible();
        }
        else {
            removeNoResultDogPanel();
            forceWaitingDogVisible();
        }
        setSearchInlineLoading(false);
        setSearchButtonLoading(true);
    }
    async function startImportLoading(text = 'Importing...') {
        loadingCounter = 1;
        searchStartedAt = Date.now();
        prepareStableSearchLoadingDog();
        showSplash(text, true, 'import');
    }
    warmSearchLoadingDogs();
    function stopLoading() {
        loadingCounter = 0;
        setSearchInlineLoading(false);
        setSearchButtonLoading(false);
        document.body.classList.remove('mymate-fetching-pending-results');
        const splash = document.getElementById('splashScreen');
        if (splash && splash.classList.contains('loading'))
            hideSplash(false);
    }
    async function finishSearchLoading() {
        const elapsed = Date.now() - searchStartedAt;
        if (elapsed < MIN_FETCHING_MS) {
            await new Promise(resolve => setTimeout(resolve, MIN_FETCHING_MS - elapsed));
        }
        stopLoading();
        applyDogStateAfterFetch();
    }
    function hideResultsUntilFetch() {
        fetchRequested = false;
        lastResults = [];
        const keepNoResult = noResultDogExists();
        if (keepNoResult) {
            keepNoResultDogVisible();
            if (els.results)
                els.results.innerHTML = '';
            return;
        }
        if (els.results)
            els.results.innerHTML = '';
        if (els.resultsInfo) {
            els.resultsInfo.textContent = '';
            els.resultsInfo.classList.add('hidden');
        }
        removeNoResultDogPanel();
        document.body.classList.remove('mymate-noresult-active');
        setWaitingDogMode('normal');
        setSearchResultsScreen(false);
        if (els.waitingDog) {
            els.waitingDog.classList.remove('hidden');
            els.waitingDog.style.removeProperty('display');
        }
    }
    const textEncoder = new TextEncoder();
    const textDecoder = new TextDecoder();
    function bytesToBase64(bytes) {
        let binary = '';
        const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
        for (let i = 0; i < arr.length; i++)
            binary += String.fromCharCode(arr[i]);
        return btoa(binary);
    }
    function base64ToBytes(value) {
        const binary = atob(String(value || ''));
        const out = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++)
            out[i] = binary.charCodeAt(i);
        return out;
    }
    function getSavedLogin() {
        try {
            const raw = localStorage.getItem(CREDS_KEY);
            if (!raw)
                return null;
            const parsed = JSON.parse(raw);
            if (parsed && parsed.v === 1 && parsed.salt && parsed.iv && parsed.ct)
                return parsed;
        }
        catch { }
        return null;
    }
    function hasSavedLogin() {
        return Boolean(getSavedLogin());
    }
    function validatePin(pin) {
        pin = String(pin || '').trim();
        if (!/^\d{4,12}$/.test(pin))
            throw new Error('PIN must be 4 to 12 numbers.');
        return pin;
    }
    async function derivePinKey(pin, salt) {
        if (!crypto?.subtle)
            throw new Error('PIN storage is not supported on this device. Use full login.');
        const baseKey = await crypto.subtle.importKey('raw', textEncoder.encode(pin), 'PBKDF2', false, ['deriveKey']);
        return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 200000, hash: 'SHA-256' }, baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    }
    async function saveLoginWithPin(username, password, pin) {
        pin = validatePin(pin);
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await derivePinKey(pin, salt);
        const payload = textEncoder.encode(JSON.stringify({ username, password }));
        const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, payload);
        localStorage.setItem(CREDS_KEY, JSON.stringify({
            v: 1,
            salt: bytesToBase64(salt),
            iv: bytesToBase64(iv),
            ct: bytesToBase64(ct),
            savedAt: Date.now()
        }));
    }
    async function readLoginWithPin(pin) {
        pin = validatePin(pin);
        const saved = getSavedLogin();
        if (!saved)
            throw new Error('Full login required.');
        try {
            const salt = base64ToBytes(saved.salt);
            const iv = base64ToBytes(saved.iv);
            const key = await derivePinKey(pin, salt);
            const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, base64ToBytes(saved.ct));
            const creds = JSON.parse(textDecoder.decode(plain));
            if (!creds?.username || !creds?.password)
                throw new Error('Saved login could not be read.');
            return creds;
        }
        catch (err) {
            throw new Error('PIN failed. Use full login if needed.');
        }
    }
    function clearSavedLogin() {
        localStorage.removeItem(CREDS_KEY);
        els.pinCode.value = '';
        els.newPin.value = '';
        loginView = 'full';
    }
    function showLoginView(view) {
        loginView = view === 'pin' && hasSavedLogin() ? 'pin' : 'full';
        updateDataStatus();
    }
    function minimiseLoginPanel(minimised) {
        if (!els.loginPanel)
            return;
        els.loginPanel.classList.toggle('minimised', Boolean(minimised));
        if (els.loginTitle)
            els.loginTitle.textContent = minimised ? 'Login ready' : 'Login';
    }
    function renderLoginFields() {
        const saved = hasSavedLogin();
        const usePin = saved && loginView !== 'full';
        els.pinLoginFields.classList.toggle('hidden', !usePin);
        els.fullLoginFields.classList.toggle('hidden', usePin);
        els.switchLoginBtn.classList.toggle('hidden', !saved);
        els.switchLoginBtn.textContent = usePin ? 'Use full login' : 'Use PIN';
        els.loginBtn.textContent = usePin ? 'Unlock' : (saved ? 'Login and update PIN' : 'Login now');
        els.loginHint.textContent = usePin
            ? 'Enter PIN. Press Search and the app unlocks before searching.'
            : 'Enter details once and create a PIN. After that, use the PIN when needed.';
        els.logoutBtn.disabled = !(saved || hasLiveSession());
    }
    function setStatus(text, isError = false) {
        if (!els.statusBox)
            return;
        els.statusBox.textContent = text;
        els.statusBox.classList.toggle('error', Boolean(isError));
    }
    function setLoginState(text, state = 'normal') {
        els.loginState.textContent = text;
        els.loginState.classList.toggle('ok', state === 'ok');
        els.loginState.classList.toggle('bad', state === 'bad');
        els.logoutBtn.disabled = !(hasSavedLogin() || (sessionKey && Date.now() < sessionExpiry - 60000));
        renderLoginFields();
    }
    function hasLiveSession() {
        return Boolean(sessionKey && Date.now() < sessionExpiry - 60000);
    }
    async function timedFetch(url, options = {}, timeoutMs = 25000) {
        const controller = new AbortController();
        const outerSignal = options.signal;
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        if (outerSignal) {
            if (outerSignal.aborted)
                controller.abort();
            outerSignal.addEventListener('abort', () => controller.abort(), { once: true });
        }
        try {
            return await fetch(url, { ...options, signal: controller.signal });
        }
        finally {
            clearTimeout(timer);
        }
    }
    function parseLabel(label) {
        label = String(label || '').trim().replace(/,+$/, '');
        const m = label.match(/^(.+?\s(?:\d{2}|X\d[A-Z]?))-(.+)$/i);
        let circuit = '', pole = '';
        if (m) {
            circuit = m[1].trim().replace(/[ -]+$/, '');
            pole = m[2].trim().replace(/,+$/, '');
        }
        else {
            const parts = label.split('-');
            if (parts.length > 1) {
                pole = parts.pop().trim().replace(/,+$/, '');
                circuit = parts.join('-').trim();
            }
            else {
                circuit = label;
            }
        }
        return { circuit, pole, poleNoZero: cleanPoleDisplay(pole) };
    }
    function readProps(props, names) {
        for (const name of names) {
            if (props && props[name] !== undefined && props[name] !== null && String(props[name]).trim() !== '')
                return props[name];
        }
        return '';
    }
    function cleanImportedFieldText(value) {
        const text = String(value ?? '').trim();
        if (!text || /^(null|undefined)$/i.test(text))
            return '';
        return text
            .replace(/,+$/g, '')
            .replace(/^\s*["']+/, '')
            .replace(/["']+\s*$/g, '')
            .replace(/,+$/g, '')
            .trim();
    }
    function mergeImportProps(item) {
        const out = {};
        const add = source => {
            if (!source || typeof source !== 'object' || Array.isArray(source))
                return;
            for (const [key, value] of Object.entries(source)) {
                if (key === 'original')
                    continue;
                if (value === undefined || value === null)
                    continue;
                const text = String(value).trim();
                if (text === '' || /^(null|undefined)$/i.test(text))
                    continue;
                out[key] = value;
            }
        };
        add(item && item.original);
        add(item);
        return out;
    }
    function looksLikeStructureLabelText(value) {
        const text = cleanImportedFieldText(value).toUpperCase();
        return /[A-Z]/.test(text) && /\b(?:\d{2}|X\d[A-Z]?)\s*-\s*0*\d/i.test(text);
    }
    function averagePairs(pairs) {
        let sx = 0, sy = 0, n = 0;
        for (const p of pairs || []) {
            if (Array.isArray(p) && p.length >= 2 && Number.isFinite(Number(p[0])) && Number.isFinite(Number(p[1]))) {
                sx += Number(p[0]);
                sy += Number(p[1]);
                n++;
            }
        }
        return n ? [sx / n, sy / n] : null;
    }
    function parseZone(value) {
        const text = String(value || '').toUpperCase();
        const match = text.match(/(\d{1,2})/);
        return match ? Number(match[1]) : 50;
    }
    function looksLikeLonLat(x, y) {
        x = Number(x);
        y = Number(y);
        return Number.isFinite(x) && Number.isFinite(y) && Math.abs(x) <= 180 && Math.abs(y) <= 90;
    }
    function looksLikeLatLon(lat, lon) {
        lat = Number(lat);
        lon = Number(lon);
        return Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180;
    }
    function looksLikeWA(lon, lat) {
        lon = Number(lon);
        lat = Number(lat);
        return Number.isFinite(lon) && Number.isFinite(lat) && lon >= 110 && lon <= 130 && lat >= -37 && lat <= -10;
    }
    function normaliseLonLatPair(x, y) {
        x = Number(x);
        y = Number(y);
        if (!Number.isFinite(x) || !Number.isFinite(y))
            return null;
        if (looksLikeLatLon(x, y) && !looksLikeLonLat(x, y))
            return [y, x];
        if (looksLikeLonLat(x, y) && looksLikeLatLon(x, y)) {
            if (looksLikeWA(x, y))
                return [x, y];
            if (looksLikeWA(y, x))
                return [y, x];
            return [x, y];
        }
        if (looksLikeLonLat(x, y))
            return [x, y];
        if (looksLikeLatLon(x, y))
            return [y, x];
        return null;
    }
    function utmToLonLat(easting, northing, zone = 50, southern = true) {
        easting = Number(easting);
        northing = Number(northing);
        zone = Number(zone || 50);
        if (!Number.isFinite(easting) || !Number.isFinite(northing) || !Number.isFinite(zone))
            return null;
        const a = 6378137.0;
        const eccSquared = 0.0066943799901413165;
        const k0 = 0.9996;
        const eccPrimeSquared = eccSquared / (1 - eccSquared);
        let x = easting - 500000.0;
        let y = northing;
        if (southern)
            y -= 10000000.0;
        const longOrigin = (zone - 1) * 6 - 180 + 3;
        const M = y / k0;
        const mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));
        const e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
        const J1 = 3 * e1 / 2 - 27 * Math.pow(e1, 3) / 32;
        const J2 = 21 * e1 * e1 / 16 - 55 * Math.pow(e1, 4) / 32;
        const J3 = 151 * Math.pow(e1, 3) / 96;
        const J4 = 1097 * Math.pow(e1, 4) / 512;
        const fp = mu + J1 * Math.sin(2 * mu) + J2 * Math.sin(4 * mu) + J3 * Math.sin(6 * mu) + J4 * Math.sin(8 * mu);
        const sinfp = Math.sin(fp);
        const cosfp = Math.cos(fp);
        const tanfp = Math.tan(fp);
        const C1 = eccPrimeSquared * cosfp * cosfp;
        const T1 = tanfp * tanfp;
        const N1 = a / Math.sqrt(1 - eccSquared * sinfp * sinfp);
        const R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * sinfp * sinfp, 1.5);
        const D = x / (N1 * k0);
        let lat = fp - (N1 * tanfp / R1) * (D * D / 2 -
            (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * Math.pow(D, 4) / 24 +
            (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * Math.pow(D, 6) / 720);
        let lon = (D -
            (1 + 2 * T1 + C1) * Math.pow(D, 3) / 6 +
            (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * Math.pow(D, 5) / 120) / cosfp;
        lat = lat * 180 / Math.PI;
        lon = longOrigin + lon * 180 / Math.PI;
        if (!looksLikeLonLat(lon, lat))
            return null;
        return [lon, lat];
    }
    function readCoordFromProps(props) {
        const lon = readProps(props, ['lon', 'lng', 'longitude', 'LONGITUDE', 'LONG', 'X', 'x']);
        const lat = readProps(props, ['lat', 'latitude', 'LATITUDE', 'LAT', 'Y', 'y']);
        if (lon !== '' && lat !== '')
            return normaliseLonLatPair(lon, lat);
        const easting = readProps(props, ['EASTING', 'Easting', 'easting', 'X', 'x']);
        const northing = readProps(props, ['NORTHING', 'Northing', 'northing', 'Y', 'y']);
        if (easting !== '' && northing !== '') {
            const zoneText = readProps(props, ['ZONE_', 'ZONE', 'Zone', 'zone', 'UTM_ZONE', 'utm_zone']);
            const zone = parseZone(zoneText);
            const hemisphereText = String(readProps(props, ['HEMISPHERE', 'Hemisphere', 'hemisphere']) || '').toUpperCase();
            const southern = hemisphereText ? !/^N/.test(hemisphereText) : true;
            return utmToLonLat(easting, northing, zone, southern);
        }
        return null;
    }
    function extractFeaturesFromImportObject(obj) {
        if (Array.isArray(obj))
            return obj;
        if (Array.isArray(obj?.features))
            return obj.features;
        if (Array.isArray(obj?.data?.features))
            return obj.data.features;
        if (Array.isArray(obj?.data?.data?.features))
            return obj.data.data.features;
        if (Array.isArray(obj?.results))
            return obj.results;
        if (Array.isArray(obj?.data?.results))
            return obj.data.results;
        return [];
    }
    function coordinatesFromFeature(feature) {
        const geom = feature?.geometry || {};
        const props = feature?.properties || feature?.attributes || feature || {};
        const coords = geom.coordinates;
        if (geom.type === 'Point' && Array.isArray(coords) && coords.length >= 2)
            return normaliseLonLatPair(coords[0], coords[1]);
        if (geom.type === 'Polygon' && Array.isArray(coords) && Array.isArray(coords[0]))
            return averagePairs(coords[0]);
        if (geom.type === 'MultiPolygon' && Array.isArray(coords) && Array.isArray(coords[0]) && Array.isArray(coords[0][0]))
            return averagePairs(coords[0][0]);
        if (Array.isArray(geom.rings) && geom.rings.length)
            return averagePairs(geom.rings[0]);
        if (Array.isArray(geom.paths) && geom.paths.length)
            return averagePairs(geom.paths[0]);
        if (geom.x !== undefined && geom.y !== undefined) {
            if (looksLikeLonLat(geom.x, geom.y))
                return normaliseLonLatPair(geom.x, geom.y);
            const zone = parseZone(readProps(props, ['ZONE_', 'ZONE', 'Zone', 'zone', 'UTM_ZONE', 'utm_zone']));
            const converted = utmToLonLat(geom.x, geom.y, zone, true);
            if (converted)
                return converted;
        }
        if (feature?.lon !== undefined && feature?.lat !== undefined && looksLikeLonLat(feature.lon, feature.lat))
            return normaliseLonLatPair(feature.lon, feature.lat);
        if (feature?.longitude !== undefined && feature?.latitude !== undefined && looksLikeLonLat(feature.longitude, feature.latitude))
            return normaliseLonLatPair(feature.longitude, feature.latitude);
        return readCoordFromProps(props);
    }
    function firstByRegex(props, regexes) {
        const keys = Object.keys(props || {});
        for (const rx of regexes) {
            for (const key of keys) {
                if (!rx.test(key))
                    continue;
                const value = props[key];
                if (value !== undefined && value !== null && String(value).trim() !== '')
                    return String(value).trim();
            }
        }
        return '';
    }
    function firstReadableValue(props) {
        for (const [key, value] of Object.entries(props || {})) {
            if (value === undefined || value === null)
                continue;
            const text = String(value).trim();
            if (!text || text.length > 90)
                continue;
            if (/^(true|false|null|undefined)$/i.test(text))
                continue;
            if (/^\d{8,}$/.test(text))
                continue;
            if (/^objectid$/i.test(key))
                continue;
            return text;
        }
        return '';
    }
    function appendCode(label, code) {
        label = String(label || '').trim();
        code = String(code || '').trim();
        if (!code || norm(label).includes(norm(code)))
            return label;
        if (!label)
            return code;
        return `${label} — ${code}`;
    }
    function cleanSiteMetaWord(value) {
        return String(value || '')
            .replace(/\b(substation|terminal|power\s*station|station|depot|switchyard)\b/ig, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    function siteCodeFromProps(props) {
        return String(readProps(props, [
            'abbrev', 'ABBREV', 'abbreviation', 'ABBREVIATION', 'abbr', 'ABBR',
            'substation_abbrev', 'SUBSTATION_ABBREV', 'substation_abbreviation', 'SUBSTATION_ABBREVIATION',
            'terminal_abbrev', 'TERMINAL_ABBREV', 'terminal_abbreviation', 'TERMINAL_ABBREVIATION',
            'station_abbrev', 'STATION_ABBREV', 'station_abbreviation', 'STATION_ABBREVIATION',
            'depot_abbrev', 'DEPOT_ABBREV', 'depot_abbreviation', 'DEPOT_ABBREVIATION',
            'code', 'CODE', 'site_code', 'SITE_CODE', 'station_code', 'STATION_CODE',
            'substation_code', 'SUBSTATION_CODE', 'terminal_code', 'TERMINAL_CODE',
            'facility_code', 'FACILITY_CODE'
        ]) || firstByRegex(props, [
            /(^|_)(abbr|abbrev|abbreviation|code)$/i,
            /(site|station|substation|terminal|facility|depot).*(abbr|abbrev|abbreviation|code)$/i
        ])).trim();
    }
    function siteNameFromProps(props) {
        return cleanSiteMetaWord(readProps(props, [
            'SUBSTATION', 'substation', 'SUBSTATION_NAME', 'substation_name',
            'TERMINAL', 'terminal', 'terminal_name', 'TERMINAL_NAME',
            'station_name', 'STATION_NAME', 'power_station_name', 'POWER_STATION_NAME',
            'DEPOT_NAME', 'depot_name', 'site_name', 'SITE_NAME', 'SiteName',
            'facility_name', 'FACILITY_NAME', 'FacilityName',
            'name', 'Name', 'NAME', 'asset_name', 'ASSET_NAME', 'assetName', 'AssetName',
            'display_name', 'DISPLAY_NAME', 'long_name', 'LONG_NAME',
            'location_name', 'LOCATION_NAME', 'operational_name', 'OPERATIONAL_NAME',
            'substation', 'SUBSTATION', 'terminal', 'TERMINAL', 'station', 'STATION',
            'power_station', 'POWER_STATION', 'depot', 'DEPOT'
        ]) || firstByRegex(props, [
            /(^|_)(site|facility|substation|terminal|station|depot).*name$/i,
            /(^|_)(name|display_name)$/i
        ]));
    }
    function titleCaseSiteName(value) {
        return String(value || '').toLowerCase().replace(/\b([a-z])/g, c => c.toUpperCase()).trim();
    }
    function fallbackSiteCodeFromName(name) {
        const text = cleanSiteMetaWord(name);
        if (!text)
            return '';
        const first = text.match(/[A-Za-z0-9]/);
        return first ? first[0].toUpperCase() : '';
    }
    function siteMetaFromProps(props) {
        let siteName = siteNameFromProps(props);
        let siteCode = siteCodeFromProps(props);
        if (!siteName && siteCode && !/^[A-Z0-9]{1,6}$/i.test(siteCode)) {
            siteName = cleanSiteMetaWord(siteCode);
            siteCode = '';
        }
        if (!siteCode && siteName)
            siteCode = fallbackSiteCodeFromName(siteName);
        return { siteName, siteCode };
    }
    function readStructureNumberFromProps(props) {
        const structureLabel = cleanImportedFieldText(readProps(props, [
            'STRUCTURE_LABEL', 'structure_label', 'StructureLabel', 'structureLabel',
            'trmsn_line_gis_label', 'TRMSN_LINE_GIS_LABEL', 'line_gis_label', 'LINE_GIS_LABEL'
        ]));
        const parsedFromLabel = parseLabel(structureLabel).pole;
        if (parsedFromLabel && !isZeroOnlyStructureNumber(parsedFromLabel))
            return parsedFromLabel;
        const assetIdLabel = cleanImportedFieldText(readProps(props, ['asset_id', 'ASSET_ID', 'AssetID', 'assetId']));
        if (looksLikeStructureLabelText(assetIdLabel)) {
            const parsedAssetPole = parseLabel(assetIdLabel).pole;
            if (parsedAssetPole && !isZeroOnlyStructureNumber(parsedAssetPole))
                return parsedAssetPole;
        }
        const direct = cleanImportedFieldText(readProps(props, [
            'NAMEPLATE_ID_1', 'NAMEPLATE_ID', 'nameplate_id_1', 'nameplate_id', 'NameplateID', 'namePlateId',
            'structure_number', 'STRUCTURE_NUMBER', 'StructureNumber', 'structureNo', 'StructureNo',
            'structure_no', 'STRUCTURE_NO', 'struct_no', 'STRUCT_NO', 'struct_num', 'STRUCT_NUM',
            'str_no', 'STR_NO', 'str_num', 'STR_NUM', 'str_number', 'STR_NUMBER',
            'pole_number', 'POLE_NUMBER', 'PoleNumber', 'pole_no', 'POLE_NO', 'pole_num', 'POLE_NUM',
            'tower_number', 'TOWER_NUMBER', 'TowerNumber', 'tower_no', 'TOWER_NO', 'tower_num', 'TOWER_NUM'
        ]));
        if (direct)
            return direct;
        return cleanImportedFieldText(firstByRegex(props, [
            /(^|_)(nameplate|name_plate).*?(id|number|num|no)$/i,
            /(^|_)(structure|struct|str|pole|tower).*?(number|num|no)$/i
        ]));
    }
    function readCircuitLabelFromProps(props, fallback = '') {
        const direct = cleanImportedFieldText(readProps(props, [
            'LINE_NAME_1', 'line_name_1', 'LINE_NAME_2', 'line_name_2', 'LINE_NAME_3', 'line_name_3',
            'FIELD_MAP_ALL_LINES', 'field_map_all_lines',
            'trmsn_line_name', 'TRMSN_LINE_NAME', 'trmsn_line', 'TRMSN_LINE',
            'transmission_line', 'TRANSMISSION_LINE', 'line_name', 'LINE_NAME', 'line_label', 'LINE_LABEL',
            'circuit', 'CIRCUIT', 'circuit_name', 'CIRCUIT_NAME', 'feeder', 'FEEDER',
            'network_name', 'NETWORK_NAME', 'route_name', 'ROUTE_NAME'
        ]));
        if (direct)
            return direct;
        const parsed = parseLabel(fallback);
        return parsed.circuit || '';
    }
    function readIndexedLineNameFromProps(props, index) {
        return cleanImportedFieldText(readProps(props, [
            `LINE_NAME_${index}`, `line_name_${index}`, `LineName${index}`, `lineName${index}`,
            `TRMSN_LINE_NAME_${index}`, `trmsn_line_name_${index}`, `TRANSMISSION_LINE_${index}`, `transmission_line_${index}`,
            `CIRCUIT_NAME_${index}`, `circuit_name_${index}`, `CIRCUIT_${index}`, `circuit_${index}`,
            `LINE_${index}`, `line_${index}`
        ]));
    }
    function readIndexedNameplateFromProps(props, index) {
        return cleanImportedFieldText(readProps(props, [
            `NAMEPLATE_ID_${index}`, `nameplate_id_${index}`, `NameplateId${index}`, `nameplateId${index}`,
            `NAMEPLATE_ID${index}`, `nameplate_id${index}`, `NAME_PLATE_ID_${index}`, `name_plate_id_${index}`,
            `NAMEPLATE_${index}`, `nameplate_${index}`, `NAME_PLATE_${index}`, `name_plate_${index}`,
            `STRUCTURE_LABEL_${index}`, `structure_label_${index}`, `STRUCTURE_NUMBER_${index}`, `structure_number_${index}`,
            `STRUCTURE_NO_${index}`, `structure_no_${index}`, `POLE_NUMBER_${index}`, `pole_number_${index}`,
            `POLE_NO_${index}`, `pole_no_${index}`, `TOWER_NUMBER_${index}`, `tower_number_${index}`,
            `TOWER_NO_${index}`, `tower_no_${index}`
        ]));
    }
    function pairedLineNameplateLabelsFromProps(props) {
        const labels = [];
        const seen = new Set();
        for (let i = 1; i <= 12; i++) {
            const lineRaw = readIndexedLineNameFromProps(props, i);
            const plateRaw = readIndexedNameplateFromProps(props, i);
            if (!lineRaw || !plateRaw)
                continue;
            const parsedPlate = parseLabel(plateRaw);
            const platePole = cleanPoleDisplay(parsedPlate.pole || plateRaw);
            if (!platePole || isZeroOnlyStructureNumber(platePole))
                continue;
            const lineCandidates = String(lineRaw).split(/[;|]+/).map(v => cleanImportedFieldText(v)).filter(Boolean);
            for (const line of lineCandidates) {
                const circuit = (parsedPlate.circuit && norm(parsedPlate.circuit) === norm(line)) ? parsedPlate.circuit : line;
                if (!circuit || !/\b(?:\d{2}|X\d[A-Z]?)(?:\/\d{2})?\b/i.test(circuit))
                    continue;
                const label = `${circuit}-${platePole}`;
                const key = norm(label);
                if (seen.has(key))
                    continue;
                seen.add(key);
                labels.push({ label, circuit, pole: platePole, index: i });
            }
        }
        return labels;
    }
    function pairedLineNameplateRecordsFromProps(props, sid, type, lat, lon, meta = {}) {
        const pairs = pairedLineNameplateLabelsFromProps(props);
        if (!pairs.length)
            return [];
        return pairs.map(pair => makeRecord(pair.label, `${sid || ''}|LINEPAIR|${pair.index}|${norm(pair.circuit)}|${norm(pair.pole)}`, type, lat, lon, meta));
    }
    function isZeroOnlyStructureNumber(value) {
        const cleaned = cleanPoleDisplay(value);
        return Boolean(cleaned && /^0+$/.test(cleaned));
    }
    function labelWithExplicitStructureFromProps(props, fallbackLabel = '', fallbackSid = '') {
        const pole = readStructureNumberFromProps(props);
        const cleanPole = cleanPoleDisplay(pole);
        if (!cleanPole || isZeroOnlyStructureNumber(cleanPole))
            return '';
        const circuit = readCircuitLabelFromProps(props, fallbackLabel) || parseLabel(fallbackSid).circuit;
        if (!circuit)
            return '';
        const parsedFallback = parseLabel(fallbackLabel);
        const fallbackPole = cleanPoleDisplay(parsedFallback.pole);
        if (!fallbackLabel || !fallbackPole || isZeroOnlyStructureNumber(fallbackPole))
            return `${circuit}-${cleanPole}`;
        return fallbackLabel;
    }
    function assetLabelFromProps(props) {
        let direct = cleanImportedFieldText(readProps(props, [
            'STRUCTURE_LABEL', 'structure_label', 'StructureLabel', 'structureLabel',
            'trmsn_line_gis_label', 'TRMSN_LINE_GIS_LABEL', 'line_gis_label', 'LINE_GIS_LABEL',
            'label', 'LABEL', 'name', 'Name', 'NAME',
            'asset_name', 'ASSET_NAME', 'assetName', 'AssetName',
            'site_name', 'SITE_NAME', 'SiteName',
            'facility_name', 'FacilityName', 'FACILITY_NAME',
            'substation_name', 'SUBSTATION_NAME', 'terminal_name', 'TERMINAL_NAME',
            'station_name', 'STATION_NAME', 'depot_name', 'DEPOT_NAME',
            'display_name', 'DISPLAY_NAME', 'description', 'DESCRIPTION'
        ]));
        const assetIdLabel = cleanImportedFieldText(readProps(props, ['asset_id', 'ASSET_ID', 'AssetID', 'assetId']));
        if ((!direct || /^\d+$/.test(direct)) && looksLikeStructureLabelText(assetIdLabel))
            direct = assetIdLabel;
        const explicit = labelWithExplicitStructureFromProps(props, direct);
        if (explicit)
            return explicit;
        const regexName = firstByRegex(props, [
            /(^|_)(asset|site|facility|substation|terminal|station|depot).*name$/i,
            /(^|_)(name|label|description)$/i,
            /(asset|site|facility|substation|terminal|station|depot)/i
        ]);
        const code = siteCodeFromProps(props);
        return appendCode(direct || regexName || firstReadableValue(props), code);
    }
    function assetTypeFromProps(props) {
        return String(readProps(props, [
            'pole_type', 'POLE_TYPE', 'poleType',
            'structure_type', 'STRUCTURE_TYPE',
            'asset_type', 'ASSET_TYPE', 'assetType',
            'SUBSTATION_TYPE', 'substation_type', 'site_type', 'SITE_TYPE', 'facility_type', 'FACILITY_TYPE',
            'DEPOT', 'depot', 'type', 'TYPE', 'class', 'CLASS', 'category', 'CATEGORY'
        ]) || firstByRegex(props, [/(^|_)(type|class|category)$/i, /(asset|site|facility|station).*type$/i])).trim();
    }
    function isCrossingLikeProps(props) {
        props = props || {};
        const value = key => String(props[key] ?? '').trim();
        const directKeys = [
            'crossing_type', 'CROSSING_TYPE', 'tx_source_segment', 'TX_SOURCE_SEGMENT', 'hv_source_segment', 'HV_SOURCE_SEGMENT',
            'hv_network', 'HV_NETWORK', 'hv_type', 'HV_TYPE', 'from_pole_no', 'FROM_POLE_NO', 'to_pole_no', 'TO_POLE_NO',
            'from_label', 'FROM_LABEL', 'to_label', 'TO_LABEL'
        ];
        if (directKeys.some(key => value(key)))
            return true;
        const classText = [
            value('asset_type'), value('ASSET_TYPE'), value('asset_class'), value('ASSET_CLASS'),
            value('category'), value('CATEGORY'), value('layer'), value('LAYER'),
            value('type'), value('TYPE'), value('class'), value('CLASS')
        ].join(' ');
        if (/\bcrossings?\b/i.test(classText))
            return true;
        for (const key of Object.keys(props)) {
            if (/crossing/i.test(key) && value(key))
                return true;
        }
        return false;
    }
    function isCrossingRecord(rec) {
        rec = upgradeRecord(rec);
        const type = recVal(rec, IDX.TYPE);
        const sid = recVal(rec, IDX.SID);
        const label = recVal(rec, IDX.LABEL);
        if (/\bcrossings?\b/i.test(`${type} ${sid}`))
            return true;
        if (/\b(HV|TX)\s*crossings?\b/i.test(`${type} ${label}`))
            return true;
        return false;
    }
    function stripCrossingRecords(list) {
        const source = Array.isArray(list) ? list : [];
        return source.map(upgradeRecord).filter(Boolean).filter(rec => !isCrossingRecord(rec));
    }
    function makeRecord(label, sid, type, lat, lon, meta = {}) {
        const parsed = parseLabel(label || sid);
        const fixedPair = normaliseLonLatPair(lon, lat);
        if (fixedPair) {
            lon = fixedPair[0];
            lat = fixedPair[1];
        }
        const displayLabel = label || sid || `${lat.toFixed(7)}, ${lon.toFixed(7)}`;
        const siteName = cleanSiteMetaWord(meta.siteName || '');
        const siteCode = String(meta.siteCode || '').trim().toUpperCase();
        return [
            displayLabel,
            parsed.circuit,
            parsed.pole,
            parsed.poleNoZero,
            sid,
            type,
            Number(lat.toFixed(7)),
            Number(lon.toFixed(7)),
            norm(displayLabel),
            norm(parsed.circuit),
            norm(parsed.pole),
            norm(sid),
            norm(`${parsed.circuit} ${parsed.poleNoZero}`),
            siteName,
            siteCode,
            norm(siteName),
            norm(siteCode)
        ];
    }
    function recordFromPlain(item) {
        const props = mergeImportProps(item);
        if (isCrossingLikeProps(props))
            return null;
        const rawLabel = assetLabelFromProps(props);
        const sid = cleanImportedFieldText(readProps(props, [
            'structure_id', 'STRUCTURE_ID', 'structureId', 'StructureID',
            'asset_id', 'ASSET_ID', 'site_id', 'SITE_ID', 'facility_id', 'FACILITY_ID',
            'id', 'ID', 'objectid', 'OBJECTID', 'OBJECTID_1'
        ]));
        const label = labelWithExplicitStructureFromProps(props, rawLabel, sid) || rawLabel;
        const type = assetTypeFromProps(props);
        const coords = coordinatesFromFeature({ attributes: props, ...props, geometry: props.geometry || item?.geometry });
        if (!coords)
            return null;
        const lon = Number(coords[0]);
        const lat = Number(coords[1]);
        if (!Number.isFinite(lat) || !Number.isFinite(lon))
            return null;
        return makeRecord(label, sid, type, lat, lon, siteMetaFromProps(props));
    }
    function recordFromFeature(feature) {
        const props = mergeImportProps(feature?.properties || feature?.attributes || {});
        if (isCrossingLikeProps(props))
            return null;
        const coords = coordinatesFromFeature({ ...feature, properties: props, attributes: props });
        if (!coords)
            return recordFromPlain(props);
        const lon = Number(coords[0]);
        const lat = Number(coords[1]);
        if (!Number.isFinite(lat) || !Number.isFinite(lon))
            return null;
        const rawLabel = assetLabelFromProps(props);
        const sid = cleanImportedFieldText(readProps(props, [
            'structure_id', 'STRUCTURE_ID', 'structureId', 'StructureID',
            'asset_id', 'ASSET_ID', 'site_id', 'SITE_ID', 'facility_id', 'FACILITY_ID',
            'id', 'ID', 'objectid', 'OBJECTID', 'OBJECTID_1'
        ]));
        const label = labelWithExplicitStructureFromProps(props, rawLabel, sid) || rawLabel;
        const type = assetTypeFromProps(props);
        return makeRecord(label, sid, type, lat, lon, siteMetaFromProps(props));
    }
    function recordsFromFeatureExpanded(feature) {
        const base = recordFromFeature(feature);
        const props = mergeImportProps(feature?.properties || feature?.attributes || feature || {});
        const coords = coordinatesFromFeature({ ...feature, properties: props, attributes: props });
        if (!coords)
            return base ? [base] : [];
        const lon = Number(coords[0]);
        const lat = Number(coords[1]);
        if (!Number.isFinite(lat) || !Number.isFinite(lon))
            return base ? [base] : [];
        const sid = cleanImportedFieldText(readProps(props, [
            'structure_id', 'STRUCTURE_ID', 'structureId', 'StructureID',
            'asset_id', 'ASSET_ID', 'site_id', 'SITE_ID', 'facility_id', 'FACILITY_ID',
            'id', 'ID', 'objectid', 'OBJECTID', 'OBJECTID_1'
        ]));
        const type = assetTypeFromProps(props);
        const meta = siteMetaFromProps(props);
        const pairs = pairedLineNameplateRecordsFromProps(props, sid, type, lat, lon, meta);
        const out = [];
        const seen = new Set();
        const add = rec => {
            if (!rec || isCrossingRecord(rec))
                return;
            const key = `${norm(recVal(rec, IDX.CIRCUIT))}|${norm(cleanPoleDisplay(recVal(rec, IDX.POLE_NZ) || recVal(rec, IDX.POLE)))}|${Number(rec[IDX.LAT]).toFixed(7)}|${Number(rec[IDX.LON]).toFixed(7)}`;
            if (seen.has(key))
                return;
            seen.add(key);
            out.push(rec);
        };
        add(base);
        for (const rec of pairs)
            add(rec);
        return out;
    }
    function recordsFromPlainExpanded(item) {
        const base = recordFromPlain(item);
        const props = mergeImportProps(item);
        const coords = coordinatesFromFeature({ attributes: props, ...props, geometry: props.geometry || item?.geometry });
        if (!coords)
            return base ? [base] : [];
        const lon = Number(coords[0]);
        const lat = Number(coords[1]);
        if (!Number.isFinite(lat) || !Number.isFinite(lon))
            return base ? [base] : [];
        const sid = cleanImportedFieldText(readProps(props, [
            'structure_id', 'STRUCTURE_ID', 'structureId', 'StructureID',
            'asset_id', 'ASSET_ID', 'site_id', 'SITE_ID', 'facility_id', 'FACILITY_ID',
            'id', 'ID', 'objectid', 'OBJECTID', 'OBJECTID_1'
        ]));
        const type = assetTypeFromProps(props);
        const pairs = pairedLineNameplateRecordsFromProps(props, sid, type, lat, lon, siteMetaFromProps(props));
        const out = [];
        const seen = new Set();
        const add = rec => {
            if (!rec || isCrossingRecord(rec))
                return;
            const key = `${norm(recVal(rec, IDX.CIRCUIT))}|${norm(cleanPoleDisplay(recVal(rec, IDX.POLE_NZ) || recVal(rec, IDX.POLE)))}|${Number(rec[IDX.LAT]).toFixed(7)}|${Number(rec[IDX.LON]).toFixed(7)}`;
            if (seen.has(key))
                return;
            seen.add(key);
            out.push(rec);
        };
        add(base);
        for (const rec of pairs)
            add(rec);
        return out;
    }
    function recordsFromArcJson(json) {
        const features = extractFeaturesFromImportObject(json);
        if (features.length) {
            return features.flatMap(f => recordsFromFeatureExpanded({ properties: f.properties, attributes: f.attributes, geometry: f.geometry })).filter(Boolean).filter(rec => !isCrossingRecord(rec));
        }
        if (Array.isArray(json?.results))
            return json.results.flatMap(recordsFromPlainExpanded).filter(Boolean).filter(rec => !isCrossingRecord(rec));
        if (Array.isArray(json))
            return json.flatMap(recordsFromPlainExpanded).filter(Boolean).filter(rec => !isCrossingRecord(rec));
        return [];
    }
    function circuitNumberTokenFromText(text) {
        const m = String(text || '').toUpperCase().match(/\b(?:\d{2}|X\d[A-Z]?)(?:\/\d{2})?\b/);
        return m ? norm(m[0]) : '';
    }
    function circuitBaseWithoutNumber(text) {
        return String(text || '').replace(/\s+(?:\d{2}|X\d[A-Z]?)(?:\/\d{2})?\s*$/i, '').trim();
    }
    function cleanPoleMainFromAliasPole(pole) {
        return String(pole || '')
            .split(',')[0]
            .trim()
            .replace(/,+$/g, '')
            .replace(/\s+/g, '');
    }
    function secondaryCircuitAliasTokensFromPole(pole) {
        const parts = String(pole || '').split(',');
        parts.shift();
        return parts
            .join(',')
            .split(/[;,]+/)
            .map(v => v.trim().replace(/[^\w/ -]+$/g, '').replace(/\s+/g, ' '))
            .filter(v => {
            const k = norm(v);
            return Boolean(v && k.length >= 3 && /[-/]/.test(v) && !/[-/]\s*$/.test(v));
        });
    }
    function knownCircuitCandidatesFromRecords(sourceRecords) {
        const byNumber = new Map();
        const all = new Map();
        for (const rec of sourceRecords || []) {
            const circuit = recVal(rec, IDX.CIRCUIT).trim();
            if (!circuit)
                continue;
            const num = circuitNumberTokenFromText(circuit);
            const base = norm(circuitBaseWithoutNumber(circuit));
            if (!num || !base)
                continue;
            const key = norm(circuit);
            const item = { circuit, num, base };
            if (!byNumber.has(num))
                byNumber.set(num, new Map());
            byNumber.get(num).set(key, item);
            all.set(key, item);
        }
        return { byNumber, all };
    }
    function uniqueAliasMatchFromItems(aliasBase, primaryBase, items) {
        const matches = [];
        for (const item of items || []) {
            if (!item || !item.circuit || item.base === primaryBase)
                continue;
            if (item.base === aliasBase || item.base.startsWith(aliasBase))
                matches.push(item.circuit.trim());
        }
        const unique = [...new Set(matches)];
        return unique.length === 1 ? unique[0] : '';
    }
    function resolveSecondaryCircuitAlias(aliasToken, primaryCircuit, candidates) {
        const primaryNum = circuitNumberTokenFromText(primaryCircuit);
        const aliasBase = norm(circuitBaseWithoutNumber(aliasToken));
        const primaryBase = norm(circuitBaseWithoutNumber(primaryCircuit));
        if (!aliasBase || aliasBase.length < 3)
            return '';
        if (aliasBase === primaryBase)
            return '';
        const sameNumberGroup = primaryNum && candidates?.byNumber ? candidates.byNumber.get(primaryNum) : null;
        const sameNumberMatch = uniqueAliasMatchFromItems(aliasBase, primaryBase, sameNumberGroup ? sameNumberGroup.values() : []);
        if (sameNumberMatch)
            return sameNumberMatch;
        return uniqueAliasMatchFromItems(aliasBase, primaryBase, candidates?.all ? candidates.all.values() : []);
    }
    function circuitPoleDedupeKey(rec) {
        rec = upgradeRecord(rec);
        const circuit = recNorm(rec, IDX.K_CIRCUIT) || norm(recVal(rec, IDX.CIRCUIT));
        const pole = recNorm(rec, IDX.K_POLE) || norm(cleanPoleDisplay(recVal(rec, IDX.POLE)));
        if (circuit && pole)
            return `cp|${circuit}|${pole}`;
        const label = norm(displayLabelForResult(rec));
        return label ? `label|${label}` : assetDedupeKey(rec);
    }
    function expandSecondaryCircuitAliasRecords(sourceRecords) {
        const candidates = knownCircuitCandidatesFromRecords(sourceRecords);
        if (!candidates?.all || !candidates.all.size)
            return sourceRecords || [];
        const out = Array.isArray(sourceRecords) ? sourceRecords.slice() : [];
        const seenAssets = new Set(out.map(rec => assetDedupeKey(rec)));
        const seenCircuitPoles = new Set(out.map(rec => circuitPoleDedupeKey(rec)));
        const aliasPairs = new Map();
        let added = 0;
        let skippedAmbiguous = 0;
        for (const rec of sourceRecords || []) {
            const primaryCircuit = recVal(rec, IDX.CIRCUIT).trim();
            const poleRaw = recVal(rec, IDX.POLE);
            if (!primaryCircuit || !poleRaw || !poleRaw.includes(','))
                continue;
            const poleMain = cleanPoleMainFromAliasPole(poleRaw);
            if (!poleMain || !/\d/.test(poleMain))
                continue;
            const aliases = secondaryCircuitAliasTokensFromPole(poleRaw);
            if (!aliases.length)
                continue;
            for (const aliasToken of aliases) {
                const targetCircuit = resolveSecondaryCircuitAlias(aliasToken, primaryCircuit, candidates);
                if (!targetCircuit) {
                    skippedAmbiguous++;
                    continue;
                }
                const aliasLabel = `${targetCircuit}-${cleanPoleDisplay(poleMain)}`;
                const aliasSid = `${recVal(rec, IDX.SID)}|ALIAS|${norm(targetCircuit)}|${norm(poleMain)}`;
                const aliasRec = makeRecord(aliasLabel, aliasSid, recVal(rec, IDX.TYPE), Number(rec[IDX.LAT]), Number(rec[IDX.LON]), {
                    siteName: recVal(rec, IDX.SITE_NAME),
                    siteCode: recVal(rec, IDX.SITE_CODE)
                });
                const assetKey = assetDedupeKey(aliasRec);
                const circuitPoleKey = circuitPoleDedupeKey(aliasRec);
                if (seenAssets.has(assetKey) || seenCircuitPoles.has(circuitPoleKey))
                    continue;
                seenAssets.add(assetKey);
                seenCircuitPoles.add(circuitPoleKey);
                out.push(aliasRec);
                aliasPairs.set(`${norm(aliasToken)}=>${norm(targetCircuit)}`, `${aliasToken.trim()} → ${targetCircuit}`);
                added++;
            }
        }
        if (added) {
            const sample = Array.from(aliasPairs.values()).slice(0, 8).join(' • ');
            updatePerfStatus(`Added ${added.toLocaleString()} confirmed shared-circuit alias dots from ${aliasPairs.size.toLocaleString()} pole-label fragments${sample ? `: ${sample}` : ''}.`);
        }
        else if (skippedAmbiguous) {
            updatePerfStatus(`No safe shared-circuit aliases added; ${skippedAmbiguous.toLocaleString()} ambiguous pole-label fragments skipped.`);
        }
        return out;
    }
    async function indexGeojsonObject(geojson, progressLabel = 'Indexing file') {
        const features = extractFeaturesFromImportObject(geojson);
        if (!features.length)
            throw new Error('No features found in file.');
        const recordsOut = [];
        const total = features.length;
        let skipped = 0;
        let crossingSkipped = 0;
        const started = performance.now();
        for (let i = 0; i < total; i++) {
            if (isCrossingLikeProps(features[i]?.properties || features[i]?.attributes || features[i] || {})) {
                skipped++;
                crossingSkipped++;
            }
            else {
                const recs = recordsFromFeatureExpanded(features[i]).filter(rec => rec && !isCrossingRecord(rec));
                if (recs.length)
                    recordsOut.push(...recs);
                else
                    skipped++;
            }
            if (i > 0 && i % IMPORT_YIELD_EVERY === 0) {
                const pct = Math.round((i / total) * 100);
                setStatus(`${progressLabel}… ${pct}% • ${i.toLocaleString()} / ${total.toLocaleString()} features`);
                updatePerfStatus(`Import indexing… ${pct}% • kept ${recordsOut.length.toLocaleString()} • skipped ${skipped.toLocaleString()}`);
                await idleYield();
            }
        }
        if (!recordsOut.length) {
            if (crossingSkipped === total) {
                updatePerfStatus(`Crossing file ignored: ${total.toLocaleString()} crossing features skipped.`);
                return {
                    records: [],
                    totalFeatures: total,
                    keptRecords: 0,
                    skippedRecords: skipped,
                    skippedCrossings: crossingSkipped,
                    crossingFileSkipped: true,
                    elapsedMs: performance.now() - started
                };
            }
            throw new Error('No usable records with coordinates found. This file may need x/y, lon/lat, geometry, or EASTING/NORTHING/ZONE_ fields.');
        }
        const expandedRecords = stripCrossingRecords(expandSecondaryCircuitAliasRecords(recordsOut));
        updatePerfStatus(`Import checked ${total.toLocaleString()} features, kept ${expandedRecords.length.toLocaleString()} records, skipped ${skipped.toLocaleString()} • ${formatElapsed(performance.now() - started)}`);
        return {
            records: expandedRecords,
            totalFeatures: total,
            keptRecords: expandedRecords.length,
            skippedRecords: skipped,
            elapsedMs: performance.now() - started
        };
    }
    function openDb() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, 1);
            req.onupgradeneeded = () => {
                const db = req.result;
                if (!db.objectStoreNames.contains(STORE))
                    db.createObjectStore(STORE, { keyPath: 'id' });
            };
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }
    function idleYield() {
        return new Promise(resolve => {
            if ('requestIdleCallback' in window)
                requestIdleCallback(resolve, { timeout: 120 });
            else
                setTimeout(resolve, 0);
        });
    }
    async function saveLocalRecords(nextRecords, meta, files = importedFiles) {
        const db = await openDb();
        await new Promise((resolve, reject) => {
            const tx = db.transaction(STORE, 'readwrite');
            tx.objectStore(STORE).put({
                id: STORE_KEY,
                schema: DATA_SCHEMA_VERSION,
                updatedAt: Date.now(),
                recordCount: Array.isArray(nextRecords) ? nextRecords.length : 0,
                records: [],
                meta,
                files
            });
            tx.oncomplete = resolve;
            tx.onerror = () => reject(tx.error);
        });
        db.close();
    }
    async function loadLocalRecords() {
        try {
            const db = await openDb();
            const result = await new Promise((resolve, reject) => {
                const req = db.transaction(STORE, 'readonly').objectStore(STORE).get(STORE_KEY);
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => reject(req.error);
            });
            db.close();
            if (result) {
                const files = Array.isArray(result.files) ? result.files.map(file => ({ ...file, records: upgradeRecords(file.records) })) : [];
                const fileRecords = files.some(file => Array.isArray(file.records) && file.records.length);
                const rebuilt = fileRecords ? rebuildImportedRecords(files) : [];
                const fallback = upgradeRecords(Array.isArray(result.records) ? result.records : []);
                const loadedRecords = rebuilt.length ? rebuilt : fallback;
                return {
                    records: loadedRecords,
                    files,
                    meta: { ...(result.meta || {}), updatedAt: result.updatedAt, schema: result.schema || 0, recordCount: result.recordCount || loadedRecords.length }
                };
            }
        }
        catch (err) {
            setStatus(`Could not read imported data: ${err.message || err}`, true);
        }
        return null;
    }
    function rebuildImportedRecords(files) {
        sourceRefCache = null;
        let merged = [];
        for (const file of files || []) {
            merged = mergeRecords(merged, upgradeRecords(Array.isArray(file.records) ? file.records : []));
        }
        return merged;
    }
    function importFileDisplayName(fileOrIndex) {
        let index = -1;
        if (typeof fileOrIndex === 'number') {
            index = fileOrIndex;
        }
        else {
            index = importedFiles.findIndex(file => file && file.id === fileOrIndex?.id);
        }
        return `File ${Math.max(0, index) + 1}`;
    }
    function renderImportedFiles() {
        if (!els.importedFiles)
            return;
        if (!importedFiles.length) {
            els.importedFiles.innerHTML = '<div class="import-empty">No imported files yet.</div>';
            return;
        }
        els.importedFiles.innerHTML = importedFiles.map((file, index) => {
            const count = Number(file.count || (Array.isArray(file.records) ? file.records.length : 0) || 0).toLocaleString();
            const skipped = Number(file.skippedRecords || 0).toLocaleString();
            const safeName = escapeHtml(importFileDisplayName(index));
            const completeClass = Number(file.skippedRecords || 0) === 0 ? ' complete' : '';
            return `<div class="import-file-row${completeClass}">
        <div class="import-file-meta">
          <div class="import-file-name">${safeName}</div>
          <div class="import-file-count">${count} records ready • ${skipped} skipped</div>
        </div>
        <button type="button" class="import-delete-btn" data-delete-file="${escapeHtml(file.id)}">Delete</button>
      </div>`;
        }).join('');
    }
    function updateDataStatus() {
        const fileLabel = importedFiles.length ? ` • ${importedFiles.length} file${importedFiles.length === 1 ? '' : 's'}` : '';
        els.localCount.textContent = records.length ? `${records.length.toLocaleString()} records${fileLabel}` : 'No imported data';
        els.localCount.classList.toggle('ok', Boolean(records.length));
        renderImportedFiles();
        if (mode === 'live') {
            const ready = hasLiveSession();
            const saved = hasSavedLogin();
            setLoginState(ready ? 'Ready' : (saved && loginView !== 'full' ? 'PIN required' : 'Login required'), ready ? 'ok' : 'bad');
            minimiseLoginPanel(ready && !settingsOpen());
            renderLoginFields();
            applyLoginVisibility();
            return;
        }
        setLoginState('Not needed', 'ok');
        minimiseLoginPanel(!settingsOpen());
        renderLoginFields();
        applyLoginVisibility();
    }
    async function clearLocalRecords(options = {}) {
        try {
            const db = await openDb();
            await new Promise((resolve, reject) => {
                const tx = db.transaction(STORE, 'readwrite');
                tx.objectStore(STORE).delete(STORE_KEY);
                tx.oncomplete = resolve;
                tx.onerror = () => reject(tx.error);
            });
            db.close();
        }
        catch { }
        records = [];
        importedFiles = [];
        invalidateLocalIndex();
        dataMeta = null;
        lastResults = [];
        els.searchInput.value = '';
        updateDataStatus();
        renderResults();
        setMode('live');
        if (!options.silent)
            setStatus('Imported data cleared.');
    }
    async function deleteImportedFile(id) {
        const target = importedFiles.find(file => file.id === id);
        if (!target)
            return;
        const displayName = importFileDisplayName(target);
        const confirmed = confirm(`Delete ${displayName}?`);
        if (!confirmed)
            return;
        importedFiles = importedFiles.filter(file => file.id !== id);
        records = rebuildImportedRecords(importedFiles);
        scheduleLocalIndexRebuild();
        dataMeta = importedFiles.length ? { source: 'imported files', updatedAt: Date.now(), fileCount: importedFiles.length, schema: DATA_SCHEMA_VERSION } : null;
        if (importedFiles.length) {
            await saveLocalRecords(records, dataMeta, importedFiles);
            mode = 'local';
            localStorage.setItem(MODE_KEY, mode);
            setMode('local');
            setStatus(`${displayName} deleted.`);
        }
        else {
            await clearLocalRecords({ silent: true });
            setStatus('All imported files deleted.');
        }
        renderImportedFiles();
    }
    async function deleteAllImportedFiles() {
        if (!importedFiles.length) {
            setStatus('No imported files to delete.');
            return;
        }
        const confirmed = confirm('Delete all imported files from this device?');
        if (!confirmed)
            return;
        await clearLocalRecords({ silent: true });
        setStatus('All imported files deleted.');
    }
    function clearSession(message = 'Login cleared.') {
        sessionKey = '';
        sessionExpiry = 0;
        els.loginPass.value = '';
        updateDataStatus();
        if (message)
            setStatus(message);
    }
    function clearAllLogin() {
        clearSavedLogin();
        clearSession('Saved login cleared.');
    }
    function localFileLoaded() {
        return Boolean(records.length || importedFiles.length);
    }
    function moveLoginPanel(target = 'main') {
        if (!els.loginPanel)
            return;
        const parent = target === 'settings' ? els.settingsLoginSlot : els.mainLoginSlot;
        if (parent && els.loginPanel.parentElement !== parent)
            parent.appendChild(els.loginPanel);
    }
    function settingsOpen() {
        return Boolean(els.settingsPanel && !els.settingsPanel.classList.contains('hidden'));
    }
    function setTopRightButtonMode(isSettingsOpen) {
        if (!els.quickMenuBtn)
            return;
        const homeMode = Boolean(isSettingsOpen);
        els.quickMenuBtn.classList.toggle('home-mode', homeMode);
        els.quickMenuBtn.classList.remove('active');
        els.quickMenuBtn.setAttribute('aria-label', homeMode ? 'Home' : 'Settings');
        els.quickMenuBtn.setAttribute('title', homeMode ? 'Home' : 'Settings');
        els.quickMenuBtn.textContent = homeMode ? 'Home' : 'Settings';
        document.body.classList.toggle('mymate-settings-open', homeMode);
    }
    function setInfoLoginExpanded(expanded) {
        if (!els.infoLoginBody || !els.infoLoginToggle)
            return;
        els.infoLoginBody.classList.toggle('hidden', !expanded);
        els.infoLoginToggle.classList.toggle('active', expanded);
        els.infoLoginToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        const hint = els.infoLoginToggle.querySelector('.info-login-toggle-hint');
        if (hint)
            hint.textContent = expanded ? 'Hide' : 'Open';
        if (els.loginPanel) {
            els.loginPanel.classList.remove('hidden');
            minimiseLoginPanel(!expanded);
            if (expanded)
                renderLoginFields();
        }
    }
    function applyLoginVisibility() {
        if (!els.loginPanel)
            return;
        moveLoginPanel('settings');
        if (settingsOpen()) {
            els.loginPanel.classList.remove('hidden');
            els.loginPanel.classList.remove('main-retreated');
            const infoOpen = Boolean(els.infoLoginBody && !els.infoLoginBody.classList.contains('hidden'));
            minimiseLoginPanel(!infoOpen);
        }
        else {
            els.loginPanel.classList.add('hidden');
            els.loginPanel.classList.add('main-retreated');
        }
    }
    function showSettingsMenu() {
        if (!els.settingsPanel)
            return;
        els.settingsPanel.classList.remove('settings-detail-open');
        els.settingsPageSections?.forEach(section => section.classList.remove('active'));
        els.settingsPageBtns?.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
    }
    function showSettingsPage(page = 'results') {
        page = String(page || 'results');
        if (!els.settingsPageSections?.length)
            return;
        if (!els.settingsPageSections.some(section => section.dataset.settingsPage === page))
            page = 'results';
        if (els.settingsPanel)
            els.settingsPanel.classList.add('settings-detail-open');
        els.settingsPageSections.forEach(section => {
            section.classList.toggle('active', section.dataset.settingsPage === page);
        });
        els.settingsPageBtns?.forEach(btn => {
            const active = btn.dataset.settingsPageBtn === page;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        if (page === 'information')
            setInfoLoginExpanded(false);
        if (els.settingsPanel)
            els.settingsPanel.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    function toggleSettings(force) {
        if (!els.settingsPanel)
            return;
        const show = typeof force === 'boolean' ? force : els.settingsPanel.classList.contains('hidden');
        els.settingsPanel.classList.toggle('hidden', !show);
        setTopRightButtonMode(show);
        showQuickMenu(false);
        if (els.settingsBtnText)
            els.settingsBtnText.textContent = show ? 'Home' : 'Settings';
        if (els.settingsBtn) {
            els.settingsBtn.classList.toggle('home-mode', show);
            els.settingsBtn.setAttribute('aria-label', show ? 'Home' : 'Settings');
        }
        if (show) {
            hideCircuitMap();
            showSettingsMenu();
            moveLoginPanel('settings');
            if (els.loginPanel)
                els.loginPanel.classList.remove('hidden');
            if (els.searchPanel)
                els.searchPanel.classList.add('hidden');
            if (els.resultsInfo)
                els.resultsInfo.classList.add('hidden');
            if (els.results)
                els.results.classList.add('hidden');
            if (els.waitingDog)
                els.waitingDog.classList.add('hidden');
            removeNoResultDogPanel();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        else {
            restoreMainView();
        }
    }
    function restoreMainView() {
        hideCircuitMap();
        removeNoResultDogPanel();
        cycleWaitingDogDisplay();
        applyLoginVisibility();
        if (els.searchPanel)
            els.searchPanel.classList.remove('hidden');
        if (els.results)
            els.results.classList.remove('hidden');
        if (els.resultsInfo)
            els.resultsInfo.classList.toggle('hidden', !els.resultsInfo.textContent);
        if (els.waitingDog)
            els.waitingDog.classList.toggle('hidden', lastResults.length > 0);
    }
    async function clearAppCaches() {
        try {
            if ('caches' in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map(key => caches.delete(key)));
            }
        }
        catch { }
    }
    function storageSetStatus(message, isError = false) {
        if (els.storageStatus) {
            els.storageStatus.textContent = message;
            els.storageStatus.classList.toggle('error', !!isError);
        }
    }
    async function clearStorageCache() {
        try {
            storageSetStatus('Clearing cache...');
            const count = await clearMyMateCaches();
            storageSetStatus(count ? 'Cache cleared.' : 'No cache files found.');
            setStatus('Cache cleared.');
            refreshUpdatePanel();
        }
        catch (err) {
            storageSetStatus(err && err.message ? err.message : 'Could not clear cache.', true);
        }
    }
    async function resetCache() {
        await clearLocalRecords({ silent: true });
        await clearAppCaches();
        storageSetStatus('Imported data reset.');
        setStatus('Data reset.');
        toggleSettings(true);
    }
    async function hardReset() {
        const confirmed = confirm('Hard reset GridMap on this device? This clears imported data, saved login and old app files.');
        if (!confirmed)
            return;
        try {
            await clearLocalRecords({ silent: true });
            clearAllLogin();
            localStorage.clear();
            sessionStorage.clear();
            await clearAppCaches();
            if (indexedDB && indexedDB.deleteDatabase) {
                try {
                    indexedDB.deleteDatabase(DB_NAME);
                }
                catch { }
            }
        }
        finally {
            location.reload();
        }
    }
    function setMode(nextMode) {
        mode = nextMode === 'local' ? 'local' : 'live';
        localStorage.setItem(MODE_KEY, mode);
        lastResults = [];
        if (els.liveModeBtn)
            if (els.liveModeBtn)
                els.liveModeBtn.classList.toggle('active', mode === 'live');
        if (els.localModeBtn)
            if (els.localModeBtn)
                els.localModeBtn.classList.toggle('active', mode === 'local');
        if (mode === 'live') {
            els.loginPanel.classList.remove('hidden');
            minimiseLoginPanel(hasLiveSession());
        }
        else {
            els.loginPanel.classList.remove('hidden');
            minimiseLoginPanel(true);
        }
        updateDataStatus();
        applyLoginVisibility();
        renderResults();
    }
    function mergeRecords(base, next) {
        const out = Array.isArray(base) ? base.slice() : [];
        const seen = new Set(out.map(rec => assetDedupeKey(rec)));
        for (const rec of next || []) {
            if (isCrossingRecord(rec))
                continue;
            const key = assetDedupeKey(rec);
            if (!seen.has(key)) {
                seen.add(key);
                out.push(rec);
            }
        }
        return out;
    }
    async function importGeojsonText(text, source) {
        setStatus('Parsing file…');
        let geojson;
        try {
            geojson = JSON.parse(text);
        }
        catch (err) {
            throw new Error(`File is not valid JSON/GeoJSON: ${err.message}`);
        }
        const result = await indexGeojsonObject(geojson, `Indexing ${source || 'file'}`);
        return {
            ...result,
            records: mergeRecords([], result.records)
        };
    }
    async function importGeojsonFiles(files) {
        files = Array.from(files || []).filter(Boolean);
        if (!files.length)
            return;
        await startImportLoading('Importing...');
        setUiBusy(true);
        await requestPersistentStorage();
        try {
            let nextFiles = importedFiles.slice();
            let importedCount = 0;
            let totalFeaturesRead = 0;
            let totalRecordsKept = 0;
            let totalSkipped = 0;
            for (const file of files) {
                setStatus(`Importing ${importFileDisplayName(nextFiles.length)}…`);
                const text = await file.text();
                const result = await importGeojsonText(text, file.name);
                const nextRecords = result.records;
                totalFeaturesRead += result.totalFeatures || 0;
                totalSkipped += result.skippedRecords || 0;
                if (result.crossingFileSkipped) {
                    nextFiles = nextFiles.filter(item => item.name !== file.name);
                    continue;
                }
                nextFiles = nextFiles.filter(item => item.name !== file.name);
                nextFiles.push({
                    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                    name: file.name,
                    count: nextRecords.length,
                    totalFeatures: result.totalFeatures,
                    keptRecords: result.keptRecords,
                    skippedRecords: result.skippedRecords,
                    elapsedMs: result.elapsedMs,
                    addedAt: Date.now(),
                    records: upgradeRecords(nextRecords)
                });
                importedCount += 1;
                totalRecordsKept += nextRecords.length;
            }
            importedFiles = nextFiles;
            records = rebuildImportedRecords(importedFiles);
            scheduleLocalIndexRebuild();
            dataMeta = {
                source: 'imported files',
                updatedAt: Date.now(),
                fileCount: importedFiles.length,
                totalFeaturesRead,
                totalRecordsKept: records.length,
                totalSkipped,
                schema: DATA_SCHEMA_VERSION
            };
            await saveLocalRecords(records, dataMeta, importedFiles);
            mode = 'local';
            localStorage.setItem(MODE_KEY, mode);
            lastResults = [];
            setMode('local');
            updateDataStatus();
            renderResults();
            const skippedText = totalSkipped ? ` • ${totalSkipped.toLocaleString()} skipped` : ' • complete';
            const importedLabel = importedCount ? `Imported ${importedCount} file${importedCount === 1 ? '' : 's'}: ${records.length.toLocaleString()} records${skippedText}.` : `Crossing files ignored: ${totalFeaturesRead.toLocaleString()} features skipped.`;
            setStatus(importedLabel);
            updatePerfStatus(`Import complete: ${records.length.toLocaleString()} records ready${skippedText}.`);
            els.searchInput.focus();
        }
        finally {
            setUiBusy(false);
            if (els.localGeojson)
                els.localGeojson.value = '';
            stopLoading();
        }
    }
    function setUiBusy(isBusy) {
        els.searchBtn.disabled = isBusy;
        els.loginBtn.disabled = isBusy;
        if (els.liveModeBtn)
            els.liveModeBtn.disabled = isBusy;
        if (els.localModeBtn)
            els.localModeBtn.disabled = isBusy;
        els.switchLoginBtn.disabled = isBusy;
    }
    async function loginWithCredentials(username, password) {
        username = String(username || '').trim();
        password = String(password || '');
        if (!username || !password)
            throw new Error('Enter username and password.');
        const response = await timedFetch(A0, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                username,
                password,
                client: 'requestip',
                expiration: '60',
                f: 'json'
            })
        });
        const text = await response.text();
        if (!response.ok)
            throw new Error('Login failed.');
        let json;
        try {
            json = JSON.parse(text);
        }
        catch {
            throw new Error('Login failed.');
        }
        if (json.error)
            throw new Error('Login failed.');
        const nextKey = json['to' + 'ken'];
        if (!nextKey)
            throw new Error('Login failed.');
        sessionKey = nextKey;
        const expires = Number(json.expires || 0);
        sessionExpiry = expires > Date.now() ? expires : Date.now() + 55 * 60 * 1000;
        setLoginState('Ready', 'ok');
        updateDataStatus();
        return sessionKey;
    }
    async function login() {
        if (hasSavedLogin() && loginView !== 'full')
            return loginWithPin();
        const username = els.loginUser.value.trim();
        const password = els.loginPass.value;
        const newPin = els.newPin.value.trim();
        if (!username || !password)
            throw new Error('Enter username and password.');
        const key = await loginWithCredentials(username, password);
        if (newPin) {
            await saveLoginWithPin(username, password, newPin);
            loginView = 'pin';
        }
        els.loginPass.value = '';
        els.newPin.value = '';
        updateDataStatus();
        return key;
    }
    async function loginWithPin() {
        const pin = els.pinCode.value.trim();
        if (!pin) {
            updateDataStatus();
            els.loginPanel.classList.remove('hidden');
            minimiseLoginPanel(false);
            setTimeout(() => els.pinCode.focus(), 0);
            throw new Error('Enter PIN to search.');
        }
        const creds = await readLoginWithPin(pin);
        let key;
        try {
            key = await loginWithCredentials(creds.username, creds.password);
        }
        catch (err) {
            loginView = 'full';
            updateDataStatus();
            throw new Error('Saved login failed. Use full login.');
        }
        els.pinCode.value = '';
        updateDataStatus();
        return key;
    }
    async function loginButton() {
        setUiBusy(true);
        try {
            setStatus(hasSavedLogin() && loginView !== 'full' ? 'Unlocking…' : 'Logging in…');
            await login();
            setMode('live');
            setStatus('Ready. Search when ready.');
            els.searchInput.focus();
        }
        catch (err) {
            sessionKey = '';
            sessionExpiry = 0;
            updateDataStatus();
            minimiseLoginPanel(false);
            const msg = err.message || 'Login failed.';
            setStatus(msg, true);
            if (/PIN failed/i.test(msg))
                showLoginView('pin');
        }
        finally {
            setUiBusy(false);
        }
    }
    async function ensureSession() {
        if (hasLiveSession())
            return sessionKey;
        return login();
    }
    const CIRCUIT_CODE_SET = new Set(['11', '12', '17', '21', '31', '41', '51', '61', '62', '71', '72', '81', '82', '91', '92', '93']);
    function dedupeArrays(list) {
        const out = [];
        const seen = new Set();
        for (const arr of list) {
            const clean = (arr || []).map(x => String(x || '').toUpperCase()).filter(Boolean);
            if (!clean.length)
                continue;
            const key = clean.join('|');
            if (!seen.has(key)) {
                seen.add(key);
                out.push(clean);
            }
        }
        return out;
    }
    function splitAlphaOptions(alpha) {
        alpha = String(alpha || '').toUpperCase().replace(/[^A-Z]/g, '');
        if (!alpha)
            return [];
        const opts = [];
        const add = arr => opts.push(arr.filter(Boolean));
        if (alpha.length <= 3)
            add([alpha]);
        if (alpha.length === 4) {
            add([alpha.slice(0, 1), alpha.slice(1)]);
            add([alpha.slice(0, 2), alpha.slice(2)]);
        }
        if (alpha.length === 5) {
            add([alpha.slice(0, 3), alpha.slice(3)]);
            add([alpha.slice(0, 2), alpha.slice(2)]);
        }
        if (alpha.length === 6) {
            add([alpha.slice(0, 3), alpha.slice(3)]);
            add([alpha.slice(0, 2), alpha.slice(2, 4), alpha.slice(4)]);
        }
        if (alpha.length === 7) {
            add([alpha.slice(0, 3), alpha.slice(3, 4), alpha.slice(4)]);
            add([alpha.slice(0, 3), alpha.slice(3)]);
            add([alpha.slice(0, 1), alpha.slice(1, 4), alpha.slice(4)]);
        }
        if (alpha.length === 8) {
            add([alpha.slice(0, 3), alpha.slice(3, 6), alpha.slice(6)]);
            add([alpha.slice(0, 2), alpha.slice(2, 5), alpha.slice(5)]);
        }
        if (alpha.length >= 9)
            add(alpha.match(/.{1,3}/g) || [alpha]);
        add([alpha]);
        return dedupeArrays(opts);
    }
    function cleanPole(value) {
        return String(value || '').toUpperCase().replace(/[^0-9A-Z]/g, '').replace(/^0+(?=\d)/, '');
    }
    function paddedPoleVariants(value) {
        const clean = cleanPole(value);
        const variants = [];
        if (!clean)
            return variants;
        variants.push(clean);
        if (/^\d{1,4}$/.test(clean))
            variants.push(clean.padStart(4, '0'));
        return [...new Set(variants)];
    }
    function isCircuitCode(value) {
        value = String(value || '').toUpperCase();
        return CIRCUIT_CODE_SET.has(value) || /^X\d[A-Z]?$/.test(value);
    }
    function readTailParts(tail) {
        tail = String(tail || '').toUpperCase();
        if (!tail)
            return { circuitNo: '', poleNo: '' };
        const x = tail.match(/^(X\d[A-Z]?)(\d+[A-Z]?)?$/);
        if (x)
            return { circuitNo: x[1], poleNo: x[2] || '' };
        if (/^\d+$/.test(tail)) {
            if (tail.length > 2 && isCircuitCode(tail.slice(0, 2))) {
                return { circuitNo: tail.slice(0, 2), poleNo: tail.slice(2) };
            }
            if (tail.length === 2 && isCircuitCode(tail))
                return { circuitNo: tail, poleNo: '' };
            return { circuitNo: '', poleNo: tail };
        }
        const m = tail.match(/^(\d{2})(\d+[A-Z]?)$/);
        if (m && isCircuitCode(m[1]))
            return { circuitNo: m[1], poleNo: m[2] };
        return { circuitNo: '', poleNo: tail };
    }
    function tokenAlphaTail(token) {
        token = String(token || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
        const m = token.match(/^([A-Z]+)([0-9X][0-9A-Z]*)?$/);
        if (!m)
            return null;
        return { alpha: m[1] || '', tail: m[2] || '' };
    }
    function smartQueryInterpretations(raw) {
        const upper = String(raw || '').toUpperCase().trim();
        const tokens = upper.split(/[^A-Z0-9]+/).map(t => t.trim()).filter(Boolean);
        const compact = norm(raw);
        const out = [];
        const add = interp => {
            const alphaParts = (interp.alphaParts || []).map(norm).filter(Boolean);
            const circuitNo = norm(interp.circuitNo || '');
            const poleNo = cleanPole(interp.poleNo || '');
            if (!alphaParts.length && !circuitNo && !poleNo)
                return;
            const key = `${alphaParts.join('-')}|${circuitNo}|${poleNo}`;
            if (!out.some(x => x.key === key))
                out.push({ alphaParts, circuitNo, poleNo, key });
        };
        const alphaTokens = tokens.filter(t => /^[A-Z]+$/.test(t));
        const numberTokens = tokens.filter(t => /^(?:\d+[A-Z]?|X\d[A-Z]?)$/.test(t));
        if (alphaTokens.length) {
            let circuitNo = '';
            let poleNo = '';
            if (numberTokens.length >= 2) {
                circuitNo = isCircuitCode(numberTokens[0]) ? numberTokens[0] : '';
                poleNo = numberTokens[numberTokens.length - 1];
            }
            else if (numberTokens.length === 1) {
                circuitNo = isCircuitCode(numberTokens[0]) ? numberTokens[0] : '';
                poleNo = circuitNo ? '' : numberTokens[0];
            }
            add({ alphaParts: alphaTokens, circuitNo, poleNo });
        }
        if (tokens.length >= 1) {
            const first = tokenAlphaTail(tokens[0]);
            if (first && first.alpha.length > 3) {
                const tailParts = readTailParts(first.tail);
                const extraNums = tokens.slice(1).filter(t => /^(?:\d+[A-Z]?|X\d[A-Z]?)$/.test(t));
                for (const alphaParts of splitAlphaOptions(first.alpha)) {
                    let circuitNo = tailParts.circuitNo;
                    let poleNo = tailParts.poleNo;
                    if (extraNums.length >= 1) {
                        if (!circuitNo && isCircuitCode(extraNums[0]) && extraNums.length >= 2)
                            circuitNo = extraNums[0];
                        poleNo = extraNums[extraNums.length - 1];
                    }
                    add({ alphaParts, circuitNo, poleNo });
                }
            }
        }
        const whole = tokenAlphaTail(compact);
        if (whole && whole.alpha) {
            const tailParts = readTailParts(whole.tail);
            for (const alphaParts of splitAlphaOptions(whole.alpha))
                add({ alphaParts, ...tailParts });
        }
        return out.slice(0, 12);
    }
    function candidateTermSets(raw) {
        const upper = String(raw || '').toUpperCase().trim();
        const baseTokens = upper.split(/[^A-Z0-9]+/).map(t => t.trim()).filter(Boolean);
        const sets = [];
        const add = (arr) => {
            arr = arr.map(x => String(x || '').toUpperCase()).filter(Boolean);
            if (!arr.length)
                return;
            const key = arr.join('|');
            if (!sets.some(s => s.key === key))
                sets.push({ terms: arr, key });
        };
        for (const interp of smartQueryInterpretations(raw)) {
            add([...interp.alphaParts, interp.circuitNo, interp.poleNo]);
            add([...interp.alphaParts, interp.circuitNo]);
        }
        add(baseTokens);
        const compact = norm(raw);
        const sid = compact.match(/^T\d+[A-Z]?$/);
        if (sid)
            add([compact]);
        const m = compact.match(/^([A-Z]+)([0-9X][0-9A-Z]*)?$/);
        if (m) {
            const alpha = m[1] || '';
            const tail = m[2] || '';
            const alphaOptions = splitAlphaOptions(alpha);
            const numericOptions = [];
            if (tail) {
                numericOptions.push([tail]);
                const parsed = readTailParts(tail);
                numericOptions.push([parsed.circuitNo, parsed.poleNo].filter(Boolean));
                if (/^\d+$/.test(tail) && tail.length > 2)
                    numericOptions.push([tail.slice(0, 2), tail.slice(2)]);
                if (/^\d+$/.test(tail) && tail.length > 3)
                    numericOptions.push([tail.slice(0, 2), tail.slice(-3)]);
            }
            else
                numericOptions.push([]);
            for (const a of alphaOptions)
                for (const n of numericOptions)
                    add([...a, ...n]);
        }
        const nums = upper.match(/\d+[A-Z]?/g) || [];
        const lastNum = nums[nums.length - 1];
        if (lastNum && /^\d{1,4}[A-Z]?$/.test(lastNum)) {
            add([lastNum.padStart(4, '0')]);
            add([lastNum.replace(/^0+(?=\d)/, '')]);
        }
        return sets.slice(0, 12);
    }
    function labelHasAllTerms(rec, terms) {
        return terms.every(t => {
            const k = norm(t);
            return k && (rec[IDX.K_LABEL].includes(k) || rec[IDX.K_COMBO].includes(k) || rec[IDX.K_CIRCUIT].includes(k) || rec[IDX.K_SID].includes(k));
        });
    }
    function borrowedPoleForSearch(rec) {
        try {
            rec = upgradeRecord(rec);
            if (typeof sharedPoleFromCoordForMap !== 'function')
                return '';
            const borrowed = cleanPoleDisplay(sharedPoleFromCoordForMap(rec, recVal(rec, IDX.CIRCUIT)));
            return borrowed && !/^0+$/.test(borrowed) ? borrowed : '';
        }
        catch {
            return '';
        }
    }
    function searchableTextForRecord(rec) {
        rec = upgradeRecord(rec);
        const borrowedPole = borrowedPoleForSearch(rec);
        const borrowedPadded = /^\d{1,4}$/.test(borrowedPole) ? borrowedPole.padStart(4, '0') : '';
        return [
            recVal(rec, IDX.LABEL),
            recVal(rec, IDX.SID),
            recVal(rec, IDX.TYPE),
            recVal(rec, IDX.CIRCUIT),
            recVal(rec, IDX.POLE),
            recVal(rec, IDX.POLE_NZ),
            borrowedPole,
            borrowedPadded,
            borrowedPole ? `${recVal(rec, IDX.CIRCUIT)}-${borrowedPole}` : '',
            recVal(rec, IDX.SITE_NAME),
            recVal(rec, IDX.SITE_CODE),
            aliasTextForRecord(rec)
        ].join(' ');
    }
    function simpleTextRank(rec, qKey, raw) {
        if (!qKey)
            return 0;
        rec = upgradeRecord(rec);
        const text = norm(searchableTextForRecord(rec));
        if (!text)
            return 0;
        let score = 0;
        if (text === qKey)
            score += 1200;
        if (text.startsWith(qKey))
            score += 700;
        if (text.includes(qKey))
            score += 420;
        const tokens = searchableTextForRecord(rec).split(/[^A-Z0-9]+/i).map(norm).filter(Boolean);
        if (tokens.includes(qKey))
            score += 650;
        if (tokens.some(t => t.startsWith(qKey) && qKey.length >= 2))
            score += 520;
        if (tokens.some(t => t.includes(qKey) && qKey.length >= 3))
            score += 340;
        const rawParts = String(raw || '').split(/[^A-Z0-9]+/i).map(norm).filter(Boolean);
        if (rawParts.length > 1 && rawParts.every(p => text.includes(p)))
            score += 300 + rawParts.length * 30;
        return score;
    }
    function recordPoleMatches(rec, poleNo) {
        rec = upgradeRecord(rec);
        const variants = paddedPoleVariants(poleNo).map(norm);
        if (!variants.length)
            return true;
        const recPole = norm(recVal(rec, IDX.POLE_NZ));
        const recPoleRaw = norm(recVal(rec, IDX.POLE));
        const recPoleKey = recNorm(rec, IDX.K_POLE);
        const borrowedPole = norm(borrowedPoleForSearch(rec));
        const borrowedPadded = /^\d{1,4}$/.test(borrowedPole) ? borrowedPole.padStart(4, '0') : borrowedPole;
        return variants.includes(recPole) || variants.includes(recPoleRaw) || variants.includes(recPoleKey) || variants.includes(borrowedPole) || variants.includes(borrowedPadded);
    }
    function recordMatchesSmartInterp(rec, interp, requirePole = false) {
        if (!interp)
            return false;
        rec = upgradeRecord(rec);
        const kCircuit = recNorm(rec, IDX.K_CIRCUIT);
        const kLabel = recNorm(rec, IDX.K_LABEL);
        const kSiteName = recNorm(rec, IDX.K_SITE_NAME);
        const kSiteCode = recNorm(rec, IDX.K_SITE_CODE);
        const searchBlob = norm(searchableTextForRecord(rec));
        const alphaOk = !interp.alphaParts.length || interp.alphaParts.every(part => {
            const k = norm(part);
            return kCircuit.includes(k) || kLabel.includes(k) || kSiteName.includes(k) || kSiteCode.includes(k) || searchBlob.includes(k);
        });
        if (!alphaOk)
            return false;
        const circuitNo = norm(interp.circuitNo || '');
        if (circuitNo && !(kCircuit.includes(circuitNo) || kLabel.includes(circuitNo) || searchBlob.includes(circuitNo)))
            return false;
        if ((requirePole || interp.poleNo) && interp.poleNo && !recordPoleMatches(rec, interp.poleNo))
            return false;
        return true;
    }
    function smartRankScore(rec, raw) {
        rec = upgradeRecord(rec);
        let best = 0;
        for (const interp of smartQueryInterpretations(raw)) {
            if (!recordMatchesSmartInterp(rec, interp, false))
                continue;
            if (interp.poleNo && !recordPoleMatches(rec, interp.poleNo))
                continue;
            let score = 420 + interp.alphaParts.length * 90;
            if (interp.circuitNo)
                score += 420;
            if (interp.poleNo)
                score += 980;
            if (interp.poleNo && recNorm(rec, IDX.K_POLE) === norm(interp.poleNo).padStart(4, '0'))
                score += 180;
            best = Math.max(best, score);
        }
        return best;
    }
    function exactSmartFilterRecords(found, raw) {
        const interps = smartQueryInterpretations(raw).filter(i => i.poleNo && i.alphaParts.length);
        if (!interps.length)
            return found;
        const exact = found.filter(item => {
            const rec = upgradeRecord(item.rec || item);
            try {
                return interps.some(interp => recordMatchesSmartInterp(rec, interp, true));
            }
            catch {
                return false;
            }
        });
        return exact.length ? exact : found;
    }
    function exactSmartFilterRecords(found, raw) {
        const interps = smartQueryInterpretations(raw).filter(i => i.poleNo && i.alphaParts.length);
        if (!interps.length)
            return found;
        const exact = found.filter(item => {
            const rec = item.rec || item;
            return interps.some(interp => recordMatchesSmartInterp(rec, interp, true));
        });
        return exact.length ? exact : found;
    }
    function safeField(name) {
        return /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(name || ''));
    }
    function fieldsFromInfo(info) {
        return Array.isArray(info?.fields) ? info.fields.map(f => ({
            name: String(f.name || ''),
            type: String(f.type || '')
        })).filter(f => safeField(f.name)) : [];
    }
    function fieldNames(info) {
        return fieldsFromInfo(info).map(f => f.name);
    }
    function pickFields(info, kind) {
        const fields = fieldsFromInfo(info);
        const names = fields.map(f => f.name);
        const exists = lower => names.find(n => n.toLowerCase() === lower.toLowerCase());
        if (kind === 'line') {
            return {
                label: exists('trmsn_line_gis_label') || exists('TRMSN_LINE_GIS_LABEL') || names.find(n => /label|line/i.test(n)) || '',
                sid: exists('structure_id') || exists('STRUCTURE_ID') || names.find(n => /structure.*id|asset.*id|objectid/i.test(n)) || '',
                type: exists('pole_type') || exists('POLE_TYPE') || names.find(n => /type|class|category/i.test(n)) || ''
            };
        }
        const stringNames = fields.filter(f => /String/i.test(f.type)).map(f => f.name);
        const search = stringNames.filter(n => /(name|label|site|facility|substation|terminal|station|depot|asset|description|abbr|abbrev|code|type)/i.test(n)).slice(0, 18);
        const fallback = stringNames.slice(0, 12);
        return {
            search: search.length ? search : fallback,
            label: names.find(n => /(name|label|site|facility|substation|terminal|station|depot).*name/i.test(n)) || names.find(n => /name|label|description/i.test(n)) || '',
            sid: names.find(n => /(asset|site|facility|structure).*id/i.test(n)) || names.find(n => /^objectid$/i.test(n)) || '',
            type: names.find(n => /(asset|site|facility|station).*type/i.test(n)) || names.find(n => /type|class|category/i.test(n)) || ''
        };
    }
    function genericFieldClauses(raw, fields) {
        const q = String(raw || '').trim();
        const clauses = [];
        const add = where => { if (where && !clauses.includes(where))
            clauses.push(where); };
        fields = (fields || []).filter(safeField).slice(0, 18);
        if (!q || !fields.length)
            return clauses;
        const tokens = q.toUpperCase().split(/[^A-Z0-9]+/).map(t => t.trim()).filter(Boolean).slice(0, 6);
        const compact = norm(q);
        const termSets = [];
        const pushTerms = arr => {
            arr = (arr || []).map(x => String(x || '').toUpperCase()).filter(Boolean);
            if (!arr.length)
                return;
            const key = arr.join('|');
            if (!termSets.some(s => s.key === key))
                termSets.push({ key, terms: arr });
        };
        pushTerms(tokens);
        for (const interp of smartQueryInterpretations(q))
            pushTerms([...interp.alphaParts, interp.circuitNo, interp.poleNo]);
        if (compact && compact.length <= 24)
            pushTerms([compact]);
        for (const set of termSets) {
            const andParts = set.terms.slice(0, 5).map(term => {
                const safe = sqlText(term).slice(0, 40);
                return '(' + fields.map(f => `UPPER(${f}) LIKE '%${safe}%'`).join(' OR ') + ')';
            });
            if (andParts.length)
                add('(' + andParts.join(' AND ') + ')');
        }
        if (compact && compact.length <= 8) {
            const safe = sqlText(compact);
            add('(' + fields.map(f => `UPPER(${f}) = '${safe}'`).join(' OR ') + ')');
        }
        return clauses.slice(0, 10);
    }
    function liveWhereClauses(raw) {
        const q = String(raw || '').trim();
        const compact = norm(q);
        const clauses = [];
        const add = (where) => { if (where && !clauses.includes(where))
            clauses.push(where); };
        if (/^T\d+[A-Z]?$/i.test(compact)) {
            add(`UPPER(structure_id) = '${sqlText(compact)}'`);
            add(`UPPER(structure_id) LIKE '%${sqlText(compact)}%'`);
        }
        if (aliasNameForCode(compact)) {
            const safeCode = sqlText(compact).slice(0, 40);
            const safeName = sqlText(aliasNameForCode(compact).toUpperCase()).slice(0, 80);
            add(`(UPPER(trmsn_line_gis_label) LIKE '${safeCode}-%' OR UPPER(trmsn_line_gis_label) LIKE '%-${safeCode}-%' OR UPPER(trmsn_line_gis_label) LIKE '%/${safeCode}-%' OR UPPER(trmsn_line_gis_label) LIKE '%/${safeCode}/%' OR UPPER(trmsn_line_gis_label) LIKE '%-${safeCode}/%' OR UPPER(trmsn_line_gis_label) LIKE '%/${safeCode} %' OR UPPER(trmsn_line_gis_label) LIKE '%-${safeCode} %')`);
            add(`(UPPER(trmsn_line_gis_label) LIKE '%${safeName}%')`);
        }
        for (const interp of smartQueryInterpretations(q)) {
            const terms = [...interp.alphaParts, interp.circuitNo].filter(Boolean);
            if (!terms.length)
                continue;
            let where = terms.map(t => `UPPER(trmsn_line_gis_label) LIKE '%${sqlText(t)}%'`).join(' AND ');
            if (interp.poleNo) {
                const variants = paddedPoleVariants(interp.poleNo);
                const poleWhere = variants.map(v => `UPPER(trmsn_line_gis_label) LIKE '%-${sqlText(v)}%'`).join(' OR ');
                if (poleWhere)
                    where = `(${where}) AND (${poleWhere})`;
            }
            add(`(${where})`);
        }
        const termSets = candidateTermSets(q);
        for (const set of termSets) {
            const terms = set.terms.filter(t => t && t.length <= 24);
            if (!terms.length)
                continue;
            const labelAnds = terms.map(t => `UPPER(trmsn_line_gis_label) LIKE '%${sqlText(t)}%'`).join(' AND ');
            add(`(${labelAnds})`);
        }
        const nums = q.toUpperCase().match(/\d+[A-Z]?/g) || [];
        const lastNum = nums[nums.length - 1];
        if (lastNum && /^\d{1,4}[A-Z]?$/.test(lastNum)) {
            const clean = sqlText(lastNum.replace(/^0+(?=\d)/, ''));
            const padded = sqlText(lastNum.replace(/^0+(?=\d)/, '').padStart(4, '0'));
            add(`(UPPER(trmsn_line_gis_label) LIKE '%-${padded}%' OR UPPER(trmsn_line_gis_label) LIKE '%-${clean}%')`);
        }
        return clauses.length ? clauses : [`UPPER(trmsn_line_gis_label) LIKE '%${sqlText(q).slice(0, 40)}%'`];
    }
    async function fetchLayerInfo(layer, key, signal) {
        if (layerInfoCache.has(layer.url))
            return layerInfoCache.get(layer.url);
        const params = new URLSearchParams({ f: 'json', ['to' + 'ken']: key });
        const response = await timedFetch(`${layer.url}?${params.toString()}`, { signal }, 18000);
        const text = await response.text();
        if (!response.ok)
            throw new Error('Layer unavailable.');
        let json;
        try {
            json = JSON.parse(text);
        }
        catch {
            throw new Error('Layer unavailable.');
        }
        if (json.error)
            throw new Error('Layer unavailable.');
        layerInfoCache.set(layer.url, json);
        return json;
    }
    async function discoverLayers(key, signal) {
        if (liveLayerCache)
            return liveLayerCache;
        liveLayerCache = [...BASE_LAYERS];
        Promise.allSettled(ROOT_SERVICES.map(async (base) => {
            const params = new URLSearchParams({ f: 'json', ['to' + 'ken']: key });
            const response = await timedFetch(`${base}?${params.toString()}`, { signal }, 6000);
            const text = await response.text();
            if (!response.ok)
                return;
            const json = JSON.parse(text);
            const layers = Array.isArray(json?.layers) ? json.layers : [];
            const seen = new Set(liveLayerCache.map(l => l.url));
            for (const layer of layers) {
                const name = String(layer.name || '');
                const id = layer.id;
                if (id === undefined || id === null)
                    continue;
                if (!/(depot|substation|terminal|power\s*station|station)/i.test(name))
                    continue;
                const url = `${base}/${id}`;
                if (!seen.has(url)) {
                    seen.add(url);
                    liveLayerCache.push({ id: `auto-${id}`, url, kind: 'site' });
                }
            }
        })).catch(() => { });
        return liveLayerCache;
    }
    function clausesForLayer(raw, layer, info) {
        if (layer.kind === 'line')
            return liveWhereClauses(raw);
        const picked = pickFields(info, layer.kind);
        let clauses = genericFieldClauses(raw, picked.search);
        const compact = norm(raw);
        if (layer.kind === 'site') {
            const fields = (picked.search || []).filter(safeField).slice(0, 18);
            const addPriorityClause = (where) => {
                if (where && !clauses.includes(where))
                    clauses.unshift(where);
            };
            const aliasName = aliasNameForCode(compact);
            if (fields.length && aliasName) {
                const safeCode = sqlText(compact).slice(0, 40);
                const safeName = sqlText(aliasName.toUpperCase()).slice(0, 80);
                addPriorityClause('(' + fields.map(f => `UPPER(${f}) LIKE '%${safeName}%'`).join(' OR ') + ')');
                addPriorityClause('(' + fields.map(f => `UPPER(${f}) = '${safeCode}'`).join(' OR ') + ')');
            }
            if (fields.length && compact.length >= 3 && /^[A-Z]+$/.test(compact)) {
                const safe = sqlText(compact).slice(0, 40);
                const prefix = '(' + fields.map(f => `UPPER(${f}) LIKE '${safe}%'`).join(' OR ') + ')';
                addPriorityClause(prefix);
            }
        }
        return clauses;
    }
    async function fetchLiveQuery(layer, where, key, signal) {
        const params = new URLSearchParams({
            where,
            outFields: '*',
            returnGeometry: 'true',
            outSR: '4326',
            resultRecordCount: String(Math.max(LIVE_RESULT_LIMIT, getResultLimit() * 2)),
            f: 'geojson',
            ['to' + 'ken']: key
        });
        let response = await timedFetch(`${layer.url}/query?${params.toString()}`, { signal }, 25000);
        let text = await response.text();
        if (!response.ok)
            throw new Error('Search unavailable.');
        let json;
        try {
            json = JSON.parse(text);
        }
        catch {
            throw new Error('Search unavailable.');
        }
        if (json.error || !Array.isArray(json.features)) {
            const fallback = new URLSearchParams(params);
            fallback.set('f', 'json');
            response = await timedFetch(`${layer.url}/query?${fallback.toString()}`, { signal }, 25000);
            text = await response.text();
            if (!response.ok)
                throw new Error('Search unavailable.');
            try {
                json = JSON.parse(text);
            }
            catch {
                throw new Error('Search unavailable.');
            }
            if (json.error)
                throw new Error('Search unavailable.');
        }
        return recordsFromArcJson(json);
    }
    function isSingleLetterSearch(raw) {
        return /^[A-Z]$/i.test(String(raw || '').trim());
    }
    function isPoleTowerRecord(rec) {
        const label = recVal(rec, IDX.LABEL);
        const type = recVal(rec, IDX.TYPE);
        const hasPole = Boolean(rec && rec[IDX.POLE]);
        const looksLikeLineLabel = /\b(?:\d{2}|X\d[A-Z]?)\s*-\s*\d+[A-Z]?\b/i.test(label);
        const typeLooksPoleTower = /\b(pole|tower|structure|wood|steel|concrete|lattice)\b/i.test(type);
        return hasPole || looksLikeLineLabel || typeLooksPoleTower;
    }
    function circuitRecordFromLine(rec) {
        const circuit = recVal(rec, IDX.CIRCUIT).trim();
        if (!circuit || !hasGps(rec))
            return null;
        return makeRecord(circuit, `CIRCUIT:${circuit}`, 'Circuit', rec[IDX.LAT], rec[IDX.LON], {});
    }
    function circuitEndpointPreference(rec, raw) {
        const queryCodes = aliasCodesForQuery(raw);
        if (!queryCodes.length)
            return 'start';
        const endpoints = circuitEndpointCodes(rec);
        if (!endpoints.length)
            return 'start';
        const first = endpoints[0];
        const matched = endpoints.filter(code => queryCodes.includes(code));
        if (!matched.length)
            return 'start';
        if (matched.some(code => code !== first))
            return 'end';
        return 'start';
    }
    function numericPoleForAnchor(rec) {
        const pole = norm(recVal(rec, IDX.POLE_NZ));
        if (!/^\d+$/.test(pole))
            return null;
        const n = Number(pole);
        return Number.isFinite(n) && n > 0 ? n : null;
    }
    function circuitAnchorScore(rec, raw) {
        rec = upgradeRecord(rec);
        let score = 0;
        const n = numericPoleForAnchor(rec);
        const pref = circuitEndpointPreference(rec, raw);
        if (!isHiddenZeroGAsset(rec))
            score += 100000;
        if (hasGps(rec) && looksLikeWA(rec[IDX.LON], rec[IDX.LAT]))
            score += 10000;
        if (n !== null) {
            score += pref === 'end' ? Math.min(n, 9999) : (10000 - Math.min(n, 9999));
        }
        return score;
    }
    function betterCircuitAnchor(current, candidate, raw) {
        if (!current)
            return candidate;
        return circuitAnchorScore(candidate, raw) > circuitAnchorScore(current, raw) ? candidate : current;
    }
    function aliasAnchorScore(rec, raw, code) {
        rec = upgradeRecord(rec);
        let score = circuitAnchorScore(rec, code || raw);
        const endpoints = circuitEndpointCodes(rec);
        if (code && endpoints.includes(code))
            score += 50000;
        return score;
    }
    function betterAliasAnchor(current, candidate, raw, code) {
        if (!current)
            return candidate;
        return aliasAnchorScore(candidate, raw, code) > aliasAnchorScore(current, raw, code) ? candidate : current;
    }
    function primaryAliasCodeForSearch(raw) {
        const codes = aliasCodesForQuery(raw);
        if (!codes.length)
            return '';
        const q = norm(raw);
        if (aliasNameForCode(q))
            return q;
        if (SITE_ALIAS_BY_NAME[q])
            return SITE_ALIAS_BY_NAME[q];
        return codes[0];
    }
    function aliasPriorityRecordFromLine(rec, raw) {
        const directCode = aliasNameForCode(norm(raw)) ? norm(raw) : '';
        const code = directCode || primaryAliasCodeForSearch(raw);
        const name = aliasNameForCode(code);
        if (!code || !name || !aliasMatchCodesForRecord(rec, code).includes(code) || !hasGps(rec))
            return null;
        const q = norm(raw);
        const label = q && norm(name).includes(q) && q !== code ? name : code;
        return makeRecord(label, `ALIAS:${code}`, 'Alias', rec[IDX.LAT], rec[IDX.LON], { siteName: name, siteCode: code });
    }
    function displayRecordForSearch(rec, raw) {
        if (isCrossingRecord(rec) || isHiddenZeroGAsset(rec))
            return null;
        if (isPoleTowerRecord(rec) && aliasCodesForQuery(raw).length && !isCircuitOnlySearch(raw))
            return null;
        if (isPoleTowerRecord(rec) && (isSingleLetterSearch(raw) || (!isCircuitOnlySearch(raw) && baseQueryMatchesCircuit(rec, raw))))
            return circuitRecordFromLine(rec);
        return rec;
    }
    function rankRecord(rec, qKey, raw) {
        if (!qKey)
            return 0;
        rec = upgradeRecord(rec);
        let score = smartRankScore(rec, raw) + simpleTextRank(rec, qKey, raw);
        const kLabel = recNorm(rec, IDX.K_LABEL);
        const kCombo = recNorm(rec, IDX.K_COMBO);
        const kSid = recNorm(rec, IDX.K_SID);
        const kCircuit = recNorm(rec, IDX.K_CIRCUIT);
        const kPole = recNorm(rec, IDX.K_POLE);
        const kSiteName = recNorm(rec, IDX.K_SITE_NAME);
        const kSiteCode = recNorm(rec, IDX.K_SITE_CODE);
        const poleNoZero = recVal(rec, IDX.POLE_NZ);
        if (!isCircuitOnlySearch(raw) && aliasQueryMatchesCircuit(rec, raw))
            score += isPoleTowerRecord(rec) ? 2400 : 1800;
        if (baseQueryMatchesCircuit(rec, raw))
            score += isPoleTowerRecord(rec) ? 2200 : 1700;
        if (isCircuitOnlySearch(raw) && isPoleTowerRecord(rec) && queryCircuitNumber(raw) && norm(recVal(rec, IDX.POLE_NZ)) === queryCircuitNumber(raw))
            score += 6200;
        const displayTokens = `${recVal(rec, IDX.LABEL)} ${recVal(rec, IDX.SITE_NAME)} ${recVal(rec, IDX.SITE_CODE)}`.toUpperCase().split(/[^A-Z0-9]+/).map(norm).filter(Boolean);
        if (displayTokens.includes(qKey))
            score += 900;
        if (displayTokens.some(t => t.startsWith(qKey) && qKey.length >= 2))
            score += 220;
        if (recVal(rec, IDX.TYPE).toLowerCase() === 'alias')
            score += 5000;
        for (const code of aliasCodesForQuery(raw)) {
            if (realSiteMatchesCode(rec, code))
                score += 250000 + realSiteScore(rec, code);
        }
        if (kLabel === qKey)
            score += 1800;
        if (kSiteCode === qKey)
            score += 1780;
        if (kSiteName === qKey)
            score += 1760;
        if (kCombo === qKey)
            score += 1700;
        if (kSid === qKey)
            score += 1650;
        if (kCircuit === qKey)
            score += 900;
        const borrowedPole = norm(borrowedPoleForSearch(rec));
        const borrowedPolePadded = /^\d{1,4}$/.test(borrowedPole) ? borrowedPole.padStart(4, '0') : borrowedPole;
        if (kPole === qKey || poleNoZero === String(raw).trim() || borrowedPole === qKey || borrowedPolePadded === qKey)
            score += 460;
        if (kLabel.startsWith(qKey))
            score += 650;
        if (kSiteCode.startsWith(qKey))
            score += 650;
        if (kSiteName.startsWith(qKey))
            score += 645;
        if (kCombo.startsWith(qKey))
            score += 630;
        if (kCircuit.startsWith(qKey))
            score += 540;
        if (kSid.startsWith(qKey))
            score += 520;
        if (kLabel.includes(qKey))
            score += 350;
        if (kSiteName.includes(qKey))
            score += 350;
        if (kSiteCode.includes(qKey))
            score += 345;
        if (kCombo.includes(qKey))
            score += 340;
        if (kCircuit.includes(qKey))
            score += 240;
        if (kSid.includes(qKey))
            score += 220;
        const parts = String(raw || '').toUpperCase().split(/[\s,;]+/).map(norm).filter(Boolean);
        if (parts.length > 1) {
            const allParts = parts.every(p => kLabel.includes(p) || kCombo.includes(p) || kSid.includes(p) || kSiteName.includes(p) || kSiteCode.includes(p));
            if (allParts)
                score += 300 + parts.length * 20;
        }
        const compact = norm(raw);
        if (compact && (kLabel.includes(compact) || kCombo.includes(compact) || kSiteName.includes(compact) || kSiteCode.includes(compact)))
            score += 400;
        if (/^\d{1,4}[A-Z]?$/.test(qKey) && kPole !== qKey && norm(poleNoZero) !== qKey && borrowedPole !== qKey && borrowedPolePadded !== qKey)
            score -= 190;
        return score;
    }
    function hasGps(rec) {
        return Number.isFinite(Number(rec && rec[IDX.LAT])) && Number.isFinite(Number(rec && rec[IDX.LON]));
    }
    function sortDedupeRank(found, raw) {
        const qKey = norm(raw);
        const filtered = exactSmartFilterRecords(found, raw);
        const scored = filtered
            .map(rec => {
            const displayRec = displayRecordForSearch(upgradeRecord(rec), raw);
            if (!displayRec)
                return null;
            return { rec: displayRec, score: rankRecord(displayRec, qKey, raw) };
        })
            .filter(item => item && hasGps(item.rec));
        if (isCircuitOnlySearch(raw) || aliasCodesForQuery(raw).length) {
            const circuitSeen = new Set(scored.map(item => {
                const rec = item.rec;
                return recVal(rec, IDX.TYPE).toLowerCase() === 'circuit' ? norm(recVal(rec, IDX.LABEL)) : '';
            }).filter(Boolean));
            const anchors = new Map();
            for (const rec0 of filtered) {
                const rec = upgradeRecord(rec0);
                if (!isPoleTowerRecord(rec) || isHiddenZeroGAsset(rec) || !hasGps(rec))
                    continue;
                const circuit = recVal(rec, IDX.CIRCUIT).trim();
                const cKey = norm(circuit);
                if (!cKey)
                    continue;
                anchors.set(cKey, betterCircuitAnchor(anchors.get(cKey), rec, raw));
            }
            for (const [cKey, anchor] of anchors.entries()) {
                if (!cKey || circuitSeen.has(cKey))
                    continue;
                const circuitRec = circuitRecordFromLine(anchor);
                if (!circuitRec)
                    continue;
                circuitSeen.add(cKey);
                scored.push({ rec: circuitRec, score: 12000 + circuitAnchorScore(anchor, raw) + rankRecord(circuitRec, qKey, raw) });
            }
        }
        if (aliasCodesForQuery(raw).length && !isCircuitOnlySearch(raw)) {
            const realSites = realSiteRecordsForAliasQuery(raw);
            const realSiteCodes = new Set(realSites.map(item => item.code));
            for (const item of realSites) {
                scored.push({
                    rec: item.rec,
                    score: 650000 + realSiteScore(item.rec, item.code) + rankRecord(item.rec, qKey, raw)
                });
            }
            const aliasAnchors = new Map();
            const codes = aliasCodesForQuery(raw);
            for (const rec0 of filtered) {
                const rec = upgradeRecord(rec0);
                if (!isPoleTowerRecord(rec) || isHiddenZeroGAsset(rec) || !hasGps(rec))
                    continue;
                const matched = aliasMatchCodesForRecord(rec, raw).filter(code => codes.includes(code) && !realSiteCodes.has(code));
                for (const code of matched) {
                    aliasAnchors.set(code, betterAliasAnchor(aliasAnchors.get(code), rec, raw, code));
                }
            }
            for (const code of codes) {
                if (!aliasAnchors.has(code)) {
                    for (const rec0 of filtered) {
                        const rec = upgradeRecord(rec0);
                        if (!isPoleTowerRecord(rec) || isHiddenZeroGAsset(rec) || !hasGps(rec))
                            continue;
                        if (aliasMatchCodesForRecord(rec, code).includes(code))
                            aliasAnchors.set(code, betterAliasAnchor(aliasAnchors.get(code), rec, raw, code));
                    }
                }
            }
            for (const [code, anchor] of aliasAnchors.entries()) {
                const aliasRec = aliasPriorityRecordFromLine(anchor, code);
                if (!aliasRec)
                    continue;
                scored.push({ rec: aliasRec, score: 450000 + aliasAnchorScore(anchor, raw, code) + rankRecord(aliasRec, qKey, raw) });
            }
        }
        scored.sort((a, b) => {
            const aLabel = String(a.rec[IDX.LABEL] || '');
            const bLabel = String(b.rec[IDX.LABEL] || '');
            return b.score - a.score || aLabel.localeCompare(bLabel, undefined, { numeric: true });
        });
        const unique = [];
        const seenNames = new Set();
        const seenKeys = new Set();
        const limit = getResultLimit();
        for (const item of scored) {
            const rec = item.rec;
            const nameKey = norm(rec[IDX.LABEL]);
            const key = assetDedupeKey(rec);
            if (nameKey && seenNames.has(nameKey))
                continue;
            if (seenKeys.has(key))
                continue;
            if (nameKey)
                seenNames.add(nameKey);
            seenKeys.add(key);
            unique.push(rec);
            if (unique.length >= limit)
                break;
        }
        return { unique, total: scored.length };
    }
    async function liveSearch(raw) {
        raw = String(raw || '').trim();
        if (!raw) {
            lastResults = [];
            renderResults('', 0, 'live');
            return;
        }
        if (liveAbort)
            liveAbort.abort();
        liveAbort = new AbortController();
        setUiBusy(true);
        await startLoading('Searching...');
        els.resultsInfo.textContent = '';
        els.resultsInfo.classList.add('hidden');
        syncNoResultDog();
        els.results.innerHTML = '';
        try {
            if (!hasLiveSession())
                setStatus('Logging in…');
            const key = await ensureSession();
            setStatus('Searching…');
            const layers = await discoverLayers(key, liveAbort.signal);
            const merged = [];
            const seen = new Set();
            let failures = 0;
            const layerTasks = layers.map(async (layer) => {
                const out = [];
                try {
                    const info = await fetchLayerInfo(layer, key, liveAbort.signal);
                    const clauses = clausesForLayer(raw, layer, info).slice(0, 4);
                    const clauseResults = await Promise.allSettled(clauses.map(where => fetchLiveQuery(layer, where, key, liveAbort.signal)));
                    for (const result of clauseResults) {
                        if (result.status === 'fulfilled')
                            out.push(...result.value);
                        else
                            failures++;
                    }
                }
                catch {
                    failures++;
                }
                return out;
            });
            const layerResults = await Promise.allSettled(layerTasks);
            for (const result of layerResults) {
                if (result.status !== 'fulfilled') {
                    failures++;
                    continue;
                }
                for (const rec of result.value) {
                    const dedupe = assetDedupeKey(rec);
                    if (!seen.has(dedupe)) {
                        seen.add(dedupe);
                        merged.push(rec);
                    }
                }
            }
            if (records.length) {
                const qKey = norm(raw);
                for (const rec0 of records) {
                    try {
                        const rec = upgradeRecord(rec0);
                        if (isCrossingRecord(rec))
                            continue;
                        if ((rankRecord(rec, qKey, raw) || simpleTextRank(rec, qKey, raw)) <= 0)
                            continue;
                        const dedupe = assetDedupeKey(rec);
                        if (!seen.has(dedupe)) {
                            seen.add(dedupe);
                            merged.push(rec);
                        }
                    }
                    catch { }
                }
            }
            if (!merged.length && failures) {
            }
            const ranked = sortDedupeRank(merged, raw);
            lastResults = ranked.unique;
            renderResults(raw, merged.length, 'live');
            setStatus('Ready.');
            updateDataStatus();
        }
        catch (err) {
            if (err.name === 'AbortError')
                return;
            lastResults = [];
            renderResults(raw, 0, 'live');
            if (/login|username|password|PIN/i.test(String(err.message || err))) {
                clearSession('Login required.');
                els.loginPanel.classList.remove('hidden');
                minimiseLoginPanel(false);
            }
            setStatus(err.message || 'Search unavailable.', true);
        }
        finally {
            await finishSearchLoading();
            setUiBusy(false);
        }
    }
    function localSearch(raw) {
        raw = String(raw || '').trim();
        const qKey = norm(raw);
        const started = performance.now();
        try {
            if (!records.length) {
                lastResults = [];
                renderResults(raw, 0, 'local');
                return;
            }
            if (!qKey) {
                lastResults = [];
                renderResults('', 0, 'local');
                return;
            }
            const pool = candidateRecordsForLocalSearch(qKey, raw);
            const found = [];
            for (let i = 0; i < pool.length; i++) {
                const rec = upgradeRecord(pool[i]);
                if (isCrossingRecord(rec))
                    continue;
                const score = rankRecord(rec, qKey, raw) || simpleTextRank(rec, qKey, raw);
                if (score > 0)
                    found.push(rec);
            }
            let finalFound = found;
            if (!finalFound.length && pool.length !== records.length && /^[A-Z]{2,}$/i.test(qKey)) {
                finalFound = [];
                for (let i = 0; i < records.length; i++) {
                    const rec = upgradeRecord(records[i]);
                    if (isCrossingRecord(rec))
                        continue;
                    const score = rankRecord(rec, qKey, raw) || simpleTextRank(rec, qKey, raw);
                    if (score > 0 && !isHiddenZeroGAsset(rec))
                        finalFound.push(rec);
                }
            }
            const ranked = sortDedupeRank(finalFound, raw);
            lastResults = ranked.unique;
            renderResults(raw, ranked.total, 'local');
            updatePerfStatus(`Search checked ${pool.length.toLocaleString()} / ${records.length.toLocaleString()} records • alias subtitles on • ${formatElapsed(performance.now() - started)}`);
        }
        catch (err) {
            lastResults = [];
            renderResults(raw, 0, 'local');
            setStatus(`Search repaired stale local index. Try again, or hard reset if it repeats. ${err.message || err}`, true);
            invalidateLocalIndex();
            scheduleLocalIndexRebuild();
        }
    }
    function shouldUseLocalOnly() {
        return Boolean(records.length && !hasLiveSession() && !hasSavedLogin() && !(els.loginUser.value.trim() && els.loginPass.value));
    }
    async function search(raw) {
        if (mode === 'local' || shouldUseLocalOnly()) {
            setUiBusy(true);
            await startLoading('Searching...');
            try {
                await new Promise(resolve => setTimeout(resolve, 60));
                return localSearch(raw);
            }
            finally {
                await finishSearchLoading();
                setUiBusy(false);
            }
        }
        return liveSearch(raw);
    }
    let lastActionQueryKey = '';
    let currentActionLabel = ACTION_LABELS[0];
    function nextActionLabelForSearch(raw) {
        lastActionQueryKey = norm(raw);
        currentActionLabel = 'Open Maps';
        return currentActionLabel;
    }
    function assetDedupeKey(rec) {
        const label = norm(rec && rec[IDX.LABEL]);
        const sid = norm(rec && rec[IDX.SID]);
        const lat = Number(rec && rec[IDX.LAT]);
        const lon = Number(rec && rec[IDX.LON]);
        const lat4 = Number.isFinite(lat) ? lat.toFixed(4) : '';
        const lon4 = Number.isFinite(lon) ? lon.toFixed(4) : '';
        if (label && sid)
            return `ls|${label}|${sid}`;
        if (label && lat4 && lon4)
            return `lc|${label}|${lat4}|${lon4}`;
        if (sid && lat4 && lon4)
            return `sc|${sid}|${lat4}|${lon4}`;
        return `raw|${label}|${sid}|${lat4}|${lon4}`;
    }
    function isCircuitResult(rec) {
        rec = upgradeRecord(rec);
        if (isKnownSiteAliasRecord(rec))
            return false;
        return recVal(rec, IDX.TYPE).toLowerCase() === 'circuit' || (!isSiteRecord(rec) && isCircuitOnlySearch(recVal(rec, IDX.LABEL)));
    }
    function circuitLabelFromRecord(rec) {
        rec = upgradeRecord(rec);
        if (recVal(rec, IDX.TYPE).toLowerCase() === 'circuit')
            return recVal(rec, IDX.LABEL).trim();
        return recVal(rec, IDX.CIRCUIT).trim() || stripCircuitNumber(recVal(rec, IDX.LABEL)).trim();
    }
    function slashEndpointCodesFromCircuit(text) {
        return circuitEndpointTokensFromText(text)
            .filter(token => token && token.sep === '/' && shouldUseAliasToken(token))
            .map(token => token.code)
            .filter(Boolean);
    }
    function branchSuffixForLine(rec) {
        const pole = poleDisplayForLine(rec);
        const m = String(pole || '').match(/\/([A-Z]*\d*[A-Z]*)$/i);
        return m ? m[1].toUpperCase() : '';
    }
    function isBranchEndForLine(rec) {
        return /^G0*$/i.test(branchSuffixForLine(rec));
    }
    function circuitHasSlashEndpointCode(circuit, code) {
        const k = norm(code);
        if (!k)
            return false;
        return circuitEndpointTokensFromText(circuit)
            .filter(token => token && token.sep === '/' && shouldUseAliasToken(token))
            .some(token => norm(token.code) === k);
    }
    function geoPointMetersForLine(rec, lat0) {
        const lat = Number(rec && rec[IDX.LAT]);
        const lon = Number(rec && rec[IDX.LON]);
        if (!Number.isFinite(lat) || !Number.isFinite(lon))
            return null;
        const rad = Math.PI / 180;
        return {
            x: lon * 111320 * Math.cos((lat0 || lat) * rad),
            y: lat * 110540
        };
    }
    function branchProjectionInfo(rec, a, b, lat0) {
        const p = geoPointMetersForLine(rec, lat0);
        const pa = geoPointMetersForLine(a, lat0);
        const pb = geoPointMetersForLine(b, lat0);
        if (!p || !pa || !pb)
            return null;
        const vx = pb.x - pa.x;
        const vy = pb.y - pa.y;
        const wx = p.x - pa.x;
        const wy = p.y - pa.y;
        const lenSq = vx * vx + vy * vy;
        if (!lenSq)
            return null;
        const t = (wx * vx + wy * vy) / lenSq;
        const proj = { x: pa.x + t * vx, y: pa.y + t * vy };
        const distanceM = Math.hypot(p.x - proj.x, p.y - proj.y);
        return { t, distanceM };
    }
    function distanceMetersBetweenRecords(a, b) {
        const lat0 = (Number(a && a[IDX.LAT]) + Number(b && b[IDX.LAT])) / 2;
        const pa = geoPointMetersForLine(a, lat0);
        const pb = geoPointMetersForLine(b, lat0);
        if (!pa || !pb)
            return Infinity;
        return Math.hypot(pa.x - pb.x, pa.y - pb.y);
    }
    function branchHasLargeGap(items, anchor, end) {
        const ordered = (items || []).slice().sort((a, b) => {
            const pa = branchProjectionInfo(a, anchor, end, (Number(anchor[IDX.LAT]) + Number(end[IDX.LAT])) / 2);
            const pb = branchProjectionInfo(b, anchor, end, (Number(anchor[IDX.LAT]) + Number(end[IDX.LAT])) / 2);
            return (pa ? pa.t : 0) - (pb ? pb.t : 0);
        });
        const check = [anchor, ...ordered, end];
        for (let i = 1; i < check.length; i++) {
            if (distanceMetersBetweenRecords(check[i - 1], check[i]) > 1200)
                return true;
        }
        return false;
    }
    function cloneRecordForBranchAlias(source, circuit, pole) {
        const cleanPole = cleanPoleDisplay(pole);
        const label = `${circuit}-${cleanPole}`;
        const sid = `${recVal(source, IDX.SID) || recVal(source, IDX.LABEL)}|BRANCH_ALIAS|${label}`;
        return makeRecord(label, sid, recVal(source, IDX.TYPE) || 'Asset', Number(source[IDX.LAT]), Number(source[IDX.LON]), {});
    }
    function uniqueRecordsByTightCoord(items) {
        const out = [];
        const seen = new Set();
        for (const rec of items || []) {
            if (!hasGps(rec))
                continue;
            const key = `${Number(rec[IDX.LAT]).toFixed(6)}|${Number(rec[IDX.LON]).toFixed(6)}|${norm(recVal(rec, IDX.SID))}`;
            if (seen.has(key))
                continue;
            seen.add(key);
            out.push(rec);
        }
        return out;
    }
    function orderBranchRecordsByPath(anchor, targetEnd, items) {
        const unique = uniqueRecordsByTightCoord(items || []).filter(rec => rec !== anchor && rec !== targetEnd);
        if (!unique.length)
            return [];
        const numericSuffix = rec => {
            const pole = poleDisplayForLine(rec);
            const m = String(pole || '').match(/\/(\d+)$/);
            return m ? Number(m[1]) : null;
        };
        if (unique.every(rec => numericSuffix(rec) !== null)) {
            return unique.sort((a, b) => numericSuffix(a) - numericSuffix(b) || distanceMetersBetweenRecords(a, anchor) - distanceMetersBetweenRecords(b, anchor));
        }
        const remaining = unique.slice().sort((a, b) => distanceMetersBetweenRecords(anchor, a) - distanceMetersBetweenRecords(anchor, b));
        const ordered = [];
        let current = anchor;
        while (remaining.length) {
            let bestIdx = 0;
            let bestScore = Infinity;
            for (let i = 0; i < remaining.length; i++) {
                const rec = remaining[i];
                const step = distanceMetersBetweenRecords(current, rec);
                const finish = targetEnd ? distanceMetersBetweenRecords(rec, targetEnd) : 0;
                const score = step + finish * 0.03;
                if (score < bestScore) {
                    bestScore = score;
                    bestIdx = i;
                }
            }
            current = remaining.splice(bestIdx, 1)[0];
            ordered.push(current);
        }
        return ordered;
    }
    function recordDistanceMeters(a, b) {
        return distanceMetersBetweenRecords(a, b);
    }
    function buildSharedSlashBranchCandidates(targetCircuit, targetEnd) {
        const targetKey = norm(targetCircuit);
        const branchCodes = slashEndpointCodesFromCircuit(targetCircuit);
        const circuitNo = circuitNumberTokenFromText(targetCircuit);
        if (!targetKey || !targetEnd || !branchCodes.length || !circuitNo)
            return [];
        const groups = new Map();
        for (const rec0 of records || []) {
            const rec = upgradeRecord(rec0);
            if (!rec || !hasGps(rec) || !isPoleTowerRecord(rec) || isHiddenZeroGAsset(rec) || isCrossingRecord(rec))
                continue;
            if (!looksLikeWA(rec[IDX.LON], rec[IDX.LAT]))
                continue;
            const recCircuit = recVal(rec, IDX.CIRCUIT).trim();
            if (!recCircuit || norm(recCircuit) === targetKey)
                continue;
            if (circuitNumberTokenFromText(recCircuit) !== circuitNo)
                continue;
            if (!branchCodes.some(code => circuitHasSlashEndpointCode(recCircuit, code)))
                continue;
            if (!poleHasSlashBranch(rec))
                continue;
            const base = structureBaseNumberForLine(rec);
            if (!base)
                continue;
            const key = `${norm(recCircuit)}|${base}`;
            if (!groups.has(key))
                groups.set(key, { circuit: recCircuit, base, items: [], ends: [] });
            const g = groups.get(key);
            g.items.push(rec);
            if (isBranchEndForLine(rec))
                g.ends.push(rec);
        }
        const out = [];
        for (const group of groups.values()) {
            const end = (group.ends || []).find(e => recordDistanceMeters(e, targetEnd) <= 180);
            if (!end)
                continue;
            const branchItems = (group.items || []).filter(rec => !isBranchEndForLine(rec));
            if (!branchItems.length)
                continue;
            out.push({ group, end, items: branchItems });
        }
        return out;
    }
    function augmentEndpointSharedBranchPoints(points, circuitLabel) {
        const targetCircuit = String(circuitLabel || '').trim();
        const targetKey = norm(targetCircuit);
        const branchCodes = slashEndpointCodesFromCircuit(targetCircuit);
        const circuitNo = circuitNumberTokenFromText(targetCircuit);
        if (!targetKey || !branchCodes.length || !circuitNo)
            return points;
        const mainAnchors = new Map();
        const branchGroups = new Map();
        for (const rec of points || []) {
            const base = structureBaseNumberForLine(rec);
            if (!base)
                continue;
            if (poleHasSlashBranch(rec)) {
                if (!branchGroups.has(base))
                    branchGroups.set(base, []);
                branchGroups.get(base).push(rec);
            }
            else {
                mainAnchors.set(base, rec);
            }
        }
        if (!branchGroups.size)
            return points;
        const replaceKeys = new Set();
        const extra = [];
        let changed = false;
        for (const [base, group] of branchGroups.entries()) {
            const anchor = mainAnchors.get(base);
            const targetEnd = group.find(isBranchEndForLine);
            if (!anchor || !targetEnd)
                continue;
            const existingBranch = group.filter(rec => !isBranchEndForLine(rec));
            if (!existingBranch.length)
                continue;
            if (!branchHasLargeGap(existingBranch, anchor, targetEnd))
                continue;
            const directCandidates = [];
            const directSeen = new Set();
            const addBranchCandidate = rec => {
                rec = upgradeRecord(rec);
                if (!rec || rec === anchor || rec === targetEnd || !hasGps(rec))
                    return;
                if (isCrossingRecord(rec) || !isPoleTowerRecord(rec) || isHiddenZeroGAsset(rec))
                    return;
                if (!looksLikeWA(rec[IDX.LON], rec[IDX.LAT]))
                    return;
                const key = `${Number(rec[IDX.LAT]).toFixed(7)}|${Number(rec[IDX.LON]).toFixed(7)}|${norm(recVal(rec, IDX.SID))}`;
                if (directSeen.has(key))
                    return;
                directSeen.add(key);
                directCandidates.push(rec);
            };
            const sharedGroups = buildSharedSlashBranchCandidates(targetCircuit, targetEnd);
            for (const shared of sharedGroups) {
                for (const rec of shared.items || [])
                    addBranchCandidate(rec);
            }
            if (!directCandidates.length) {
                const lat0 = (Number(anchor[IDX.LAT]) + Number(targetEnd[IDX.LAT])) / 2;
                for (const rec0 of records || []) {
                    const rec = upgradeRecord(rec0);
                    if (!rec || rec === targetEnd || !hasGps(rec))
                        continue;
                    if (isCrossingRecord(rec) || !isPoleTowerRecord(rec) || isHiddenZeroGAsset(rec))
                        continue;
                    if (!looksLikeWA(rec[IDX.LON], rec[IDX.LAT]))
                        continue;
                    const recCircuit = recVal(rec, IDX.CIRCUIT).trim();
                    if (!recCircuit || norm(recCircuit) === targetKey)
                        continue;
                    if (circuitNumberTokenFromText(recCircuit) !== circuitNo)
                        continue;
                    if (!poleHasSlashBranch(rec) || isBranchEndForLine(rec))
                        continue;
                    if (!branchCodes.some(code => circuitHasSlashEndpointCode(recCircuit, code)))
                        continue;
                    const info = branchProjectionInfo(rec, anchor, targetEnd, lat0);
                    if (!info)
                        continue;
                    if (info.t <= 0.02 || info.t >= 0.995)
                        continue;
                    if (info.distanceM > 180)
                        continue;
                    addBranchCandidate(rec);
                }
            }
            if (!directCandidates.length)
                continue;
            for (const rec of group)
                replaceKeys.add(assetDedupeKey(rec));
            const ordered = orderBranchRecordsByPath(anchor, targetEnd, [
                ...existingBranch,
                ...directCandidates
            ]);
            let seq = 1;
            const seqSeen = new Set();
            for (const rec of ordered) {
                const key = `${Number(rec[IDX.LAT]).toFixed(7)}|${Number(rec[IDX.LON]).toFixed(7)}`;
                if (seqSeen.has(key))
                    continue;
                seqSeen.add(key);
                extra.push(cloneRecordForBranchAlias(rec, targetCircuit, `${base}/${seq}`));
                seq += 1;
            }
            extra.push(cloneRecordForBranchAlias(targetEnd, targetCircuit, `${base}/G`));
            changed = true;
        }
        if (!changed)
            return points;
        const kept = (points || []).filter(rec => !replaceKeys.has(assetDedupeKey(rec)));
        return [...kept, ...extra].sort((a, b) => {
            return structureSortValue(a) - structureSortValue(b) || displayLabelForResult(a).localeCompare(displayLabelForResult(b), undefined, { numeric: true });
        });
    }
    function circuitAssetsForMap(circuitLabel) {
        const cKey = norm(circuitLabel);
        if (!cKey)
            return [];
        const seen = new Set();
        const out = [];
        for (const rec0 of records || []) {
            const rec = upgradeRecord(rec0);
            if (isCrossingRecord(rec) || !isPoleTowerRecord(rec) || isHiddenZeroGAsset(rec) || !hasGps(rec))
                continue;
            if (norm(recVal(rec, IDX.CIRCUIT)) !== cKey)
                continue;
            if (!looksLikeWA(rec[IDX.LON], rec[IDX.LAT]))
                continue;
            const key = `${norm(recVal(rec, IDX.LABEL))}|${rec[IDX.LAT]}|${rec[IDX.LON]}`;
            if (seen.has(key))
                continue;
            seen.add(key);
            out.push(rec);
        }
        out.sort((a, b) => {
            return structureSortValueForMap(a, circuitLabel) - structureSortValueForMap(b, circuitLabel) || displayLabelForResult(a).localeCompare(displayLabelForResult(b), undefined, { numeric: true });
        });
        return augmentEndpointSharedBranchPoints(out, circuitLabel);
    }
    function mapHasBadZeroOnlyPoleNumbers(points) {
        const source = Array.isArray(points) ? points : [];
        if (source.length < 3)
            return false;
        const displayPoles = source.map((rec, i) => {
            const displayed = typeof mapDisplayPoleForPoint === 'function'
                ? mapDisplayPoleForPoint(rec, i, source)
                : '';
            return cleanPoleDisplay(displayed || recVal(rec, IDX.POLE_NZ) || recVal(rec, IDX.POLE));
        }).filter(Boolean);
        if (displayPoles.length < 3)
            return false;
        const goodNumberCount = displayPoles.filter(p => /[1-9]/.test(p)).length;
        if (goodNumberCount >= 3)
            return false;
        const zeroCount = displayPoles.filter(p => /^0+$/.test(p)).length;
        return zeroCount >= Math.max(3, Math.floor(displayPoles.length * 0.8));
    }
    let sharedPoleBorrowCache = { stamp: '', exact7: new Map(), exact6: new Map() };
    function isPicPnjBsnKemCircuitText(text) {
        const k = norm(text);
        return Boolean(k.includes('PICPNJBSNKEM') || (k.includes('PIC') && k.includes('PNJ') && k.includes('BSN') && k.includes('KEM')));
    }
    function coordKeyForPoleBorrow(rec, decimals = 7) {
        const lat = Number(rec && rec[IDX.LAT]);
        const lon = Number(rec && rec[IDX.LON]);
        if (!Number.isFinite(lat) || !Number.isFinite(lon))
            return '';
        return `${lat.toFixed(decimals)}|${lon.toFixed(decimals)}`;
    }
    function rebuildSharedPoleBorrowCache() {
        const stamp = `${records.length}|${records[0] ? recVal(records[0], IDX.LABEL) : ''}|${records[records.length - 1] ? recVal(records[records.length - 1], IDX.LABEL) : ''}`;
        if (sharedPoleBorrowCache.stamp === stamp)
            return sharedPoleBorrowCache;
        const exact7 = new Map();
        const exact6 = new Map();
        const addTo = (map, key, item) => {
            if (!key)
                return;
            if (!map.has(key))
                map.set(key, []);
            map.get(key).push(item);
        };
        for (const rec0 of records || []) {
            const rec = upgradeRecord(rec0);
            if (!rec || !hasGps(rec) || !isPoleTowerRecord(rec))
                continue;
            const pole = cleanPoleDisplay(recVal(rec, IDX.POLE_NZ) || recVal(rec, IDX.POLE));
            if (!pole || /^0+$/.test(pole))
                continue;
            const item = { pole, circuit: recVal(rec, IDX.CIRCUIT), label: recVal(rec, IDX.LABEL) };
            addTo(exact7, coordKeyForPoleBorrow(rec, 7), item);
            addTo(exact6, coordKeyForPoleBorrow(rec, 6), item);
        }
        sharedPoleBorrowCache = { stamp, exact7, exact6 };
        return sharedPoleBorrowCache;
    }
    function bestBorrowedPoleFromCandidates(candidates, circuitHint) {
        const source = Array.isArray(candidates) ? candidates : [];
        if (!source.length)
            return '';
        const targetNo = circuitNumberTokenFromText(circuitHint);
        let filtered = source.filter(item => item && item.pole && !/^0+$/.test(item.pole));
        if (targetNo) {
            const sameNo = filtered.filter(item => circuitNumberTokenFromText(item.circuit) === targetNo);
            if (sameNo.length)
                filtered = sameNo;
        }
        if (!filtered.length)
            return '';
        const counts = new Map();
        for (const item of filtered) {
            const pole = cleanPoleDisplay(item.pole);
            if (!pole || /^0+$/.test(pole))
                continue;
            counts.set(pole, (counts.get(pole) || 0) + 1);
        }
        const ranked = [...counts.entries()].sort((a, b) => {
            if (b[1] !== a[1])
                return b[1] - a[1];
            return structureSortValue(makeRecord(`${circuitHint || 'X 00'}-${a[0]}`, '', 'Asset', 0, 0, {})) - structureSortValue(makeRecord(`${circuitHint || 'X 00'}-${b[0]}`, '', 'Asset', 0, 0, {}));
        });
        return ranked[0] ? ranked[0][0] : '';
    }
    function sharedPoleFromCoordForMap(rec, circuitHint = '') {
        const circuit = circuitHint || recVal(rec, IDX.CIRCUIT) || circuitLabelFromRecord(rec);
        if (!isPicPnjBsnKemCircuitText(circuit))
            return '';
        const ownPole = cleanPoleDisplay(recVal(rec, IDX.POLE_NZ) || recVal(rec, IDX.POLE));
        if (ownPole && !/^0+$/.test(ownPole))
            return '';
        const cache = rebuildSharedPoleBorrowCache();
        const exact = cache.exact7.get(coordKeyForPoleBorrow(rec, 7)) || cache.exact6.get(coordKeyForPoleBorrow(rec, 6)) || [];
        return bestBorrowedPoleFromCandidates(exact, circuit);
    }
    function structureSortValueForMap(rec, circuitHint = '') {
        const normal = structureSortValue(rec);
        if (Number.isFinite(normal) && normal < 999999999)
            return normal;
        const borrowed = sharedPoleFromCoordForMap(rec, circuitHint);
        if (!borrowed)
            return normal;
        return structureSortValue(makeRecord(`${circuitHint || recVal(rec, IDX.CIRCUIT) || 'X 00'}-${borrowed}`, '', 'Asset', 0, 0, {}));
    }
    function mapDisplayPoleForPoint(rec, index, points) {
        const pole = cleanPoleDisplay(recVal(rec, IDX.POLE_NZ) || recVal(rec, IDX.POLE));
        if (pole && !/^0+$/.test(pole))
            return pole;
        return sharedPoleFromCoordForMap(rec, (points && points[0] && recVal(points[0], IDX.CIRCUIT)) || recVal(rec, IDX.CIRCUIT));
    }
    function mapDisplayLabelForPoint(rec, index, points) {
        rec = upgradeRecord(rec);
        const circuit = recVal(rec, IDX.CIRCUIT).trim() || circuitLabelFromRecord(rec);
        const pole = mapDisplayPoleForPoint(rec, index, points);
        if (isPoleTowerRecord(rec) && circuit && pole)
            return `${circuit}-${pole}`;
        return displayLabelForResult(rec);
    }
    function ensureLeafletMap() {
        if (!els.circuitMapCanvas || !window.L)
            return null;
        if (circuitMap)
            return circuitMap;
        circuitMap = L.map(els.circuitMapCanvas, {
            zoomControl: false,
            attributionControl: false,
            preferCanvas: true,
            tap: true,
            dragging: false,
            touchZoom: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            keyboard: false
        });
        circuitLayerStreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20
        });
        circuitLayerSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19
        });
        circuitMarkerLayer = L.layerGroup().addTo(circuitMap);
        whatsHereLayer = L.layerGroup().addTo(circuitMap);
        circuitMap.on('click', () => {
            if (!circuitMapFullscreen && currentCircuitPoints.length)
                setCircuitMapFullscreen(true);
        });
        circuitLayerStreet.addTo(circuitMap);
        setCircuitMapInteractionMode(circuitMapFullscreen);
        return circuitMap;
    }
    function setCircuitLayer(mode) {
        circuitLayerMode = mode === 'satellite' ? 'satellite' : 'street';
        if (els.streetLayerBtn)
            els.streetLayerBtn.classList.toggle('active', circuitLayerMode === 'street');
        if (els.satelliteLayerBtn)
            els.satelliteLayerBtn.classList.toggle('active', circuitLayerMode === 'satellite');
        if (!circuitMap || !circuitLayerStreet || !circuitLayerSatellite)
            return;
        if (circuitLayerMode === 'satellite') {
            if (circuitMap.hasLayer(circuitLayerStreet))
                circuitMap.removeLayer(circuitLayerStreet);
            if (!circuitMap.hasLayer(circuitLayerSatellite))
                circuitLayerSatellite.addTo(circuitMap);
            els.circuitMapCanvas?.classList.add('satellite-mode');
        }
        else {
            if (circuitMap.hasLayer(circuitLayerSatellite))
                circuitMap.removeLayer(circuitLayerSatellite);
            if (!circuitMap.hasLayer(circuitLayerStreet))
                circuitLayerStreet.addTo(circuitMap);
            els.circuitMapCanvas?.classList.remove('satellite-mode');
        }
    }
    function setCircuitMapInteractionMode(fullscreen) {
        if (!circuitMap)
            return;
        const enabled = Boolean(fullscreen);
        const handlers = [
            'dragging',
            'touchZoom',
            'scrollWheelZoom',
            'doubleClickZoom',
            'boxZoom',
            'keyboard',
            'tap'
        ];
        handlers.forEach(name => {
            const handler = circuitMap[name];
            if (!handler)
                return;
            try {
                if (enabled && typeof handler.enable === 'function')
                    handler.enable();
                if (!enabled && typeof handler.disable === 'function')
                    handler.disable();
            }
            catch { }
        });
        const zoomEl = circuitMap.zoomControl && typeof circuitMap.zoomControl.getContainer === 'function'
            ? circuitMap.zoomControl.getContainer()
            : null;
        if (zoomEl)
            zoomEl.style.display = enabled ? '' : 'none';
        if (els.circuitMapCanvas)
            els.circuitMapCanvas.classList.toggle('snapshot-map-mode', !enabled);
    }
    function fitCircuitMap() {
        if (circuitMap && currentCircuitBounds && currentCircuitBounds.isValid()) {
            circuitMap.fitBounds(currentCircuitBounds, { padding: circuitMapFullscreen ? [24, 24] : [42, 42], maxZoom: circuitMapFullscreen ? 16 : 10 });
        }
    }
    function hideAssetPopup() {
        selectedMapIndex = null;
        if (els.assetPopup) {
            els.assetPopup.classList.add('hidden');
            els.assetPopup.innerHTML = '';
        }
    }
    function showAssetPopup(index, latlng) {
        const rec = currentCircuitPoints[Number(index)];
        if (!rec || !els.assetPopup)
            return;
        selectedMapIndex = Number(index);
        if (!circuitMapFullscreen) {
            setCircuitMapFullscreen(true);
            setTimeout(() => {
                if (circuitMap && latlng)
                    circuitMap.setView(latlng, Math.max(circuitMap.getZoom(), 17), { animate: true });
                showAssetPopup(index, latlng);
            }, 150);
            return;
        }
        const label = escapeHtml(mapDisplayLabelForPoint(rec, Number(index), currentCircuitPoints));
        const subtitle = escapeHtml(resultSubtitle(rec, '') || 'Asset');
        els.assetPopup.innerHTML = `<div class="asset-popup-title">${label}</div>
      <div class="asset-popup-sub">${subtitle}</div>`;
        els.assetPopup.classList.remove('hidden');
        if (circuitMap && latlng) {
            circuitMap.panTo(latlng, { animate: true });
        }
    }
    function hideWhatsHere() {
        whatsHereResults = [];
        if (whatsHereLayer && typeof whatsHereLayer.clearLayers === 'function')
            whatsHereLayer.clearLayers();
        if (els.whatsHerePanel) {
            els.whatsHerePanel.classList.add('hidden');
            els.whatsHerePanel.innerHTML = '';
        }
    }
    function latLngToMeters(lat, lon, lat0) {
        const latNum = Number(lat);
        const lonNum = Number(lon);
        const baseLat = Number.isFinite(Number(lat0)) ? Number(lat0) : latNum;
        if (!Number.isFinite(latNum) || !Number.isFinite(lonNum))
            return null;
        const rad = Math.PI / 180;
        return {
            x: lonNum * 111320 * Math.cos(baseLat * rad),
            y: latNum * 110540
        };
    }
    function distanceMetersBetweenLatLngs(a, b) {
        if (!a || !b)
            return Infinity;
        const lat0 = (Number(a.lat) + Number(b.lat)) / 2;
        const pa = latLngToMeters(a.lat, a.lng, lat0);
        const pb = latLngToMeters(b.lat, b.lng, lat0);
        if (!pa || !pb)
            return Infinity;
        return Math.hypot(pa.x - pb.x, pa.y - pb.y);
    }
    function pointToSegmentDistanceMeters(p, a, b) {
        if (!p || !a || !b)
            return Infinity;
        const vx = b.x - a.x;
        const vy = b.y - a.y;
        const wx = p.x - a.x;
        const wy = p.y - a.y;
        const lenSq = vx * vx + vy * vy;
        if (!lenSq)
            return Math.hypot(p.x - a.x, p.y - a.y);
        const t = Math.max(0, Math.min(1, (wx * vx + wy * vy) / lenSq));
        const proj = { x: a.x + t * vx, y: a.y + t * vy };
        return Math.hypot(p.x - proj.x, p.y - proj.y);
    }
    function distanceMetersFromLatLngToCurrentCircuit(latlng) {
        if (!latlng || !currentCircuitPoints || !currentCircuitPoints.length)
            return Infinity;
        const line = buildCircuitLinePointsForDisplay(currentCircuitPoints).filter(hasGps);
        if (!line.length)
            return Infinity;
        const lat0 = Number(latlng.lat);
        const p = latLngToMeters(latlng.lat, latlng.lng, lat0);
        if (!p)
            return Infinity;
        let best = Infinity;
        let prev = null;
        for (const rec of line) {
            const cur = latLngToMeters(rec[IDX.LAT], rec[IDX.LON], lat0);
            if (!cur)
                continue;
            best = Math.min(best, Math.hypot(p.x - cur.x, p.y - cur.y));
            if (prev)
                best = Math.min(best, pointToSegmentDistanceMeters(p, prev, cur));
            prev = cur;
        }
        return best;
    }
    function latLngBoundsAroundCenter(center, halfMeters) {
        const lat = Number(center && center.lat);
        const lng = Number(center && center.lng);
        const half = Number(halfMeters) || 0;
        if (!Number.isFinite(lat) || !Number.isFinite(lng) || !half || !window.L)
            return null;
        const latDelta = half / 110540;
        const lonMeters = Math.max(1, 111320 * Math.cos(lat * Math.PI / 180));
        const lngDelta = half / lonMeters;
        return L.latLngBounds([
            [lat - latDelta, lng - lngDelta],
            [lat + latDelta, lng + lngDelta]
        ]);
    }
    function whatsHereSourceRecords() {
        const source = [];
        if (Array.isArray(records))
            source.push(...records);
        if (Array.isArray(lastResults))
            source.push(...lastResults);
        return source;
    }
    function whatsHereCurrentCircuitNames() {
        const names = new Set();
        for (const rec0 of currentCircuitPoints || []) {
            const rec = upgradeRecord(rec0);
            const circuit = recVal(rec, IDX.CIRCUIT) || circuitLabelFromRecord(rec);
            const key = norm(circuit);
            if (key)
                names.add(key);
        }
        return names;
    }
    function isWhatsHereCurrentCircuitAsset(rec, currentNames) {
        rec = upgradeRecord(rec);
        if (!rec || !currentNames || !currentNames.size)
            return false;
        if (!isPoleTowerRecord(rec))
            return false;
        const circuit = recVal(rec, IDX.CIRCUIT) || circuitLabelFromRecord(rec);
        return currentNames.has(norm(circuit));
    }
    function whatsHereAssetsInsideBounds(bounds, center) {
        if (!bounds || !center)
            return [];
        const seen = new Set();
        const out = [];
        const currentNames = whatsHereCurrentCircuitNames();
        for (const rec0 of whatsHereSourceRecords()) {
            const rec = upgradeRecord(rec0);
            if (!rec || !hasGps(rec) || isCrossingRecord(rec) || isHiddenZeroGAsset(rec))
                continue;
            if (recVal(rec, IDX.TYPE).toLowerCase() === 'circuit')
                continue;
            if (isWhatsHereCurrentCircuitAsset(rec, currentNames))
                continue;
            const lat = Number(rec[IDX.LAT]);
            const lon = Number(rec[IDX.LON]);
            if (!bounds.contains([lat, lon]))
                continue;
            const key = `${Number(lat).toFixed(7)}|${Number(lon).toFixed(7)}|${norm(recVal(rec, IDX.LABEL))}|${norm(recVal(rec, IDX.SID))}`;
            if (seen.has(key))
                continue;
            seen.add(key);
            const distanceM = distanceMetersBetweenLatLngs({ lat, lng: lon }, center);
            out.push({ rec, distanceM });
        }
        out.sort((a, b) => a.distanceM - b.distanceM || displayLabelForResult(a.rec).localeCompare(displayLabelForResult(b.rec), undefined, { numeric: true }));
        return out;
    }
    function whatsHereSubtitle(rec) {
        rec = upgradeRecord(rec);
        if (isPoleTowerRecord(rec))
            return recVal(rec, IDX.CIRCUIT) || recVal(rec, IDX.TYPE) || 'Asset';
        const type = recVal(rec, IDX.TYPE);
        if (isSiteRecord(rec))
            return resultSubtitle(rec, recVal(rec, IDX.LABEL)) || type || 'Site';
        return type || 'Asset';
    }
    function showWhatsHereAssetPopup(index, latlng) {
        const rec = whatsHereResults[Number(index)];
        if (!rec || !els.assetPopup)
            return;
        selectedMapIndex = null;
        const label = escapeHtml(displayLabelForResult(rec));
        const subtitle = escapeHtml(whatsHereSubtitle(rec));
        els.assetPopup.innerHTML = `<div class="asset-popup-title">${label}</div>
      <div class="asset-popup-sub">${subtitle}</div>`;
        els.assetPopup.classList.remove('hidden');
        if (circuitMap && latlng) {
            circuitMap.panTo(latlng, { animate: true });
        }
    }
    function showWhatsHere() {
        const map = ensureLeafletMap();
        if (!map || !window.L || !currentCircuitPoints.length) {
            setStatus('Search a circuit and open its map before using Proximity check.', true);
            return;
        }
        if (!circuitMapFullscreen) {
            setCircuitMapFullscreen(true);
            setTimeout(showWhatsHere, 180);
            return;
        }
        const center = map.getCenter();
        const bounds = latLngBoundsAroundCenter(center, WHATS_HERE_BOX_HALF_METERS);
        if (!bounds)
            return;
        hideAssetPopup();
        if (!whatsHereLayer)
            whatsHereLayer = L.layerGroup().addTo(map);
        whatsHereLayer.clearLayers();
        L.rectangle(bounds, {
            className: 'whats-here-box-shape',
            color: '#e37d12',
            weight: 3,
            opacity: 0.95,
            fillColor: '#fffaf1',
            fillOpacity: 0.08,
            interactive: false
        }).addTo(whatsHereLayer);
        const found = whatsHereAssetsInsideBounds(bounds, center);
        whatsHereResults = found.slice(0, WHATS_HERE_MAX_MARKERS).map(item => item.rec);
        if (els.whatsHerePanel) {
            els.whatsHerePanel.classList.add('hidden');
            els.whatsHerePanel.innerHTML = '';
        }
        found.slice(0, WHATS_HERE_MAX_MARKERS).forEach((item, i) => {
            const rec = item.rec;
            const latLng = [Number(rec[IDX.LAT]), Number(rec[IDX.LON])];
            const marker = L.circleMarker(latLng, {
                className: 'whats-here-point',
                radius: 7,
                color: '#e37d12',
                weight: 2.5,
                fillColor: '#fffaf1',
                fillOpacity: 1
            });
            marker.on('click', e => {
                if (e && e.originalEvent && window.L && L.DomEvent)
                    L.DomEvent.stop(e.originalEvent);
                showWhatsHereAssetPopup(i, marker.getLatLng());
            });
            marker.addTo(whatsHereLayer);
            const hitMarker = L.circleMarker(latLng, {
                className: 'whats-here-hit',
                radius: 18,
                color: '#e37d12',
                weight: 0,
                opacity: 0,
                fillColor: '#e37d12',
                fillOpacity: 0.01,
                interactive: true
            });
            hitMarker.on('click', e => {
                if (e && e.originalEvent && window.L && L.DomEvent)
                    L.DomEvent.stop(e.originalEvent);
                showWhatsHereAssetPopup(i, hitMarker.getLatLng());
            });
            hitMarker.addTo(whatsHereLayer);
        });
        if (!found.length) {
            setStatus('No nearby assets found inside the Proximity check box.');
            return;
        }
        const markedCount = Math.min(found.length, WHATS_HERE_MAX_MARKERS);
        const cappedNote = found.length > markedCount ? ` First ${markedCount.toLocaleString()} shown.` : '';
        setStatus(`${markedCount.toLocaleString()} other asset${markedCount === 1 ? '' : 's'} marked.${cappedNote} Tap an orange dot for info.`);
    }
    function openWhatsHereAsset(index) {
        showWhatsHereAssetPopup(index);
    }
    function closeSoftKeyboard() {
        const active = document.activeElement;
        if (active && typeof active.blur === 'function')
            active.blur();
        if (els.searchInput) {
            els.searchInput.blur();
            els.searchInput.setAttribute('readonly', 'readonly');
            setTimeout(() => els.searchInput && els.searchInput.removeAttribute('readonly'), 450);
        }
        try {
            document.body.focus({ preventScroll: true });
        }
        catch { }
    }
    function fullscreenElement() {
        return document.fullscreenElement || document.webkitFullscreenElement || null;
    }
    function openDogbonesFullscreen(el) {
        closeSoftKeyboard();
        document.body.classList.add('dogbones-map-fullscreen-active');
        document.documentElement.classList.add('dogbones-map-fullscreen-active');
        const fn = el && (el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen);
        if (!fn)
            return Promise.resolve();
        try {
            const result = fn.call(el);
            return result && typeof result.catch === 'function' ? result.catch(() => { }) : Promise.resolve();
        }
        catch {
            return Promise.resolve();
        }
    }
    function requestElementFullscreen(el) {
        if (!el)
            return Promise.resolve();
        const fn = el.requestFullscreen || el.webkitRequestFullscreen;
        if (!fn)
            return Promise.resolve();
        try {
            const result = fn.call(el);
            return result && typeof result.catch === 'function' ? result.catch(() => { }) : Promise.resolve();
        }
        catch {
            return Promise.resolve();
        }
    }
    function exitElementFullscreen() {
        const fn = document.exitFullscreen || document.webkitExitFullscreen;
        if (!fn)
            return Promise.resolve();
        try {
            const result = fn.call(document);
            return result && typeof result.catch === 'function' ? result.catch(() => { }) : Promise.resolve();
        }
        catch {
            return Promise.resolve();
        }
    }
    function closeMapFabMenu() {
    }
    function toggleMapLayerMenu(force) {
        mapLayerOpen = typeof force === 'boolean' ? force : !mapLayerOpen;
        if (els.mapLayerMenu)
            els.mapLayerMenu.classList.toggle('hidden', !mapLayerOpen);
        if (els.mapLayerBtn)
            els.mapLayerBtn.classList.toggle('active', mapLayerOpen);
        if (mapLayerOpen)
            closeMapFabMenu();
    }
    function closeMapLayerMenu() {
        toggleMapLayerMenu(false);
    }
    function setCircuitMapFullscreen(active, options = {}) {
        closeSoftKeyboard();
        circuitMapFullscreen = Boolean(active);
        if (els.circuitMapPanel)
            els.circuitMapPanel.classList.toggle('map-fullscreen', circuitMapFullscreen);
        if (els.fullMapControls)
            els.fullMapControls.classList.toggle('hidden', !circuitMapFullscreen);
        if (!circuitMapFullscreen)
            closeMapLayerMenu();
        document.body.classList.toggle('dogbones-map-fullscreen-active', circuitMapFullscreen);
        document.documentElement.classList.toggle('dogbones-map-fullscreen-active', circuitMapFullscreen);
        if (els.mapFullscreenBtn)
            els.mapFullscreenBtn.textContent = circuitMapFullscreen ? 'Exit' : 'Full screen';
        setCircuitMapInteractionMode(circuitMapFullscreen);
        if (!options.skipBrowserFullscreen && els.circuitMapPanel) {
            const current = fullscreenElement();
            if (circuitMapFullscreen && current !== els.circuitMapPanel) {
                openDogbonesFullscreen(els.circuitMapPanel);
            }
            if (!circuitMapFullscreen && current === els.circuitMapPanel) {
                exitElementFullscreen();
            }
        }
        if (!circuitMapFullscreen)
            hideAssetPopup();
        if (currentCircuitPoints && currentCircuitPoints.length) {
            setTimeout(() => showLeafletCircuitMap(currentCircuitPoints), 30);
        }
        [120, 420, 900].forEach(delay => setTimeout(() => {
            if (circuitMap) {
                circuitMap.invalidateSize();
                if (currentCircuitBounds && currentCircuitBounds.isValid())
                    fitCircuitMap();
            }
        }, circuitMapFullscreen ? delay : Math.min(delay, 220)));
    }
    function syncCircuitFullscreenFromBrowser() {
        if (!els.circuitMapPanel)
            return;
        const active = fullscreenElement() === els.circuitMapPanel;
        if (!active && circuitMapFullscreen)
            setCircuitMapFullscreen(false, { skipBrowserFullscreen: true });
    }
    function forceFullscreenMapResize() {
        if (!circuitMapFullscreen)
            return;
        setTimeout(() => {
            if (circuitMap) {
                circuitMap.invalidateSize();
                if (currentCircuitBounds && currentCircuitBounds.isValid())
                    fitCircuitMap();
            }
        }, 220);
    }
    function hideCircuitMap() {
        hideAssetPopup();
        hideWhatsHere();
        const wasFullscreen = circuitMapFullscreen;
        circuitMapFullscreen = false;
        if (els.circuitMapPanel)
            els.circuitMapPanel.classList.remove('map-fullscreen');
        if (els.fullMapControls)
            els.fullMapControls.classList.add('hidden');
        closeMapLayerMenu();
        document.body.classList.remove('dogbones-map-fullscreen-active');
        document.documentElement.classList.remove('dogbones-map-fullscreen-active');
        if (els.mapFullscreenBtn)
            els.mapFullscreenBtn.textContent = 'Full screen';
        if (wasFullscreen && fullscreenElement() === els.circuitMapPanel)
            exitElementFullscreen();
        if (els.circuitMapPanel)
            els.circuitMapPanel.classList.add('hidden');
        if (circuitMarkerLayer)
            circuitMarkerLayer.clearLayers();
        if (els.circuitMapCanvas && !window.L)
            els.circuitMapCanvas.innerHTML = '';
        if (els.circuitMapList)
            els.circuitMapList.innerHTML = '';
        currentCircuitPoints = [];
        currentCircuitBounds = null;
    }
    function forceHomeDogOnly() {
        removeNoResultDogPanel();
        if (els.resultsInfo) {
            els.resultsInfo.textContent = '';
            els.resultsInfo.classList.add('hidden');
        }
        if (els.results)
            els.results.innerHTML = '';
        if (els.waitingDog) {
            els.waitingDog.classList.remove('hidden');
            els.waitingDog.dataset.mode = 'normal';
            els.waitingDog.dataset.variant = '0';
            els.waitingDog.querySelectorAll('[data-dog-variant]').forEach((node, i) => {
                node.classList.toggle('active', i === 0);
            });
        }
    }
    function showMainPage(options = {}) {
        removeNoResultDogPanel();
        document.body.classList.remove('mymate-noresult-active', 'mymate-results-active', 'mymate-keep-noresult-during-fetch');
        if (options.clearSearch)
            forceHomeDogOnly();
        hideCircuitMap();
        if (els.settingsPanel)
            els.settingsPanel.classList.add('hidden');
        setTopRightButtonMode(false);
        showQuickMenu(false);
        if (els.settingsBtnText)
            els.settingsBtnText.textContent = 'Settings';
        if (els.settingsBtn) {
            els.settingsBtn.classList.remove('home-mode');
            els.settingsBtn.setAttribute('aria-label', 'Settings');
        }
        if (options.clearSearch) {
            lastResults = [];
            if (els.searchInput)
                els.searchInput.value = '';
            if (els.results)
                els.results.innerHTML = '';
            if (els.resultsInfo) {
                els.resultsInfo.textContent = '';
                els.resultsInfo.classList.add('hidden');
            }
            removeNoResultDogPanel();
            setWaitingDogMode('normal');
        }
        applyLoginVisibility();
        if (els.searchPanel)
            els.searchPanel.classList.remove('hidden');
        if (els.results)
            els.results.classList.remove('hidden');
        if (els.resultsInfo)
            els.resultsInfo.classList.toggle('hidden', !els.resultsInfo.textContent);
        if (els.waitingDog)
            els.waitingDog.classList.toggle('hidden', lastResults.length > 0);
        syncNoResultDog();
        if (options.clearSearch) {
            forceHomeDogOnly();
            showNextHomeDog();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    function showQuickMenu(force) {
        if (!els.quickMenu || !els.quickMenuBtn)
            return;
        const show = typeof force === 'boolean' ? force : els.quickMenu.classList.contains('hidden');
        els.quickMenu.classList.toggle('hidden', !show);
        els.quickMenuBtn.classList.toggle('active', show);
    }
    function mapPointSvg(points, width = 360, height = 420) {
        if (!points.length)
            return '';
        const pad = 24;
        const lats = points.map(p => Number(p[IDX.LAT]));
        const lons = points.map(p => Number(p[IDX.LON]));
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLon = Math.min(...lons);
        const maxLon = Math.max(...lons);
        const latSpan = Math.max(maxLat - minLat, 0.00001);
        const lonSpan = Math.max(maxLon - minLon, 0.00001);
        const xy = rec => {
            const x = pad + ((Number(rec[IDX.LON]) - minLon) / lonSpan) * (width - pad * 2);
            const y = pad + ((maxLat - Number(rec[IDX.LAT])) / latSpan) * (height - pad * 2);
            return [x, y];
        };
        const path = points.map((rec, i) => {
            const [x, y] = xy(rec);
            return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
        }).join(' ');
        const fallbackMaxDots = circuitMapFullscreen ? 90 : 120;
        const step = Math.max(1, Math.ceil(points.length / fallbackMaxDots));
        const dots = points.filter((_, i) => i % step === 0 || i === points.length - 1).map((rec) => {
            const originalIndex = points.indexOf(rec);
            const [x, y] = xy(rec);
            const pole = typeof mapDisplayPoleForPoint === 'function' ? mapDisplayPoleForPoint(rec, originalIndex, points) : cleanPoleDisplay(recVal(rec, IDX.POLE_NZ) || recVal(rec, IDX.POLE));
            const label = escapeHtml(`${pole || originalIndex + 1}`);
            const isEnd = originalIndex === 0 || originalIndex === points.length - 1;
            return `<g class="map-point-wrap" data-map-index="${originalIndex}">
        <circle class="map-point${isEnd ? ' end' : ''}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${isEnd ? 5 : 3.4}"></circle>
        ${isEnd ? `<text x="${(x + 7).toFixed(1)}" y="${(y - 7).toFixed(1)}">${label}</text>` : ''}
      </g>`;
        }).join('');
        return `<svg class="circuit-svg fallback-circuit-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Circuit plotted GPS points">
      <rect class="map-bg" x="0" y="0" width="${width}" height="${height}" rx="18"></rect>
      <path class="fallback-circuit-line" d="${path}"></path>
      ${dots}
    </svg>`;
    }
    function showFallbackCircuitMap(points) {
        if (!els.circuitMapCanvas)
            return;
        els.circuitMapCanvas.innerHTML = mapPointSvg(points);
        els.circuitMapCanvas.dataset.circuit = circuitLabelFromRecord(points[0] || []);
    }
    function poleDisplayForLine(rec) {
        return cleanPoleDisplay(recVal(rec, IDX.POLE_NZ) || recVal(rec, IDX.POLE));
    }
    function structureBaseNumberForLine(rec) {
        const pole = poleDisplayForLine(rec);
        const m = String(pole || '').match(/\d+/);
        return m ? String(Number(m[0])) : norm(pole);
    }
    function poleLineKey(rec) {
        return norm(poleDisplayForLine(rec));
    }
    function poleHasSlashBranch(rec) {
        return /\//.test(poleDisplayForLine(rec));
    }
    function structureBaseKeyForLine(rec) {
        return poleLineKey(rec) || displayLabelForResult(rec);
    }
    function structureSortValue(rec) {
        const pole = poleDisplayForLine(rec);
        const text = String(pole || '');
        const m = text.match(/(\d+)/);
        if (!m)
            return 999999999;
        const base = Number(m[1]);
        const slash = text.match(/\/(\d+|[A-Z]+)/i);
        let sub = 0;
        if (slash) {
            const raw = slash[1].toUpperCase();
            sub = /^\d+$/.test(raw) ? (Number(raw) + 1) / 1000 : 0.9;
        }
        else if (/[A-Z]$/i.test(text)) {
            sub = 0.0005;
        }
        return base + sub;
    }
    function pointXYForLine(rec) {
        return { x: Number(rec[IDX.LON]), y: Number(rec[IDX.LAT]) };
    }
    function groupAnchorForLine(group) {
        let sx = 0;
        let sy = 0;
        let n = 0;
        for (const rec of group || []) {
            const p = pointXYForLine(rec);
            if (!Number.isFinite(p.x) || !Number.isFinite(p.y))
                continue;
            sx += p.x;
            sy += p.y;
            n += 1;
        }
        return n ? { x: sx / n, y: sy / n } : null;
    }
    function distanceSqForLine(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return dx * dx + dy * dy;
    }
    function perpendicularDistanceSqForLine(p, a, b) {
        const vx = b.x - a.x;
        const vy = b.y - a.y;
        const wx = p.x - a.x;
        const wy = p.y - a.y;
        const lenSq = vx * vx + vy * vy;
        if (!lenSq)
            return distanceSqForLine(p, a);
        const t = Math.max(0, Math.min(1, (wx * vx + wy * vy) / lenSq));
        const proj = { x: a.x + t * vx, y: a.y + t * vy };
        return distanceSqForLine(p, proj);
    }
    function buildLinePointsExcludingStayPoles(points) {
        const main = (points || []).filter(rec => !poleHasSlashBranch(rec));
        const groups = [];
        for (const rec of main) {
            const key = structureBaseKeyForLine(rec) || displayLabelForResult(rec);
            const last = groups[groups.length - 1];
            if (last && last.key === key) {
                last.items.push(rec);
            }
            else {
                groups.push({ key, items: [rec] });
            }
        }
        const selected = [];
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i].items;
            if (group.length === 1) {
                selected.push(group[0]);
                continue;
            }
            const prev = i > 0 ? groupAnchorForLine(groups[i - 1].items) : null;
            const next = i < groups.length - 1 ? groupAnchorForLine(groups[i + 1].items) : null;
            let best = group[0];
            let bestScore = Infinity;
            for (const rec of group) {
                const p = pointXYForLine(rec);
                if (!Number.isFinite(p.x) || !Number.isFinite(p.y))
                    continue;
                let score = 0;
                if (prev && next) {
                    score = perpendicularDistanceSqForLine(p, prev, next);
                }
                else if (prev) {
                    score = distanceSqForLine(p, prev);
                }
                else if (next) {
                    score = distanceSqForLine(p, next);
                }
                if (score < bestScore) {
                    bestScore = score;
                    best = rec;
                }
            }
            selected.push(best);
        }
        return selected;
    }
    function uniqueLineRecordsByCoord(items) {
        const out = [];
        const seen = new Set();
        for (const rec of items || []) {
            const lat = Number(rec[IDX.LAT]);
            const lon = Number(rec[IDX.LON]);
            if (!Number.isFinite(lat) || !Number.isFinite(lon))
                continue;
            const key = `${lat.toFixed(7)}|${lon.toFixed(7)}|${recVal(rec, IDX.SID)}`;
            if (seen.has(key))
                continue;
            seen.add(key);
            out.push(rec);
        }
        return out;
    }
    function buildSlashBranchLineSegments(points, mainLinePoints) {
        const baseAnchors = new Map();
        for (const rec of mainLinePoints || []) {
            const base = structureBaseNumberForLine(rec);
            if (base)
                baseAnchors.set(base, rec);
        }
        const byBase = new Map();
        for (const rec of points || []) {
            if (!poleHasSlashBranch(rec))
                continue;
            const base = structureBaseNumberForLine(rec);
            if (!base)
                continue;
            if (!byBase.has(base))
                byBase.set(base, []);
            byBase.get(base).push(rec);
        }
        const segments = [];
        for (const [base, rawItems] of byBase.entries()) {
            const anchor = baseAnchors.get(base);
            if (!anchor)
                continue;
            const end = rawItems.find(isBranchEndForLine) || rawItems[rawItems.length - 1];
            const items = orderBranchRecordsByPath(anchor, end, rawItems);
            if (!items.length)
                continue;
            const finalItems = end && !items.includes(end) ? [...items, end] : items;
            segments.push([anchor, ...finalItems]);
        }
        return segments;
    }
    function buildCircuitLinePointsForDisplay(points) {
        const source = uniqueLineRecordsByCoord(points || []);
        if (mapHasBadZeroOnlyPoleNumbers(source))
            return source;
        const mainLinePoints = buildLinePointsExcludingStayPoles(source);
        return mainLinePoints.length >= 2 ? mainLinePoints : source;
    }
    function drawCircuitPreviewLineSegment(segment) {
        if (!circuitMarkerLayer || !Array.isArray(segment) || segment.length < 2 || !window.L)
            return;
        const chunks = [];
        let chunk = [];
        let prev = null;
        const maxGapMeters = 6000;
        for (const rec of segment) {
            const lat = Number(rec[IDX.LAT]);
            const lon = Number(rec[IDX.LON]);
            if (!Number.isFinite(lat) || !Number.isFinite(lon))
                continue;
            if (prev && recordDistanceMeters(prev, rec) > maxGapMeters) {
                if (chunk.length >= 2)
                    chunks.push(chunk);
                chunk = [];
            }
            chunk.push([lat, lon]);
            prev = rec;
        }
        if (chunk.length >= 2)
            chunks.push(chunk);
        for (const latLngs of chunks) {
            L.polyline(latLngs, {
                className: 'snapshot-circuit-line',
                color: '#264638',
                weight: 5,
                opacity: 0.9,
                interactive: false,
                lineCap: 'round',
                lineJoin: 'round'
            }).addTo(circuitMarkerLayer);
        }
    }
    function showLeafletCircuitMap(points) {
        const map = ensureLeafletMap();
        if (!map || !circuitMarkerLayer) {
            showFallbackCircuitMap(points);
            return;
        }
        setCircuitLayer(circuitLayerMode);
        setCircuitMapInteractionMode(circuitMapFullscreen);
        circuitMarkerLayer.clearLayers();
        const allLatLngs = points.map(rec => [Number(rec[IDX.LAT]), Number(rec[IDX.LON])]);
        currentCircuitBounds = L.latLngBounds(allLatLngs);
        const linePoints = buildCircuitLinePointsForDisplay(points);
        drawCircuitPreviewLineSegment(linePoints);
        if (!circuitMapFullscreen) {
            setTimeout(() => {
                map.invalidateSize();
                fitCircuitMap();
            }, 80);
            return;
        }
        const labelEvery = 20;
        const labelledPoleBases = new Set();
        const badZeroLabels = mapHasBadZeroOnlyPoleNumbers(points);
        points.forEach((rec, i) => {
            const isEnd = i === 0 || i === points.length - 1;
            const displayPoleForLabel = mapDisplayPoleForPoint(rec, i, points);
            const poleBaseMatch = String(displayPoleForLabel || '').match(/\d+/);
            const poleBase = poleBaseMatch ? Number(poleBaseMatch[0]) : NaN;
            const isRealTwenty = Number.isFinite(poleBase) && poleBase > 0 && poleBase % labelEvery === 0 && !labelledPoleBases.has(poleBase);
            if (isRealTwenty)
                labelledPoleBases.add(poleBase);
            const latLng = [Number(rec[IDX.LAT]), Number(rec[IDX.LON])];
            const marker = L.circleMarker(latLng, {
                radius: isEnd ? 12 : (isRealTwenty ? 10.5 : 8.5),
                color: '#264638',
                weight: isRealTwenty || isEnd ? 3.2 : 2.8,
                fillColor: isEnd || isRealTwenty ? '#264638' : '#fffaf1',
                fillOpacity: 1
            });
            marker.on('click', () => {
                if (!circuitMapFullscreen) {
                    setCircuitMapFullscreen(true);
                    return;
                }
                showAssetPopup(i, marker.getLatLng());
            });
            marker.addTo(circuitMarkerLayer);
            const hitMarker = L.circleMarker(latLng, {
                radius: 20,
                color: '#264638',
                weight: 0,
                opacity: 0,
                fillColor: '#264638',
                fillOpacity: 0.01,
                interactive: true
            });
            hitMarker.on('click', () => {
                if (!circuitMapFullscreen) {
                    setCircuitMapFullscreen(true);
                    return;
                }
                showAssetPopup(i, hitMarker.getLatLng());
            });
            hitMarker.addTo(circuitMarkerLayer);
            if (isRealTwenty) {
                const pole = mapDisplayPoleForPoint(rec, i, points);
                if (pole)
                    marker.bindTooltip(escapeHtml(pole), {
                        permanent: true,
                        direction: 'top',
                        offset: [0, -10],
                        className: 'structure-every-20-label',
                        opacity: 1
                    });
            }
        });
        setTimeout(() => {
            map.invalidateSize();
            fitCircuitMap();
        }, 80);
    }
    function showCircuitMap(rec) {
        closeSoftKeyboard();
        rec = upgradeRecord(rec);
        const circuit = circuitLabelFromRecord(rec);
        const points = circuitAssetsForMap(circuit);
        if (!points.length) {
            setStatus(`No plotted GPS points found for ${circuit}.`, true);
            window.open(googleMapsUrl(rec), '_blank', 'noopener');
            return;
        }
        currentCircuitPoints = points;
        hideAssetPopup();
        hideWhatsHere();
        if (els.settingsPanel)
            els.settingsPanel.classList.add('hidden');
        if (els.searchPanel)
            els.searchPanel.classList.add('hidden');
        if (els.waitingDog)
            els.waitingDog.classList.add('hidden');
        if (els.resultsInfo)
            els.resultsInfo.classList.add('hidden');
        if (els.results)
            els.results.classList.add('hidden');
        if (els.circuitMapTitle)
            els.circuitMapTitle.textContent = circuit;
        if (els.circuitMapSub) {
            els.circuitMapSub.textContent = '';
            els.circuitMapSub.classList.add('hidden');
        }
        if (els.circuitMapPanel)
            els.circuitMapPanel.classList.remove('hidden');
        if (els.fullMapControls)
            els.fullMapControls.classList.add('hidden');
        closeMapLayerMenu();
        setCircuitMapFullscreen(false);
        showLeafletCircuitMap(points);
        if (els.circuitMapList)
            els.circuitMapList.innerHTML = '';
        setStatus(`${circuit} plotted with ${points.length.toLocaleString()} GPS points.`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    function openMapPoint(index) {
        const rec = currentCircuitPoints[Number(index)];
        if (!rec)
            return;
        selectedMapIndex = Number(index);
        if (circuitMap) {
            const latlng = [Number(rec[IDX.LAT]), Number(rec[IDX.LON])];
            circuitMap.setView(latlng, Math.max(circuitMap.getZoom(), 17), { animate: true });
            showAssetPopup(index, L.latLng(latlng[0], latlng[1]));
        }
        else {
            window.open(googleMapsUrl(rec), '_blank', 'noopener');
        }
    }
    function googleMapsUrl(rec) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${rec[IDX.LAT]},${rec[IDX.LON]}`)}`;
    }
    function isSiteRecord(rec) {
        const type = recVal(rec, IDX.TYPE);
        const label = recVal(rec, IDX.LABEL);
        if (/\b(substation|terminal|power\s*station|station|depot|switchyard|zone|site|facility)\b/i.test(type))
            return true;
        if (/\b(substation|terminal|power\s*station|station|depot|switchyard)\b/i.test(label))
            return true;
        if (rec && (rec[IDX.SITE_NAME] || rec[IDX.SITE_CODE]))
            return true;
        if (String(type).toLowerCase() === 'circuit')
            return false;
        const looksLikePoleLabel = /\b(?:\d{2}|X\d[A-Z]?)\s*-\s*\d+[A-Z]?\b/i.test(label);
        const looksLikeCircuitOnly = /\b(?:\d{2}|X\d[A-Z]?)\b/i.test(label) && /[-/]/.test(label);
        const plainName = /^[A-Za-z][A-Za-z\s'.]{2,}$/.test(label);
        return Boolean(!rec?.[IDX.POLE] && label && !looksLikePoleLabel && !looksLikeCircuitOnly && (plainName || !rec?.[IDX.CIRCUIT]));
    }
    function cleanSiteWord(value) {
        return String(value || '')
            .replace(/\b(substation|terminal|power\s*station|station|depot|switchyard)\b/ig, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    function splitSiteName(label, sid = '') {
        label = String(label || '').trim();
        sid = String(sid || '').trim();
        const stripped = cleanSiteWord(label);
        let abbr = '';
        let name = '';
        const paren = stripped.match(/^(.*?)\s*\(([A-Z0-9]{1,6})\)\s*$/i);
        if (paren) {
            name = cleanSiteWord(paren[1]);
            abbr = paren[2].toUpperCase();
        }
        if (!abbr || !name) {
            const dash = stripped.split(/\s+[-–—]\s+/).map(s => s.trim()).filter(Boolean);
            if (dash.length >= 2) {
                const firstShort = /^[A-Z0-9]{1,6}$/i.test(dash[0]);
                const lastShort = /^[A-Z0-9]{1,6}$/i.test(dash[dash.length - 1]);
                if (firstShort) {
                    abbr = dash[0].toUpperCase();
                    name = cleanSiteWord(dash.slice(1).join(' - '));
                }
                else if (lastShort) {
                    abbr = dash[dash.length - 1].toUpperCase();
                    name = cleanSiteWord(dash.slice(0, -1).join(' - '));
                }
            }
        }
        if (!abbr && /^[A-Z0-9]{1,6}$/i.test(sid))
            abbr = sid.toUpperCase();
        if (!abbr && /^[A-Z0-9]{1,6}$/i.test(stripped))
            abbr = stripped.toUpperCase();
        if (!name && stripped && norm(stripped) !== norm(abbr))
            name = cleanSiteWord(stripped);
        if (!name && sid && norm(sid) !== norm(abbr))
            name = cleanSiteWord(sid);
        if (abbr && name && norm(abbr) === norm(name))
            name = '';
        return { abbr, name };
    }
    function sourceRefForFileName(name) {
        const text = String(name || '').toLowerCase();
        if (/(^|[^a-z0-9])transmission[\s_-]*poles?([^a-z0-9]|$)/i.test(text) || /transmissionpoles?/i.test(text))
            return 'Landgate';
        if (/(^|[^a-z0-9])depots?([^a-z0-9]|$)/i.test(text))
            return 'Google';
        return '';
    }
    function importedSourceRefForRecord(rec) {
        if (!Array.isArray(importedFiles) || !importedFiles.length)
            return '';
        if (!sourceRefCache) {
            sourceRefCache = new Map();
            for (const file of importedFiles) {
                const ref = sourceRefForFileName(file && file.name);
                if (!ref || !Array.isArray(file && file.records))
                    continue;
                for (const fileRec of file.records) {
                    const key = assetDedupeKey(upgradeRecord(fileRec));
                    if (key && !sourceRefCache.has(key))
                        sourceRefCache.set(key, ref);
                }
            }
        }
        return sourceRefCache.get(assetDedupeKey(upgradeRecord(rec))) || '';
    }
    function resultRefForRecord(rec) {
        const importedRef = importedSourceRefForRecord(rec);
        if (importedRef)
            return importedRef;
        if (isDepotRecord(rec))
            return 'Google';
        return 'Landgate';
    }
    function appendResultRef(subtitle, ref) {
        subtitle = String(subtitle || '').trim();
        ref = String(ref || '').trim();
        if (!ref)
            return subtitle;
        if (/\bref\s*:/i.test(subtitle))
            return subtitle;
        return subtitle ? `${subtitle} • ref: ${ref}` : `ref: ${ref}`;
    }
    function knownSiteCodeFromRecord(rec, raw = '') {
        rec = upgradeRecord(rec);
        const type = recVal(rec, IDX.TYPE).toLowerCase();
        if (type === 'circuit' || isPoleTowerRecord(rec))
            return '';
        const split = splitSiteName(recVal(rec, IDX.LABEL), recVal(rec, IDX.SID));
        const candidates = [
            recVal(rec, IDX.SITE_CODE),
            split.abbr,
            recVal(rec, IDX.SID),
            recVal(rec, IDX.LABEL),
            recVal(rec, IDX.SITE_NAME)
        ];
        for (const value of candidates) {
            const key = norm(cleanSiteWord(value));
            if (!key)
                continue;
            if (aliasNameForCode(key))
                return key;
            if (SITE_ALIAS_BY_NAME[key])
                return SITE_ALIAS_BY_NAME[key];
        }
        return '';
    }
    function knownSiteDisplayName(rec, raw = '') {
        rec = upgradeRecord(rec);
        const code = knownSiteCodeFromRecord(rec, raw);
        const split = splitSiteName(recVal(rec, IDX.LABEL), recVal(rec, IDX.SID));
        const aliasName = code ? aliasNameForCode(code) : '';
        const candidates = [
            recVal(rec, IDX.SITE_NAME),
            split.name,
            aliasName,
            recVal(rec, IDX.LABEL),
            code
        ];
        for (const value of candidates) {
            const name = titleCaseSiteName(cleanSiteWord(value));
            if (name && (!code || norm(name) !== norm(code)))
                return name;
        }
        return code || '';
    }
    function isKnownSiteAliasRecord(rec, raw = '') {
        if (isDepotRecord(rec))
            return false;
        return Boolean(knownSiteCodeFromRecord(rec, raw));
    }
    function siteSubtitleForRecord(rec, raw) {
        rec = upgradeRecord(rec);
        if (isDepotRecord(rec))
            return 'Depot';
        const name = knownSiteDisplayName(rec, raw);
        return name ? `${name} - Substation` : 'Substation';
    }
    function resultSubtitle(rec, raw) {
        rec = upgradeRecord(rec);
        const type = recVal(rec, IDX.TYPE).toLowerCase();
        const ref = resultRefForRecord(rec);
        if (type === 'circuit')
            return appendResultRef('Circuit', ref);
        if (type === 'alias')
            return appendResultRef(siteSubtitleForRecord(rec, raw), ref);
        if (isPoleTowerRecord(rec))
            return appendResultRef('Asset', ref);
        if (isSiteRecord(rec) || isKnownSiteAliasRecord(rec, raw))
            return appendResultRef(siteSubtitleForRecord(rec, raw), ref);
        if (isCircuitOnlySearch(raw) || isCircuitOnlySearch(recVal(rec, IDX.LABEL)) || baseQueryMatchesCircuit(rec, raw))
            return appendResultRef('Circuit', ref);
        const circuitSub = circuitAliasSubtitle(rec, raw);
        if (circuitSub)
            return appendResultRef(circuitSub, ref);
        return appendResultRef('', ref);
    }
    function circuitDataHealthWarning(rec) {
        rec = upgradeRecord(rec);
        const text = norm([
            recVal(rec, IDX.CIRCUIT),
            recVal(rec, IDX.LABEL),
            recVal(rec, IDX.SID),
            recVal(rec, IDX.K_CIRCUIT),
            recVal(rec, IDX.K_LABEL)
        ].join(' '));
        const hasCircuit = (compactName, voltage) => text.includes(compactName) && (!voltage || text.includes(String(voltage)));
        const hasEndpointCircuit = (endpoints, voltage) => endpoints.every(code => text.includes(code)) && (!voltage || text.includes(String(voltage)));
        if ((hasCircuit('PICPNJBSNKEM', '81') || hasEndpointCircuit(['PIC', 'PNJ', 'BSN', 'KEM'], '81'))) {
            return {
                level: 'insufficient',
                message: 'INSUFFICIENT DATA: source file has no usable pole numbers for PIC-PNJ/BSN/KEM 81. Asset numbers may be missing or derived from structure ID.'
            };
        }
        if ((hasCircuit('MERCARYERSX', '71') || hasEndpointCircuit(['MER', 'CAR', 'YER', 'SX'], '71'))) {
            return {
                level: 'insufficient',
                message: 'INSUFFICIENT DATA: source file has grouped labels only for MER-CAR/YER/SX 71, not individual pole numbers.'
            };
        }
        const formatWatchlist = [
            ['KWKEMOLY', '91', 'KW-KEM/OLY 91'],
            ['BGACTBEMD', '81', 'BGA-CTB/EMD 81'],
            ['PJRENBEMD', '81', 'PJR-ENB/EMD 81'],
            ['BLDPCYPKS', '81', 'BLD-PCY/PKS 81'],
            ['SHOSTOLY', '91', 'SHO-ST/OLY 91'],
            ['KWKDPMSR', '81', 'KW-KDP/MSR 81'],
            ['SNRWGPAPJ', '81', 'SNR-WGP/APJ 81'],
            ['MRTNORCNS', '81', 'MRT-NOR/CNS 81'],
            ['MRTMER', '81', 'MRT-MER 81'],
            ['NGSWAGNGN', '71', 'NGS-WAG/NGN 71'],
            ['MERKELBDE', '71', 'MER-KEL/BDE 71'],
            ['PICCAPWSD', '71', 'PIC-CAP/WSD 71'],
            ['CTMSSPNJ', '81', 'CT-MSS/PNJ 81']
        ];
        for (const [compactName, voltage, label] of formatWatchlist) {
            if (hasCircuit(compactName, voltage)) {
                return {
                    level: 'format',
                    message: `DATA FORMAT WARNING: ${label} has messy source labels, such as trailing commas, slashes, or repeated branch-style numbers. Pole numbers may still work, but verify against approved records.`
                };
            }
        }
        return null;
    }
    function renderResults(raw = '', total = 0, source = mode) {
        lastResults = (lastResults || []).filter(rec => !isCrossingRecord(rec));
        els.results.innerHTML = '';
        const fetching = document.body.classList.contains('mymate-fetching-pending-results');
        if (raw && !fetchRequested) {
            if (els.resultsInfo) {
                els.resultsInfo.textContent = '';
                els.resultsInfo.classList.add('hidden');
            }
            if (stickyNoResultDog || document.getElementById('noResultDog')) {
                keepNoResultDogVisible();
            }
            else {
                removeNoResultDogPanel();
                setWaitingDogMode('normal');
            }
            setSearchResultsScreen(false);
            return;
        }
        if (source === 'local' && !records.length) {
            els.resultsInfo.textContent = '';
            els.resultsInfo.classList.add('hidden');
            removeNoResultDogPanel();
            setWaitingDogMode('normal');
            setSearchResultsScreen(false);
            return;
        }
        if (!raw) {
            els.resultsInfo.textContent = '';
            els.resultsInfo.classList.add('hidden');
            removeNoResultDogPanel();
            setWaitingDogMode('normal');
            setSearchResultsScreen(false);
            return;
        }
        if (!lastResults.length) {
            els.resultsInfo.textContent = `No asset found for “${raw}”.`;
            els.resultsInfo.classList.remove('hidden');
            if (fetching) {
                if (stickyNoResultDog || document.getElementById('noResultDog')) {
                    keepNoResultDogVisible();
                    document.body.classList.add('mymate-keep-noresult-during-fetch');
                }
                else {
                    forceWaitingDogVisible();
                }
            }
            else {
                showNoResultDogPanel();
                setWaitingDogMode('noresult');
            }
            setSearchResultsScreen(true);
            return;
        }
        els.resultsInfo.textContent = `${lastResults.length.toLocaleString()} assets found`;
        els.resultsInfo.classList.remove('hidden');
        if (fetching) {
            if (stickyNoResultDog || document.getElementById('noResultDog')) {
                keepNoResultDogVisible();
                document.body.classList.add('mymate-keep-noresult-during-fetch');
            }
            else {
                forceWaitingDogVisible();
            }
        }
        else {
            removeNoResultDogPanel();
            forceWaitingDogHidden();
        }
        setWaitingDogMode('normal');
        setSearchResultsScreen(true);
        const actionLabel = escapeHtml(nextActionLabelForSearch(raw));
        els.results.innerHTML = lastResults.map((rec, i) => {
            const subtitle = resultSubtitle(rec, raw);
            const dataHealth = circuitDataHealthWarning(rec);
            const dataWarning = dataHealth?.message || '';
            const dataWarningLevel = dataHealth?.level || '';
            const buttonLabel = isCircuitResult(rec) ? 'Show on map' : 'Open Maps';
            return `<article class="result-card${dataWarning ? ' data-health-result ' + dataWarningLevel + '-data-result' : ''}">
        <div class="result-title">
          <div class="result-label-wrap">
            <div class="label-main">${escapeHtml(displayLabelForResult(rec, raw))}</div>
            ${subtitle ? `<div class="label-subtitle">${escapeHtml(subtitle)}</div>` : ''}
            ${dataWarning ? `<div class="circuit-data-warning ${escapeHtml(dataWarningLevel)}">${escapeHtml(dataWarning)}</div>` : ''}
          </div>
          <button type="button" data-open-index="${i}">${escapeHtml(buttonLabel)}</button>
        </div>
      </article>`;
        }).join('');
    }
    function openByIndex(index) {
        const rec = lastResults[Number(index)];
        if (!rec)
            return;
        if (isCircuitResult(rec)) {
            showCircuitMap(rec);
            return;
        }
        window.open(googleMapsUrl(rec), '_blank', 'noopener');
    }
    function debounce(fn, delay = 220) {
        let t;
        return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
    }
    function setNoResultDogVisible(show) { stickyNoResultDog = false; document.body.classList.remove('mymate-noresult-active'); }
    function syncNoResultDog() {
        if (!els.resultsInfo) {
            removeNoResultDogPanel();
            return;
        }
        const infoText = String(els.resultsInfo.textContent || '').trim();
        const infoVisible = !els.resultsInfo.classList.contains('hidden');
        const settingsOpen = !!(els.settingsPanel && !els.settingsPanel.classList.contains('hidden'));
        const mapOpen = !!(els.circuitMapPanel && !els.circuitMapPanel.classList.contains('hidden'));
        if (settingsOpen || mapOpen) {
            removeNoResultDogPanel();
            setWaitingDogMode('normal');
            return;
        }
        const show = infoVisible && /^No asset found for/u.test(infoText);
        if (show || stickyNoResultDog || document.getElementById('noResultDog')) {
            keepNoResultDogVisible();
            return;
        }
        setNoResultDogVisible(false);
        setWaitingDogMode('normal');
    }
    function showNextHomeDog() {
        if (!els.waitingDog)
            return;
        setWaitingDogMode('normal');
        const variants = Array.from(els.waitingDog.querySelectorAll('[data-dog-variant]'));
        variants.forEach((node, i) => node.classList.toggle('active', i === 0));
        els.waitingDog.dataset.variant = '0';
    }
    function applyRandomWaitingDog() {
        if (!els.waitingDog)
            return;
        if (isNoResultState()) {
            showNoResultDogPanel();
            setWaitingDogMode('noresult');
            return;
        }
        setWaitingDogMode('normal');
        const variants = Array.from(els.waitingDog.querySelectorAll('[data-dog-variant]'));
        variants.forEach((node, i) => node.classList.toggle('active', i === 0));
        els.waitingDog.dataset.variant = '0';
    }
    function setSearchResultsScreen(active) {
        document.body.classList.toggle('mymate-results-active', Boolean(active));
        if (active)
            hideCircuitMap();
        if (active && els.settingsPanel)
            els.settingsPanel.classList.add('hidden');
        const fetching = document.body.classList.contains('mymate-fetching-pending-results');
        const keepWaiting = Boolean(active) && fetching && !stickyNoResultDog && !document.getElementById('noResultDog');
        if (els.waitingDog)
            els.waitingDog.classList.toggle('hidden', Boolean(active) && !keepWaiting);
        if (!active && !(stickyNoResultDog || document.getElementById('noResultDog')))
            removeNoResultDogPanel();
    }
    let waitingDogVariant = 0;
    let waitingJokeIndex = 0;
    const WAITING_JOKES = [
        "Ready mate.",
        "On standby.",
        "Waiting for a search.",
        "Map ready.",
        "Good to go."
    ];
    function setWaitingDogMode(mode) {
        if (!els.waitingDog)
            return;
        els.waitingDog.dataset.mode = mode || 'normal';
    }
    function isNoResultState() {
        return !lastResults.length && !!(els.resultsInfo && els.resultsInfo.textContent && /^No asset found for/u.test(els.resultsInfo.textContent));
    }
    function applyWaitingDogVariant(index) {
        if (!els.waitingDog)
            return;
        const variants = Array.from(els.waitingDog.querySelectorAll('[data-dog-variant]'));
        if (!variants.length)
            return;
        setWaitingDogMode('normal');
        waitingDogVariant = ((index % variants.length) + variants.length) % variants.length;
        els.waitingDog.dataset.variant = String(waitingDogVariant);
        variants.forEach((node, i) => node.classList.toggle('active', i === waitingDogVariant));
    }
    function applyWaitingJoke(index) {
        const caption = els.waitingDog ? els.waitingDog.querySelector('.dog-caption') : null;
        if (!caption || !WAITING_JOKES.length)
            return;
        waitingJokeIndex = ((index % WAITING_JOKES.length) + WAITING_JOKES.length) % WAITING_JOKES.length;
        caption.textContent = WAITING_JOKES[waitingJokeIndex];
    }
    function cycleWaitingDogDisplay() {
        if (!els.waitingDog)
            return;
        if (isNoResultState()) {
            setWaitingDogMode('noresult');
            return;
        }
        const total = els.waitingDog.querySelectorAll('[data-dog-variant]').length || 1;
        applyWaitingDogVariant((waitingDogVariant + 1) % total);
        applyWaitingJoke(waitingJokeIndex + 1);
    }
    function showLoginScreen() {
        applyRandomWaitingDog();
        lastResults = [];
        els.results.innerHTML = '';
        els.resultsInfo.textContent = '';
        els.resultsInfo.classList.add('hidden');
        syncNoResultDog();
        els.searchInput.value = '';
        setSearchResultsScreen(false);
        toggleSettings(false);
        if (hasLiveSession()) {
            minimiseLoginPanel(true);
            renderLoginFields();
            setStatus('Ready.');
        }
        else {
            minimiseLoginPanel(false);
            if (hasSavedLogin())
                showLoginView('pin');
            else
                renderLoginFields();
            setStatus('Ready.');
        }
        applyLoginVisibility();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    function keepDigitsOnly(el) {
        if (!el)
            return;
        el.value = String(el.value || '').replace(/\D+/g, '').slice(0, 12);
    }
    function warningTodayKey() {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }
    function readWarningState() {
        const fallback = { initialAccepted: false, date: '', dailyShows: 0 };
        try {
            const raw = localStorage.getItem(WARNING_STATE_KEY);
            if (raw) {
                const state = JSON.parse(raw);
                return {
                    initialAccepted: Boolean(state.initialAccepted),
                    date: String(state.date || ''),
                    dailyShows: Number(state.dailyShows || 0)
                };
            }
            if (localStorage.getItem(WARNING_ACCEPT_KEY) === 'yes') {
                return { initialAccepted: true, date: '', dailyShows: 0 };
            }
        }
        catch { }
        return fallback;
    }
    function writeWarningState(state) {
        try {
            localStorage.setItem(WARNING_STATE_KEY, JSON.stringify({
                initialAccepted: Boolean(state.initialAccepted),
                date: String(state.date || ''),
                dailyShows: Math.max(0, Number(state.dailyShows || 0))
            }));
        }
        catch { }
    }
    function showInitialWarning() {
        if (!els.warningConfirm)
            return;
        const today = warningTodayKey();
        const state = readWarningState();
        if (!state.initialAccepted) {
            els.warningConfirm.classList.remove('hidden');
            return;
        }
        const dailyShows = state.date === today ? Number(state.dailyShows || 0) : 0;
        if (dailyShows < WARNING_MAX_DAILY_SHOWS_AFTER_INITIAL) {
            els.warningConfirm.classList.remove('hidden');
        }
    }
    function acceptInitialWarning() {
        const today = warningTodayKey();
        const state = readWarningState();
        if (!state.initialAccepted) {
            state.initialAccepted = true;
            state.date = today;
            state.dailyShows = 0;
        }
        else {
            state.date = today;
            state.dailyShows = Math.min(WARNING_MAX_DAILY_SHOWS_AFTER_INITIAL, Number(state.dailyShows || 0) + 1);
        }
        writeWarningState(state);
        try {
            localStorage.setItem(WARNING_ACCEPT_KEY, 'yes');
        }
        catch { }
        if (els.warningConfirm)
            els.warningConfirm.classList.add('hidden');
    }
    function updateSetStatus(message, bad = false) {
        if (!els.updateStatus)
            return;
        els.updateStatus.textContent = message;
        els.updateStatus.classList.toggle('bad', Boolean(bad));
        els.updateStatus.classList.toggle('ok', !bad);
    }
    function autoUpdateEnabled() {
        try {
            const saved = localStorage.getItem(AUTO_UPDATE_KEY);
            return saved === null ? true : saved === 'yes';
        }
        catch {
            return true;
        }
    }
    function setAutoUpdateEnabled(enabled) {
        try {
            localStorage.setItem(AUTO_UPDATE_KEY, enabled ? 'yes' : 'no');
        }
        catch { }
        if (els.autoUpdateToggle)
            els.autoUpdateToggle.checked = Boolean(enabled);
    }
    function normaliseReleaseInfo(info) {
        if (!info || typeof info !== 'object')
            return null;
        const version = String(info.version || '').trim();
        if (!version)
            return null;
        const notes = Array.isArray(info.releaseNotes) ? info.releaseNotes : (Array.isArray(info.notes) ? info.notes : []);
        return {
            app: String(info.app || 'GridMap'),
            version,
            label: String(info.label || `GridMap v${version}`),
            cacheName: String(info.cacheName || ''),
            dataSchemaVersion: info.dataSchemaVersion === undefined ? '' : String(info.dataSchemaVersion),
            releaseDate: String(info.releaseDate || info.releasedAt || ''),
            releaseNotes: notes.map(note => String(note)).filter(Boolean)
        };
    }
    function renderReleaseInfo(info, checked = false) {
        const safe = normaliseReleaseInfo(info) || normaliseReleaseInfo(LOCAL_RELEASE_INFO);
        if (!safe)
            return;
        if (els.updateLatestVersion)
            els.updateLatestVersion.textContent = checked ? safe.label : 'Not checked yet';
        if (els.updateReleaseDate)
            els.updateReleaseDate.textContent = checked && safe.releaseDate ? safe.releaseDate : LOCAL_RELEASE_INFO.releaseDate;
        if (els.updateDataSchema)
            els.updateDataSchema.textContent = `v${safe.dataSchemaVersion || DATA_SCHEMA_VERSION}`;
    }
    function refreshUpdatePanel() {
        if (els.updateCurrentVersion)
            els.updateCurrentVersion.textContent = APP_VERSION_LABEL;
        if (els.updateCacheName)
            els.updateCacheName.textContent = APP_CACHE_NAME;
        if (els.autoUpdateToggle)
            els.autoUpdateToggle.checked = autoUpdateEnabled();
        renderReleaseInfo(LOCAL_RELEASE_INFO, false);
        let swText = 'Not available';
        if ('serviceWorker' in navigator && location.protocol !== 'file:') {
            if (navigator.serviceWorker.controller)
                swText = 'Active';
            else
                swText = 'Available after reload';
        }
        if (els.updateSwState)
            els.updateSwState.textContent = swText;
    }
    async function clearMyMateCaches() {
        if (!('caches' in window))
            return 0;
        const keys = await caches.keys();
        const mine = keys.filter(key => /^gridmap-/i.test(key) || /^pathfinder-/i.test(key) || /^search-assets-/i.test(key) || /^lookup-/i.test(key) || /^mymate-/i.test(key) || /^dogbones-/i.test(key));
        await Promise.all(mine.map(key => caches.delete(key)));
        return mine.length;
    }
    function cacheBustUrl(url) {
        const u = new URL(url, location.href);
        u.searchParams.set('v', APP_VERSION + '-' + Date.now());
        return u.toString();
    }
    async function fetchRemoteReleaseInfo() {
        if (location.protocol === 'file:')
            return null;
        try {
            const versionRes = await fetch(cacheBustUrl(RELEASE_INFO_URL), {
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache' }
            });
            if (versionRes.ok) {
                const json = await versionRes.json();
                const info = normaliseReleaseInfo(json);
                if (info)
                    return info;
            }
        }
        catch { }
        const res = await fetch(cacheBustUrl('index.html'), {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' }
        });
        if (!res.ok)
            throw new Error('Could not check for updates.');
        const text = await res.text();
        const m = text.match(/(?:GridMap|myMate)\s+v([0-9]+(?:\.[0-9]+){1,3})/i);
        return m ? normaliseReleaseInfo({ version: m[1], label: `GridMap v${m[1]}` }) : null;
    }
    async function fetchRemoteVersion() {
        const info = await fetchRemoteReleaseInfo();
        return info ? info.version : null;
    }
    async function checkForUpdates(manual = false) {
        refreshUpdatePanel();
        if (!('serviceWorker' in navigator) || location.protocol === 'file:') {
            updateSetStatus('Automatic updates are available after the app is published online.', true);
            if (els.updateLastCheck)
                els.updateLastCheck.textContent = new Date().toLocaleString();
            return;
        }
        try {
            updateSetStatus('Checking for updates...');
            const reg = await navigator.serviceWorker.getRegistration();
            if (reg)
                await reg.update();
            const remoteInfo = await fetchRemoteReleaseInfo();
            const remoteVersion = remoteInfo ? remoteInfo.version : null;
            if (els.updateLastCheck)
                els.updateLastCheck.textContent = new Date().toLocaleString();
            if (remoteInfo)
                renderReleaseInfo(remoteInfo, true);
            if (remoteVersion && remoteVersion !== APP_VERSION) {
                updateSetStatus(`New version found: GridMap v${remoteVersion}. Press Update now.`);
                return;
            }
            if (reg && reg.waiting) {
                updateSetStatus('Update ready. Press Update now.');
                return;
            }
            updateSetStatus(manual ? 'Latest version is installed.' : 'Latest version is installed.');
        }
        catch (err) {
            updateSetStatus(err && err.message ? err.message : 'Could not check for updates.', true);
        }
    }
    async function loadLatestVersion() {
        try {
            updateSetStatus('Preparing update...');
            await clearMyMateCaches();
            if ('serviceWorker' in navigator && location.protocol !== 'file:') {
                const regs = await navigator.serviceWorker.getRegistrations();
                await Promise.all(regs.map(reg => reg.update().catch(() => { })));
            }
            updateSetStatus('Opening latest version...');
            setTimeout(() => {
                location.replace(cacheBustUrl(location.pathname || './'));
            }, 350);
        }
        catch (err) {
            updateSetStatus(err && err.message ? err.message : 'Could not update now.', true);
        }
    }
    async function clearUpdateCacheOnly() {
        try {
            updateSetStatus('Clearing old app files...');
            const count = await clearMyMateCaches();
            updateSetStatus(count ? `Cleared old app files. Press Update now.` : 'No old app files found. Press Update now.');
            refreshUpdatePanel();
        }
        catch (err) {
            updateSetStatus(err && err.message ? err.message : 'Could not clear old app files.', true);
        }
    }
    async function registerServiceWorker() {
        if (!('serviceWorker' in navigator) || location.protocol === 'file:') {
            refreshUpdatePanel();
            return null;
        }
        try {
            const reg = await navigator.serviceWorker.register(`sw.js?v=${encodeURIComponent(APP_ASSET_VERSION)}`);
            refreshUpdatePanel();
            reg.addEventListener('updatefound', () => {
                const worker = reg.installing;
                if (!worker)
                    return;
                worker.addEventListener('statechange', () => {
                    if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                        updateSetStatus('Update ready. Press Update now.');
                    }
                });
            });
            return reg;
        }
        catch {
            refreshUpdatePanel();
            return null;
        }
    }
    async function init() {
        window.__MYMATE_APP_BOOTED = true;
        setTimeout(() => hideSplash(true), 1200);
        setTimeout(() => hideSplash(true), 4200);
        refreshUpdatePanel();
        requestPersistentStorage();
        try {
            if (hasSavedLogin())
                loginView = 'pin';
            const local = await loadLocalRecords();
            if (local) {
                records = upgradeRecords(Array.isArray(local.records) ? local.records : []);
                importedFiles = Array.isArray(local.files) ? local.files.map(file => ({ ...file, records: upgradeRecords(file.records) })) : [];
                dataMeta = local.meta || { source: 'saved device data' };
                if (records.length)
                    mode = 'local';
                if (records.length)
                    scheduleLocalIndexRebuild();
                setStatus(records.length ? `Loaded saved local index with ${records.length.toLocaleString()} records.` : 'Ready.');
                if (dataMeta?.totalFeaturesRead)
                    updatePerfStatus(`Saved import verified: ${records.length.toLocaleString()} kept / ${Number(dataMeta.totalFeaturesRead).toLocaleString()} read.`);
            }
            else {
                if (mode === 'local')
                    mode = 'live';
                setStatus('Ready.');
            }
            setMode(mode);
        }
        catch (err) {
            if (mode === 'local')
                mode = 'live';
            setStatus('Ready.', false);
        }
        finally {
            const warningDelay = minSplashDelay() + 150;
            hideSplash(false);
            setTimeout(showInitialWarning, warningDelay);
        }
    }
    if (els.warningConfirmBtn)
        els.warningConfirmBtn.addEventListener('click', acceptInitialWarning);
    document.querySelectorAll('[data-result-limit]').forEach(btn => btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        setResultLimit(Number(btn.dataset.resultLimit));
    }));
    els.settingsPageBtns?.forEach(btn => btn.addEventListener('click', () => { showSettingsPage(btn.dataset.settingsPageBtn); if (btn.dataset.settingsPageBtn === 'update')
        refreshUpdatePanel(); }));
    if (els.autoUpdateToggle)
        els.autoUpdateToggle.addEventListener('change', () => setAutoUpdateEnabled(els.autoUpdateToggle.checked));
    if (els.checkUpdateBtn)
        els.checkUpdateBtn.addEventListener('click', () => checkForUpdates(true));
    if (els.reloadLatestBtn)
        els.reloadLatestBtn.addEventListener('click', loadLatestVersion);
    if (els.clearUpdateCacheBtn)
        els.clearUpdateCacheBtn.addEventListener('click', clearUpdateCacheOnly);
    document.querySelectorAll('[data-settings-back]').forEach(btn => btn.addEventListener('click', () => showSettingsMenu()));
    if (els.homeLogoBtn)
        els.homeLogoBtn.addEventListener('click', () => { removeNoResultDogPanel(); showMainPage({ clearSearch: true }); showNextHomeDog(); });
    if (els.liveModeBtn)
        els.liveModeBtn.addEventListener('click', () => setMode('live'));
    if (els.localModeBtn)
        els.localModeBtn.addEventListener('click', () => setMode('local'));

    if (els.infoLoginToggle)
        els.infoLoginToggle.addEventListener('click', () => setInfoLoginExpanded(els.infoLoginBody ? els.infoLoginBody.classList.contains('hidden') : true));

    if (els.loginPanel) {
        els.loginPanel.addEventListener('click', e => {
            if (!els.loginPanel.classList.contains('minimised'))
                return;
            if (e.target.closest('button,input,label'))
                return;
            minimiseLoginPanel(false);
            renderLoginFields();
        });
    }

    if (els.loginBtn) els.loginBtn.addEventListener('click', loginButton);
    if (els.switchLoginBtn) els.switchLoginBtn.addEventListener('click', () => showLoginView(loginView === 'pin' ? 'full' : 'pin'));
    if (els.logoutBtn) els.logoutBtn.addEventListener('click', clearAllLogin);
    if (els.settingsBtn)
        els.settingsBtn.addEventListener('click', () => { showQuickMenu(false); toggleSettings(); });
    if (els.quickMenuBtn)
        els.quickMenuBtn.addEventListener('click', () => {
            showQuickMenu(false);
            if (settingsOpen()) {
                showMainPage({ clearSearch: true });
                showNextHomeDog();
                return;
            }
            toggleSettings(true);
        });
    if (els.settingsReturnBtn)
        els.settingsReturnBtn.addEventListener('click', () => toggleSettings(false));
    if (els.clearAppCacheBtn)
        els.clearAppCacheBtn.addEventListener('click', clearStorageCache);
    if (els.clearDataBtn)
        els.clearDataBtn.addEventListener('click', resetCache);
    if (els.deleteAllImportsBtn)
        els.deleteAllImportsBtn.addEventListener('click', deleteAllImportedFiles);
    if (els.hardResetBtn)
        els.hardResetBtn.addEventListener('click', hardReset);
    if (els.importedFiles)
        els.importedFiles.addEventListener('click', e => {
            const btn = e.target.closest('[data-delete-file]');
            if (!btn)
                return;
            deleteImportedFile(btn.dataset.deleteFile).catch(err => setStatus(err.message || String(err), true));
        });
    if (els.localGeojson) els.localGeojson.addEventListener('change', e => importGeojsonFiles(e.target.files).catch(err => { stopLoading(); setUiBusy(false); setStatus(err.message || String(err), true); }));
    if (els.searchBtn) els.searchBtn.addEventListener('click', () => Promise.resolve(search(els.searchInput.value)).catch(err => { stopLoading(); setUiBusy(false); setStatus(err.message || String(err), true); }));
    if (els.searchInput) els.searchInput.addEventListener('input', debounce(() => { hideResultsUntilFetch(); }));
    if (els.searchInput) els.searchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            Promise.resolve(search(els.searchInput.value)).catch(err => { stopLoading(); setUiBusy(false); setStatus(err.message || String(err), true); });
        }
    });
    if (els.loginPass) els.loginPass.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            loginButton();
        }
    });
    if (els.newPin) els.newPin.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            loginButton();
        }
    });
    if (els.pinCode) els.pinCode.addEventListener('input', () => keepDigitsOnly(els.pinCode));
    if (els.newPin) els.newPin.addEventListener('input', () => keepDigitsOnly(els.newPin));
    if (els.pinCode) els.pinCode.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            Promise.resolve(search(els.searchInput.value)).catch(err => { stopLoading(); setUiBusy(false); setStatus(err.message || String(err), true); });
        }
    });
    if (els.results) els.results.addEventListener('click', e => {
        const btn = e.target.closest('[data-open-index]');
        if (btn)
            openByIndex(btn.dataset.openIndex);
    });
    if (els.quickMenu)
        els.quickMenu.addEventListener('click', e => {
            const btn = e.target.closest('[data-quick-action]');
            if (!btn)
                return;
            const action = btn.dataset.quickAction;
            showQuickMenu(false);
            if (action === 'main') {
                removeNoResultDogPanel();
                showMainPage({ clearSearch: true });
                showNextHomeDog();
                return;
            }
            if (action === 'settings')
                toggleSettings(true);
            if (action === 'import') {
                toggleSettings(true);
                showSettingsPage('import');
            }
        });
    if (els.circuitMapCloseBtn)
        els.circuitMapCloseBtn.addEventListener('click', () => showMainPage());
    if (els.mapFullscreenBtn) {
        els.mapFullscreenBtn.addEventListener('touchstart', () => {
            if (document.activeElement && typeof document.activeElement.blur === 'function')
                document.activeElement.blur();
        }, { passive: true });
        els.mapFullscreenBtn.addEventListener('click', () => setCircuitMapFullscreen(!circuitMapFullscreen));
    }
    if (els.circuitMapCanvas)
        els.circuitMapCanvas.addEventListener('click', e => {
            const target = e.target.closest('[data-map-index]');
            if (target) {
                openMapPoint(target.dataset.mapIndex);
                return;
            }
            if (!circuitMapFullscreen && currentCircuitPoints.length)
                setCircuitMapFullscreen(true);
        });
    if (els.circuitMapList)
        els.circuitMapList.addEventListener('click', e => {
            const target = e.target.closest('[data-map-index]');
            if (target)
                openMapPoint(target.dataset.mapIndex);
        });
    if (els.streetLayerBtn)
        els.streetLayerBtn.addEventListener('click', () => setCircuitLayer('street'));
    if (els.satelliteLayerBtn)
        els.satelliteLayerBtn.addEventListener('click', () => setCircuitLayer('satellite'));
    if (els.zoomFitBtn)
        els.zoomFitBtn.addEventListener('click', fitCircuitMap);
    if (els.mapExitFullscreenBtn)
        els.mapExitFullscreenBtn.addEventListener('click', () => setCircuitMapFullscreen(false));
    if (els.whatsHereBtn)
        els.whatsHereBtn.addEventListener('click', showWhatsHere);
    if (els.whatsHerePanel)
        els.whatsHerePanel.addEventListener('click', e => {
            const closeBtn = e.target.closest('[data-whats-here-close]');
            if (closeBtn) {
                hideWhatsHere();
                return;
            }
            const openBtn = e.target.closest('[data-whats-here-open]');
            if (openBtn)
                openWhatsHereAsset(openBtn.dataset.whatsHereOpen);
        });
    if (els.mapLayerBtn)
        els.mapLayerBtn.addEventListener('click', () => toggleMapLayerMenu());
    if (els.mapLayerMenu)
        els.mapLayerMenu.addEventListener('click', e => {
            const btn = e.target.closest('[data-layer-choice]');
            if (!btn)
                return;
            setCircuitLayer(btn.dataset.layerChoice);
            closeMapLayerMenu();
        });
    document.addEventListener('fullscreenchange', syncCircuitFullscreenFromBrowser);
    document.addEventListener('webkitfullscreenchange', syncCircuitFullscreenFromBrowser);
    window.addEventListener('resize', forceFullscreenMapResize);
    window.addEventListener('orientationchange', forceFullscreenMapResize);
    window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault();
        deferredPrompt = e;
        els.installBtn.classList.remove('hidden');
    });
    if (els.installBtn) els.installBtn.addEventListener('click', async () => {
        if (!deferredPrompt)
            return;
        deferredPrompt.prompt();
        deferredPrompt = null;
        els.installBtn.classList.add('hidden');
    });
    registerServiceWorker().then(() => { if (autoUpdateEnabled())
        setTimeout(() => checkForUpdates(false), 1800); });
    if ('serviceWorker' in navigator)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!autoUpdateEnabled())
                return;
            const reloadKey = `search-assets-controller-reload-${APP_VERSION}`;
            let alreadyReloaded = false;
            try {
                alreadyReloaded = sessionStorage.getItem(reloadKey) === '1';
            }
            catch { }
            if (!window.__MYMATE_RELOADING_FOR_UPDATE__ && !alreadyReloaded) {
                window.__MYMATE_RELOADING_FOR_UPDATE__ = true;
                try { sessionStorage.setItem(reloadKey, '1'); } catch { }
                location.reload();
            }
        });
    window.MYMATE_MAP_READY = {
        getResults: getMapReadyResults,
        getAllLocal: () => records.map(mapReadyRecord).filter(item => Number.isFinite(item.lat) && Number.isFinite(item.lon))
    };
    renderResultLimitButtons();
    init();
})();
