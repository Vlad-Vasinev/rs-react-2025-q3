import { Component } from 'react';

interface SearchInputProps {
  value: string,
}

interface SearchInputState {
  value: string,
}

class SearchInput extends Component<SearchInputProps, SearchInputState> {
  constructor(props: SearchInputProps) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <input type='text' name='search' className='searchInput' placeholder='what are you looking for?' />
    );
  }
}

export default SearchInput;