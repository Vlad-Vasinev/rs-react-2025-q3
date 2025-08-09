export interface BerryFirmness {
  name: string, 
  url: string
}

export interface BerryFlavors {
  name: string, 
  url: string
}

export interface BerryNatural_Gift_Type {
  name: string, 
  url: string
}

export interface BerryItem {
  name: string, 
  url: string
}

export interface BerryDate {
  firmness: BerryFirmness,
  flavors: BerryFlavors[]
  growth_time: number,
  id: number,
  item: BerryItem,
  max_harvest: number,
  name: string,
  natural_gift_power: number,
  natural_gift_type: BerryNatural_Gift_Type
  size: number,
  smoothness: number,
  soil_dryness: number,
}

export interface Berry {
  name: string, 
  url: string,
}

export interface BerriesQuery {
  count: number, 
  next: string | null, 
  previous: string | null
  results: Berry[] | null, 
}

export interface ContentBlockState {
  errorMessage: boolean,
  masterDetail: boolean
}