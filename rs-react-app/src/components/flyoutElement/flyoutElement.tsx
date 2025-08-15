"use client"
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';

import { deleteAll } from '../../store/elementsSlice';
import { convertToCSV } from '../saveCsv/saveCsv';

const FlyoutElement = () => {

  const dispatch = useDispatch<AppDispatch>()
  const selectedElements = useSelector((state: RootState) => state.items.elements)
  const selectedData = useSelector((state:RootState) => state.items.data)

  const [downloadUrl, setDownloadUrl] = useState('')

  function deleteAllFromState () {
    dispatch(deleteAll())
  }

  function downloadData() {
    console.log(selectedData)
    let csvString = convertToCSV(selectedData)
    if(csvString) {
      downloadCSV(csvString)
    }
  }

  function downloadCSV(csvString: string) {
    console.log('csv string is' + ' ' + csvString)
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    setDownloadUrl(url)
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

  }

  return (
    <div data-testid="flyoutElement-test" className={selectedElements.length > 0 ? 'flyoutElement _active' : 'flyoutElement'}>
      <p>you have choosed {selectedElements.length} items</p>
      <div className='flyoutElement__wrapper'>
        <a data-testid="download-all-test" onClick={downloadData} download={`${selectedElements.length}_items`} href={downloadUrl} className='flyoutElement-download'>download all</a>
        <button data-testid="delete-all-test" className='flyoutElement-unselect' onClick={deleteAllFromState}>unselect all</button>
      </div>
    </div>
  );
};

export default FlyoutElement;