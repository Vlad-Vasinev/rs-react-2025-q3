import HandleForm from "./handleForm";
import { render, renderHook, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'


describe('HandleForm.tsx', () => {

  it('handleForm component exists', () => {

    render(<HandleForm></HandleForm>)
    const formEl = screen.getByTestId('handleForm-form')

    expect(formEl).toBeInTheDocument()

  })

  it('search button exists inside HandleForm', () => {

    render(<HandleForm></HandleForm>)
    const formBtn = screen.getByTestId('handleForm-btn')

    expect(formBtn).toBeInTheDocument()

  })

  it('search input exists inside HandleForm', () => {

    render(<HandleForm></HandleForm>)
    const formInput = screen.getByTestId('handleForm-input')
    
    expect(formInput).toBeInTheDocument()

  })

  it('search input updates when user types', async () => {

    render(<HandleForm></HandleForm>)
    const formInput = screen.getByTestId('handleForm-input')

    await userEvent.type(formInput, 'testing text for handle-input')
    expect(formInput).toHaveValue('testing text for handle-input')

  })

  it('input value goes to the localStorage after user clicks the button', async () => {

    render(<HandleForm></HandleForm>)
    localStorage.clear()
    const formInput = screen.getByTestId('handleForm-input')
    const formBtn = screen.getByTestId('handleForm-btn')

    await userEvent.type(formInput, 'testing text for handle-input')
    await userEvent.click(formBtn)
    expect(localStorage.getItem('inputValue')).toBe('testing text for handle-input')

  })

  it('localStorage is clear after user clicks on "ReloadLS" btn', async () => {

    render(<HandleForm></HandleForm>)
    localStorage.clear()
    const reloadLsBtn = screen.getByTestId('handleForm-reload-ls')

    await userEvent.click(reloadLsBtn)
    expect(localStorage.length).toBe(0)

  })

})
