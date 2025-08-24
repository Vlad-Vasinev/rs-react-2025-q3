import { describe, it, expect } from 'vitest'
import { itemsReducer, addEl } from './dataSlice'
import type { data } from '../types/types'

describe('dataSlice.ts', () => {
  it('added data to the redux store', () => {
    const initialState = {
      elements: {
        name: '',
        age: null,
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        acceptTerms: false,
        picture: undefined,
      },
    }

    const payload: data = {
      name: 'Vlad D',
      age: 30,
      email: 'vlad@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      gender: 'male',
      acceptTerms: true,
      picture: undefined,
    }

    const newState = itemsReducer(initialState, addEl(payload))

    expect(newState.elements).toEqual(payload)
  })
})
