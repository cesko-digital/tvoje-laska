import axios from "axios";
import { Result as MunicipalitiesResult, Municipality } from "./geography.type";
import normalizeForSearch from "utils/normalizeForSearch";

const http = axios.create({
  baseURL: process.env.CESKO_DIGITAL_DATA_URL,
  headers: {
    "Content-type": "application/json",
  },
  validateStatus: status => status >= 200 && status < 500,
});

let cachedMunicipalitiesResult: MunicipalitiesResult | null = null;

const regions = [
  "Hlavní město Praha",
  "Jihomoravský",
  "Jihočeský",
  "Karlovarský",
  "Královéhradecký",
  "Liberecký",
  "Moravskoslezský",
  "Olomoucký",
  "Pardubický",
  "Plzeňský",
  "Středočeský",
  "Ústecký",
  "Vysočina",
  "Zlínský",
].map(e => {
  return {
    displayName: e,
    searchValue: normalizeForSearch(e) ?? e,
  };
});

export const searchRegions = async (searchText?: string) => {
  searchText = normalizeForSearch(searchText);
  return regions
    .filter(e => !searchText || searchText.length === 0 || e.searchValue.indexOf(searchText) !== -1)
    .map(e => e.displayName);
};

export const searchMunicipalities = async (searchText: string, regionName?: string): Promise<Municipality[]> => {
  await ensureDataSetInitialized();

  if (searchText.length < 2) {
    return [];
  }
  searchText = normalizeForSearch(searchText) ?? searchText;
  return (
    cachedMunicipalitiesResult?.municipalities
      .filter(e => e.searchValue.indexOf(searchText) !== -1 && (!regionName || e.adresaUradu.kraj === regionName))
      .filter((e, i) => i < 15) ?? []
  );
};

const ensureDataSetInitialized = async () => {
  if (
    !cachedMunicipalitiesResult ||
    !cachedMunicipalitiesResult.municipalities ||
    cachedMunicipalitiesResult.municipalities.length === 0
  ) {
    const data = (await http.get("/obce/1/obce.json")).data as MunicipalitiesResult;
    
    data.municipalities = data.municipalities.map(e => {
      return {
        ...e,
        searchValue: normalizeForSearch(e.nazev) ?? e.nazev
      }
    })

    cachedMunicipalitiesResult = data;
  }
};