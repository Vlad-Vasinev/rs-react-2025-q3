import React, { Component } from 'react';

interface handleFormProps {
  title?: string, 
  onClick?: () => void
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
      searchValue: false,
    };
  }

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({inputValue: event.target.value})
  }

  reloadLs = () => {
    localStorage.clear()
    if(this.props.onClick) {
      this.props.onClick()
    }
  }

  handleSubmit = () => {
    localStorage.setItem('inputValue', this.state.inputValue)

    fetch(`https://pokeapi.co/api/v2/berry/${this.state.inputValue}/`)
      .then(response => {
        if(response.ok) {
          return response.json()
        }
      })
      .then(result => {
        localStorage.setItem('resultRequest', JSON.stringify(result))
        if(this.props.onClick) {
          this.props.onClick()
        }
      })

  }

  render() {
    return (
      <div >
        <input type='text' name='search' onChange={this.handleInput} value={this.state.inputValue} className='searchInput' placeholder='what are you looking for?' />
        <button className='searchBtn' onClick={this.handleSubmit}>
          <p>Click to see result</p>
        </button>
        <button className='searchBtn' onClick={this.reloadLs}>
          <p>Reload LS</p>
        </button>
      </div>
    );
  }
}

export default HandleForm;