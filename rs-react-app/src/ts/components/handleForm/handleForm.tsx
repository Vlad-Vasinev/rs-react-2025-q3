import React, { Component } from 'react';

interface handleFormProps {
  title?: string
}

interface handleFormState {
  inputValue: string, 
  searchValue: boolean,
}

class HandleForm extends Component<handleFormProps, handleFormState> {
  constructor(props: handleFormProps) {
    super(props);
    this.state = {
      inputValue: '',
      searchValue: false
    };
  }

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({inputValue: event.target.value})
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    this.setState({searchValue: true}, () => {
      localStorage.setItem('inputValue', this.state.inputValue)

      if(this.state.searchValue) {
        fetch(`https://pokeapi.co/api/v2/berry/${this.state.inputValue}/`)
          .then(response => {
            if(response.ok) {
              return response.json()
            }
          })
          .then(result => {
            console.log(result)
            localStorage.setItem('resultRequest', result)
          })
      }
    })

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='search' onChange={this.handleInput} value={this.state.inputValue} className='searchInput' placeholder='what are you looking for?' />
        <button className='searchBtn'>
          <p>Click to see result</p>
        </button>
      </form>
    );
  }
}

export default HandleForm;