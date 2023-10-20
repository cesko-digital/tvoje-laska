'use client';
import { useState } from "react";
import CardContainer from "../../../../library/atoms/CardContainer";
import { getPageTitle, isInput } from "../../common/functions/functions";
import { LoveReportFieldWithGroup } from "../../common/types";
import { EditProfileSvg } from "library/icons/actions";
import LoveReportFieldInput from "app/lovereport/common/components/LoveReportFieldInput";
import { FormValues, saveToSession, validateStep } from "app/lovereport/common/functions/form";
import { UseFormReturn } from "react-hook-form";

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
    <div>
      <CardContainer variant="default" padding="smaller" className="flex gap-4 flex-col justify-center max-w-sm">
        <div className="flex items-center justify-between">
              <h5>{pageTitle}</h5>
          <div className="flex items-center gap-3">
            <span className="text-violet-70">
              <span onClick={() => {
                  setOpened(!isOpened);
                }}
              >{isOpened ? 'Zavřít' : 'Otevřít'}</span>
              
            </span>
          </div>
        </div>
        <div>
          {isOpened ? (
            <>
              {" "}
              {isEditing ? (
                <EditView
                  inputFields={inputFields}
                  groupIndex={props.groupIndex}
                  form={props.form}
                  onCancelEdit={() => {
                    setIsEditing(false);
                  }}
                  onSave={() => {
                    if(validateStep(props.form, props.groupIndex, props.groupIndex))
                    {
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
    </div>
  );
};

type EditViewProps = {
  onSave: () => void;
  onCancelEdit: () => void;
} & ReadViewProps;

const EditView = ({ inputFields, groupIndex, form, onSave, onCancelEdit }: EditViewProps) => {
  return (
    <div>
      {inputFields
        .map((e, index) => ({ field: e, originalIndex: index }))
        .filter(e => e.field.group === groupIndex)
        .map(e => (
          <div key={e.field.id} className="mb-2 mt-2">
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

      <span onClick={onCancelEdit}>Zrušit</span>
      <span onClick={onSave}>Uložit</span>
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
    <div>
      {props.inputFields
        .filter(e => e.group === props.groupIndex)
        .map(e => (
          <div>
            <b>{e.label}</b> 
            <br></br>
            <span>
              {(values.fields.filter(f => f.id === e.id)[0].value.toString())}
            </span>
          </div>
        ))}

      <span onClick={props.onStartEditing}>
        Upravit <EditProfileSvg width={20}></EditProfileSvg>
      </span>
    </div>
  );
};

export default LoveReportInputGroup;
