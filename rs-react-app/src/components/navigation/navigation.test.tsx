import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Navigation from "./navigation";
import { MemoryRouter } from "react-router";

describe('Navigation.tsx', () => {
  
  it('navigation component exists', async () => {

    render(
      <MemoryRouter>
        <Navigation></Navigation>
      </MemoryRouter>
    )
    expect(screen.getByTestId('navigation-test')).toBeInTheDocument()

  })

})