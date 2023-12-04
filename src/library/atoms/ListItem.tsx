import { HuggingEmojiSvg } from "library/icons/symbols";
import { ReactNode } from "react";

type Props = {
  item: {
    title?: string;
    content: string | ReactNode;
    emoji?: JSX.Element;
  };
};

const ListItem = ({ item }: Props) => {
  return (
    <div className="flex gap-3">
      <div className="bg-violet-10 text-violet-70 w-[52px] h-[52px] aspect-square rounded-md flex justify-center items-center">
        {item.emoji ? item.emoji : <HuggingEmojiSvg width={30} height={30} />}
      </div>
      <div className="flex flex-col">
        {item.title && <h6 className="font-medium">{item.title}</h6>}
        <p className="text-gray-70">{item.content}</p>
      </div>
    </div>
  );
};

export default ListItem;
