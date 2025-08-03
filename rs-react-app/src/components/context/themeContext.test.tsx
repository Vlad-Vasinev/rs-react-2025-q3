import { MemoryRouter } from "react-router";
import { render, screen, waitFor } from '@testing-library/react'

import Navigation from "../navigation/navigation";
import { ThemeProvider } from "./themeContext";

import { Provider } from "react-redux";
import { store } from "../../store";
import userEvent from "@testing-library/user-event";

describe('ThemeContext.tsx', () => {

  it('ThemeContext changes theme on btn click', async () => {

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <Navigation></Navigation>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )

    await waitFor(() => expect(screen.queryByTestId('theme-change-test')).toBeInTheDocument(), { timeout: 5000 } )
    await waitFor(() => expect(screen.getByText(/Change to dark theme-mode/i)).toBeInTheDocument(), { timeout: 5000 })
    await waitFor(() => expect(localStorage.getItem('theme')).toBe('light'), { timeout: 5000 } )
    

    await userEvent.click(screen.getByTestId('theme-change-test')) 
    await waitFor(() => expect(localStorage.getItem('theme')).toBe('dark'), { timeout: 5000 } )
    await waitFor(() => expect(localStorage.getItem('theme')).toBe('dark'), { timeout: 5000 } )

  })

})