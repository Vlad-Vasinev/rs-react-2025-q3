"use client"
import { useEffect } from 'react';

export function usePaginationHook(
  param: number | string | undefined,
  searchParams: URLSearchParams,
  routerPush: (url: string) => void
) {

  useEffect(() => {
    if (param === null || param === '') return;

    const newParams = new URLSearchParams(searchParams.toString())

    if(typeof(param) === 'number') {
      const newParams = new URLSearchParams(searchParams)
      newParams.delete('q')
      newParams.set('page', `${String(param)}`) 
      newParams.set('details', '1')
    } 
    else {

      const newParams = new URLSearchParams(searchParams)
      newParams.delete('page')
      newParams.delete('details')
      newParams.set('q', String(param))
    }

    routerPush(`${newParams.toString()}`)

  }, [param, searchParams, routerPush]);
}
