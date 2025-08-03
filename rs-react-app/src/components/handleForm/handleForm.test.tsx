import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from '@testing-library/user-event'

import HandleForm from "./handleForm";
import ContentBlock from "../contentBlock/contentBlock";

import { Provider } from "react-redux";
import { store } from "../../store";

describe('HandleForm.tsx', () => {

  it('handleForm component exists', () => {

    render(
      <Provider store={store}>
        <HandleForm></HandleForm>
      </Provider>
    )
    const formEl = screen.getByTestId('handleForm-form')

    expect(formEl).toBeInTheDocument()

  })

  it('search button exists inside HandleForm', () => {

    render(
      <Provider store={store}>
        <HandleForm></HandleForm>
      </Provider>
    )
    const formBtn = screen.getByTestId('handleForm-btn')

    expect(formBtn).toBeInTheDocument()

  })

  it('search input exists inside HandleForm', () => {

    render(
      <Provider store={store}>
        <HandleForm></HandleForm>
      </Provider>
    )
    const formInput = screen.getByTestId('handleForm-input')
    
    expect(formInput).toBeInTheDocument()

  })

  it('search input updates when user types', async () => {

    render(
      <Provider store={store}>
        <HandleForm></HandleForm>
      </Provider>
    )
    const formInput = screen.getByTestId('handleForm-input')

    await userEvent.type(formInput, 'testing text for handle-input')
    expect(formInput).toHaveValue('testing text for handle-input')

  })

  it('input value goes to the localStorage after user clicks the button', async () => {

    const mockResponse = {
      count: 64,
      next: "https://pokeapi.co/api/v2/berry/?limit=10",
      previous: null,
      results: [
        {
          name: "cheri", 
          url: "https://pokeapi.co/api/v2/berry/1/",
        },
        {
          name: "chesto", 
          url: "https://pokeapi.co/api/v2/berry/2/",
        },
        {
          name: "pecha", 
          url: "https://pokeapi.co/api/v2/berry/3/",
        }
      ]
    }
    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse),

      } as Response)
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ContentBlock></ContentBlock>
        </MemoryRouter>
      </Provider>
    )

    await act (async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    localStorage.clear()

    await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/berry/?limit=10'), { timeout: 5000 })
    await waitFor(() => expect(screen.queryByTestId('handleForm-input')).toBeInTheDocument(), { timeout: 2000 } )
    await waitFor(() => expect(screen.queryByTestId('handleForm-btn')).toBeInTheDocument(), { timeout: 2000 } )

    await userEvent.type(screen.getByTestId('handleForm-input'), 'testing text for handle-input')
    await userEvent.click(screen.getByTestId('handleForm-btn'))
    expect(localStorage.getItem('inputNumberValue')).toBe('testing text for handle-input')

  })

  it('fetch request for a specific name in the list', async () => {

    const mockResponse = {
      count: 64,
      next: "https://pokeapi.co/api/v2/berry/?limit=10",
      previous: null,
      results: [
        {
          name: "cheri", 
          url: "https://pokeapi.co/api/v2/berry/1/",
        },
        {
          name: "chesto", 
          url: "https://pokeapi.co/api/v2/berry/2/",
        },
        {
          name: "pecha", 
          url: "https://pokeapi.co/api/v2/berry/3/",
        }
      ]
    }
    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse),

      } as Response)
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ContentBlock></ContentBlock>
        </MemoryRouter>
      </Provider>
    )

    await act (async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    localStorage.clear()

    await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/berry/?limit=10'), { timeout: 5000 })
    await waitFor(() => expect(screen.queryByTestId('handleForm-input')).toBeInTheDocument(), { timeout: 2000 } )
    await waitFor(() => expect(screen.queryByTestId('handleForm-btn')).toBeInTheDocument(), { timeout: 2000 } )

    await userEvent.type(screen.getByTestId('handleForm-input'), 'cheri')
    await userEvent.click(screen.getByTestId('handleForm-btn'))
    await waitFor(() => expect(window.fetch).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/berry/cheri/`), { timeout: 2000 })
    

  })

})
