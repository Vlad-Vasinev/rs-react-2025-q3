import { Component } from 'react';

import loaderIcon from '../../../assets/general/loadingIcon.svg';
import ErrorBtn from '../errorBtn/errorBtn';
import HandleForm from '../handleForm/handleForm';

interface ContentBlockProps {
  title?: string,
}

interface BerryFirmness {
  name: string, 
  url: string
}
interface BerryFlavors {
  name: string, 
  url: string
}
interface BerryNatural_Gift_Type {
  name: string, 
  url: string
}
interface BerryItem {
  name: string, 
  url: string
}

interface BerryDate {
  firmness: BerryFirmness,
  flavors: BerryFlavors[]
  growth_time: number,
  id: number,
  item: BerryItem,
  max_harvest: number,
  name: string,
  natural_gift_power: number,
  natural_gift_type: BerryNatural_Gift_Type
  size: number,
  smoothness: number,
  soil_dryness: number,
}

interface Berry {
  name: string, 
  url: string,
}

interface BerryDate {
  id: number,
  name: string, 
}

interface ContentBlockState {
  data: Berry[] | null, 
  loading: boolean, 
  errorMessage: boolean,
  fetchResult: BerryDate | null, 
  searchResult: string | null,
}

class ContentBlock extends Component<ContentBlockProps, ContentBlockState> {

  constructor (props: ContentBlockProps) {
    super(props);
    this.state = {
      data: null,
      loading: true, 
      errorMessage: false,
      fetchResult: null, 
      searchResult: '',
    }
  }

  ErrorClick = () => {
    this.setState({errorMessage: true})
  }

  onClick = () => {

    const storedData = localStorage.getItem('resultRequest');
    let parsedData: BerryDate;

    if (storedData) {
      parsedData = JSON.parse(storedData)
      this.setState({fetchResult: parsedData})
    }

    console.log(typeof(localStorage.getItem('resultRequest')))
    this.setState({searchResult: localStorage.getItem('inputValue')})
  }

  componentDidMount() {

    setTimeout(() => {
      fetch('https://pokeapi.co/api/v2/berry')
        .then(response => response.json())
        .then(result => {
          this.setState({data: result.results, loading: false})
        })
    }, 3000)
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

    if(this.state.searchResult) {
      return (
        <section className='contentBlock'>
          <div className='contentBlock__top'>
            <HandleForm onClick={this.onClick}></HandleForm>
          </div>
          <div className='contentBlock__middle'>
            <ul className='listApi'>
              <li className='listApi__el-info'>
                <p>berry firmness name:</p>
                <span>{this.state.fetchResult?.firmness.name}</span>
              </li>
              <li className='listApi__el-info'>
                <p>berry firmness url: </p>
                <span>{this.state.fetchResult?.firmness.url}</span>
              </li>
              <li className='listApi__el-info'>
                <p>berry natural_gift_power:</p>
                <span>{this.state.fetchResult?.natural_gift_power}</span>
              </li>
              <li className='listApi__el-info'>
                <p>berry size:</p>
                <span>{this.state.fetchResult?.size}</span>
              </li>
              <li className='listApi__el-info'>
                <p>berry id:</p>
                <span>{this.state.fetchResult?.id}</span>
              </li>
              <li className='listApi__el-info'>
                <p>berry name:</p>
                <span>{this.state.fetchResult?.name}</span>
              </li>
              <li className='listApi__el-info'>
                <p>berry natural_gift_power:</p>
                <span>{this.state.fetchResult?.natural_gift_power}</span>
              </li>
              <li className='listApi__el-info'>
                <p>berry smoothness:</p>
                <span>{this.state.fetchResult?.smoothness}</span>
              </li>
            </ul>
            <ErrorBtn onClick={this.ErrorClick}></ErrorBtn>
          </div>
        </section>
      );
    }

    return (
      <section className='contentBlock'>
        <div className='contentBlock__top'>
          <HandleForm onClick={this.onClick}></HandleForm>
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