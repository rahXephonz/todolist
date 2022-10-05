import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import WarningIcon from "./icon/WarningIcon";
import InfoIcon from "./icon/InfoIcon";

type ModalProps = {
  isOpen: boolean;
  onAction: () => void;
  description: string;
  closeModal: () => void;
};

const Modal = ({ onAction, isOpen, description, closeModal }: ModalProps) => {
  return (
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

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className="flex min-h-full items-center justify-center p-4 text-center"
            data-cy="todo-modal-delete"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-md transform overflow-hidden rounded-2xl 
              bg-white p-6 text-center align-middle shadow-xl transition-all"
              >
                <div className="flex items-center justify-center">
                  <WarningIcon dataTesting="modal-delete-icon" />
                </div>
                <div className="mt-2">
                  <p
                    className="text-lg text-gray-500"
                    data-cy="modal-delete-title"
                  >
                    {description}
                  </p>
                </div>

                <div className="mt-8 space-x-4">
                  <button
                    data-cy="modal-delete-cancel-button"
                    type="button"
                    className="inline-flex justify-center rounded-full
                    bg-gray-200 px-8 py-3 text-lg font-medium text-black"
                    onClick={closeModal}
                  >
                    Batal
                  </button>
                  <button
                    data-cy="modal-delete-confirm-button"
                    type="button"
                    className="inline-flex justify-center rounded-full
                    bg-red-400 px-8 py-3 text-lg font-medium text-white"
                    onClick={onAction}
                  >
                    Hapus
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const ChildModal = ({
  closeModal,
  isOpen,
  description,
}: Partial<ModalProps>) => {
  const refDiv = useRef(null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeModal}
        initialFocus={refDiv}
      >
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

        <div className="fixed inset-0 overflow-y-auto" ref={refDiv}>
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-md transform overflow-hidden rounded-2xl 
              bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <div className="flex items-center space-x-2">
                  <InfoIcon dataTesting="modal-information-icon" />
                  <p className="text-base" data-cy="modal-information-title">
                    {description}
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
