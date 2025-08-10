import { convertToCSV } from "./saveCsv"

describe('saveCSV.tsx', () => {

  it('returns empty string if input is null', () => {
    expect(convertToCSV(null)).toBe('')
  })

})
