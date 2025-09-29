import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// 1. Словники перекладів
const resources = {
	uk: {
		translation: {
			app_name: "ОЛАА!",
			greeting: "Доброго дня,", // <-- Використовується в <h2>
			slogan: "Завжди вигідно!", // <-- Використовується в <p>
			info_1: "ласкаво просимо до нашого магазину.",
			info_2: "Доступна оплата лише",
			info_3: "картою та система лояльності ЛОЯ",
			start_button: "Почати покупки", // <-- Використовується в кнопці
			info_payment:
				"ласкаво просимо до нашого магазину.\nДоступна оплата лише\nкартою та система лояльності ЛОЯ",
			start_purchase: "Почати покупки",
			scan_card: "Скануйте Бонусну Карту",
			loyalty_prompt: "Є картка лояльності?",
			loyalty_input_title: "Введіть номер телефону",
			loyalty_continue: "Продовжити",
			loyalty_skip: "Пропустити",
			payment_info: "До оплати",
			waiting_card: "Очікування картки",
			thank_you: "Дякуємо за покупку!",
			take_item: "Не забудьте забрати товар!",
			skip_button: "Пропустити",
			loyalty_title: "Введіть номер телефону",
			loyalty_info: "для участі у програмі лояльності",
		},
	},
	en: {
		translation: {
			app_name: "OLAA!",
			slogan: "Always profitable!",
			greeting: "Good day,",
			info_payment:
				"welcome to our store.\nOnly card payment and LOYA loyalty system are available",
			start_purchase: "Start shopping",
			scan_card: "Scan Loyalty Card",
			loyalty_prompt: "Have a loyalty card?",
			loyalty_input_title: "Enter phone number",
			loyalty_continue: "Continue",
			loyalty_skip: "Skip",
			payment_info: "Total payable",
			waiting_card: "Waiting for card",
			thank_you: "Thank you for your purchase!",
			take_item: "Don't forget to take your items!",
			skip_button: "Skip",
			loyalty_title: "Enter phone number",
			loyalty_info: "to participate in the loyalty program",
		},
	},
};

i18n.use(LanguageDetector) // Додаємо детектор мови
	.use(initReactI18next) // Передаємо екземпляр i18n до react-i18next
	.init({
		resources,
		fallbackLng: "uk", // Мова за замовчуванням, якщо мова користувача не визначена
		detection: {
			order: ["cookie", "localStorage", "navigator"], // Порядок визначення мови
		},
		interpolation: {
			escapeValue: false, // react вже захищає від XSS
		},
	});

export default i18n;
