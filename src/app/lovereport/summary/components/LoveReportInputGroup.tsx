"use client";
import { useState } from "react";
import CardContainer from "../../../../library/atoms/CardContainer";
import { getPageTitle, isInput } from "../../common/functions/functions";
import { LoveReportFieldWithGroup } from "../../common/types";
import { EditProfileSvg } from "library/icons/actions";
import LoveReportFieldInput from "app/lovereport/common/components/LoveReportFieldInput";
import { FormValues, saveToSession, validateStep } from "app/lovereport/common/functions/form";
import { UseFormReturn } from "react-hook-form";
import TextLink from "library/atoms/TextLink";
import { ArrowDownSvg, ArrowUpSvg } from "library/icons/arrows";
import Divider from "library/atoms/Divider";
import { format } from "date-fns";

type Props = {
  groupIndex: number;
  fields: LoveReportFieldWithGroup[];
  form: UseFormReturn<FormValues>;
};

const LoveReportInputGroup = (props: Props) => {
  const pageTitle = getPageTitle(props.fields, props.groupIndex);
  const inputFields = props.fields.filter(e => isInput(e.type));
  const [isOpened, setOpened] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <CardContainer variant="default" padding="smaller" className="flex flex-col justify-center max-w-sm">
        <div className="flex items-center justify-between">
          <h5 className="font-medium">{pageTitle}</h5>
          <TextLink
            as="button"
            title={isOpened ? "Skrýt" : "Zobrazit"}
            color="primary"
            onClick={() => {
              setOpened(!isOpened);
            }}
            endIcon={isOpened ? <ArrowUpSvg width={16} /> : <ArrowDownSvg width={16} />}
          />
        </div>
        {isOpened && <Divider type="default" borderColor="text-violet-20" />}
        <div className="text-gray-70">
          {isOpened ? (
            <>
              {isEditing ? (
                <EditView
                  inputFields={inputFields}
                  groupIndex={props.groupIndex}
                  form={props.form}
                  onCancelEdit={() => {
                    setIsEditing(false);
                  }}
                  onSave={() => {
                    if (validateStep(props.form, props.groupIndex, props.groupIndex)) {
                      saveToSession(props.form.getValues());
                      setIsEditing(false);
                    }
                  }}
                />
              ) : (
                <ReadView
                  inputFields={inputFields}
                  form={props.form}
                  onStartEditing={() => {
                    setIsEditing(true);
                  }}
                  groupIndex={props.groupIndex}
                />
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </CardContainer>
    </>
  );
};

type EditViewProps = {
  onSave: () => void;
  onCancelEdit: () => void;
} & ReadViewProps;

//TODO: Upravit EditView, až bude design ve Figmě
const EditView = ({ inputFields, groupIndex, form, onSave, onCancelEdit }: EditViewProps) => {
  return (
    <div>
      {inputFields
        .map((e, index) => ({ field: e, originalIndex: index }))
        .filter(e => e.field.group === groupIndex)
        .map(e => (
          <div key={e.field.id} className="mb-2 mt-2 flex flex-col gap-4">
            <LoveReportFieldInput
              control={form.control}
              field={e.field}
              index={e.originalIndex}
              error={form.formState.errors.fields?.[e.originalIndex]?.value}
              register={form.register(`fields.${e.originalIndex}.value`)}
            />
            <span>{e.field.placeholder}</span>
          </div>
        ))}
      <div className="flex gap-8 mt-4">
        <span onClick={onCancelEdit}>Zrušit</span>
        <span onClick={onSave}>Uložit</span>
      </div>
    </div>
  );
};

type ReadViewProps = {
  inputFields: LoveReportFieldWithGroup[];
  form: UseFormReturn<FormValues>;
  groupIndex: number;
};

const ReadView = (props: ReadViewProps & { onStartEditing: () => void }) => {
  const values = props.form.getValues();

  return (
    <div className="flex flex-col gap-4">
      {/* {props.inputFields
        .filter(e => e.group === props.groupIndex)
        .map(e => {
          const date = values.fields.filter(f => f.type === "date-time");
          const formattedDate = format(date[0].value, "dd.MM.yyyy");
          console.log(formattedDate);
          return (
            <div className="flex flex-col gap-0.5" key={e.id}>
              <p className="text-base">{e.label}</p>
              <p className="text-sm">{values.fields.filter(f => f.id === e.id)[0].value.toString()}</p>
            </div>
          );
        })} */}
      {props.inputFields
        .filter(e => e.group === props.groupIndex)
        .map(e => {
          const field = values.fields.find(f => f.id === e.id);

          if (field) {
            return (
              <div className="flex flex-col gap-0.5" key={e.id}>
                <p className="text-base">{e.label}</p>
                <p className="text-sm">
                  {field.type === "date-time" && field.value instanceof Date
                    ? format(field.value, "dd.MM.yyyy")
                    : field.value.toString()}
                </p>
              </div>
            );
          }

          return null;
        })}

      <TextLink
        as="button"
        title="Upravit"
        color="primary"
        onClick={props.onStartEditing}
        startIcon={<EditProfileSvg width={18} />}
        className="self-end"
      />
    </div>
  );
};

export default LoveReportInputGroup;
