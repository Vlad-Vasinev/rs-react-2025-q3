"use client"
import type { BerryDate } from "../../types/types";

export function convertToCSV(dataArray: BerryDate[] | null) {
  if (dataArray) {
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

    dataArray.forEach(item => {
      const row = [
        item.id,
        item.name || '',
        item.firmness?.name || '',
        item.growth_time,
        item.max_harvest,
        item.natural_gift_power,
        item.natural_gift_type?.name || '',
        item.size,
        item.smoothness,
        item.soil_dryness,
        item.item?.name || '',
        JSON.stringify(item.flavors) || ''
      ];

      const escapedRow = row.map(value => {
        return value;
      });

      csvRows.push(escapedRow.join(','));
    });

    return csvRows.join('\n');
  }
  return '';
}