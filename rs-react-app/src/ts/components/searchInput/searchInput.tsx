import { Component } from 'react';

class SearchInput extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     stateKey: stateValue
  //   };
  // }

  render() {
    return (
      <input name='search' className='searchInput' placeholder='what are you looking for?' />
    );
  }
}

export default SearchInput;