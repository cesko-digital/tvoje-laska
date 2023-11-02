import React from "react";
import CardContainer from "library/atoms/CardContainer";

type Props = {
  fields: ArrayProps[];
  groupName: string;
};

type ArrayProps = {
  fieldName: string;
  value: any;
};

const ContentBox = ({ fields, groupName }: Props) => {
  return (
    // <main className="w-full pt-2">
    <CardContainer variant="default" className="flex flex-col items-start gap-4">
      <div>{groupName}</div>
      <br></br>
      {fields.map(field => {
        return (
          <ul key={field.fieldName}>
            <li>{field.value}</li>
          </ul>
        );
      })}
    </CardContainer>
    // </main>
  );
};

export default ContentBox;
