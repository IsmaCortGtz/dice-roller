const LANG_KEYS = {
  es: {
    "ROLL_BUTTON": "¡Girar!",
    "ONE_DICE": "Un dado",
    "TWO_DICES": "Dos dados"
  },
  en: {
    "ROLL_BUTTON": "¡Roll!",
    "ONE_DICE": "One dice",
    "TWO_DICES": "Two dices"
  }
}

function keyExists(lang, key){
  if (LANG_KEYS[lang][key] === undefined){
    return key;
  }

  return LANG_KEYS[lang][key];
}

function getKey(key){
  if (Object.keys(LANG_KEYS).includes(navigator.language)){
    return keyExists(navigator.language, key);
  }

  if (Object.keys(LANG_KEYS).includes(navigator.language.split("-")[0])){
    return keyExists(navigator.language.split("-")[0], key);
  }

  return keyExists("es", key);
}