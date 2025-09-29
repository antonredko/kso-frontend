import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
	uk: {
		translation: {
			app_name: "ОЛАА!",
			greeting: "Доброго дня,",
			slogan: "Завжди вигідно!",
			start_button: "Почати покупки",
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
			check_title: "Ваш чек",
			instruction_scan_start: "Будь ласка, відскануйте перший товар",
			instruction_scan_next:
				"Скануйте наступний товар або натисніть Оплата",
			check_empty: "Ваш чек поки порожній. Скануйте товари!",
			summary_subtotal: "Проміжна сума",
			summary_discount: "Знижка",
			summary_total: "До сплати",
			payment_button: "Оплата",
			error_product_not_found: "Товар не знайдено!",
			scan_input_placeholder: "Введіть код товару...",
			// --- PAYMENT SELECTION ---
			payment_select_title: "Оберіть спосіб оплати",
			payment_option_card: "Карткою",
			payment_card_info: "Прикладіть або вставте картку",
			payment_option_cash: "Готівкою",
			payment_cash_info: "Недоступно на КСО",
			back_to_scan: "Повернутися до сканування",

			// --- TERMINAL ---
			terminal_wait_card: "Очікування картки...",
			terminal_processing: "Обробка платежу...",
			terminal_success: "Платіж успішно прийнято!",
			terminal_error: "Помилка оплати",

			// --- FINISH ---
			finish_thank_you: "Дякуємо за покупку!",
			finish_message: "Ваш чек надруковано.",
			finish_icon_text: "❤️",
			finish_instruction:
				"Автоматичний перехід до привітання через 10 секунд",
			start_new_order: "Розпочати нове замовлення",
		},
	},
	en: {
		translation: {
			app_name: "OLAA!",
			slogan: "Always profitable!",
			greeting: "Good day,",
			start_button: "Start shopping",
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
			check_title: "Your check",
			instruction_scan_start: "Please scan the first item",
			instruction_scan_next: "Scan the next item or click Checkout",
			check_empty: "Your check is still empty. Scan the items!",
			summary_subtotal: "Subtotal",
			summary_discount: "Discount",
			summary_total: "To be paid",
			payment_button: "Checkout",
			error_product_not_found: "Product not found!",
			scan_input_placeholder: "Enter the product code...",
			// --- PAYMENT SELECTION ---
			payment_select_title: "Select payment method",
			payment_option_card: "By card",
			payment_card_info: "Apply or insert card",
			payment_option_cash: "By cash",
			payment_cash_info: "Not available on KSO",
			back_to_scan: "Back to scan",

			// --- TERMINAL ---
			terminal_wait_card: "Waiting for card...",
			terminal_processing: "Processing payment...",
			terminal_success: "Payment successfully accepted!",
			terminal_error: "Payment error",

			// --- FINISH ---
			finish_thank_you: "Thank you for your purchase!",
			finish_message: "Your receipt has been printed.",
			finish_icon_text: "❤️",
			finish_instruction:
				"Automatic transition to greeting in 10 seconds",
			start_new_order: "Start new order",
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
