import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import ContentBlock from "../contentBlock/contentBlock";

describe('Pagination.tsx', () => {

  it('pagination component exists after user clicks on any element from the list(left side)', async () => {

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

    const searchEl = screen.getAllByTestId('search-el')
    expect(screen.queryByTestId('pagination-test')).not.toBeInTheDocument()
    
    searchEl.forEach((el) => {
      expect(el).toBeInTheDocument()
    })
    
    for (const el of searchEl) {
      await userEvent.click(el)
    }

    await waitFor(() => expect(screen.queryByTestId('pagination-test')).toBeInTheDocument(), { timeout: 2000 })

  })

})