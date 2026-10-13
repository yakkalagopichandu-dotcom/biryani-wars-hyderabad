/**
 * HYDERABADI DAKHNI STREET SLANG TEXT RULE ENGINE
 * Transforms boring, dry system/developer error messages into authentic,
 * hilarious Hyderabadi street slang with local cultural warnings
 * (bad parking, mama log challans, flyover traffic bottlenecks, empty deghs, etc.)
 */

const HYDERABADI_SLANG_RULES = [
  // 1. Parking Errors & Warnings
  {
    id: "rule_parking",
    name: "Gaadi Parking & Challan Rule",
    keywords: ["parking", "vehicle", "car space", "no parking", "tow", "valet", "park"],
    pattern: /(parking|no space|vehicle|valet|parked|towed|traffic police)/i,
    transform: (original, context = {}) => {
      const location = context.location || "wahan";
      return {
        category: "PARKING_ALERT",
        slangTitle: "🚨 ARREY BAAP RE! MAMA LOG KHADE HAI!",
        slangMessage: `Ustaad! ${location} pe gaadi lagaye toh Traffic Police Mama log seedha challan kaatte ya gaadi utha ke lejaate! Footpath pe chadhane ka socho bhi nakko. Auto karke jao nai toh Metro pakdo, aaram se biryani khao!`,
        streetSlangAdvice: "Gaadi dur galli me lagao ya seedha rapido / auto book karo!",
        severity: "danger",
        dakhniEmoji: "🚓⚠️"
      };
    }
  },

  // 2. Traffic Congestion & Route Delays
  {
    id: "rule_traffic",
    name: "Flyover Jam & Dimaag ki Dahi Rule",
    keywords: ["traffic", "congestion", "delay", "jam", "route blocked", "slow route", "eta"],
    pattern: /(traffic|congestion|delay|jammed|bottleneck|gridlock|slow|eta delayed)/i,
    transform: (original, context = {}) => {
      const area = context.area || "Flyover";
      return {
        category: "TRAFFIC_ALERT",
        slangTitle: "🛑 DIMAAG KI DAHI! FLYOVER PE JAM BAITH GAYA!",
        slangMessage: `Miyan! ${area} pe gaadiyan aisi phasi hui hai jaise degh me chawal! Biryani wahan thandi hojati tab tak, aur tum yahan horn bajate baithte. Short-cut galli se niklo nai toh doosra spot pakdo jaldi!`,
        streetSlangAdvice: "Main road chhod ke galli se Activa cut maaro ya metro pakdo!",
        severity: "warning",
        dakhniEmoji: "🛵💨"
      };
    }
  },

  // 3. Restaurant Closed / Sold Out / Degh Empty
  {
    id: "rule_closed_empty",
    name: "Pateela Khaali & Degh Saaf Rule",
    keywords: ["closed", "sold out", "unavailable", "empty", "out of stock", "404", "not found"],
    pattern: /(closed|sold out|out of stock|404|not found|unavailable|shut down)/i,
    transform: (original, context = {}) => {
      const spot = context.spotName || "Hotel";
      return {
        category: "DEGH_ALERT",
        slangTitle: "🥘 PATEELA KHAALI HOGAYA! DEGH SAAF!",
        slangMessage: `Khatam miyan! ${spot} ka aakhri degh bhi bikaau hogaya! Bartan chamak rahe, baasi salan bhi nahi bacha ab. Haath dho ke doosri dukaan ku bhago, late aane ka yehi nateeja rehta!`,
        streetSlangAdvice: "Dusre adda ku daudo ustaad, yahan khali dhuwan bacha hai!",
        severity: "danger",
        dakhniEmoji: "🍲🚫"
      };
    }
  },

  // 4. Duplicate Vote / Unfair Voting
  {
    id: "rule_duplicate_vote",
    name: "Baigan ki Ungli Rule (Duplicate Entry)",
    keywords: ["already voted", "duplicate", "already exists", "403", "forbidden", "limit exceeded"],
    pattern: /(already voted|duplicate|already exists|403|forbidden|not allowed|conflict)/i,
    transform: (original, context = {}) => {
      return {
        category: "VOTE_CHEAT_ALERT",
        slangTitle: "✋ EK BAAR VOTE DAALE NA MIYAN? UNGLI KYU KARRE?",
        slangMessage: `Arey baigan me milao nakko yaaro! Ek baar vote daal diye na, ab chup chaap chai piyo. Group me heera-pheri kare toh bill poora tumse hi bharwayenge sab milke!`,
        streetSlangAdvice: "Sabr karo ustaad, Super-Vote ka button dabaoge toh 3 vote milenge!",
        severity: "warning",
        dakhniEmoji: "🫵🤨"
      };
    }
  },

  // 5. Out of Distance / Range Error
  {
    id: "rule_distance",
    name: "Outer Ring Road Gali-Galata Rule",
    keywords: ["distance", "out of range", "too far", "radius", "location", "boundary"],
    pattern: /(distance|out of range|too far|radius|outside boundaries|far away)/i,
    transform: (original, context = {}) => {
      return {
        category: "DISTANCE_ALERT",
        slangTitle: "🗺️ KAHAN OUTER RING ROAD BHEJRE BHAI? GALI GALATA HOGAYA!",
        slangMessage: `Arrey miyan! Hyderabad me biryani dhoond rahe ya Shamshabad airport ke aage khet me? Distance slider thoda kam karo yaaro, bhook se pet me choohe ladaai karre yahan!`,
        streetSlangAdvice: "Slider ko 5 km pe set karo, paas me hi azeem spots hai!",
        severity: "info",
        dakhniEmoji: "📍🤦‍♂️"
      };
    }
  },

  // 6. Deadlock / Tie in Voting
  {
    id: "rule_tie",
    name: "Sullah & Toss Karwana Rule",
    keywords: ["tie", "draw", "equal", "deadlock", "no consensus", "argument"],
    pattern: /(tie|draw|deadlock|equal|dispute|conflict|stalemate)/i,
    transform: (original, context = {}) => {
      return {
        category: "TIE_ALERT",
        slangTitle: "⚔️ DONO BARABAR AAGAYE! AB KYA DANGAL KAREINGE?",
        slangMessage: `Dono spot pe same vote aagaye miyan! Aise hi bahas kare toh raat ke 2 baj jaate aur degh band hojata. Chup chaap 'Spin The Degh' ka chakra ghumaao aur naseeb ka faisla maano!`,
        streetSlangAdvice: "Sullah Wheel ghumaao aur kissa khatam karo!",
        severity: "warning",
        dakhniEmoji: "🎲🎯"
      };
    }
  },

  // 7. Network / Connection / Timeout Error
  {
    id: "rule_network",
    name: "Tower Ubb Gaya Rule (Network Error)",
    keywords: ["network", "timeout", "offline", "500", "502", "connection", "disconnected"],
    pattern: /(network|timeout|connection|offline|500|502|server error|failed to fetch)/i,
    transform: (original, context = {}) => {
      return {
        category: "NETWORK_ALERT",
        slangTitle: "📶 TOWER UBB GAYA MIYAN! JIO KA DIMAAG KHASAK GAYA!",
        slangMessage: `Hau miyan, internet ka server bhi biryani khane chala gaya lagta hai! Ek martaba refresh maaro ya flight mode on-off karo, biryani hamara intezaar nahi karti!`,
        streetSlangAdvice: "Refresh maaro ya hotspot mango dost se!",
        severity: "danger",
        dakhniEmoji: "⚡😵"
      };
    }
  },

  // 8. Payment / Budget / Bill Split Errors
  {
    id: "rule_budget",
    name: "Chillar & Google Pay Rule",
    keywords: ["payment", "budget", "money", "funds", "bill", "split", "expensive"],
    pattern: /(payment|budget|cost|expensive|money|funds|unpaid|split)/i,
    transform: (original, context = {}) => {
      return {
        category: "BUDGET_ALERT",
        slangTitle: "💸 POCKET ME CHILLAR NAI HAI AUR NALLI BIRYANI KHANA HAI?",
        slangMessage: `Arrey miyan! Jeb me das rupaye nahi aur baatein Nawabi? Dost ko Google Pay request bhejo pehle, bill counter pe khade hoke 'mera phone switch off hai' ka natak nakko karo!`,
        streetSlangAdvice: "Gpay pehle karwao warna bartan dhulwayenge hotel wale!",
        severity: "warning",
        dakhniEmoji: "💳😂"
      };
    }
  },

  // 9. Generic Fallback Rule
  {
    id: "rule_generic",
    name: "Aada-Tedha Locha Rule (Default Fallback)",
    keywords: ["error", "exception", "failed", "invalid", "unknown"],
    pattern: /.*/,
    transform: (original, context = {}) => {
      return {
        category: "GENERIC_ALERT",
        slangTitle: "🤦 LOCHA HOGAYA USTAAD! KUCH GADBAD HOGAYI!",
        slangMessage: `Dekho miyan: "${original || "Kuch ajeeb error aagaya"}". Aada-tedha click kare toh aisa hi hota. Thoda aahista ungli chalao aur seedha rasta pakdo!`,
        streetSlangAdvice: "Button dubara aaram se dabao miyan!",
        severity: "info",
        dakhniEmoji: "🤷‍♂️✨"
      };
    }
  }
];

/**
 * Main Text Rule Engine Function:
 * Takes any dry, corporate or developer error message and translates it into Hyderabadi street slang.
 */
function translateErrorToSlang(errorMessage, context = {}) {
  if (!errorMessage || typeof errorMessage !== "string") {
    errorMessage = "Unexpected error occurred";
  }

  const cleanMessage = errorMessage.trim();

  // Search through defined rules in priority order
  for (const rule of HYDERABADI_SLANG_RULES) {
    if (rule.pattern && rule.pattern.test(cleanMessage)) {
      const result = rule.transform(cleanMessage, context);
      return {
        ruleId: rule.id,
        ruleName: rule.name,
        originalText: cleanMessage,
        ...result
      };
    }
  }

  // Fallback to generic rule
  const fallback = HYDERABADI_SLANG_RULES[HYDERABADI_SLANG_RULES.length - 1];
  return {
    ruleId: fallback.id,
    ruleName: fallback.name,
    originalText: cleanMessage,
    ...fallback.transform(cleanMessage, context)
  };
}

// Universal exports for browser and Node
if (typeof window !== "undefined") {
  window.HYDERABADI_SLANG_RULES = HYDERABADI_SLANG_RULES;
  window.translateErrorToSlang = translateErrorToSlang;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { HYDERABADI_SLANG_RULES, translateErrorToSlang };
}

