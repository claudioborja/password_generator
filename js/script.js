document.addEventListener("DOMContentLoaded", function () {
    // Referencias
    const passwordField = document.getElementById("password");
    const lengthInput = document.getElementById("length");
    const lengthValue = document.getElementById("lengthValue");
    const lowercaseCheck = document.getElementById("lowercase");
    const uppercaseCheck = document.getElementById("uppercase");
    const numbersCheck = document.getElementById("numbers");
    const symbolsCheck = document.getElementById("symbols");
    const generateBtn = document.getElementById("generate-btn");
  
    // Banderas
    const flagEs = document.getElementById("flag-es");
    const flagEn = document.getElementById("flag-en");
  
    // -- Función de cambio de idioma
    function changeLanguage(lang) {
      // Actualizamos texto en los elementos correspondientes
      document.getElementById("page-title").textContent = translations[lang].pageTitle;
      document.getElementById("main-title").textContent = translations[lang].mainTitle;
      document.getElementById("label-password").textContent = translations[lang].labelPassword;
      document.getElementById("label-settings").textContent = translations[lang].labelSettings;
      document.getElementById("label-length").textContent = translations[lang].labelLength;
      document.getElementById("generate-btn").textContent = translations[lang].generateButton;
  
      // Checkboxes:
      document.getElementById("lowercaseCheck").textContent = translations[lang].lowercaseCheck;
      document.getElementById("uppercaseCheck").textContent = translations[lang].uppercaseCheck;
      document.getElementById("numbersCheck").textContent = translations[lang].numbersCheck;
      document.getElementById("symbolsCheck").textContent = translations[lang].symbolsCheck;
    }
  
    // Listeners de banderas
    flagEs.addEventListener("click", () => changeLanguage("es"));
    flagEn.addEventListener("click", () => changeLanguage("en"));
  
    // Mostrar valor de la longitud actual
    lengthInput.addEventListener("input", () => {
      lengthValue.textContent = lengthInput.value;
    });
  
    // Generar la contraseña al hacer clic en el botón
    generateBtn.addEventListener("click", () => {
      const length = parseInt(lengthInput.value);
      const includeLower = lowercaseCheck.checked;
      const includeUpper = uppercaseCheck.checked;
      const includeNumbers = numbersCheck.checked;
      const includeSymbols = symbolsCheck.checked;
  
      passwordField.value = generatePassword(length, includeLower, includeUpper, includeNumbers, includeSymbols);
    });
  
    function generatePassword(length, lower, upper, numbers, symbols) {
      const lowerChars = "abcdefghijklmnopqrstuvwxyz";
      const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numberChars = "0123456789";
      const symbolChars = "!-$+";
  
      let charPool = "";
      if (lower) charPool += lowerChars;
      if (upper) charPool += upperChars;
      if (numbers) charPool += numberChars;
      if (symbols) charPool += symbolChars;
  
      // Vector de idioma según qué título tenga la cabecera (puede ser otra lógica si prefieres)
      let currentLang = "es";
      const mainTitle = document.getElementById("main-title").textContent;
      if (mainTitle === translations.en.mainTitle) {
        currentLang = "en";
      }
  
      // Si no hay criterios seleccionados, devolvemos texto traducido
      if (charPool.length === 0) {
        return translations[currentLang].noCriteriaSelected;
      }
  
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
      }
      return password;
    }
  
    // Ponemos el idioma por defecto en español al cargar
    changeLanguage("es");
  });
  