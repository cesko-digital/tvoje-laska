import classNames from "helpers/classNames";

type Props = {
  label: string;
  type: "default" | "withText";
  borderColor?: string;
  textColor?: string;
  background?: string;
  className?: string;
};

const Divider = ({
  label,
  type,
  borderColor = "border-violet-70",
  textColor = "text-violet-70",
  background = "bg-white",
  className,
}: Props) => {
  return (
    <div className={classNames("relative my-2", className!)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className={`w-full border-t ${borderColor}`} />
      </div>
      {type === "withText" && (
        <div className="relative flex justify-center">
          <span className={`${background} px-6 text-sm ${textColor}`}>{label}</span>
        </div>
      )}
    </div>
  );
};
export default Divider;
