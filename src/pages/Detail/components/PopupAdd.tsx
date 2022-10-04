import { Fragment, useCallback, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Priority } from "types/data";
import { useCreateTodos } from "hooks/useMutation";
import { transformObjectKeysToSnakeCase } from "libs/transforms";
import CloseIcon from "components/icon/CloseIcon";
import cx from "classnames";
import ListItem from "./ListItem";
import Spinner from "components/icon/Spinner";

type PopupAddProps = {
  isOpen: boolean;
  closeModal: () => void;
  id: string;
};

const PopupAdd = ({ isOpen, closeModal, id }: PopupAddProps) => {
  const [itemPriority, setItemPriority] = useState<Priority>("normal");
  const { handleSubmit, register, watch } = useForm<{ title: string }>({
    defaultValues: {},
  });
  const isDisabled = watch("title")?.length;
  const { mutate, isLoading } = useCreateTodos();

  const onSubmit = useCallback(
    ({ title }) => {
      const data = {
        title,
        activityGroupId: id,
        priority: itemPriority,
      };

      mutate({ ...transformObjectKeysToSnakeCase(data) });

      closeModal();
    },
    [closeModal, id, itemPriority, mutate],
  );

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
          <div className="flex min-h-full items-center justify-center">
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
                className="transform overflow-hidden rounded-2xl
              bg-white p-7 align-middle shadow-xl transition-all w-3/5"
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">Tambah List Item</p>
                  <button type="button" onClick={closeModal}>
                    <CloseIcon />
                  </button>
                </div>

                <div className="h-96">
                  <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="flex flex-col mb-5">
                      <label className="uppercase text-xs mb-3 font-bold">
                        nama list item
                      </label>
                      <input
                        name="title"
                        {...register("title", {
                          required: "Required",
                        })}
                        placeholder="Tambahkan nama Activity"
                        className="rounded-md my-1 text-sm appearance-none relative block 
                        w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 
                        focus:outline-none focus:z-10 placeholder:text-base"
                      />
                    </fieldset>

                    <fieldset className="flex flex-col">
                      <label className="uppercase text-xs mb-3 font-bold">
                        priority
                      </label>
                      <ListItem
                        setItemPriority={setItemPriority}
                        itemPriority={itemPriority}
                      />
                    </fieldset>

                    <div className="mt-4 absolute bottom-7 right-7">
                      <button
                        disabled={!isDisabled}
                        type="submit"
                        className={cx(
                          "rounded-full bg-blue px-8 py-3 text-lg font-medium text-white",
                          {
                            "opacity-60": !isDisabled,
                          },
                        )}
                      >
                        {isLoading ? <Spinner /> : "Simpan"}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PopupAdd;
