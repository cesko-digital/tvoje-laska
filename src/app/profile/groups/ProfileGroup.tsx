"use client";
import React, { useState } from 'react';
import CardContainer from "library/atoms/CardContainer";
import Divider from "library/atoms/Divider";
import TextLink from "library/atoms/TextLink";
import { EditProfileSvg } from "library/icons/actions";
import { CheckMarkSvg } from "library/icons/symbols";
import { ProfileFieldResponse } from 'app/api/profile-field/profileField.type';
import ProfileGroupFieldInput from './ProfileGroupFieldInput';

type ProfileGroupProps = {
  name: string;
  groupId: number;
  fieldData: ProfileFieldResponse[];
};

const ProfileGroup: React.FC<ProfileGroupProps> = ({ name, groupId, fieldData }) => {
  let groupFields = fieldData.filter((field) => field.group_id === groupId);

  const [editable, setEditable] = useState(false);
  const [editedText, setEditedText] = useState('');

  const handleEditClick = () => {
    setEditable(true);
    setEditedText(name);
  };

  const handleSaveClick = () => {
    // TODO: logic to send the updated value to the server like in groups/ProfileField.

    setEditable(false);

    if (!groupFields || (!editable && !groupFields[0]?.data.value.raw)) {
      groupFields = [{ data: { value: { raw: 'Žádné údaje' } } }];
    }
  };

  return (
    <CardContainer variant="default" padding="smaller" className="flex gap-4 flex-col justify-center max-w-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-violet-70">
            <CheckMarkSvg width={20} />
          </span>
          <h5>{name}</h5>
        </div>
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
      <Divider type="default" borderColor="border-violet-20" marginY="my-1" />
      <div className="text-gray-70 flex flex-col gap-1">
        {groupFields.map((item) => (
          <p key={item.id}>
            {editable ? (
              <ProfileGroupFieldInput
                field={item}
                onChange={(fieldId, value) => {
                }}
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
