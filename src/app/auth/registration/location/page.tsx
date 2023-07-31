import React from "react";
import { searchMunicipalities, searchRegions } from "services/geo-service";

export default async function RegistrationPage() {
  const regions = await searchRegions();
  const municipalities = await searchMunicipalities("Martinice");

  return (
    <div>
      {regions?.map(r => <span> {r} </span>)}
      <br/>
      {municipalities?.map(r => <span> {r.hezkyNazev}<br></br> </span>)}
    </div>
  );
}
