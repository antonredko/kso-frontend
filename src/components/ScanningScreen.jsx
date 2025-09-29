import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCheck } from '../context/CheckContext';
import CheckItem from './CheckItem';

// Тимчасовий список товарів для імітації API-відповіді
const MOCK_PRODUCTS = [
  { id: 101, name: 'Молоко 3.2% 900 мл', price: 35.50 },
  { id: 102, name: 'Батон нарізний', price: 18.00 },
  { id: 103, name: 'Яблука Голден (кг)', price: 45.90 },
  { id: 104, name: 'Вода 1.5л негазована', price: 15.00 },
];

const ScanningScreen = ({ onFinishScanning }) => {
  const { t } = useTranslation();
  const { state: checkState, addItem, subtotal } = useCheck();
  
  const [mockScannerId, setMockScannerId] = useState(''); // Для імітації сканування
  
  // Імітація сканування
  const handleScan = () => {
    const product = MOCK_PRODUCTS.find(p => p.id.toString() === mockScannerId);
    if (product) {
      addItem(product);
      setMockScannerId(''); // Очищуємо поле після "сканування"
    } else {
      alert(t('error_product_not_found')); // Потрібно додати ключ перекладу
    }
  };
  
  // Форматування загальної суми
  const formatTotal = (amount) => amount.toFixed(2).replace('.', ',');

  return (
    <div className="scanning-screen">
      
      {/* 1. Верхній блок чека та інструкція */}
      <div className="scan-header">
          <h2 className="check-title">
              {t('check_title')}
              <span className="item-count"> ({checkState.items.length})</span>
          </h2>
          <p className="scan-instruction">
              {checkState.items.length === 0 
                ? t('instruction_scan_start') 
                : t('instruction_scan_next')}
          </p>
      </div>

      {/* 2. Список товарів (Область прокручування) */}
      <div className="items-list-container">
        {checkState.items.length === 0 ? (
            <div className="empty-check-message">
                {t('check_empty')}
            </div>
        ) : (
            <div className="items-list">
                {checkState.items.map(item => (
                    <CheckItem key={item.id} item={item} />
                ))}
            </div>
        )}
      </div>

      {/* 3. Підсумковий блок */}
      <div className="summary-block">
          <div className="summary-row">
              <span className="summary-label">{t('summary_subtotal')}:</span>
              <span className="summary-value">{formatTotal(checkState.subtotal)} ₴</span>
          </div>
          {/* У майбутньому: Знижка */}
          {checkState.discount > 0 && (
              <div className="summary-row discount">
                  <span className="summary-label">{t('summary_discount')}:</span>
                  <span className="summary-value">− {formatTotal(checkState.discount)} ₴</span>
              </div>
          )}
          
          <div className="summary-separator"></div>
          
          <div className="summary-row total">
              <span className="summary-label">{t('summary_total')}:</span>
              <span className="summary-value total-price">{formatTotal(checkState.total)} ₴</span>
          </div>
      </div>
      
      {/* 4. Імітація сканера та кнопка оплати */}
      <div className="scan-controls">
          {/* Поле для імітації вводу штрих-коду */}
          <input 
              type="number"
              placeholder={t('scan_input_placeholder')}
              value={mockScannerId}
              onChange={(e) => setMockScannerId(e.target.value)}
              className="mock-scanner-input"
          />
          <button onClick={handleScan} className="mock-scanner-button">
              Сканувати (Mock)
          </button>
          
          <button 
              className="payment-button" 
              onClick={onFinishScanning}
              disabled={checkState.items.length === 0}
          >
              {t('payment_button')}
          </button>
      </div>
      
    </div>
  );
};

export default ScanningScreen;