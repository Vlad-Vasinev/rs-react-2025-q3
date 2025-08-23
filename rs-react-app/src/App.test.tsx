import App from "./App";
import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { store } from "./store";

import "@testing-library/jest-dom"

describe('App.tsx', () => {

  it('app component exists', () => {

    render(
      <Provider store={store}>
          <App></App>
      </Provider>
    )
    const app = screen.getByTestId('app-component')

    expect(app).toBeInTheDocument()

  })

})