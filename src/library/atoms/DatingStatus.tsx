import { Heart } from "library/icons/Heart";

type Props = {
  status: string | undefined;
};

const DatingStatus = ({ status }: Props) => {
  const renderOpenStatus = () => (
    <div className="flex flex-row items-center gap-x-2">
      <Heart /> seznamuji se
    </div>
  );

  const getComponentByStatus = (status: string | undefined) => {
    switch (status) {
      default:
        return renderOpenStatus();
    }
  };

  return <div>{getComponentByStatus(status)}</div>;
};

export default DatingStatus;
