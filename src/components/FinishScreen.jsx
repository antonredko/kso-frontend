import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const FinishScreen = ({ onRestart }) => {
  const { t } = useTranslation();
  
  // Автоматичний перезапуск через 10 секунд
  useEffect(() => {
    const timer = setTimeout(onRestart, 10000);
    return () => clearTimeout(timer);
  }, [onRestart]);

  return (
    <div className="finish-screen">
      <h1 className="finish-title">{t('finish_thank_you')}</h1>
      <p className="finish-message">{t('finish_message')}</p>
      
      <div className="finish-icon">
        {t('finish_icon_text')}
      </div>
      
      <p className="finish-instruction">{t('finish_instruction')}</p>
      
      <button className="finish-restart-button" onClick={onRestart}>
        {t('start_new_order')}
      </button>
    </div>
  );
};

export default FinishScreen;