import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import type { BerryDate } from "../types/types"

interface Elements {
  elements: string[],
  data: BerryDate[] | null
}

const initialState: Elements = {
  elements: [],
  data: null
}

const elementsSlice = createSlice({
  name: 'elements', 
  initialState, 
  reducers: {
    addEl(state, action: PayloadAction<string>) {
      console.log('adding el inside elementSlice.ts' + ' ' + action.payload)
      state.elements.push(action.payload)
    },
    removeEl(state, action: PayloadAction<string>) {
      state.elements = state.elements.filter(el => el !== action.payload)
      console.log('remove el from elementSlice.ts' + ' ' + action.payload)
    },
    deleteAll(state) {
      state.elements = []
      state.data = null
    },
    addData(state, action: PayloadAction<BerryDate>) {
      if (state.data === null) {
        state.data = []
      }
      state.data.push(action.payload)
    },
    removeSpecificData(state, action: PayloadAction<string>) {
      console.log('inside removeSpecificData')
      if(state.data !== null) {
        state.data = state.data.filter(el => el.name !== action.payload)
      }
      
    }
  }
})

export const { addEl, removeEl, deleteAll, addData, removeSpecificData } = elementsSlice.actions
export const itemsReducer = elementsSlice.reducer