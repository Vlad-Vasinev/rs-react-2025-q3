import { Suspense } from 'react';
import { createResource } from './createResource';

type Countries = Record<string, any>;

const countriesResource = createResource(
  fetch("../../../public/bigData/data.json").then((res) => res.json())
);

function Countries() {
  const countries = countriesResource.read();
  //console.log(countries)
  return (
    <div>
      {Object.entries(countries).map(([countryName]) => (
        <div key={countryName}>{countryName}</div>
      ))}
    </div>
  );
}

export default function CountriesLoad() {
  return (
    <Suspense fallback={<div>Loading countries...</div>}>
      <Countries />
    </Suspense>
  );
}