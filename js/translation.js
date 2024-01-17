
export async function initTranslation() {
    const en = await fetch('./i18n/en.json').then(response => response.json());
    const es = await fetch('./i18n/es.json').then(response => response.json());
    const de = await fetch('./i18n/de.json').then(response => response.json());
    const se = await fetch('./i18n/se.json').then(response => response.json());
    const savedLang = localStorage.getItem('preferredLanguage') || 'en'; // Use saved language or default to 'en'

    i18next.init({
        lng: savedLang,
        debug: true,
        resources: {
            en: {
                translation: en
            },
            es: {
                translation: es
            },
            de: {
                translation: de
            },
            se: {
                translation: se
            }
            // Add more languages here
        }
    }, function (err, t) {
        // initialized and ready to go!

        updateContent();
    });

    document.getElementById('languageSwitcher').value = savedLang;

    // Language selector event
    document.getElementById('languageSwitcher').addEventListener('change', (event) => {
        const newLang = event.target.value;
        i18next.changeLanguage(newLang, () => {
            updateContent();
        });
        localStorage.setItem('preferredLanguage', newLang); // Save the language preference
    });

}

export function updateContent() {
    // Update content using i18next
    updateTranslations();
}

function updateTranslations() {
    // This will update all elements with the 'data-i18n' attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((element) => {
        const keys = element.getAttribute('data-i18n').split(';');
        keys.forEach((key) => {
            if (key.includes('[')) {
                // Attribute translation like placeholder, title, etc.
                const parts = key.split('[');
                const attr = parts[1].slice(0, -1); // remove the closing bracket
                element.setAttribute(attr, i18next.t(parts[0]));
            } else {
                // Text translation
                element.innerHTML = i18next.t(key);
            }
        });
    });
}
