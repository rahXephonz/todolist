import { Fragment, useCallback, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useCreateTodos, useUpdateTodos } from "hooks/useMutation";
// import { useProvideAction } from "hooks/useProvide";
import lib from "libs/transforms";
import CloseIcon from "components/icon/CloseIcon";
import cx from "classnames";
import ListItem from "./ListItem";
import Spinner from "components/icon/Spinner";

type PopupProps = {
  isOpen: boolean;
  closeModal: () => void;
  refetch?: () => void;
  activityId?: string;
  todoId?: number;
  titleTodo?: string;
};

const Popup = ({
  isOpen,
  closeModal,
  activityId,
  todoId,
  refetch,
  titleTodo,
}: PopupProps) => {
  const { handleSubmit, register, watch, reset } = useForm<{
    title: string;
  }>({
    defaultValues: {},
  });

  // const {
  //   state: { typeAction: action, priority },
  // } = useProvideAction();

  const {
    mutate: createTodos,
    isLoading: createLoading,
    isSuccess: createSuccess,
  } = useCreateTodos();
  const {
    mutate: updateTodos,
    isLoading: updateLoading,
    isSuccess: updateSuccess,
  } = useUpdateTodos();

  const watchValue = watch("title");
  const isLoading = createLoading || updateLoading;
  const isSuccess = createSuccess || updateSuccess;
  const isDisabled = !watchValue?.length;

  // const onSubmit = useCallback(
  //   ({ title }) => {
  //     if (action === "create") {
  //       const data = {
  //         title,
  //         activityGroupId: activityId,
  //         priority: priority,
  //         isActive: true,
  //       };

  //       createTodos({ ...lib.transformObjectKeysToSnakeCase(data) });
  //     } else {
  //       updateTodos(
  //         { id: todoId, json: { priority, title } },
  //         {
  //           onSuccess: () => refetch(),
  //         },
  //       );
  //     }
  //   },
  //   [action, activityId, priority, createTodos, updateTodos, todoId, refetch],
  // );

  // useEffect(() => {
  //   if (action === "update") reset({ title: titleTodo });
  //   else reset(null);
  // }, [action, reset, titleTodo]);

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [closeModal, isSuccess]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeModal}
        data-cy="modal-add"
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

        {/* <div className="fixed inset-0 overflow-y-auto">
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
              bg-white p-7 align-middle shadow-xl transition-all w-5/12"
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold" data-cy="modal-add-title">
                    {action === "create" ? "Tambah" : "Ubah"} List Item
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    data-cy="modal-add-close-button"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="h-96">
                  <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="flex flex-col mb-5">
                      <label
                        className="uppercase text-xs mb-3 font-bold"
                        data-cy="modal-add-name-title"
                      >
                        nama list item
                      </label>
                      <div>
                        <input
                          data-cy="modal-add-name-input"
                          name="title"
                          {...register("title", {
                            required: "Required",
                          })}
                          placeholder="Tambahkan nama Activity"
                          className="rounded-md my-1 text-base appearance-none relative block
                        w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900
                        focus:outline-none focus:z-10 placeholder:text-base"
                        />
                      </div>
                    </fieldset>

                    <fieldset className="flex flex-col">
                      <label
                        className="uppercase text-xs mb-3 font-bold"
                        data-cy="modal-add-priority-title"
                      >
                        priority
                      </label>
                      <ListItem itemPriority={priority} action={action} />
                    </fieldset>

                    <div className="mt-4 absolute bottom-7 right-7">
                      <button
                        disabled={action === "create" && isDisabled}
                        type="submit"
                        data-cy="modal-add-save-button"
                        className={cx(
                          "rounded-full bg-blue px-8 py-3 text-lg font-medium text-white",
                          {
                            "opacity-60": isDisabled,
                          },
                        )}
                      >
                        {isLoading ? (
                          <Spinner />
                        ) : action === "create" ? (
                          "Simpan"
                        ) : (
                          "Ubah"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div> */}
      </Dialog>
    </Transition>
  );
};

export default Popup;
