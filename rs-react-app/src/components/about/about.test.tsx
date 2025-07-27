import { render, screen } from "@testing-library/react";
import About from "./about";
import { MemoryRouter } from "react-router";

describe('About.tsx', () => {

  it('about component exists', () => {

    render(
      <MemoryRouter>
        <About></About>
      </MemoryRouter>
    )
    expect(screen.getByTestId('about-test')).toBeInTheDocument()

  })

})