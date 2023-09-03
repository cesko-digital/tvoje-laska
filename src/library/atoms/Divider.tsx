type Props = {
  label: string;
  type: "default" | "withText";
  borderColor?: string;
  textColor?: string;
  background?: string;
};

const Divider = ({
  label,
  type,
  borderColor = "border-violet-70",
  textColor = "text-violet-70",
  background = "bg-white",
}: Props) => {
  return (
    <div className="relative my-2">
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
