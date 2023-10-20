'use client'

import Content from "library/atoms/Content";
import { getPageTitle, isInput } from "../../common/functions/functions";
import { LoveReportFieldWithGroup } from "../../common/types";
import LoveReportInputGroup from "./LoveReportInputGroup";
import { createForm } from "app/lovereport/common/functions/form";
import useLoveReportSessionStorage from "app/lovereport/common/hooks/useLoveReportSessionStorage";

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
        {groups.map(e => (
          <LoveReportInputGroup groupIndex={e.group} fields={props.fields} form={form} />
        ))}
      </Content>
    </div>
  );
};

export default LoveReportSummary;
