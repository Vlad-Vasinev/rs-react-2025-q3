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
    </div>
  );
};

export default HandleForm;