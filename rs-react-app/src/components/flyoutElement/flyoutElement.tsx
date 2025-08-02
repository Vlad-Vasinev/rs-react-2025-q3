import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';

import { deleteAll } from '../../store/elementsSlice';
import { convertToCSV } from '../saveCsv/saveCsv';

const FlyoutElement = () => {

  const downloadLink = React.useRef<HTMLAnchorElement | null>(null)

  const dispatch = useDispatch<AppDispatch>()
  const selectedElements = useSelector((state: RootState) => state.items.elements)
  const selectedData = useSelector((state:RootState) => state.items.data)

  function deleteAllFromState () {
    dispatch(deleteAll())
  }

  function downloadData() {
    console.log(selectedData)
    let csvString = convertToCSV(selectedData)
    console.log(csvString)
    if(csvString) {
      downloadCSV(csvString)
    }
  }

  function downloadCSV(csvString: string) {
    console.log('csv string is' + ' ' + csvString)
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    if(downloadLink.current) {
      downloadLink.current.href = url
    }
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

  }

  return (
    <div className={selectedElements.length > 0 ? 'flyoutElement _active' : 'flyoutElement'}>
      <p>you have choosed {selectedElements.length} items</p>
      <div className='flyoutElement__wrapper'>
        <a onClick={downloadData} download={`${selectedElements.length}_items`} ref={downloadLink} href="#" className='flyoutElement-download'>download all</a>
        <button className='flyoutElement-unselect' onClick={deleteAllFromState}>unselect all</button>
      </div>
    </div>
  );
};

export default FlyoutElement;