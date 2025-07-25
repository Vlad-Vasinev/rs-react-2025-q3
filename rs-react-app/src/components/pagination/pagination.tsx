
interface PaginationInterface {
  onClick: (number: number) => void
}

const Pagination = (props: PaginationInterface) => {
  return (
    <div className='pagination'>
      <button onClick={() => {props.onClick(1)}} className='pagination-btn'>1</button>
      <button onClick={() => {props.onClick(2)}} className='pagination-btn'>2</button>
      <button onClick={() => {props.onClick(3)}} className='pagination-btn'>3</button>
      <button onClick={() => {props.onClick(4)}} className='pagination-btn'>4</button>
      <button onClick={() => {props.onClick(5)}} className='pagination-btn'>5</button>
    </div>
  );
};

export default Pagination;