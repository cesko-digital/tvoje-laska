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
  searchValue: string;
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
