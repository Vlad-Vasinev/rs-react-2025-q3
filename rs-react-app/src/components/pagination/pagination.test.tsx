import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import ContentBlock from "../contentBlock/contentBlock";

import { Provider } from "react-redux";
import { store } from "../../store";

describe('Pagination.tsx', () => {

  it('pagination component exists after user clicks on any element from the list(left side)', async () => {

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

    await act (async () => {
      
      await Promise.resolve()
      await Promise.resolve()
    })

    await waitFor(() => expect(screen.getByText(/cheri/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(screen.getByText(/chesto/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(screen.getByText(/pecha/i)).toBeInTheDocument(), { timeout: 5000 })

    const searchEl = screen.getAllByTestId('search-el')
    expect(screen.queryByTestId('pagination-test')).not.toBeInTheDocument()
    
    searchEl.forEach((el) => {
      expect(el).toBeInTheDocument()
    })
    
    for (const el of searchEl) {
      await userEvent.click(el)
    }

    await waitFor(() => expect(screen.queryByTestId('pagination-test')).toBeInTheDocument(), { timeout: 5000 })

  })

})