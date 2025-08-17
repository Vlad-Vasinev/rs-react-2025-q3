"use client"

import {useTranslations} from 'next-intl';

interface ErrorBtnProps {
  onClick: () => void
}

const ErrorBtn = (props: ErrorBtnProps) => {

  const t = useTranslations('HomePage')

  return (
    <button data-testid="error-btn" className='errorBtn' onClick={props.onClick}>{t('error_btn')}</button>
  );
};

export default ErrorBtn;