import App from "../../App";

import { Provider } from "react-redux";
import { store } from "../../store";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe('hook-form.tsx', () => {

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

  it('ReactHookForm component exists, all fields are working', async () => {

    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    )

    const uncontrolledBtn = screen.getByTestId('uncontrolled-btn-test')
    const hookBtn = screen.getByTestId('hook-btn-test')

    expect(uncontrolledBtn).toBeInTheDocument()
    expect(hookBtn).toBeInTheDocument()

    fireEvent.click(hookBtn)
    expect(screen.getByTestId('modal-test')).toBeVisible()
    expect(screen.getByTestId('modal-close-test')).toBeVisible()

    fireEvent.click(screen.getByTestId('modal-close-test'))
    expect(screen.queryByTestId('modal-test')).toBeNull()

    fireEvent.click(hookBtn)
    await waitFor(() => expect(screen.getByText(/React Hook Form/i)).toBeInTheDocument(), { timeout: 1500 })
    await waitFor(() => expect(screen.getByText(/Name Field/i)).toBeInTheDocument(), { timeout: 1500 })
    await waitFor(() => expect(screen.getByText(/Age Field/i)).toBeInTheDocument(), { timeout: 1500 })
    await waitFor(() => expect(screen.getByText(/Email Field/i)).toBeInTheDocument(), { timeout: 1500 })

    await waitFor(() => expect(screen.getAllByTestId('form-item-test').forEach((el) => {
      expect(el).toBeInTheDocument()
    })), { timeout: 1500 })

  })

})