import { useEffect } from 'react';

import { useGetSpecificQuery } from '../../store/apiSlice';

export function usePaginationHook(
  param: number | string | undefined,
  searchParams: URLSearchParams,
  updateSearchParams: (params: URLSearchParams) => void
) {

  const { data } = useGetSpecificQuery(param)

  useEffect(() => {
    if (param === null || param === '') return;

    if(typeof(param) === 'number') {
      const newParams = new URLSearchParams(searchParams)
      newParams.delete('q')
      newParams.set('page', `${String(param)}`) 
      newParams.set('details', '1')
      updateSearchParams(newParams)
    } 
    else {

      const newParams = new URLSearchParams(searchParams)
      newParams.delete('page')
      newParams.delete('details')
      newParams.set('q', String(param))
      updateSearchParams(newParams)
    }

  }, [data, searchParams, updateSearchParams]);
}
