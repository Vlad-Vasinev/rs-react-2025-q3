import ErrorBtn from "./errorBtn";
import { render, screen, fireEvent } from "@testing-library/react";

describe('ErrorBtn.tsx', () => {

  it('errorBtn component exists and fires event', () => {

    const errorClickFunction = vi.fn()
    render(<ErrorBtn onClick={errorClickFunction}></ErrorBtn>)
    const errorBtn = screen.getAllByTestId('error-btn')

    errorBtn.forEach((el) => {
      fireEvent.click(el)
    })
    errorBtn.forEach((el) => {
      expect(el).toBeInTheDocument()
    })
    expect(errorClickFunction).toHaveBeenCalledTimes(errorBtn.length)

  })

})