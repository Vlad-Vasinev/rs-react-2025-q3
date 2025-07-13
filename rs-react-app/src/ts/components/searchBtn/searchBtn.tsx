import { Component } from 'react';

interface SearchBtnInterface {
  textInside?: string
}

class SearchBtn extends Component<SearchBtnInterface> {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     stateKey: stateValue
  //   };
  // }

  render() {
    return (
      <button className='searchBtn'>
        <p>{this.props.textInside}</p>
      </button>
    );
  }
}

export default SearchBtn;