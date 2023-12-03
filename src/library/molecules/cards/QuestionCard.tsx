import { Disclosure } from "@headlessui/react";
import { ArrowDownSvg, ArrowUpSvg } from "library/icons/arrows";

const QuestionCard = () => {
  return (
    <div className="w-full px-4 pt-16">
      <div className="mx-auto w-full max-w-md shadow rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-white px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-violet-50/75">
                <h5>Proč musím přidávat fotku?</h5>
                <span className="text-violet-70">{open ? <ArrowDownSvg width={20} /> : <ArrowUpSvg width={20} />}</span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-gray-60 w-fit max-w-sm">
                Pokud se chceš zapojit do Mingly, je dobré si přidat svou profilovou fotku, aby i ostatní věděli kdo jsi
                a ty sis tím zvýšil/a svou seznamovací šanci.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default QuestionCard;
