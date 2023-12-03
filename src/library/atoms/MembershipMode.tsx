import classNames from "helpers/classNames";
import { CommunitySvg, HandSvg, HeartSolidSvg, ShieldSvg } from "library/icons/symbols";

type Props = {
  variant?: string;
  className?: string;
};

const variants = [
  {
    title: "jsem v komunitě",
    name: "community",
    classes: "bg-mustard-20 text-mustard-80",
    icon: (
      <span className="text-mustard-40">
        <CommunitySvg width={20} />
      </span>
    ),
  },
  {
    title: "seznamuji se",
    name: "meet",
    classes: "bg-magenta-20 text-magenta-80",
    icon: (
      <span className="text-magenta-50">
        <HeartSolidSvg width={20} />
      </span>
    ),
  },
  {
    title: "kouč/ka",
    name: "couch",
    classes: "bg-green-20 text-green-80",
    icon: (
      <span className="text-green-60">
        <HandSvg width={20} />
      </span>
    ),
  },
  {
    title: "administrátor/ka",
    name: "admin",
    classes: "bg-green-20 text-green-80",
    icon: (
      <span className="text-green-60">
        <ShieldSvg width={20} />
      </span>
    ),
  },
];

const MembershipMode = ({ variant = "community", className }: Props) => {
  return (
    <span
      className={classNames(
        "w-fit inline-flex items-center rounded-full py-1 px-4 cursor-pointer mt-1",
        variants.find(item => item.name === variant)?.classes,
        className!,
      )}
    >
      <div className="flex items-center gap-2">
        {variants.find(item => item.name === variant)?.icon}
        {variants.find(item => item.name === variant)?.title}
      </div>
    </span>
  );
};

export default MembershipMode;
