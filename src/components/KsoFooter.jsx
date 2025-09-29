// src/components/KsoFooter.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const KsoFooter = ({ screenName }) => {
  const { t, i18n } = useTranslation();

  // Функція для зміни мови
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Визначення, який контент відображати у лівому блоці
  let leftContent;
  if (screenName === 'WELCOME') {
    leftContent = (
      <div className="scan-card">
        <span className="icon-placeholder">💳</span>
        <span>{t('scan_card')}</span>
      </div>
    );
  } else if (screenName === 'SCANNING_ITEMS' || screenName === 'PAYMENT_SELECTION') {
    // Імітація відображення імені користувача після авторизації
    leftContent = (
      <div className="user-info">
        <span className="icon-placeholder">👤</span>
        Антон Редько
      </div>
    );
  } else {
    leftContent = null;
  }

  return (
    <div className="kso-footer">
      {leftContent}
      
      <div className="footer-icons">
        <span className="icon-placeholder help-icon">❓</span>
        {/* Кнопки перемикання мови */}
        <button 
          className={`lang-button ${i18n.language === 'uk' ? 'active' : ''}`}
          onClick={() => changeLanguage('uk')}
        >
          🇺🇦
        </button>
        <button 
          className={`lang-button ${i18n.language === 'en' ? 'active' : ''}`}
          onClick={() => changeLanguage('en')}
        >
          🇬🇧
        </button>
      </div>
    </div>
  );
};

export default KsoFooter;