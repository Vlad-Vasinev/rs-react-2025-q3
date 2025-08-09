import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { usePaginationHook } from '../usePaginationHook/usePaginationHook';

import { useGetBerriesQuery, useLazyGetSpecificQuery } from '../../store/apiSlice';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

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
    errorMessage: false,
    masterDetail: false
  })

  const [searchParams, updateSearchParams] = useSearchParams()
  const [param, updateParam] = useState<number | string | undefined>('')

  const selectedElements = useSelector((state: RootState) => state.items.elements)
  const dispatch = useDispatch<AppDispatch>()

  const { data, isLoading, error: firstLoadingError, refetch } = useGetBerriesQuery()
  const [trigger, { data: specificData, isLoading: specificDataLoading, error: specificDataError }] = useLazyGetSpecificQuery()

  function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error !== null && 'status' in error
  }

  const pageSize = 10;
  const [currentPage, setCurrentPage] = React.useState(1)

  const itemsForCurrentPage = React.useMemo(() => {
    if (!data) return [];
    const start = (currentPage - 1) * pageSize
    if(data.results)
    return data.results.slice(start, start + pageSize)
  }, [data, currentPage])

  function ErrorClick () {
    setContentState(prev => ({
      ...prev, 
      errorMessage: true
    }))
  }

  function closeDetailView() {
    setContentState(prev => ({
      ...prev,
      masterDetail: false,
    }));
  }

  function masterDetail (berryName: string) {
    updateParam(berryName)
    trigger(berryName)
    //trigger('unknown berry request')
    setContentState(prev => ({
      ...prev,
      masterDetail: true,
    }));
  }
  usePaginationHook(param, searchParams, updateSearchParams)

  function onPaginationClick (param: number | string) {
    updateParam(param)
    trigger(param)
    setContentState(prev => ({
      ...prev,
      masterDetail: true
    }))
  }

  function paginationControl (param: number) {
    setCurrentPage(param)
    updateParam(param)
  }

  function checkboxControl(item: string, checked: boolean) {
    if(checked) {
      trigger(item)
      dispatch(addEl(item || ''))
    }
    else {
      dispatch(removeEl(item))
      dispatch(removeSpecificData(item))
    }
  }

  useEffect(() => {
    if (specificData) {
      dispatch(addData(specificData));
    }
  }, [specificData, dispatch]);

  if(contentState.errorMessage) {
    throw new Error("I am an artificial error!");
  }
  if(firstLoadingError) {
    if(isFetchBaseQueryError(firstLoadingError)){
      return (
        <div className='queryError'>
          Error status: {firstLoadingError.status} <br/>
          Error data: {JSON.stringify(firstLoadingError.data)}
        </div>
      )
    }
  }
  if(specificDataError) {
    if(isFetchBaseQueryError(specificDataError)){
      return (
        <div className='queryError'>
          Error status: {specificDataError.status} <br/>
          Error data: {JSON.stringify(specificDataError.data)}
        </div>
      )
    }
  }

  if(isLoading) {
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
          {itemsForCurrentPage && itemsForCurrentPage.map((berry) => (
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
        {specificData && contentState.masterDetail ?
          (
            <>
              <ul className='listApi _information'>
                <li className='listApi__el-info'>
                  <p>berry name:</p>
                  <span >{specificData?.name}</span>
                </li>
                <li className='listApi__el-info'>
                  <p>berry size:</p>
                  <span data-testid="berry-size">{specificData?.size}</span>
                </li>
                <li className='listApi__el-info'>
                  <p>berry firmness name:</p>
                  <span>{specificData?.firmness.name}</span>
                </li>
                <li className='listApi__el-info'>
                  <p>berry firmness url: </p>
                  <span>{specificData?.firmness.url}</span>
                </li>
                <li className='listApi__el-info'>
                  <p>berry natural_gift_power:</p>
                  <span>{specificData?.natural_gift_power}</span>
                </li>
                <li className='listApi__el-info'>
                  <p>berry id:</p>
                  <span>{specificData?.id}</span>
                </li>
                <li className='listApi__el-info'>
                  <p>berry natural_gift_power:</p>
                  <span>{specificData?.natural_gift_power}</span>
                </li>
                <li className='listApi__el-info'>
                  <p>berry smoothness:</p>
                  <span>{specificData?.smoothness}</span>
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
            <div data-testid='loader-parent' className={ specificDataLoading ? 'listApi _information _preload _active' : 'listApi _preload _information' }>
              <p className='listApi__clue'>We are carefully loading results, please wait... :D</p>
              <Preloader testId='master-detail'></Preloader>
            </div>
          )
        }
      </div>
      <ErrorBtn onClick={ErrorClick}></ErrorBtn>
      <button className='refresh-btn' onClick={ () => (refetch(), setCurrentPage(1)) }>Refresh cashed data from RTK-Query</button>
    </section>
  );
};

export default ContentBlock;