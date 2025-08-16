"use client"
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';

import { deleteAll } from '../../store/elementsSlice';

const FlyoutElement = () => {

  const dispatch = useDispatch<AppDispatch>()
  const selectedElements = useSelector((state: RootState) => state.items.elements)
  const selectedData = useSelector((state:RootState) => state.items.data)

  function deleteAllFromState () {
    dispatch(deleteAll())
  }

  async function downloadData () {
  if (!selectedData || selectedData.length === 0) return;

  try {
    const response = await fetch('/api/export-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedData),
    });

    if (!response.ok) {
      throw new Error('Failed to generate CSV');
    }


    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedElements.length}_items`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div data-testid="flyoutElement-test" className={selectedElements.length > 0 ? 'flyoutElement _active' : 'flyoutElement'}>
      <p>you have choosed {selectedElements.length} items</p>
      <div className='flyoutElement__wrapper'>
        <button data-testid="download-all-test" onClick={downloadData} className='flyoutElement-download'>download all</button>
        <button data-testid="delete-all-test" className='flyoutElement-unselect' onClick={deleteAllFromState}>unselect all</button>
      </div>
    </div>
  );
};

export default FlyoutElement;