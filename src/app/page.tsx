import { searchMunicipalities, searchRegions } from "services/geo-service";

export default async function Home() {

  const regions = await searchRegions();
  const result = await searchMunicipalities('Martinice', 'Zlínský');

  return (
    <main className="w-full p-5">
      <div className="text-2xl">This is a homepage {result[0].hezkyNazev} ({result[0].adresaUradu.kraj})</div>
      {regions?.map(r => <span> {r} </span>)}
    </main>
  );
}
