"use client";
import Content from "library/atoms/Content";
import { getInputFields, getPageTitle } from "../../common/functions/functions";
import { LoveReportFieldWithGroup } from "../../common/types";
import LoveReportInputGroup from "./LoveReportInputGroup";
import { createForm } from "app/lovereport/common/functions/form";
import useLoveReportSessionStorage from "app/lovereport/common/hooks/useLoveReportSessionStorage";
import Button from "library/atoms/Button";
import { SaveLoveReportData, SaveLoveReportRequest, ValueField } from "app/api/lovereport/lovereport.type";
import { ApiResponse } from "app/api/common/ApiResponse";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  fields: LoveReportFieldWithGroup[];
  formId: string;
  userId: number;
};

const LoveReportSummary = (props: Props) => {
  const router = useRouter();
  const inputFields = getInputFields(props.fields);
  const [isProcessing, setIsProcessing] = useState(false);

  const groups = inputFields
    .map(f => f.group)
    .filter((f, index, values) => values.indexOf(f) === index)
    .map(group => ({
      group: group,
      name: getPageTitle(props.fields, group),
      fields: props.fields.filter(field => field.group === group),
    }));

  const form = createForm(inputFields);
  useLoveReportSessionStorage(form);

  const onSubmit = async () => {
    setIsProcessing(true);

    const formValues = form.getValues();
    const now = new Date().toJSON().slice(0, 10);
    const formId = parseInt(props.formId);
    const fields = formValues.fields.map(f => ({
      value: (f.value instanceof Date) ? f.value.toJSON().slice(0, 10) :  f.value.toString(),
      form_id: formId,
      field_id: parseInt(f.id),
      date: (f.value instanceof Date) ? f.value.toJSON().slice(0, 10) : undefined,
    } as ValueField));

    const request: SaveLoveReportRequest = {
      form_id: formId,
      fields: fields,
      date: now,
      date_modified: now,
      fields_json: createFieldsJson(fields, props.fields),
      ip_address: "",
      meta: "",
      post_id: formId,
      user_id: props.userId,
      user_uuid: props.userId.toString(),
      user_agent: "",
      starred: 0,
      viewed: 0,
    };

    const response = await fetch("/api/lovereport", {
      method: "POST",
      body: JSON.stringify(request),
    });
    
    const result = (await response.json()) as ApiResponse<SaveLoveReportData>;
    
    if (result.isSuccessful) {
      router.push("/lovereport/vysledek");
    } else {
      setIsProcessing(false);
      console.log(result);
    }
  };

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

        <Button
          buttonText={isProcessing ? "Zpracovávám..." : "Potvrdit a odeslat"}
          disabled={isProcessing}
          onClick={onSubmit}
          color="primary"
          className="mt-7 w-full"
        />
      </Content>
    </div>
  );
};

const createFieldsJson = (valueFields: ValueField[], propsFields: LoveReportFieldWithGroup[]) => {
  
  let resultObject = {} as any;

  valueFields.forEach(field => {
    const propsField = propsFields.find(f => f.id === field.field_id.toString());
    const object = {
        ...field,
        id: field.field_id,
        type: propsField?.type,
        value_raw: field.value,
        name: propsField?.label ?? propsField?.placeholder
      }
      resultObject[field.field_id.toString()] = object;
  });

  return JSON.stringify(resultObject);
}

export default LoveReportSummary;
