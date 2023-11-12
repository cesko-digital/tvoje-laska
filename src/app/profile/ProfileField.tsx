"use client";
import React, { useState } from 'react';
import CardContainer from "library/atoms/CardContainer";
import Divider from "library/atoms/Divider";
import TextLink from "library/atoms/TextLink";
import { EditProfileSvg } from "library/icons/actions";
import { CheckMarkSvg } from "library/icons/symbols";

type ProfileFieldProps = {
  name: string;
  fieldId: number;
  fieldData: ProfileFieldResponse[];
};

const ProfileField: React.FC<ProfileFieldProps> = ({ name, fieldId, fieldData }) => {
  let field = fieldData.filter((field) => field.id === fieldId);

  if (!field || !field[0].data.value.raw) {
    field = [{ data: { value: { raw: 'Žádné údaje' } } }];
  }

  const [editable, setEditable] = useState(false);
  const [editedText, setEditedText] = useState('');

  const handleEditClick = () => {
    setEditable(true);
    setEditedText(field[0].data.value.raw);
  };

  const handleSaveClick = async () => {
    if (editable) {
      try {
        console.log('fieldId:', fieldId);
        console.log('value:', editedText);
  
        const response = await fetch('/api/profile-field/update-field', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fieldId: fieldId,
            value: editedText,
          }),
        });
  
        if (response.ok) {
          setEditable(false);
        } else {
          console.error('Failed to update profile field');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };

  return (
    <CardContainer variant="default" padding="smaller" className="flex gap-4 flex-col justify-center max-w-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* TODO: Upravit zarovnání na řádku (kvůli písma) */}
          <span className="text-violet-70">
            {/* TODO: Change icon */}
            <CheckMarkSvg width={20} />
          </span>
          <h5>{name}</h5>
        </div>
        {/* TODO: Upravit odkaz na editaci */}
        {editable ? (
          <button onClick={handleSaveClick}>Uložit</button>
        ) : (
          <TextLink
            as="button"
            title="Upravit"
            onClick={handleEditClick}
            color="primary"
            startIcon={<EditProfileSvg width={20} />}
          />
        )}
      </div>
      {/* TODO: Upravit zobrazení nicknamu podle toho, jak přijde ze serveru (bez/se zavináčem apod.) */}
      {/* TODO: Upravit paddingy a marginy, aby to vypadalo co nejlépe */}
      <Divider type="default" borderColor="border-violet-20" marginY="my-1" />
      <div className="text-gray-70 flex flex-col gap-1">
        {field.map((item) => (
          <p key={item.id}>
            {editable ? (
              <input
                type="text"
                value={editedText}  // Initialize the input with editedText
                onChange={handleInputChange}
              />
            ) : (
              item.data.value.raw
            )}
          </p>
        ))}
      </div>
    </CardContainer>
  );
};

export default ProfileField;

