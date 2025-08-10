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

  it('fetch request for a specific name in the list', async () => {

    const response = await fetch('https://pokeapi.co/api/v2/berry')
 
    await expect(response.json()).resolves.toEqual({
      count: 64,
      next: "https://pokeapi.co/api/v2/berry?offset=20&limit=20",
      previous: null,
      results: [
        { name: "cheri", url: "https://pokeapi.co/api/v2/berry/1/", },
        { name: "chesto", url: "https://pokeapi.co/api/v2/berry/2/", },
        { name: "pecha", url: "https://pokeapi.co/api/v2/berry/3/", },
        { name: "rawst", url: "https://pokeapi.co/api/v2/berry/4/" },
        { name: "aspear", url: "https://pokeapi.co/api/v2/berry/5/" },
        { name: "leppa", url: "https://pokeapi.co/api/v2/berry/6/" },
        { name: "oran", url: "https://pokeapi.co/api/v2/berry/7/" },
        { name: "persim", url: "https://pokeapi.co/api/v2/berry/8/" },
        { name: "lum", url: "https://pokeapi.co/api/v2/berry/9/" },
        { name: "sitrus", url: "https://pokeapi.co/api/v2/berry/10/" },
        { name: "figy", url: "https://pokeapi.co/api/v2/berry/11/" },
        { name: "wiki", url: "https://pokeapi.co/api/v2/berry/12/" },
        { name: "mago", url: "https://pokeapi.co/api/v2/berry/13/" },
        { name: "aguav", url: "https://pokeapi.co/api/v2/berry/14/" },
        { name: "iapapa", url: "https://pokeapi.co/api/v2/berry/15/" },
        { name: "razz", url: "https://pokeapi.co/api/v2/berry/16/" },
        { name: "bluk", url: "https://pokeapi.co/api/v2/berry/17/" },
        { name: "nanab", url: "https://pokeapi.co/api/v2/berry/18/" },
        { name: "wepear", url: "https://pokeapi.co/api/v2/berry/19/" },
        { name: "pinap", url: "https://pokeapi.co/api/v2/berry/20/" },
      ]
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ContentBlock></ContentBlock>
        </MemoryRouter>
      </Provider>
    )

    await waitFor(() => expect(screen.queryByTestId('handleForm-input')).toBeInTheDocument(), { timeout: 2000 } )
    await waitFor(() => expect(screen.queryByTestId('handleForm-btn')).toBeInTheDocument(), { timeout: 2000 } )

    await userEvent.type(screen.getByTestId('handleForm-input'), 'cheri')
    await userEvent.click(screen.getByTestId('handleForm-btn'))

    await waitFor(() => {
      expect(screen.queryByTestId('master-detail-test')).toBeInTheDocument()
      expect(screen.queryByTestId('pagination-test')).toBeInTheDocument()
      expect(screen.queryByTestId('handleForm-reload-ls')).toBeInTheDocument()
    }, { timeout: 5000 })

  })

})
