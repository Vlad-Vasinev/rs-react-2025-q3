"use client"
import React, { useState } from 'react';

import {useTranslations} from 'next-intl';

interface handleFormProps {
  onClick?: (number: number | string) => void
}

interface handleFormState {
  inputValue: string, 
}

const HandleForm = (props: handleFormProps, ) => {

  const [formState, setFormState] = useState<handleFormState>({
    inputValue: '', 
  })

  function handleInput (event: React.ChangeEvent<HTMLInputElement>) {
    setFormState(prev => ({
      ...prev, 
      inputValue: event.target.value
    }))
  }

  async function handleSubmit () {
    if(props.onClick) {
      props.onClick(formState.inputValue)
      setFormState(prev => ({
      ...prev, 
      inputValue: ''
    }))
    }
  }

  const t = useTranslations('HomePage')

  return (
    <div data-testid="handleForm-form">
      <input data-testid="handleForm-input" type='text' name='search' onChange={handleInput} value={formState.inputValue} className='searchInput' placeholder={t('handle_input')} />
      <button data-testid="handleForm-btn" className='searchBtn' onClick={handleSubmit}>
        <p>{t('handle_form')}</p>
      </button>
    </div>
  );
};

export default HandleForm;