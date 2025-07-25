import React, { useState } from 'react';

interface handleFormProps {
  onClick?: () => void
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
    localStorage.clear()
    if(props.onClick) {
      props.onClick()
    }
  }

  async function handleSubmit () {
    localStorage.setItem('inputValue', formState.inputValue)

    fetch(`https://pokeapi.co/api/v2/berry/${formState.inputValue}/`)
      .then(response => {
        if(response.ok) {
          return response.json()
        }
      })
      .then(result => {
        localStorage.setItem('resultRequest', JSON.stringify(result))
        if(props.onClick) {
          props.onClick()
        }
      })
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