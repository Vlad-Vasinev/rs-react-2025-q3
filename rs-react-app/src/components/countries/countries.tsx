import { Suspense, useState } from 'react';
import { createResource } from './createResource';

import loaderIcon from '../../assets/loadingIcon.svg'

interface CountryEntry {
  year: number,
  population?: number,
  co2?: number,
  co2_per_capita?: number,
  methane?: number,
  oil_co2?: number,
  temperature_change_from_co2?: number,
}
interface CountryData {
  iso_code: string,
  data: CountryEntry[],
}
interface Countries {
  [countryName: string]: CountryData;
}

const countriesResource = createResource(
  fetch("../../../public/bigData/data.json")
    .then((res) => res.json())
    .then((json): Countries => json)
)

function Countries() {
  const countries = countriesResource.read() as Countries;
  const [searchTerm, setSearchTerm] = useState("");

  const yearSet = new Set<number>();
  Object.values(countries).forEach((countryData) => {
    countryData.data.forEach((entry) => {
      yearSet.add(entry.year);
    });
  });
  const years = Array.from(yearSet).sort((a, b) => a - b);

  const [selectedYear, setSelectedYear] = useState<number>(years[years.length - 1] || new Date().getFullYear());

  const filtered = Object.entries(countries).filter(([name]) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  filtered.sort(([name_first], [name_second]) => name_first.localeCompare(name_second));

  return (
    <div>
      <div className="controls" style={{ marginBottom: "16px" }}>
        <div className='nameSearch'>
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <label>
          Select year:{" "}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.map(([countryName, countryData]) => {
        const entryForYear = countryData.data.find((entry) => entry.year === selectedYear);

        return (
          <div className='countries' key={countryName} style={{ marginBottom: "24px" }}>
            <h2><p>countryName:</p> {countryName}</h2>
            <h2><p>iso_code:</p> {countryData.iso_code}</h2>
            {entryForYear ? (
              <table border={1} cellPadding={4} style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Population</th>
                    <th>co2</th>
                    <th>co2_per_capita</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{entryForYear.year}</td>
                    <td>{entryForYear.population !== undefined ? entryForYear.population.toLocaleString() : "N/A"}</td>
                    <td>{entryForYear.co2 !== undefined ? entryForYear.co2.toLocaleString() : "N/A"}</td>
                    <td>{entryForYear.co2_per_capita !== undefined ? entryForYear.co2_per_capita.toLocaleString() : "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No data available for {selectedYear}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CountriesLoad() {
  return (
    <Suspense fallback={<div className='loader'><img src={loaderIcon} alt="loader"></img></div>}>
      <Countries />
    </Suspense>
  );
}