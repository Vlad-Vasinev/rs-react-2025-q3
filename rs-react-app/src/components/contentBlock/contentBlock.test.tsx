import { act } from "react";
import ContentBlock from "./contentBlock";
import { render, screen, waitFor } from '@testing-library/react'

describe('ContentBlock.tsx', () => {

  it('contentBlock exists', () => {

    render(<ContentBlock></ContentBlock>)
    const contentBlock = screen.getAllByTestId('content-block')

    contentBlock.forEach((el) => {
      expect(el).toBeInTheDocument()
    })
    
  })

  it('contentBlock makes fetch request', async  () => {

    vi.useFakeTimers()

    const mockResponse = {
      count: 64,
      next: "https://pokeapi.co/api/v2/berry?offset=20&limit=20",
      previous: null,
      results: [
        {
          name: "cheri", 
          url: "https://pokeapi.co/api/v2/berry/1/",
          size: 1
        },
        {
          name: "chesto", 
          url: "https://pokeapi.co/api/v2/berry/2/",
          size: 2
        },
        {
          name: "pecha", 
          url: "https://pokeapi.co/api/v2/berry/3/",
          size: 3
        }
      ]
    }

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse),

      })
    })

    render(<ContentBlock></ContentBlock>)

    await act (async () => {
      vi.advanceTimersByTime(4000)

      await Promise.resolve()
      await Promise.resolve()
    })

    expect(screen.getByText(/cheri/i)).toBeInTheDocument();
    expect(screen.getByText(/chesto/i)).toBeInTheDocument();
    expect(screen.getByText(/pecha/i)).toBeInTheDocument();

    expect(window.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/berry')

  })

  it('loader exists, spins and got removed after positive fetch', async () => {

    const mockResponse = {
      count: 64,
      next: "https://pokeapi.co/api/v2/berry?offset=20&limit=20",
      previous: null,
      results: [
        {
          name: "cheri", 
          url: "https://pokeapi.co/api/v2/berry/1/",
          size: 1
        },
        {
          name: "chesto", 
          url: "https://pokeapi.co/api/v2/berry/2/",
          size: 2
        },
        {
          name: "pecha", 
          url: "https://pokeapi.co/api/v2/berry/3/",
          size: 3
        }
      ]
    }

    vi.useFakeTimers()

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse),

      } as Response)
    })

    render(<ContentBlock></ContentBlock>)
    const loaderIcon = screen.getByTestId('loader-icon')

    await act (async () => {
      vi.advanceTimersByTime(4000)
      expect(loaderIcon).toBeInTheDocument()
      await Promise.resolve()
    })

    expect(loaderIcon).not.toBeInTheDocument()

  })

})