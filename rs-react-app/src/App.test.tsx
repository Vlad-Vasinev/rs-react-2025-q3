import App from "./App";
import { render, screen } from "@testing-library/react";

describe('App.tsx', () => {

  it('app component exists', () => {

    render(<App></App>)
    const app = screen.getByTestId('app-component')

    expect(app).toBeInTheDocument()

  })

})