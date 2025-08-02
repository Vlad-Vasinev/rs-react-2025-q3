import App from "./App";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { store } from "./store";

describe('App.tsx', () => {

  it('app component exists', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App></App>
        </MemoryRouter>
      </Provider>
    )
    const app = screen.getByTestId('app-component')

    expect(app).toBeInTheDocument()

  })

})