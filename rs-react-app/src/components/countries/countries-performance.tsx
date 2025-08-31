import React, { Suspense, useState, useMemo, useCallback, useEffect } from 'react';
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
  [key: string]: number | undefined
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
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [additionalColumns, setAdditionalColumns] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [animation, setAnimation] = useState(false)

  useEffect(() => {
    setAnimation(true)
    const timer = setTimeout(() => {
      setAnimation(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [searchTerm, selectedYear, additionalColumns])

  const availableColumns = [
    { key: "methane", label: "Methane" },
    { key: "oil_co2", label: "Oil CO2" },
    { key: "temperature_change_from_co2", label: "Temperature Change from CO2" },
  ];

  const years = useMemo(() => {
    const yearSet = new Set<number>();
    Object.values(countries).forEach((countryData) => {
      countryData.data.forEach((entry) => yearSet.add(entry.year));
    });
    return Array.from(yearSet).sort((first, next) => first - next);
  }, [countries])

  React.useEffect(() => {
    if (years.length > 0 && selectedYear === 0) {
      setSelectedYear(years[years.length - 1]);
    }
  }, [years, selectedYear])

  const filtered = useMemo(() => {
    return Object.entries(countries)
      .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort(([first], [next]) => first.localeCompare(next));
  }, [countries, searchTerm]);

  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },
    []
  );

  const onYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedYear(Number(e.target.value))
    },
    []
  );

  const toggleColumn = useCallback((key: string) => {
    setAdditionalColumns((prev) =>
      prev.includes(key) ? prev.filter((value) => value !== key) : [...prev, key]
    );
  }, [])

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <div>
      <div className="controls" style={{ marginBottom: "16px" }}>
        <div className="nameSearch">
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
        <label>
          Choose the year:{" "}
          <select value={selectedYear} onChange={onYearChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <button className="btn-primary" onClick={openModal}>
          Choose additional columns
        </button>
      </div>

      {modalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
            <h3>Select additional columns to display</h3>
            {availableColumns.map(({ key, label }) => (
              <div key={key} className="modal__row">
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
            <button className="close-modal" onClick={closeModal}>
              <img src={closeIcon} alt='close icon'></img>
            </button>
          </div>
        </div>
      )}

      {filtered.map(([countryName, countryData]) => {
        const entryForYear = countryData.data.find(
          (entry) => entry.year === selectedYear
        );
        return (
          <div
            className={`countries ${animation ? '_animation' : ''}`}
            key={countryName}style={{ marginBottom: "24px" }}
          >
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
                      const colLabel =
                        availableColumns.find((c) => c.key === colKey)?.label ||
                        colKey;
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
                    {additionalColumns.map((colKey) => (
                      <td key={colKey}>
                        {entryForYear[colKey] ?? "N/A"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No data for year {selectedYear}</p>
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