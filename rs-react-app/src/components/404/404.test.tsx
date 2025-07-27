import { render, screen } from "@testing-library/react";
import ErrorPage from "./404";
import { MemoryRouter } from "react-router";

describe('ErrorPage.tsx', () => {

  it('404 component exists', () => {

    render(
      <MemoryRouter>
        <ErrorPage></ErrorPage>
      </MemoryRouter>
    )
    
    expect(screen.getByTestId('404-test')).toBeInTheDocument()

  })

})