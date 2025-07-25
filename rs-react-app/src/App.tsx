import './styles/general/App.scss'

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Navigation from './components/navigation/navigation';

import PageWrapper from './components/pageWrapper/pageWrapper';
import ContentBlock from './components/contentBlock/contentBlock';

const App = () => {
  return (
    <div data-testid="app-component">
      <Header></Header>
      <PageWrapper>
        <Navigation></Navigation>
        <ContentBlock></ContentBlock>
        
      </PageWrapper>
      <Footer></Footer>
    </div>
  );
}

export default App;
