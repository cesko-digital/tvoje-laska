import Button from "library/atoms/Button";
import Toggle from "library/atoms/Toggle";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Input from "library/atoms/Input";
import Tag from "library/atoms/Tag";
import Checkbox from "library/atoms/Checkbox";
import Modal from "library/molecules/Modal";

export default async function ComponentsPreview() {
  return (
    <div className="w-fit flex flex-col gap-8 justify-start m-5">
      <Toggle />
      <Button color="primary" buttonText="Tlačítko" startIcon={<ShoppingBagIcon width={20} />} />
      <Input id="title" type="tel" />
      <Tag title="Tag" />
      <Checkbox id="comments" title="Checkbox" />
      <Modal />
    </div>
  );
}
