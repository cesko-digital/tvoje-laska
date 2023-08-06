import { searchMunicipalities, searchRegions } from "app/api/geography/geography";
import React from "react";

export default async function RegistrationPage() {
  const regions = await searchRegions('zLinsKy');
  const municipalities = await searchMunicipalities("márTiníce");

  return (
    <div>
      {regions?.map(r => <span key={r}> {r} </span>)}
      <br/>
      {municipalities?.map(r => <span key={r.eDeskyID}> {r.hezkyNazev}<br></br> </span>)}
    </div>
  );
}
