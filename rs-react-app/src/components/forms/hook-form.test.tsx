import App from "../../App";

import {vi} from 'vitest'

import { Provider } from "react-redux";
import { store } from "../../store";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

    const mockSubmitHandler = vi.fn()

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

    const inputName = screen.getByPlaceholderText('name')
    const submitBtn = screen.getByTestId('submit-btn-test')

    await userEvent.clear(inputName)
    fireEvent.click(submitBtn)
    await waitFor(() => expect(screen.getByText(/Name is required/i)).toBeInTheDocument(), { timeout: 1500 })

    await userEvent.clear(inputName)
    await userEvent.type(inputName, 'vlad')
    fireEvent.click(submitBtn)
    await waitFor(() => expect(screen.getByText(/Name must start with an uppercase letter/i)).toBeInTheDocument(), { timeout: 1500 })

    await userEvent.type(screen.getByPlaceholderText(/name/i), 'Vlad D')
    await userEvent.type(screen.getByPlaceholderText(/age/i), '30')
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'vlad@example.com')
    await userEvent.type(screen.getByPlaceholderText(/^password$/i), 'password123')
    await userEvent.type(screen.getByPlaceholderText(/confirm password/i), 'password123')

    const maleRadio = screen.getByRole('radio', { name: /^male$/i })
    fireEvent.click(maleRadio)
    expect(maleRadio).toBeChecked()


    const acceptTermsCheckbox = screen.getByRole('checkbox')
    fireEvent.click(acceptTermsCheckbox)
    expect(acceptTermsCheckbox).toBeChecked()

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' })
    const fileInput = screen.getByLabelText(/upload picture/i) as HTMLInputElement
    await userEvent.upload(fileInput, file)
    expect(fileInput.files).not.toBeNull()
    expect(fileInput.files![0]).toStrictEqual(file)

    expect(fileInput.files).toHaveLength(1)

    const submitButton = screen.getByTestId('submit-btn-test')
    fireEvent.click(submitButton)

    const errorMessages = screen.queryAllByText(/required|must be|invalid/i)
    expect(errorMessages.length).toBe(0)

    const state = store.getState()
    expect(state.items).toBeDefined()

    // await waitFor(() => {
    //   const newState = store.getState();
    //   expect(newState.items.elements.name).toBe('Vlad D')
    // }, { timeout: 3000 });
    // await waitFor(() => {
    //   expect(store.getState().items.elements.name).toBe('Vlad D')
    // }, {timeout: 3000})
    // await waitFor(() => {
    //   expect(mockSubmitHandler).toHaveBeenCalled()
    // })

    // expect(mockSubmitHandler).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     name: 'Vlad D',
    //     age: 30,
    //     email: 'vlad@example.com',
    //     password: 'password123',
    //     confirmPassword: 'password123',
    //     gender: 'male',
    //     acceptTerms: true,
    //     picture: expect.any(String), 
    //   }),
    // )

  })

})