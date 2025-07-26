import React, { useState } from 'react';

interface handleFormProps {
  onClick?: (number: number | string) => void
}

interface handleFormState {
  inputValue: string, 
  searchValue: boolean,
}

const HandleForm = (props: handleFormProps, ) => {

  const [formState, setFormState] = useState<handleFormState>({
    inputValue: '', 
    searchValue: false
  })

  function handleInput (event: React.ChangeEvent<HTMLInputElement>) {
    setFormState(prev => ({
      ...prev, 
      inputValue: event.target.value
    }))
  }

  function reloadLs () {
    setFormState(prev => ({
      ...prev, 
      inputValue: ''
    }))
    localStorage.clear()
    if(props.onClick) {
      props.onClick(formState.inputValue)
    }
  }

  async function handleSubmit () {
    if(props.onClick) {
      props.onClick(formState.inputValue)
    }
  }


  return (
    <div data-testid="handleForm-form">
      <input data-testid="handleForm-input" type='text' name='search' onChange={handleInput} value={formState.inputValue} className='searchInput' placeholder='what are you looking for?' />
      <button data-testid="handleForm-btn" className='searchBtn' onClick={handleSubmit}>
        <p>Click to see result</p>
      </button>
      <button data-testid="handleForm-reload-ls" className='searchBtn' onClick={reloadLs}>
        <p>Reload LS</p>
      </button>
    </div>
  );
};

export default HandleForm;