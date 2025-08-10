import { render, screen } from "@testing-library/react";
import About from "./about";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "../../store";

describe('About.tsx', () => {

  it('about component exists', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <About></About>
        </MemoryRouter>
      </Provider>

    )
    expect(screen.getByTestId('about-test')).toBeInTheDocument()

  })

})