import ContentBlock from "./contentBlock";
import { render } from '@testing-library/react'

describe('contentBlock.tsx', () => {
  
  it('ContentBlock exists', () => {

    render(<ContentBlock></ContentBlock>)
    expect(true).toBeTruthy()
    
  })

})