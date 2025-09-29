import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCheck } from '../context/CheckContext';

const CardTerminalScreen = ({ onPaymentComplete }) => {
  const { t } = useTranslation();
  const { state: checkState, clearCheck } = useCheck();
  const [status, setStatus] = useState('WAITING_CARD'); // WAITING_CARD, PROCESSING, SUCCESS
  
  // Імітація процесу оплати
  useEffect(() => {
    if (status === 'WAITING_CARD') {
      // Через 3 секунди імітуємо вставку картки та початок обробки
      const timer = setTimeout(() => {
        setStatus('PROCESSING');
      }, 3000);
      return () => clearTimeout(timer);
    } 
    
    if (status === 'PROCESSING') {
      // Через 4 секунди імітуємо успішну оплату
      const timer = setTimeout(() => {
        setStatus('SUCCESS');
        clearCheck(); // Очищаємо чек після успішної оплати
        
        // Перехід на фінальний екран
        setTimeout(onPaymentComplete, 1500); 
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status, clearCheck, onPaymentComplete]);
  
  // Визначення відображуваного повідомлення
  const getMessage = () => {
    switch(status) {
        case 'WAITING_CARD': return t('terminal_wait_card');
        case 'PROCESSING': return t('terminal_processing');
        case 'SUCCESS': return t('terminal_success');
        default: return t('terminal_error');
    }
  };
  
  const statusClass = status.toLowerCase().replace('_', '-');

  return (
    <div className={`card-terminal-screen ${statusClass}`}>
      <div className="terminal-display">
        {status === 'WAITING_CARD' && <span className="icon">💳</span>}
        {status === 'PROCESSING' && <span className="icon loading-spinner">...</span>}
        {status === 'SUCCESS' && <span className="icon success-check">✅</span>}
        
        <p className="terminal-message">{getMessage()}</p>
        
        {status !== 'SUCCESS' && (
          <p className="terminal-amount">
            {t('summary_total')}: {checkState.total.toFixed(2).replace('.', ',')} ₴
          </p>
        )}
      </div>
      
      {/* Імітація терміналу: світлодіоди */}
      <div className="terminal-mock">
        <div className="card-slot"></div>
        <div className="led-indicators">
          <div className={`led ${status === 'WAITING_CARD' ? 'active' : ''}`}></div>
          <div className={`led ${status === 'PROCESSING' ? 'active' : ''}`}></div>
          <div className={`led ${status === 'SUCCESS' ? 'active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export default CardTerminalScreen;