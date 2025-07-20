import { Component } from 'react';

class Header extends Component {

  render() {
    return (
      <>
        <div className='header' data-testid="header">
          <h2>Task#1: React project setup. Class components. Error boundary.</h2>
          <h2>Works with PokeApi(use vpn)</h2>
        </div>
      </>
    );
  }
}

export default Header;