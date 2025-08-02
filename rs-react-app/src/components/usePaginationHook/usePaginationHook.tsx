import { useEffect } from 'react';

import type { ContentBlockState } from '../../types/types';

export function usePaginationHook(
  param: number | string | undefined,
  setContentState: React.Dispatch<React.SetStateAction<ContentBlockState>>,
  searchParams: URLSearchParams,
  updateSearchParams: (params: URLSearchParams) => void
) {
  useEffect(() => {
    if (param === null || param === '') return;

    localStorage.setItem('inputNumberValue', `${param}`);

    setContentState((prev: ContentBlockState) => ({ ...prev, errorMessage: false }));

    setContentState(prev => ({
      ...prev,
      searchResult: '',
      loadingDetails: true,
    }));

    fetch(`https://pokeapi.co/api/v2/berry/${param}/`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        //throw new Error('Network response was not ok');
      })
      .then(result => {
        //localStorage.setItem('resultRequest', JSON.stringify(result));

        setTimeout(() => {
          setContentState(prev => ({
            ...prev,
            fetchResult: result,
            searchResult: String(param),
            errorMessage: false,
            loadingDetails: false,
          }));
        }, 2000);

        const newParams = new URLSearchParams(searchParams);
        newParams.set('q', String(param));
        updateSearchParams(newParams);
      })
      // .catch(() => {
      //   setContentState(prev => ({
      //     ...prev,
      //     errorMessage: true,
      //     loadingDetails: false,
      //   }));
      // });
  }, [param, searchParams, updateSearchParams, setContentState]);
}
