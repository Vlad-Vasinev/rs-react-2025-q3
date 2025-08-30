import './styles/general/App.scss'

import Header from './components/header/header'
import Footer from './components/footer/footer'
import PageWrapper from './components/pageWrapper/pageWrapper'

import CountriesLoad from './components/countries/countries'

function App() {

  return (
    <>
      <Header></Header>
      <PageWrapper>
        <CountriesLoad/>
      </PageWrapper>
      <Footer></Footer>
    </>
  )
}

export default App
