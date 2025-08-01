import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';

import { deleteAll } from '../../store/elementsSlice';

const FlyoutElement = () => {

  const dispatch = useDispatch<AppDispatch>()
  const selectedElements = useSelector((state: RootState) => state.items.elements)

  function deleteAllFromState () {
    dispatch(deleteAll())
  }

  return (
    <div className='flyoutElement'>
      <button className='flyoutElement-download'>download all</button>
      <button className='flyoutElement-unselect' onClick={deleteAllFromState}>unselect all</button>
      <p>you have choosed {selectedElements.length} items</p>
    </div>
  );
};

export default FlyoutElement;