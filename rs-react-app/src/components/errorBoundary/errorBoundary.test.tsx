import ErrorBoundary from "./errorBoundary";
import { render, screen } from "@testing-library/react";

function FalseUi () {
  throw new Error('💥 Error! 💥 Error! 💥 Error! 💥 Error!')
  return null
}

describe('ErrorBoundary.tsx', () => {

  it('errorBoundary component works and renders different UI if an error happened', () => {
    render(<ErrorBoundary > <FalseUi></FalseUi> </ErrorBoundary>)
    expect(screen.getByTestId('error-message'))
  })

})