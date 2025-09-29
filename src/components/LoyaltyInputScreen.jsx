import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Визначаємо розкладку клавіатури
const KEYPAD_KEYS = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'Пропустити', '0', '⌫' // ⌫ - Backspace
];
const MAX_PHONE_LENGTH = 13; // Обмеження на довжину номера

const LoyaltyInputScreen = ({ onSkip, onProceed }) => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('+380'); // Починаємо з коду України

  // Обробник натискання клавіш
  const handleKeyClick = (key) => {
    let currentNumber = phoneNumber;

    if (key === '⌫') {
      // Видаляємо останній символ, але не код країни
      if (currentNumber.length > 4) { 
        setPhoneNumber(currentNumber.slice(0, -1));
      }
    } else if (key === 'Пропустити') {
      onSkip(); // Перехід на екран сканування без номера
    } else if (!isNaN(parseInt(key, 10))) {
      // Якщо натиснута цифра
      if (currentNumber.length < MAX_PHONE_LENGTH) {
        setPhoneNumber(currentNumber + key);
      }
    }
  };

  // Кнопка "Продовжити" активна, якщо номер має достатню довжину
  const isProceedActive = phoneNumber.length === MAX_PHONE_LENGTH;

  return (
    <div className="loyalty-input-screen">
      
      {/* Інформаційний блок */}
      <div className="loyalty-info-block">
        <h2 className="loyalty-title">{t('loyalty_title')}</h2>
        <p className="loyalty-subtitle">{t('loyalty_info')}</p>
      </div>

      {/* Поле введення телефону */}
      <div className="phone-input-container">
        <input 
          type="text" 
          className="phone-input-display"
          value={phoneNumber} 
          readOnly // Забороняємо ручне введення, лише через клавіатуру
        />
      </div>

      {/* Клавіатура */}
      <div className="keypad-grid">
        {KEYPAD_KEYS.map((key) => (
          <button 
            key={key}
            className={`keypad-button ${key.length > 1 ? 'special-key' : ''}`}
            onClick={() => handleKeyClick(key)}
          >
            {key === 'Пропустити' ? t('skip_button') : key}
          </button>
        ))}
      </div>

      {/* Кнопка Продовжити / Підтвердити */}
      <button 
        className={`proceed-button ${isProceedActive ? 'active' : ''}`}
        onClick={isProceedActive ? () => onProceed(phoneNumber) : null}
        disabled={!isProceedActive}
      >
        {t('loyalty_continue')}
      </button>

    </div>
  );
};

export default LoyaltyInputScreen;