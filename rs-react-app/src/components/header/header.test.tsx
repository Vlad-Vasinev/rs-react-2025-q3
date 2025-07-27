import Header from "./header";
import { render, screen } from "@testing-library/react";

describe('Header.tsx', () => {
  it('header component exists', () => {

    render(<Header></Header>)
    const header = screen.getByTestId('header')
    
    expect(header).toBeInTheDocument()

  })
})