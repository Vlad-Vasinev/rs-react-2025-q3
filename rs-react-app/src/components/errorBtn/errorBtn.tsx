
interface ErrorBtnProps {
  onClick: () => void
}

const ErrorBtn = (props: ErrorBtnProps) => {
  return (
    <button data-testid="error-btn" className='errorBtn' onClick={props.onClick}>Throw an error</button>
  );
};

export default ErrorBtn;