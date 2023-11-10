"use client";
import { Field, IMemberResponse } from "app/api/member/member.type";
import { calculateAge, safeUrl } from "helpers/profileFieldHelpers";
import Content from "library/atoms/Content";
import UserCard from "library/molecules/cards/UserCard";
import { createContext, useContext, useState } from "react";
import { useTranslation } from "next-i18next";

type DatingSiteState = {
  gender: string | null;
  useMyPreferences: boolean;
  data: IMemberResponse[];
};

type Props = { state: DatingSiteState; setState: (state: DatingSiteState) => void };

const DatingSiteContext = createContext<Props>({} as Props);

const DatingSiteContainer = (props: { members: IMemberResponse[] }) => {
  const { t } = useTranslation("dating-site");

  const [state, setState] = useState<DatingSiteState>({
    gender: null,
    useMyPreferences: true,
    data: props.members,
  });

  return (
    <DatingSiteContext.Provider value={{ state, setState }}>
      <Content title={ t("content.title") }>
        <DatingSiteFilter></DatingSiteFilter>
        <h4>{ t("content.found-message")}</h4>
        <DatingSiteResult></DatingSiteResult>
      </Content>
    </DatingSiteContext.Provider>
  );
};

const getFieldValue = (fields: Field[], name: string) => {
    return fields.find(e => e.name === name)?.value.raw ?? '---';
}

const DatingSiteResult = () => {
  const { state, setState } = useContext<Props>(DatingSiteContext);

  return (
    <div>
      {state.data.map(e => {

        if(!e.xprofile) {
            return <></>;
        }

        const fields = Object.values(e.xprofile.groups).flatMap(v => Object.values(v.fields));
        const birthdate = getFieldValue(fields, 'Věk');
        return (<UserCard
            age={birthdate !== '' ? calculateAge(new Date(birthdate)) : 0}
            name={e.name}
            cardType="default"
            gender={getFieldValue(fields, 'Pohlaví')}
            location={`${getFieldValue(fields, 'Město')}, ${getFieldValue(fields, 'Kraj')}`}
            userIsActive={false}
            status={getFieldValue(fields, 'Status')}
            photo={safeUrl(e.avatar_urls?.full ?? '')}
          ></UserCard>);
      })}
    </div>
  );
};

const DatingSiteFilter = () => {
  return <div></div>;
};

export default DatingSiteContainer;
