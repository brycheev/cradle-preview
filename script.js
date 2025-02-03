AOS.init(); // Инициализация AOS для анимаций

// Получаем кнопки и модальные окна
const contactsBtn = document.getElementById('contacts-btn');
const addressBtn = document.getElementById('address-btn');
const contactsModal = document.getElementById('contacts-modal');
const addressModal = document.getElementById('address-modal');
const closeContacts = document.getElementById('close-contacts');
const closeAddress = document.getElementById('close-address');

// Открыть модальное окно с контактами
contactsBtn.onclick = function () {
  contactsModal.classList.add('open');
};

// Открыть модальное окно с адресом
addressBtn.onclick = function () {
  addressModal.classList.add('open');
};

// Закрыть модальное окно с контактами
closeContacts.onclick = function () {
  contactsModal.classList.remove('open');
};

// Закрыть модальное окно с адресом
closeAddress.onclick = function () {
  addressModal.classList.remove('open');
};

// Закрыть модальные окна, если кликнули вне окна
window.onclick = function (event) {
  if (event.target === contactsModal) {
    contactsModal.classList.remove('open');
  } else if (event.target === addressModal) {
    addressModal.classList.remove('open');
  }
};

let currentIndex = 0;

const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function changeSlide(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1; // Переход к последнему слайду
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0; // Переход к первому слайду
    }

    updateSliderPosition();
}

function updateSliderPosition() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.addEventListener("DOMContentLoaded", () => {
    const languageToggle = document.getElementById("language-toggle");
    let currentLang = localStorage.getItem("lang") || "ru";

    // Функция загрузки переводов
    async function loadTranslations(lang) {
        try {
            const response = await fetch("translations.json");
            const translations = await response.json();
            updateText(translations[lang]);
        } catch (error) {
            console.error("Error loading translations:", error);
        }
    }

    // Функция обновления текста
    function updateText(translations) {
        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            if (translations[key]) {
                element.innerHTML = translations[key]; // Используем innerHTML для сохранения разметки
            }
        });

        languageToggle.textContent = currentLang === "ru" ? "🇰🇬 Кыр" : "🇷🇺 Рус";
    }
    // Обработчик смены языка
    languageToggle.addEventListener("click", () => {
        currentLang = currentLang === "ru" ? "kg" : "ru";
        localStorage.setItem("lang", currentLang);
        loadTranslations(currentLang);
    });

    // Загрузка перевода при загрузке страницы
    loadTranslations(currentLang);
});
