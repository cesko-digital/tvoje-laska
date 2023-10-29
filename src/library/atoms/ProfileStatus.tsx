import { HeartSvg } from "library/icons/symbols";

const ProfileStatus = (props: {status: string}) => {
    return (<div className="flex gap-2 items-center">
    {props.status  === "seznamuji se" && (
      <span className="text-magenta-40">
        <HeartSvg width={20} />
      </span>
    )}
    <p>{props.status}</p>
  </div>);
}

export default ProfileStatus;