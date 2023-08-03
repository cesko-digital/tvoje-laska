function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  title: string;
  color?: string;
};

const Tag = ({ title, color = "default" }: Props) => {
  return (
    <span
      className={classNames(
        "w-fit inline-flex items-center rounded-full px-4 py-2 cursor-pointer",
        color === "default" ? "bg-gray-10 text-gray-100 hover:bg-green-20 active:bg-green-10 active:text-green-70" : "",
      )}
    >
      {title}
    </span>
  );
};
export default Tag;
