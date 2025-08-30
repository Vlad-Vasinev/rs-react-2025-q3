import { Suspense, useState } from 'react';
import { createResource } from './createResource';

import loaderIcon from '../../assets/loadingIcon.svg'

interface CountryEntry {
  year: number,
  population?: number,
  cement_co2?: number,
  cement_co2_per_capita?: number,
  cumulative_co2?: number,
  cumulative_cement_co2?: number,
  cumulative_coal_co2?: number,
  gas_co2?: number,
  oil_co2?: number,
  share_global_co2?: number,
  share_global_coal_co2?: number,
  share_global_cumulative_co2?: number,
  share_global_cumulative_coal_co2?: number,
  co2?: number,
  coal_co2? : number,
}
interface CountryData {
  data: CountryEntry[];
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
          <div key={countryName} style={{ marginBottom: "24px" }}>
            <h2>{countryName}</h2>
            {entryForYear ? (
              <table border={1} cellPadding={4} style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Population</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{entryForYear.year}</td>
                    <td>{entryForYear.population !== undefined ? entryForYear.population.toLocaleString() : "-"}</td>
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