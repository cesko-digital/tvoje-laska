"use client";

import Content from "library/atoms/Content";
import { getPageTitle, isInput } from "../../common/functions/functions";
import { LoveReportFieldWithGroup } from "../../common/types";
import LoveReportInputGroup from "./LoveReportInputGroup";
import { createForm } from "app/lovereport/common/functions/form";
import useLoveReportSessionStorage from "app/lovereport/common/hooks/useLoveReportSessionStorage";
import Input from "library/atoms/Input";
import Button from "library/atoms/Button";

type Props = {
  fields: LoveReportFieldWithGroup[];
};

const LoveReportSummary = (props: Props) => {
  const groups = props.fields
    .map(f => f.group)
    .filter((f, index, values) => values.indexOf(f) === index)
    .map(group => ({
      group: group,
      name: getPageTitle(props.fields, group),
      fields: props.fields.filter(field => field.group === group),
    }));

  const inputFields = props.fields.filter(e => isInput(e.type));

  const form = createForm(inputFields);
  useLoveReportSessionStorage(form);

  return (
    <div>
      <Content title="Shrnutí">
        <p className="mb-8">
          Výborně, zvládl/a jsi vyplnit všechny potřebné informace. Své odpovědi si můžeš před odesláním ještě v klidu
          zkontrolovat.
        </p>
        {groups.map(e => (
          <LoveReportInputGroup key={e.group} groupIndex={e.group} fields={props.fields} form={form} />
        ))}
        <div className="mt-8">
          <h3>Kam ti máme LoveReport poslat?</h3>
          {/* TODO: Doplnit register hodnotu k e-mailu */}
          {/* <Input type="email" label="E-mail" register={} /> */}
        </div>
        {/* TODO: Doplnit funkctionalitu tlačítka pro odeslání formuláře */}
        <Button buttonText="Potvrdit a odeslat" color="primary" className="mt-7 w-full" />
      </Content>
    </div>
  );
};

export default LoveReportSummary;
