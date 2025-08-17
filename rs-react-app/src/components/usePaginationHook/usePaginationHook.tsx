"use client"
import { useEffect } from 'react';

export function usePaginationHook(
  param: number | string | undefined,
  searchParams: URLSearchParams,
  routerPush: (url: string) => void
) {
  const searchParamsString = searchParams.toString();

  useEffect(() => {
    if (param === null || param === '') return;

    const newParams = new URLSearchParams(searchParamsString);

    if (typeof param === 'number') {
      newParams.delete('q');
      newParams.set('page', String(param));
      newParams.set('details', '1');
    } else {
      newParams.delete('page');
      newParams.delete('details');
      newParams.set('q', String(param));
    }

    const newParamsString = newParams.toString();

    if (searchParamsString !== newParamsString) {
      routerPush(`?${newParamsString}`);
    }
  }, [param, searchParamsString, routerPush]);
}
