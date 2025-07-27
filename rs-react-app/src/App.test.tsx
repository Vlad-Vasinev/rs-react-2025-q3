import App from "./App";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";

describe('App.tsx', () => {

  it('app component exists', () => {

    render(
      <MemoryRouter>
        <App></App>
      </MemoryRouter>
    )
    const app = screen.getByTestId('app-component')

    expect(app).toBeInTheDocument()

  })

})