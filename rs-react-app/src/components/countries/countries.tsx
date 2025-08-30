import { Suspense, useState } from 'react';
import { createResource } from './createResource';

import loaderIcon from '../../assets/loadingIcon.svg'
import closeIcon from '../../assets/close-icon.svg'

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

  const [additionalColumns, setAdditionalColumns] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const availableColumns = [
    { key: "methane", label: "Methane" },
    { key: "oil_co2", label: "Oil CO2" },
    { key: "temperature_change_from_co2", label: "Temperature Change from CO2" },
  ];

  function toggleColumn(key: string) {
    setAdditionalColumns((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  }

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
          Choose the year:{" "}
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

        <button className='btn-primary' onClick={() => setModalOpen(true)}>
          Choose additional columns
        </button>
      </div>

      {modalOpen && (
        <div className='modal' onClick={() => setModalOpen(false)}>
          <div
            className='modal__wrapper' onClick={(e) => e.stopPropagation()} >
            <h3>Select additional columns to display</h3>
            {availableColumns.map(({ key, label }) => (
              <div key={key} className='modal__row'>
                <label>
                  <input
                    type="checkbox"
                    checked={additionalColumns.includes(key)}
                    onChange={() => toggleColumn(key)}
                  />{" "}
                  {label}
                </label>
              </div>
            ))}
            <button className='close-modal' onClick={() => setModalOpen(false)}>
              <img src={closeIcon} alt="close icon"/>
            </button>
          </div>
        </div>
      )}
      {filtered.map(([countryName, countryData]) => {
        const entryForYear = countryData.data.find((entry) => entry.year === selectedYear);
        return (
          <div className="countries" key={countryName} style={{ marginBottom: "24px" }}>
            <h2>{countryName}</h2>
            <h3>ISO Code: {countryData.iso_code}</h3>

            {entryForYear ? (
              <table border={1} cellPadding={4} style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Population</th>
                    <th>CO2</th>
                    <th>CO2 per capita</th>
                    {additionalColumns.map((colKey) => {
                      const colLabel = availableColumns.find(c => c.key === colKey)?.label || colKey;
                      return <th key={colKey}>{colLabel}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{entryForYear.year}</td>
                    <td>{entryForYear.population !== undefined ? entryForYear.population.toLocaleString() : "N/A"}</td>
                    <td>{entryForYear.co2 !== undefined ? entryForYear.co2.toLocaleString() : "N/A"}</td>
                    <td>{entryForYear.co2_per_capita !== undefined ? entryForYear.co2_per_capita.toLocaleString() : "N/A"}</td>
                    {additionalColumns.map((colKey) => {
                      const value = (entryForYear as any)[colKey];
                      return (
                        <td key={colKey}>
                          {value !== undefined && value !== null ? value.toLocaleString ? value.toLocaleString() : value : "N/A"}
                        </td>
                      );
                    })}
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