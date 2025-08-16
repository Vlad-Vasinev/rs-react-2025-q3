import type { NextApiRequest, NextApiResponse } from "next";
import type { BerryDate } from "../../types/types";

function convertToCSV(dataArray: BerryDate[] | null) {
  if (!dataArray || dataArray.length === 0) return '';

  const headers = [
    'id',
    'name',
    'firmness_name',
    'growth_time',
    'max_harvest',
    'natural_gift_power',
    'natural_gift_type_name',
    'size',
    'smoothness',
    'soil_dryness',
    'item_name',
    'flavors'
  ];

  const csvRows = [];
  csvRows.push(headers.join(','));

  const escapeCSV = (value: any) => {
    if (value === null || value === undefined) return '';
    const str = String(value);
    if (str.search(/("|,|\n)/g) >= 0) {
      return `${str.replace(/"/g, '""')}`
    }
    return str;
  };

  dataArray.forEach(item => {
    let flavorsStr = '';
    if (item.flavors && Array.isArray(item.flavors)) {
      flavorsStr = item.flavors
        .map(flavor => `${flavor?.name || ''}`)
        .filter(s => s !== ':')
        .join('; ');
    }

    const row = [
      item.id,
      item.name || '',
      item.firmness?.name || '',
      item.growth_time ?? '',
      item.max_harvest ?? '',
      item.natural_gift_power ?? '',
      item.natural_gift_type?.name || '',
      item.size ?? '',
      item.smoothness ?? '',
      item.soil_dryness ?? '',
      item.item?.name || '',
      flavorsStr
    ];

    const escapedRow = row.map(escapeCSV);
    csvRows.push(escapedRow.join(','));
  });

  return csvRows.join('\n');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`${req.method}`)
  }

  const dataArray: BerryDate[] = req.body;

  const csv = convertToCSV(dataArray);

  res.setHeader('Content-Type', 'text/csv;charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
  res.status(200).send(csv);
}

// function convertToCSV(dataArray: BerryDate[] | null) {
//   if (!dataArray) return '';
//   const headers = ['id', 'name'];
//   const csvRows = [];
//   csvRows.push(headers.join(','));
//   dataArray.forEach(item => {
//     const row = [
//       item.id,
//       JSON.stringify(item.flavors) || ''
//     ];
//     csvRows.push(row.map(value => `${String(value).replace(/"/g, '""')}`).join(','))
//   });
//   return csvRows.join('\n');
// }
