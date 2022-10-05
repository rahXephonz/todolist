import { Priority, Todos } from "types/data";
import { useDeleteTodos, useUpdateTodos } from "hooks/useMutation";
import { useState } from "react";
import Modal, { ChildModal } from "components/Modal";
import TrashIcon from "components/icon/TrashIcon";
import cx from "classnames";
import getColor from "utils/getColor";
import EditIcon from "components/icon/EditIcon";
import parseTypeData from "utils/parse";
import lib from "libs/transforms";
import Popup from "./Popup";
import useDisclosure from "hooks/useDisclosure";
import useProvideAction from "hooks/useProvideAction";

type ListTodosProps = {
  refetch: () => void;
  todos: Todos;
};

const ListTodos = ({ todos, refetch }: ListTodosProps) => {
  const { mutate: updateTodos } = useUpdateTodos();
  const { mutate: deleteTodos } = useDeleteTodos();

  const { onOpen, onClose, isOpen } = useDisclosure();
  const { setState } = useProvideAction();
  const { toBool, toNumber } = parseTypeData;
  const { isActive, priority, id, title } =
    lib.transformObjectKeysToCamelCase(todos);

  const [isChecked, setIsChecked] = useState<boolean>(!toBool(isActive));
  const [isOpenPopupEdit, setIsOpenPopupEdit] = useState<boolean>(false);
  const [childModalOpen, setChildModalOpen] = useState<boolean>(false);

  const onChange = () => {
    setIsChecked((v) => !v);

    // only update isActive
    const data = {
      isActive: toNumber(isChecked),
      priority,
    };

    updateTodos({ id, json: lib.transformObjectKeysToSnakeCase(data) });
  };

  const onDelete = () => {
    deleteTodos(id);
    onClose();
    setChildModalOpen(true);
  };

  const onCloseChildModal = () => {
    setChildModalOpen(false);
    refetch();
  };

  const onUpdateTodos = () => {
    setState({ typeAction: "update", priority } as {
      priority: Priority;
    });
    setIsOpenPopupEdit(true);
  };

  return (
    <div className="content-item flex mb-3 shadow-normal p-7 rounded-xl justify-between bg-white">
      <div className="flex items-center space-x-5">
        <div>
          <input
            type="checkbox"
            onChange={onChange}
            checked={isChecked}
            className="h-4 w-4 mt-[6px] transition duration-200 cursor-pointer"
          />
        </div>
        <div className="before:content-['\A'] capitalize">
          <div
            className={cx(
              "before:w-3 before:h-3 before:rounded-full before:mr-3 before:inline-block",
              getColor(priority as Priority),
            )}
          >
            <span
              className={cx("text-base", {
                "line-through": !toBool(isActive),
              })}
            >
              {title}
            </span>
          </div>
        </div>

        <div className="scale-75 mt-1">
          <button type="button" onClick={onUpdateTodos}>
            <EditIcon />
          </button>
        </div>
      </div>
      <TrashIcon onClick={() => onOpen()} dataTesting="xxx" />

      {/* Edit Todos */}
      <Popup
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
          description="Activity berhasil dihapus"
          isOpen={true}
          closeModal={onCloseChildModal}
        />
      )}
    </div>
  );
};

export default ListTodos;
