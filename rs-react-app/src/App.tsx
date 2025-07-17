import { Component } from 'react';
import './styles/general/App.scss'

import Header from './ts/components/header/header';
import Footer from './ts/components/footer/footer';

import PageWrapper from './ts/components/pageWrapper/pageWrapper';
import ContentBlock from './ts/components/contentBlock/contentBlock';

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
