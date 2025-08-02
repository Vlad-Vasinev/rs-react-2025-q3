import { act } from "react";
import { MemoryRouter } from "react-router";
import { render, screen, waitFor } from '@testing-library/react'

import FlyoutElement from "../flyoutElement/flyoutElement";
import ContentBlock from "../contentBlock/contentBlock";

import { Provider } from "react-redux";
import { store } from "../../store";
import userEvent from "@testing-library/user-event";

describe('FlyoutElement.tsx', () => {

  it('FlyoutElement element exists, shows how many were added, choosed item goes to redux store', async  () => {

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
          <FlyoutElement></FlyoutElement>
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

    const checkboxes = screen.getAllByTestId('checkbox-test')
    checkboxes.forEach((el) => {
      expect(el).toBeInTheDocument()
    })

    const state = store.getState()

    expect(state.items).toBeDefined()
    expect(Array.isArray(state.items.elements)).toBe(true)
    
    await userEvent.click(screen.getAllByTestId('checkbox-test')[0]) 
    await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/berry/cheri/'), { timeout: 5000 })  
    
    await waitFor(() => {
      const newState = store.getState();
      expect(newState.items.elements).toContain("cheri");
    }, { timeout: 5000 });

    await waitFor(() => expect(screen.getByText(/you have choosed 1 items/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(screen.queryByTestId('flyoutElement-test')).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(screen.queryByTestId('flyoutElement-test')).toHaveClass('_active'), { timeout: 5000 })
    await waitFor(() => expect(screen.queryByTestId('delete-all-test')).toBeInTheDocument(), { timeout: 5000 })

    await userEvent.click(screen.getByTestId('delete-all-test')) 
    await waitFor(() => expect(screen.queryByTestId('flyoutElement-test')).not.toHaveClass('_active'), { timeout: 5000 })

    await waitFor(() => {
      const newState = store.getState();
      expect(newState.items.elements).not.toContain("cheri");
    }, { timeout: 5000 });

  })

})