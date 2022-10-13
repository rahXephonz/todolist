import Popup from "./components/Popup";
import Helmet from "components/Helmet";
import BackIcon from "components/icon/BackIcon";
import EditIcon from "components/icon/EditIcon";

import Spinner from "components/icon/Spinner";
import TablePlus from "components/icon/TablePlus";
import ListTodos from "./components/ListTodos";
import Dropdown from "./components/DropDown";
import lib from "libs/transforms";

import { useRouter } from "hooks/useRouter";
import { useEffect, useRef, useState } from "react";
import { useFetchAllTodos } from "hooks/useFetch";
import { TodoEmptyState } from "components/icon/EmptyState";
import { useForm } from "react-hook-form";

import useDisclosure from "hooks/useDisclosure";
import useOnClickOutside from "use-onclickoutside";
import { useFetchDetailActivities } from "hooks/useFetch";
import { useUpdateActivities } from "hooks/useMutation";
import { useAppDispatch, useAppSelector } from "state/store";
import { updateTodosItem } from "state/slices/todoSlices";
import { updateTypeAction } from "state/slices/actionSlices";

export const Detail = () => {
  const dispatch = useAppDispatch();
  const [modeEdit, setModeEdit] = useState(false);

  const {
    query: { id },
    push,
  } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { todosItem } = useAppSelector((state) => state.todos);

  const ref = useRef();
  const idQuery = parseInt(id as string);

  const {
    data: listTodos,
    isLoading: listLoading,
    isError: listError,
    refetch,
  } = useFetchAllTodos(idQuery);

  const {
    data: detailActivity,
    isLoading: detailLoading,
    isError: detailError,
  } = useFetchDetailActivities(idQuery);

  const isError = detailError || listError;
  const isLoading = detailLoading;

  const { mutate: updateActivity } = useUpdateActivities();
  const { register, watch, reset } = useForm<{ title: string }>({
    defaultValues: {},
  });

  const watchValue = watch("title");
  const { title, id: activityId } = detailActivity || {};

  useEffect(() => {
    if (!id) push("/");
  }, [id, push]);

  useEffect(() => {
    if (title) reset({ title });
  }, [reset, title]);

  useEffect(() => {
    if (listTodos) {
      const data = lib.transformObjectKeysToCamelCase(listTodos.data);
      dispatch(updateTodosItem(data));
    }
  }, [dispatch, listTodos]);

  const onClickOutside = () => {
    setModeEdit(false);

    if (watchValue === title) return;
    else updateActivity({ id: activityId, json: { title: watchValue } });
  };

  useOnClickOutside(ref, onClickOutside);

  const onAddTodos = () => {
    dispatch(updateTypeAction("create"));
    onOpen();
  };

  const onHandleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setModeEdit(false);

      if (watchValue === title) return;
      else updateActivity({ id: activityId, json: { title: watchValue } });
    }
  };

  return (
    <>
      <Helmet
        description="Todo detail dashboard"
        title="To Do Detail - Dashboard"
      />
      <div className="header flex justify-between items-center my-10">
        <div
          className="header-container flex space-x-6 items-center"
          onClick={() => setModeEdit(true)}
          ref={ref}
        >
          <button
            type="button"
            onClick={() => push("/")}
            data-cy="todo-back-button"
          >
            <BackIcon />
          </button>

          {modeEdit ? (
            <input
              autoFocus
              {...register("title")}
              placeholder=""
              type="text"
              onKeyDown={onHandleKeyPress}
              className="py-1 md:py-2 text-xl font-bold md:text-3xl bg-transparent border-b 
              outline-none text-neutral-700 border-neutral-700"
            />
          ) : (
            <h1 className="text-4xl font-bold" data-cy="todo-title">
              {title}
            </h1>
          )}

          <button type="button" data-cy="todo-title-edit-button">
            <EditIcon />
          </button>
        </div>

        <div className="action-menu flex space-x-4 items-center">
          <Dropdown />

          <button
            type="button"
            className="bg-blue py-3 px-6 font-bold text-white 
            flex items-center space-x-2 rounded-full"
            onClick={onAddTodos}
            data-cy="todo-add-button"
          >
            <TablePlus />
            <p className="text-lg">Tambah</p>
          </button>
        </div>
      </div>
      <div className="detail-content mb-10">
        {isError && (
          <div className="flex justify-center w-full mt-20">
            Oops! Something went wrong
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center w-full mt-20">
            <Spinner />
          </div>
        )}

        {todosItem?.length
          ? todosItem?.map((item) => (
              <ListTodos key={item.id} refetch={refetch} todos={item} />
            ))
          : !listLoading && (
              <div
                className="flex justify-center w-full mt-10"
                data-cy="todo-empty-state"
              >
                <TodoEmptyState onClick={onAddTodos} />
              </div>
            )}
      </div>

      {/* Create Todos */}
      {isOpen && (
        <Popup closeModal={onClose} isOpen={true} activityId={id as string} />
      )}
    </>
  );
};
