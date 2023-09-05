import classNames from "helpers/classNames";

type Props = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

const Content = ({ title, children, className }: Props) => {
  return (
    <main className={classNames("py-8 px-4", className!)}>
      <h1 className="leading-[120%] mb-4">{title}</h1>
      {children}
    </main>
  );
};
export default Content;
