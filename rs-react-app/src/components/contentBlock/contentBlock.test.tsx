import { act } from "react";
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

  it('contentBlock makes fetch request', async  () => {

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

    await waitFor(() => expect(screen.getByText(/cheri/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(screen.getByText(/chesto/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(screen.getByText(/pecha/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/berry/?limit=10'), { timeout: 5000 })

  })

  it('preloader exists while data fetching and gets removed after positive fetch', async  () => {

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
      expect(screen.queryByTestId('loader-icon')).toBeInTheDocument()
      await Promise.resolve()
      await Promise.resolve()
    })

    await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/berry/?limit=10'), { timeout: 5000 })
    await waitFor(() => expect(screen.queryByTestId('loader-icon')).not.toBeInTheDocument() )

  })

})