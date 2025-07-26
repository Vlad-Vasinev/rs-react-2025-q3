import React, { useState, useEffect } from 'react';

import ErrorBtn from '../errorBtn/errorBtn';
import HandleForm from '../handleForm/handleForm';
import Preloader from '../loader/preloader';
import Pagination from '../pagination/pagination';
import { useSearchParams } from 'react-router';

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
  const [searchParams, updateSearchParams] = useSearchParams()
  const [param, updateParam] = useState<number | string | undefined>('')
  
  function ErrorClick () {
    setContentState(prev => ({
      ...prev, 
      errorMessage: true
    }))
  }

  function masterDetail (berryName: string) {
    onPaginationClick(berryName)
  }
  usePaginationHook(param)

  function usePaginationHook (param: number | string | undefined) {

    useEffect(() => {

      if(param === null) return
      localStorage.setItem('inputNumberValue', `${param}`)
      setContentState(prev => ({ ...prev, loading: true, errorMessage: false }))

      fetch(`https://pokeapi.co/api/v2/berry/${param}/`)
        .then(response => {
          if(response.ok) {
            return response.json()
          }
        })
        .then(result => {
          localStorage.setItem('resultRequest', JSON.stringify(result))
          
          setTimeout(() => {
            setContentState(prev => ({
              ...prev,
              fetchResult: result,
              searchResult: String(param),
              loading: false,
              errorMessage: false,
            }));
          }, 2500)

          const newParams = new URLSearchParams(searchParams)
          newParams.set('q', String(param))
          updateSearchParams(newParams)
        })
    }, [param, searchParams, updateSearchParams])
  }
  function onPaginationClick (param: number | string) {
    updateParam(param)
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
        <Preloader></Preloader>
      </section>
    )
  }

  return (
    <section className='contentBlock' data-testid="content-block">
      <div className='contentBlock__top'>
        <HandleForm onClick={onPaginationClick}></HandleForm>
      </div>
      <div className='contentBlock__middle'>
        <ul className='listApi'>
          {contentState.data && contentState.data.map((berry) => (
            <li key={berry.name} onClick={() => masterDetail(berry.name)} className='listApi__el'>
              <h2 >{berry.name} - </h2>
              <div className='listApi__el-info'>
                <p >url:</p>
                <p >{berry.url}</p>
              </div>
            </li>
          ))}
        </ul>
        {contentState.searchResult &&
          (
            <>
              <ul className='listApi _information'>
                <li className='listApi__el-info'>
                  <p>berry name:</p>
                  <span >{contentState.fetchResult?.name}</span>
                </li>
                <li className='listApi__el-info'>
                  <p>berry size:</p>
                  <span data-testid="berry-size">{contentState.fetchResult?.size}</span>
                </li>
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
                  <p>berry id:</p>
                  <span>{contentState.fetchResult?.id}</span>
                </li>
                <li className='listApi__el-info'>
                  <p>berry natural_gift_power:</p>
                  <span>{contentState.fetchResult?.natural_gift_power}</span>
                </li>
                <li className='listApi__el-info'>
                  <p>berry smoothness:</p>
                  <span>{contentState.fetchResult?.smoothness}</span>
                </li>
                <li className='listApi__el-info'>
                  <Pagination onClick={onPaginationClick}></Pagination>
                </li>
              </ul>
            </>
          )
          // : (
          //   <>
          //     <div className='listApi _information'>  
          //       <Preloader></Preloader>
          //     </div>
          //   </>
          // )
        }
      </div>
      <ErrorBtn onClick={ErrorClick}></ErrorBtn>
    </section>
  );
};

export default ContentBlock;