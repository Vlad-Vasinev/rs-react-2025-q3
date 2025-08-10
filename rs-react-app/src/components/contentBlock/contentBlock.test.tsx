import ContentBlock from "./contentBlock";
import { MemoryRouter } from "react-router";
import { render, screen, waitFor } from '@testing-library/react'

import { Provider } from "react-redux";
import { store } from "../../store";

describe('ContentBlock.tsx', () => {

  it('contentBlock exists', () => {

    render (
      <Provider store={store}>
        <MemoryRouter>
          <ContentBlock></ContentBlock>
        </MemoryRouter>
      </Provider>
    )
    
    const contentBlock = screen.getAllByTestId('content-block')

    contentBlock.forEach((el) => {
      expect(el).toBeInTheDocument()
    })
    
  })

  test('contentBlock makes fetch request', async () => {
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

    await waitFor(() => expect(screen.getByText(/cheri/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(screen.getByText(/chesto/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(screen.getByText(/pecha/i)).toBeInTheDocument(), { timeout: 5000 })

    const searhEl = screen.getAllByTestId('search-el')
    searhEl.forEach((el) => {
      expect(el).toBeInTheDocument()
    })

  })

  it('preloader exists while data fetching and gets removed after positive fetch', async  () => {

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
    screen.debug()

    await waitFor(() => {
      expect(screen.queryByTestId('loader-icon')).not.toBeInTheDocument()
    }, { timeout: 5000 })

    await waitFor(() => expect(screen.getByText(/cheri/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(screen.getByText(/chesto/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(screen.getByText(/pecha/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(screen.queryByTestId('loader-icon')).not.toBeInTheDocument() )

  })

})