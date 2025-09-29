import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCheck } from '../context/CheckContext';

const PaymentSelectionScreen = ({ onGoToTerminal, onCancel }) => {
  const { t } = useTranslation();
  const { state: checkState } = useCheck();
  
  // Форматування загальної суми
  const formatTotal = (amount) => amount.toFixed(2).replace('.', ',');

  return (
    <div className="payment-selection-screen">
      
      <div className="payment-header">
        <h2 className="payment-title">{t('payment_select_title')}</h2>
        <div className="final-total">
          <span className="total-label">{t('summary_total')}:</span>
          <span className="total-value">{formatTotal(checkState.total)} ₴</span>
        </div>
      </div>

      <div className="payment-options">
        {/* Кнопка "Оплата карткою" */}
        <button className="payment-option card" onClick={onGoToTerminal}>
          <span className="icon">💳</span>
          <span className="label">{t('payment_option_card')}</span>
          <span className="info">{t('payment_card_info')}</span>
        </button>
        
        {/* Кнопка "Готівка" - неактивна згідно з ТЗ */}
        <button className="payment-option cash disabled" disabled>
          <span className="icon">💵</span>
          <span className="label">{t('payment_option_cash')}</span>
          <span className="info">{t('payment_cash_info')}</span>
        </button>
      </div>

      {/* Кнопка повернення */}
      <button className="back-button" onClick={onCancel}>
        {t('back_to_scan')}
      </button>

    </div>
  );
};

export default PaymentSelectionScreen;