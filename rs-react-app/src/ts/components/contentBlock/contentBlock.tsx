import { Component } from 'react';

import loaderIcon from '../../../assets/general/loadingIcon.svg';
import ErrorBtn from '../errorBtn/errorBtn';
import HandleForm from '../handleForm/handleForm';

interface ContentBlockProps {
  title?: string,
}

interface Berry {
  name: string, 
  url: string,
}

interface ContentBlockState {
  data: Berry[] | null, 
  loading: boolean, 
  errorMessage: boolean,
  fetchResult: any
}

class ContentBlock extends Component<ContentBlockProps, ContentBlockState> {

  constructor (props: ContentBlockProps) {
    super(props);
    this.state = {
      data: null,
      loading: true, 
      errorMessage: false,
      fetchResult: null
    }
  }

  ErrorClick = () => {
    this.setState({errorMessage: true})
  }

  componentDidMount() {

    setTimeout(() => {
      fetch('https://pokeapi.co/api/v2/berry')
        .then(response => response.json())
        .then(result => {
          console.log(result.results)
          this.setState({data: result.results, loading: false})
        })
    }, 3000)

    const storedData = localStorage.getItem('resultRequest')

    
    if(storedData) {
      const parcedData = JSON.parse(storedData)
      console.log(typeof(parcedData))
      this.setState({fetchResult: parcedData})
    }
  }
  
  render() {

    if(this.state.errorMessage) {
      throw new Error("I am an artificial error!");
    }

    const { data, loading } = this.state

    if(loading) {
      return (
        <section className='contentBlock'>
          <div className='contentBlock__top'>
            <HandleForm ></HandleForm>
          </div>
          <div className='contentBlock__middle'>
            <div className='loadingIcon'>
              <img src={loaderIcon} alt='loading icon'></img>
            </div>
          </div>
        </section>
      )

    }

    if(localStorage.getItem('inputValue')) {
      return (
        <section className='contentBlock'>
          <div className='contentBlock__top'>
            <HandleForm ></HandleForm>
          </div>
          <div className='contentBlock__middle'>
            <ul className='listApi'>
              {this.state.fetchResult.name}
              <p>berry id is: {this.state.fetchResult.id}</p>
              <p>berry id name: {this.state.fetchResult.name}</p>
              <p>berry id natural_gift_power: {this.state.fetchResult.natural_gift_power}</p>
              <p>berry id size: {this.state.fetchResult.size}</p>
            </ul>
            <ErrorBtn onClick={this.ErrorClick}></ErrorBtn>
          </div>
        </section>
      );
    }

    return (
      <section className='contentBlock'>
        <div className='contentBlock__top'>
          <HandleForm></HandleForm>
        </div>
        <div className='contentBlock__middle'>
          <ul className='listApi'>
            {data && data.map((berry) => (
              <li key={berry.name} className='listApi__el'>
                <h2>{berry.name} - </h2>
                <div className='listApi__el-info'>
                  <p>url:</p>
                  <a href={berry.url}>{berry.url}</a>
                </div>
              </li>
            ))}
          </ul>
          <ErrorBtn onClick={this.ErrorClick}></ErrorBtn>
        </div>
      </section>
    );
  }
}

export default ContentBlock;