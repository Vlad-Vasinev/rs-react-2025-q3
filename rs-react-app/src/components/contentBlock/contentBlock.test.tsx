import ContentBlock from "./contentBlock";
import { render, screen } from '@testing-library/react'

describe('ContentBlock.tsx', () => {

  it('contentBlock exists', () => {

    render(<ContentBlock></ContentBlock>)
    const contentBlock = screen.getByTestId('content-block')

    expect(contentBlock).toBeInTheDocument()
    
  })

  it('contentBlock makes fetch request', () => {
    const mockResponse = {
      count: 64,
      next: "https://pokeapi.co/api/v2/berry?offset=20&limit=20",
      previous: null,
      results: [
        {
          name: "cheri", 
          url: "https://pokeapi.co/api/v2/berry/1/"
        }
      ]
    };

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse),

      } as Response)
    })
  })
  
})