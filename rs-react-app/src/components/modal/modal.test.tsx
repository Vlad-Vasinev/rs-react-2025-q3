import App from "../../App";

import { Provider } from "react-redux";
import { store } from "../../store";

import { render, screen, fireEvent } from "@testing-library/react";

describe('modal.tsx', () => {

  beforeAll(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterAll(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it('Modal component exists, user can open and close it', () => {

    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    )

    const uncontrolledBtn = screen.getByTestId('uncontrolled-btn-test')
    const hookBtn = screen.getByTestId('hook-btn-test')

    expect(uncontrolledBtn).toBeInTheDocument()
    expect(hookBtn).toBeInTheDocument()

    fireEvent.click(uncontrolledBtn)
    expect(screen.getByTestId('modal-test')).toBeVisible()

    expect(screen.getByTestId('modal-close-test')).toBeVisible()

    fireEvent.click(screen.getByTestId('modal-close-test'))
    expect(screen.queryByTestId('modal-test')).toBeNull()

  })

})