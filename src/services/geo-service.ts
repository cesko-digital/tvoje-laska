import axios from "axios";

const http = axios.create({
  baseURL: process.env.CESKO_DIGITAL_DATA_URL,
  headers: {
    "Content-type": "application/json",
  },
  validateStatus: status => status >= 200 && status < 500,
});

let cachedMunicipalitiesResult: Result | null = null;
let regions: string[] | null = null;

export const searchRegions = async (searchText?: string) => {
  await ensureDataSetInitialized();

  return regions?.filter(e => !searchText || e.indexOf(searchText) !== -1);
};

export const searchMunicipalities = async (searchText: string, regionName?: string): Promise<Municipality[]> => {
  await ensureDataSetInitialized();

  if (searchText.length < 2) {
    return [];
  }

  return (
    cachedMunicipalitiesResult?.municipalities
      .filter(e => e.nazev.indexOf(searchText) !== -1 && (!regionName || e.adresaUradu.kraj === regionName))
      .filter((e, i) => i < 15) ?? []
  );
};

const ensureDataSetInitialized = async () => {
  if (
    !cachedMunicipalitiesResult ||
    !cachedMunicipalitiesResult.municipalities ||
    cachedMunicipalitiesResult.municipalities.length === 0
  ) {
    cachedMunicipalitiesResult = (await http.get("/obce/1/obce.json")).data;

    if (cachedMunicipalitiesResult) {
      regions = cachedMunicipalitiesResult.municipalities.map(e => e.adresaUradu.kraj).filter(onlyUnique);
    }
  }
};

const onlyUnique = (value: string, index: number, array: string[]) => {
  return array.indexOf(value) === index;
};

export type Result = {
  municipalities: Municipality[];
};

export type Municipality = {
  hezkyNazev: string;
  eDeskyID: string;
  souradnice: number[];
  zkratka: string;
  ICO: string;
  nazev: string;
  datovaSchrankaID: string;
  pravniForma: PravniForma;
  mail: string[];
  adresaUradu: AdresaUradu;
};

export type AdresaUradu = {
  ulice: string;
  cisloDomovni: string;
  cisloOrientacni: null;
  obec: string;
  obecKod: string;
  PSC: string;
  castObce: string;
  kraj: string;
  adresniBod: string;
};

export type PravniForma = {
  type: number;
  label: string;
};
