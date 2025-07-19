import { Component } from 'react';
import './styles/general/App.scss'

import Header from './components/header/header';
import Footer from './components/footer/footer';

import PageWrapper from './components/pageWrapper/pageWrapper';
import ContentBlock from './components/contentBlock/contentBlock';

class App extends Component {

  render() {
    return (
      <>
        <Header></Header>
        <PageWrapper>

          <ContentBlock></ContentBlock>
          
        </PageWrapper>
        <Footer></Footer>
      </>
    );
  }
}

export default App;
