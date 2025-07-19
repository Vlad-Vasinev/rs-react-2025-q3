
import Footer from "./footer";
import { render, screen } from "@testing-library/react";

describe('Footer.tsx', () => {
  it('footer component exists', () => {

    render(<Footer></Footer>)
    const footer = screen.getByTestId('footer')
    
    expect(footer).toBeInTheDocument()

  })
})