import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { usePaginationHook } from '../usePaginationHook/usePaginationHook';
import { useGetSpecificQuery } from '../../store/apiSlice';

import { useGetBerriesQuery, useGetBerryPaginationQuery } from '../../store/apiSlice';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { addEl, removeEl, addData, removeSpecificData } from '../../store/elementsSlice';

import ErrorBtn from '../errorBtn/errorBtn';
import HandleForm from '../handleForm/handleForm';
import Preloader from '../preloader/preloader';
import Pagination from '../pagination/pagination';

import type { ContentBlockState } from '../../types/types';

const ContentBlock = () => {

  const [contentState, setContentState] = useState<ContentBlockState>({
    data: null,
    loading: true, 
    loadingDetails: false,
    errorMessage: false,
    fetchResult: null, 
    searchResult: '',
  })

  const [searchParams, updateSearchParams] = useSearchParams()
  const [param, updateParam] = useState<number | string | undefined>('')
  const [apiPaginaion, updateApiPagination] = useState({
    loading: false, 
    parameter: 1,
  })

  const selectedElements = useSelector((state: RootState) => state.items.elements)
  const dispatch = useDispatch<AppDispatch>()

  const { data, isLoading } = useGetBerriesQuery()
  const { data: paginationData } = useGetBerryPaginationQuery(apiPaginaion.parameter)
  // const { data: specificItem } = useGetSpecificQuery('')

  useEffect(() => {
    setTimeout(() => {
      if(data)
      setContentState(prev => ({
        ...prev, 
        data: data.results, 
        loading: isLoading
      }))
    }, 2000)
  }, [data, isLoading])

  useEffect(() => {

    if(!apiPaginaion.loading) return 

    setTimeout(() => {
      if(paginationData)
      setContentState(prev => ({
        ...prev, 
        data: paginationData.results, 
        loading: false
      }))
      updateApiPagination(prev => ({
        ...prev, 
        loading: true
      }))
    }, 2000)
  }, [paginationData])

  function ErrorClick () {
    setContentState(prev => ({
      ...prev, 
      errorMessage: true
    }))
  }

  function closeDetailView() {
    setContentState(prev => ({
      ...prev,
      loadingDetails: false,
      searchResult: '',
    }));
    onPaginationClick('')
  }

  function masterDetail (berryName: string) {
    onPaginationClick(berryName)
  }
  usePaginationHook(param, setContentState, searchParams, updateSearchParams)

  function onPaginationClick (param: number | string) {
    updateParam(param)
  }

  function paginationControl (param: number) {
    setContentState(prev => ({
      ...prev, 
      loading: true, 
    }))
    updateApiPagination(({
      loading: true, 
      parameter: param
    }))
    setTimeout(() => {
      setContentState(prev => ({
        ...prev, 
        loading: false, 
      }))
    }, 2000)
    updateParam(param)
    console.log('paginationControl' + param)
  }

  function checkboxControl(item: string, checked: boolean) {

    if(checked) {
      fetch(`https://pokeapi.co/api/v2/berry/${item}/`)
        .then(response => {
          return response.json()
        })
        .then(result => {
          dispatch(addData(result))
          dispatch(addEl(item))
          console.log(result)
        })
    }
    else {
      dispatch(removeEl(item))
      dispatch(removeSpecificData(item))
    }
  }

  if(contentState.errorMessage) {
    throw new Error("I am an artificial error!");
  }

  if(contentState.loading) {
    return (
      <section className='contentBlock' data-testid="content-block">
        <Preloader testId='loader-icon'></Preloader>
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
            <li data-testid='search-el' key={berry.name} onClick={() => masterDetail(berry.name)} className='listApi__el'>
              <h2 >{berry.name} - </h2>
              <div className='listApi__el-info'>
                <p >url:</p>
                <p >{berry.url}</p>
              </div>
              <label>
                <input
                  data-testid="checkbox-test"
                  type="checkbox"
                  checked={selectedElements.includes(berry.name)}
                  onChange={e => {
                    console.log('on change checkbox')
                    checkboxControl(berry.name, e.target.checked)
                  }}
                />
                <span className="input-control"></span>
              </label>  
            </li>
          ))}
        </ul>
        {contentState.searchResult ?
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
                  <Pagination testId='pagination-test' onClick={paginationControl}></Pagination>
                </li>
                <li className='listApi__el-info'>
                  <button style={{width: '100%'}} data-testid="handleForm-reload-ls" className='searchBtn' onClick={closeDetailView}>
                    <p>close detailView</p>
                  </button>
                </li>
              </ul>
            </>
          )
          : (
            <div data-testid='loader-parent' className={ contentState.loadingDetails ? 'listApi _information _preload _active' : 'listApi _preload _information' }>
              <p className='listApi__clue'>We are carefully loading results, please wait... :D</p>
              <Preloader testId='master-detail'></Preloader>
            </div>
          )
        }
      </div>
      <ErrorBtn onClick={ErrorClick}></ErrorBtn>
    </section>
  );
};

export default ContentBlock;