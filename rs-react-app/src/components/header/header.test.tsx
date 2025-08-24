import Header from "./header";

import { render, screen } from "@testing-library/react";

describe('header.tsx', () => {

  it('Header component exists', () => {

    render(<Header></Header>)

    const header = screen.getByTestId('header-test')
    expect(header).toBeInTheDocument()

  })

})