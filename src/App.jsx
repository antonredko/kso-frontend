import React, { useState } from 'react';
import './index.css';
import KsoFooter from './components/KsoFooter';
import WelcomeScreen from './components/WelcomeScreen';
import LoyaltyInputScreen from './components/LoyaltyInputScreen';

// Визначаємо можливі стани екрана
const SCREEN_STATES = {
    WELCOME: 'WELCOME',
    LOYALTY_INPUT: 'LOYALTY_INPUT',
    SCANNING_ITEMS: 'SCANNING_ITEMS',
    PAYMENT_SELECTION: 'PAYMENT_SELECTION',
    PAYMENT_TERMINAL: 'PAYMENT_TERMINAL',
    FINISH: 'FINISH',
};

function App() {
  const [screenState, setScreenState] = useState(SCREEN_STATES.WELCOME);
  const [loyaltyNumber, setLoyaltyNumber] = useState(null); // Стан для зберігання номера лояльності

  const changeScreen = (newState) => {
    setScreenState(newState);
  };

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
        // Перехід на екран введення телефону
        return <WelcomeScreen onStart={() => changeScreen(SCREEN_STATES.LOYALTY_INPUT)} />; 
      
      case SCREEN_STATES.LOYALTY_INPUT:
        // Рендер компонента введення, передаємо обробники
        return (
            <LoyaltyInputScreen 
                onSkip={handleLoyaltySkip}
                onProceed={handleLoyaltyProceed}
            />
        );
        
      case SCREEN_STATES.SCANNING_ITEMS:
        return <h1>Екран сканування (Номер лояльності: {loyaltyNumber || 'Ні'})</h1>;
        
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