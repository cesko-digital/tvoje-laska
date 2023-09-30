import Tabs from "library/atoms/Tabs";
import UserCard from "library/molecules/cards/UserCard";
import CardContainer from "library/atoms/CardContainer";
import Button from "library/atoms/Button";

import { Metadata } from "next";
import { getMembers } from "app/api/member/member";

export const metadata: Metadata = {
  title: 'Přátelé a oblíbení',
};

const ProfileFriends = async () => {
  const members = await getMembers({}, {});

  if (!members) return <div>Nebylo možné načíst data</div>;

  const request = <div>
    {members.map((member) => {
      // @ts-ignore
      const basic: ObjectConstructor = Object.values(member.xprofile.groups)[0].fields;

      return <UserCard
        cardType="friendWaiting"
        name={member.name}
        gender={Object.values(basic)[3].value.raw}
        age={Object.values(basic)[1].value.rendered.slice(3, 5)}
        location={Object.values(basic)[4].value.raw}
        photo={member.avatar_urls?.full.slice(0, 5) === 'https' ? member.avatar_urls?.full : 'https:' + member.avatar_urls?.full}
        userIsActive={false}
        key={member.id} />
    })}
  </div>;

  const favourite = <div>
    <UserCard
      cardType="friend"
      name="Franta Nezval"
      gender="muž"
      age={24}
      location="Praha"
      photo="/assets/images/user-photo.png"
      userIsActive={false} />
  </div>;

  return (
    <>
      <div className='flex justify-center items-center flex-col gap-4'>
        <Tabs
          request={request}
          favourite={favourite} />
      </div>
      <div className="flex justify-center py-4">
        <CardContainer variant='default' padding="smaller" className="w-[358px] h-[204px] bg-mustard-10 bg-[url('/assets/images/ellipse.svg')] bg-right-top bg-no-repeat">
          <div className="flex justify-center flex-col gap-4">
            <h4 className="text-2xl font-medium">Najdi si nové přátele</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Button as="link" path="/" color="secondary" buttonText="Přejít na vyhledávání" />
          </div>
        </CardContainer>
      </div>
    </>
  );
}

export default ProfileFriends;
