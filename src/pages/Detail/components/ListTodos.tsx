import { Priority, Todos } from "types/data";
import { useDeleteTodos, useUpdateTodos } from "hooks/useMutation";
import { useState, memo, useCallback } from "react";
import Modal, { ChildModal } from "components/Modal";
import TrashIcon from "components/icon/TrashIcon";
import cx from "classnames";
import getColor from "utils/getColor";
import EditIcon from "components/icon/EditIcon";
import parseTypeData from "utils/parse";
import { transformToCamelCase, transformToSnakeCase } from "transform-obj";
import Popup from "./Popup";
import useDisclosure from "hooks/useDisclosure";
import { useAppDispatch, useAppSelector } from "state/store";
import { updateTodosItem } from "state/slices/todoSlices";
import {
  updatePriorityAction,
  updateTypeAction,
} from "state/slices/actionSlices";

type ListTodosProps = {
  refetch: () => void;
  todos: Todos;
};

const ListTodos = ({ todos, refetch }: ListTodosProps) => {
  const dispatch = useAppDispatch();
  const { todosItem } = useAppSelector((state) => state.todos);
  const { mutate: updateTodos } = useUpdateTodos();
  const { mutate: deleteTodos } = useDeleteTodos();

  const { onOpen, onClose, isOpen } = useDisclosure();
  const { toBool, toNumber } = parseTypeData;
  const { isActive, priority, id, title } = transformToCamelCase(todos);

  const [isChecked, setIsChecked] = useState<boolean>(!toBool(isActive));
  const [isOpenPopupEdit, setIsOpenPopupEdit] = useState<boolean>(false);
  const [childModalOpen, setChildModalOpen] = useState<boolean>(false);

  const removeObjectWithId = useCallback(
    (arr: Todos[], id: number) => {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

      [...arr].splice(objWithIdIndex, 1);

      dispatch(updateTodosItem(arr));
    },
    [dispatch],
  );

  const onChange = useCallback(() => {
    setIsChecked((prevVal) => !prevVal);

    // only update isActive
    const data = {
      isActive: toNumber(isChecked),
      priority: priority as Priority,
    };

    updateTodos(
      { id, json: transformToSnakeCase(data) },
      {
        onSuccess: () => refetch(),
      },
    );
  }, [id, isChecked, priority, refetch, toNumber, updateTodos]);

  const onDelete = () => {
    deleteTodos(id);
    onClose();
    setChildModalOpen(true);
  };

  const onCloseChildModal = () => {
    setChildModalOpen(false);

    removeObjectWithId(todosItem, id);
    refetch();
  };

  const onUpdateTodos = () => {
    dispatch(updatePriorityAction(priority));
    dispatch(updateTypeAction("update"));
    setIsOpenPopupEdit(true);
  };

  return (
    <div
      className="content-item flex mb-3 shadow-normal p-7 rounded-xl justify-between bg-white"
      data-cy="todo-item"
    >
      <div className="flex items-center space-x-5">
        <div>
          <input
            data-cy="todo-item-checkbox"
            type="checkbox"
            onChange={onChange}
            checked={isChecked}
            className="h-4 w-4 mt-[6px] transition duration-200 cursor-pointer"
          />
        </div>
        <div
          className="before:content-['\A'] capitalize"
          data-cy="todo-item-priority-indicator"
        >
          <div
            data-cy="todo-item-priority-indicator"
            className={cx(
              "before:w-3 before:h-3 before:rounded-full before:mr-3 before:inline-block",
              getColor(priority),
            )}
          >
            <span
              data-cy="todo-item-title"
              className={cx("text-base", {
                "line-through": isChecked,
              })}
            >
              {title}
            </span>
          </div>
        </div>

        <div className="scale-75 mt-1">
          <button
            type="button"
            onClick={onUpdateTodos}
            data-cy="todo-item-edit-button"
          >
            <EditIcon />
          </button>
        </div>
      </div>
      <TrashIcon
        onClick={() => onOpen()}
        dataTesting="todo-item-delete-button"
      />

      {/* Edit Todos */}
      <Popup
        refetch={refetch}
        closeModal={() => setIsOpenPopupEdit(false)}
        isOpen={isOpenPopupEdit}
        todoId={id}
        titleTodo={title}
      />

      {/* Delete Todos */}
      <Modal
        isOpen={isOpen}
        closeModal={onClose}
        description={`Apakah anda yakin menghapus item “${title}?“`}
        onAction={onDelete}
      />

      {childModalOpen && (
        <ChildModal
          description="Todo berhasil dihapus"
          isOpen={true}
          closeModal={onCloseChildModal}
        />
      )}
    </div>
  );
};

export default memo(ListTodos);
