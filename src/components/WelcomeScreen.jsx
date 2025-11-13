import React from "react";
import { useTranslation } from "react-i18next";

// Компонент приймає функцію onStart для переходу на наступний екран
const WelcomeScreen = ({ onStart }) => {
	const { t } = useTranslation();

	return (
		<div className="welcome-screen-content">
			<div className="kso-header-decor">
				<div className="decor-pattern"></div>
			</div>

			<div className="kso-main-area">
				{/* 2. Логотип ОЛАА! */}
				<div className="logo-container">
					<h1 className="logo-text">ОЛДІ</h1>
				</div>

				{/* 3. Вітальне повідомлення та слоган (використовуємо локалізацію t()) */}
				<p className="slogan">{t("slogan")}</p>
				<h2 className="greeting">{t("greeting")}</h2>

				{/* 4. Інформаційний блок про оплату */}
				<div className="info-block">
					<p>{t("info_payment")}</p>
				</div>

				{/* 5. Кнопка початку покупок, яка викликає функцію переходу */}
				<button
					className="start-button"
					onClick={onStart} // onStart переведе нас на екран введення телефону
				>
					{t("start_button")}
				</button>

				{/* 6. Іконки платіжних систем (імітація) */}
				<div className="payment-icons">
					<span className="visa-text">VISA</span>
					<span className="mastercard-icon-mock">M/C</span>
				</div>
			</div>
		</div>
	);
};

export default WelcomeScreen;
