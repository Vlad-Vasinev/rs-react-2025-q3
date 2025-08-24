import App from "../../App";
import { Modal } from "./modal";

import {vi} from 'vitest'

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

    it("escape key is pressed - onClose works", () => {
    const onClose = vi.fn();
    render(<Modal onClose={onClose}>Modal content</Modal>);

    fireEvent.keyDown(window, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("clicking outside the modal content - onClose works", () => {
    const onClose = vi.fn();
    const { getByTestId } = render(<Modal onClose={onClose}>Modal content</Modal>);

    fireEvent.click(getByTestId("modal-test"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("clicking inside the modal content - onClose doesn't work", () => {
    const onClose = vi.fn();
    const { getByText } = render(<Modal onClose={onClose}>Modal content</Modal>);

    fireEvent.click(getByText("Modal content"));

    expect(onClose).not.toHaveBeenCalled();
  });

  it("clicking the close button - onClose works", () => {
    const onClose = vi.fn();
    const { getByTestId } = render(<Modal onClose={onClose}>Modal content</Modal>);

    fireEvent.click(getByTestId("modal-close-test"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

})