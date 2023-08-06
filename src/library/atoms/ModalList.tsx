export type Item = {
  id: number;
  title: string;
  description: string;
};

type Props = {
  icon?: React.ReactNode;
  data: Item[];
};

// TODO: Upravit
const List = ({ icon, data }: Props) => {
  return (
    <ul className="flex flex-col gap-6 mt-3 py-4">
      {data &&
        data.map(item => {
          return (
            <li key={item.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                {icon && <span className="text-green-50">{icon}</span>}
                <h4 className="text-green-80">{item.title}</h4>
              </div>
              <p className="text-gray-100">{item.description}</p>
            </li>
          );
        })}
    </ul>
  );
};
export default List;
