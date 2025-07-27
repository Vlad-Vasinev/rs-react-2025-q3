import { act } from "react";
import ContentBlock from "./contentBlock";
import { MemoryRouter } from "react-router";
import { render, screen, waitFor } from '@testing-library/react'

describe('ContentBlock.tsx', () => {

  it('contentBlock exists', () => {

    render (
      <MemoryRouter>
        <ContentBlock></ContentBlock>
      </MemoryRouter>
    )
    
    const contentBlock = screen.getAllByTestId('content-block')

    contentBlock.forEach((el) => {
      expect(el).toBeInTheDocument()
    })
    
  })

  it('contentBlock makes fetch request', async  () => {

    const mockResponse = {
      count: 64,
      next: "https://pokeapi.co/api/v2/berry?offset=20&limit=20",
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
      <MemoryRouter>
        <ContentBlock></ContentBlock>
      </MemoryRouter>
    )

    await act (async () => {
      
      await Promise.resolve()
      await Promise.resolve()
    })

    await waitFor(() => expect(screen.getByText(/cheri/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(screen.getByText(/chesto/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(screen.getByText(/pecha/i)).toBeInTheDocument(), { timeout: 5000 })

    expect(window.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/berry')

  })

  // it('loader exists, spins and got removed after positive fetch', async () => {

  //   vi.useFakeTimers()

  //   const mockResponse = {
  //     count: 64,
  //     next: "https://pokeapi.co/api/v2/berry?offset=20&limit=20",
  //     previous: null,
  //     results: [
  //       { name: "cheri", url: "https://pokeapi.co/api/v2/berry/1/" },
  //       { name: "chesto", url: "https://pokeapi.co/api/v2/berry/2/" },
  //       { name: "pecha", url: "https://pokeapi.co/api/v2/berry/3/" }
  //     ]
  //   }

  //   vi.spyOn(window, "fetch").mockResolvedValueOnce({
  //     json: () => Promise.resolve(mockResponse),
  //   } as Response)

  //   render(
  //     <MemoryRouter>
  //       <ContentBlock />
  //     </MemoryRouter>
  //   )
  //   expect(screen.getByTestId('loader-icon')).toBeInTheDocument()

  //   await act (async () => {
  //     vi.advanceTimersByTime(2000)
  //     await Promise.resolve()
  //   })


  //   vi.advanceTimersByTime(2000)
  //   screen.debug()

  //   expect(screen.queryByTestId('loader-icon')).not.toBeInTheDocument()
  //   // await waitFor(() => expect(screen.queryByTestId('loader-icon')).not.toBeInTheDocument())

  // })


})