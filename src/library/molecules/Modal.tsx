"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "library/atoms/Button";
import ModalList, { Item } from "library/atoms/ModalList";
import { CheckMarkSvg } from "library/icons/symbols";

type Props = {
  title?: string;
};

const data: Item[] = [
  {
    id: 1,
    title: "Pravidlo první",
    description: "Dbej na vysokou kvalitu snímku. Fotka by neměla být rozmazaná. Vyfoť se raději za denního světla.",
  },
  {
    id: 2,
    title: "Pravidlo druhé",
    description: "Dbej na vysokou kvalitu snímku. Fotka by neměla být rozmazaná. Vyfoť se raději za denního světla.",
  },
  {
    id: 3,
    title: "Pravidlo třetí",
    description: "Dbej na vysokou kvalitu snímku. Fotka by neměla být rozmazaná. Vyfoť se raději za denního světla.",
  },
];

const Modal = ({ title }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button buttonText="Otevřít modal" color="primary" onClick={openModal} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* Nechat inset a min-h-full ? */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-t-[40px] bg-white py-6 px-4 text-left align-middle shadow-2xl transition-all">
                  <div className="absolute right-0 top-0 pr-6 pt-6 text-gray-70">
                    <button type="button" onClick={closeModal}>
                      <XMarkIcon width={30} strokeWidth={3} />
                    </button>
                  </div>

                  <Dialog.Title as="h2" className="mt-16">
                    {title}
                  </Dialog.Title>

                  <ModalList data={data} icon={<CheckMarkSvg width={23} />} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
