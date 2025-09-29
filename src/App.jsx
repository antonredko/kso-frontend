import React, { useState } from "react";
import "./index.css";
import KsoFooter from "./components/KsoFooter";
import WelcomeScreen from "./components/WelcomeScreen";
import LoyaltyInputScreen from "./components/LoyaltyInputScreen";
import ScanningScreen from "./components/ScanningScreen";
import PaymentSelectionScreen from "./components/PaymentSelectionScreen";
import CardTerminalScreen from "./components/CardTerminalScreen";
import FinishScreen from "./components/FinishScreen";

// Визначаємо можливі стани екрана
const SCREEN_STATES = {
	WELCOME: "WELCOME",
	LOYALTY_INPUT: "LOYALTY_INPUT",
	SCANNING_ITEMS: "SCANNING_ITEMS",
	PAYMENT_SELECTION: "PAYMENT_SELECTION",
	PAYMENT_TERMINAL: "PAYMENT_TERMINAL",
	FINISH: "FINISH",
};

function App() {
	const [screenState, setScreenState] = useState(SCREEN_STATES.WELCOME);
	const [loyaltyNumber, setLoyaltyNumber] = useState(null);

	const changeScreen = (newState) => {
		setScreenState(newState);
	};

  const handleRestart = () => {
      setLoyaltyNumber(null);
      changeScreen(SCREEN_STATES.WELCOME);
  }

	// 2. Логіка для переходу з екрана лояльності
	const handleLoyaltyProceed = (number) => {
		// В реальному проєкті тут буде виклик API для перевірки номера
		setLoyaltyNumber(number);
		changeScreen(SCREEN_STATES.SCANNING_ITEMS);
		console.log(`Номер лояльності введено: ${number}`);
	};

	const handleLoyaltySkip = () => {
		setLoyaltyNumber(null); // Скидаємо номер
		changeScreen(SCREEN_STATES.SCANNING_ITEMS);
		console.log("Пропущено введення номера лояльності");
	};

	const renderScreenContent = () => {
		switch (screenState) {
			case SCREEN_STATES.WELCOME:
				return (
					<WelcomeScreen
						onStart={() =>
							changeScreen(SCREEN_STATES.LOYALTY_INPUT)
						}
					/>
				);

			case SCREEN_STATES.LOYALTY_INPUT:
				// ...
				return (
					<LoyaltyInputScreen
						onSkip={handleLoyaltySkip}
						onProceed={handleLoyaltyProceed}
					/>
				);

			case SCREEN_STATES.SCANNING_ITEMS:
				return (
					<ScanningScreen
						onFinishScanning={() =>
							changeScreen(SCREEN_STATES.PAYMENT_SELECTION)
						}
					/>
				);

			case SCREEN_STATES.PAYMENT_SELECTION:
				return (
					<PaymentSelectionScreen
						onGoToTerminal={() =>
							changeScreen(SCREEN_STATES.PAYMENT_TERMINAL)
						}
						onCancel={() =>
							changeScreen(SCREEN_STATES.SCANNING_ITEMS)
						}
					/>
				);

			case SCREEN_STATES.PAYMENT_TERMINAL:
				return (
					<CardTerminalScreen
						onPaymentComplete={() =>
							changeScreen(SCREEN_STATES.FINISH)
						}
					/>
				);

			case SCREEN_STATES.FINISH:
				return <FinishScreen onRestart={handleRestart} />;

			default:
				return <h1>Екран ({screenState})</h1>;
		}
	};

	return (
		<div className="kso-screen">
			{renderScreenContent()}
			<KsoFooter screenName={screenState} />
		</div>
	);
}

export default App;
