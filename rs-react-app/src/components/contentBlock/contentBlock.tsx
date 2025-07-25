import React, { useState, useEffect } from 'react';

import loaderIcon from '../../assets/general/loadingIcon.svg';
import ErrorBtn from '../errorBtn/errorBtn';
import HandleForm from '../handleForm/handleForm';
import Pagination from '../pagination/pagination';

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

const ContentBlock = () => {

  const [contentState, setContentState] = useState<ContentBlockState>({
    data: null,
    loading: true, 
    errorMessage: false,
    fetchResult: null, 
    searchResult: '',
  })
  
  function ErrorClick () {
    setContentState(prev => ({
      ...prev, 
      errorMessage: true
    }))
  }

  function onClick () {

    const storedData = localStorage.getItem('resultRequest');
    let parsedData: BerryDate;

    if(!storedData) {
      setContentState(prev => ({
        ...prev, 
        loading: true,
      }))
    }

    if (storedData) {
      parsedData = JSON.parse(storedData)
      setContentState(prev => ({
        ...prev, 
        fetchResult: parsedData,
        loading: true,
      }))
    }

    if(localStorage.getItem('inputNumberValue')) {
      setTimeout(() => {
        setContentState(prev => ({
          ...prev, 
          searchResult: localStorage.getItem('inputNumberValue'),
          loading: false,
        }))
      }, 3000)
    }
    else {
      setTimeout(() => {
        setContentState(prev => ({
          ...prev, 
          searchResult: localStorage.getItem('inputValue'),
          loading: false,
        }))
      }, 3000)
    }

  }

  function usePaginationHook (number: number) {
    localStorage.setItem('inputNumberValue', `${number}`)

    fetch(`https://pokeapi.co/api/v2/berry/${number}/`)
      .then(response => {
        if(response.ok) {
          return response.json()
        }
      })
      .then(result => {
        localStorage.setItem('resultRequest', JSON.stringify(result))
        onClick()
      })
  }
  function onPaginationClick (number: number) {
    usePaginationHook(number)
  }

  useEffect(() => {
    setTimeout(() => {
      fetch('https://pokeapi.co/api/v2/berry')
        .then(response => {
          return response.json()
        })
        .then(result => {

          setContentState(prev => ({
            ...prev, 
            data: result.results, 
            loading: false
          }))
        })
    }, 3000)
  }, [])

  if(contentState.errorMessage) {
    throw new Error("I am an artificial error!");
  }

  if(contentState.loading) {
    return (
      <section className='contentBlock' data-testid="content-block">
        <div className='contentBlock__top'>
          <HandleForm ></HandleForm>
        </div>
        <div className='contentBlock__middle'>
          <div className='loadingIcon'>
            <img data-testid="loader-icon" src={loaderIcon} alt='loading icon'></img>
          </div>
        </div>
      </section>
    )
  }

  if(contentState.searchResult) {
    return (
      <section className='contentBlock' data-testid="content-block">
        <div className='contentBlock__top'>
          <HandleForm onClick={onClick}></HandleForm>
        </div>
        <div className='contentBlock__middle'>
          <ul className='listApi'>
            <li className='listApi__el-info'>
              <p>berry firmness name:</p>
              <span>{contentState.fetchResult?.firmness.name}</span>
            </li>
            <li className='listApi__el-info'>
              <p>berry firmness url: </p>
              <span>{contentState.fetchResult?.firmness.url}</span>
            </li>
            <li className='listApi__el-info'>
              <p>berry natural_gift_power:</p>
              <span>{contentState.fetchResult?.natural_gift_power}</span>
            </li>
            <li className='listApi__el-info'>
              <p>berry size:</p>
              <span data-testid="berry-size">{contentState.fetchResult?.size}</span>
            </li>
            <li className='listApi__el-info'>
              <p>berry id:</p>
              <span>{contentState.fetchResult?.id}</span>
            </li>
            <li className='listApi__el-info'>
              <p>berry name:</p>
              <span >{contentState.fetchResult?.name}</span>
            </li>
            <li className='listApi__el-info'>
              <p>berry natural_gift_power:</p>
              <span>{contentState.fetchResult?.natural_gift_power}</span>
            </li>
            <li className='listApi__el-info'>
              <p>berry smoothness:</p>
              <span>{contentState.fetchResult?.smoothness}</span>
            </li>
          </ul>
          <ErrorBtn onClick={ErrorClick}></ErrorBtn>
          <Pagination onClick={onPaginationClick}></Pagination>
        </div>
      </section>
    );
  }

  return (
    <section className='contentBlock' data-testid="content-block">
      <div className='contentBlock__top'>
        <HandleForm onClick={onClick}></HandleForm>
      </div>
      <div className='contentBlock__middle'>
        <ul className='listApi'>
          {contentState.data && contentState.data.map((berry) => (
            <li key={berry.name} className='listApi__el'>
              <h2 >{berry.name} - </h2>
              <div className='listApi__el-info'>
                <p >url:</p>
                <a href={berry.url}>{berry.url}</a>
              </div>
            </li>
          ))}
        </ul>
        <ErrorBtn onClick={ErrorClick}></ErrorBtn>
        <Pagination onClick={onPaginationClick}></Pagination>
      </div>
    </section>
  );
};

export default ContentBlock;