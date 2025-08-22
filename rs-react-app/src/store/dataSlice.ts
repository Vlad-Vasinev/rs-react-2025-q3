import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import type { data } from "../types/types"

export interface Elements {
  elements: data,
  data: data | null
}

const initialState: Elements = {
  elements: {
    Name: '',
    age: null,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    acceptTerms: false,
    picture: null,
  },
  data: null
}

const elementsSlice = createSlice({
  name: 'elements', 
  initialState, 
  reducers: {
    addEl(state, action: PayloadAction<data>) {
      console.log('added data after form was completed' + ' ' + action.payload)
      state.elements = { ...state.elements, ...action.payload }
    },
  }
})

export const { addEl } = elementsSlice.actions
export const itemsReducer = elementsSlice.reducer