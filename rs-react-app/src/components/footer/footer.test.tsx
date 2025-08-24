import Footer from "./footer";

import { render, screen } from "@testing-library/react";

describe('footer.tsx', () => {

  it('Footer component exists', () => {

    render(
      <Footer></Footer>
    )

    const footer = screen.getByTestId('footer-test')
    expect(footer).toBeInTheDocument()

  })

})