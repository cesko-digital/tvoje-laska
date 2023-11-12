"use client";
import React, { useState} from 'react';
import CardContainer from "library/atoms/CardContainer";
import Divider from "library/atoms/Divider";
import TextLink from "library/atoms/TextLink";
import { EditProfileSvg } from "library/icons/actions";
import { CheckMarkSvg } from "library/icons/symbols";

type ProfileGroupProps = {
  name: string;
  groupId: number;
  fieldData: ProfileFieldResponse[];
};

const ProfileGroup: React.FC<ProfileGroupProps> = ({ name, groupId, fieldData }) => {
  let groupFields = fieldData.filter((field) => field.group_id === groupId);

  if (!groupFields || !groupFields[0].data.value.raw) {
    groupFields = [{ data: { value: { raw: 'Žádné údaje' } } }];
  }

  const [editable, setEditable] = useState(false);
  const [editedText, setEditedText] = useState('');

  const handleEditClick = () => {
    setEditable(true);
    setEditedText(name);
  };

  const handleSaveClick = () => {
    // Implement your logic to save the edited text, e.g., send it to the server.
    // After saving, you can set the editable state back to false.
    // This is just a placeholder, you should replace it with your own logic.
    console.log('Save text:', editedText);

    setEditable(false);
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
        {Object.values(groupFields).map((item) => (
          <p key={item.id}>
            {editable ? (
              <input
                type="text"
                value={item.data.value.raw}
                // Add logic to handle user input and save changes
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

export default ProfileGroup;

