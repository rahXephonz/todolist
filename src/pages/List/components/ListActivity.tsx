import { useRouter } from "hooks/useRouter";
import { convertDate } from "libs/dayJs";
import { useState } from "react";
import { useDeleteActivities } from "hooks/useMutation";

import TrashIcon from "components/icon/TrashIcon";
import Modal, { ChildModal } from "components/Modal";
import useDisclosure from "hooks/useDisclosure";
import { Activites } from "types/data";
import { transformObjectKeysToCamelCase } from "libs/transforms";

type ListActivityProps = {
  refetch: () => void;
  [x: string]: any;
};

const ListActivity = ({ refetch, ...props }: ListActivityProps) => {
  const dataProps = props as Activites;
  const [childModalOpen, setChildModalOpen] = useState(false);

  const { push } = useRouter();
  const { id, title, createdAt } = transformObjectKeysToCamelCase(dataProps);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutate: deleteActivity } = useDeleteActivities();

  const onDelete = (id: number) => {
    deleteActivity(id);
    onClose();
    setChildModalOpen(true);
  };

  const onCloseChildModal = () => {
    setChildModalOpen(false);
    refetch();
  };

  return (
    <>
      <div className="card-content" key={id}>
        <div
          className="card-parents h-60 shadow-normal rounded-xl relative mb-5 p-7"
          data-cy="activity-item"
        >
          <div
            className="card-body h-40 cursor-pointer"
            onClick={() => push(`/detail?id=${id}`)}
          >
            <h4 data-cy="activity-item-title" className="font-bold">
              {title}
            </h4>
          </div>

          <div className="card-footer absolute bottom-6 flex items-center justify-between w-[calc(100%-54px)] p-0">
            <span data-cy="activity-item-date" className="text-gray-400">
              {convertDate(createdAt, "LL")}
            </span>
            <div>
              <TrashIcon
                dataTesting="activity-item-delete-button"
                onClick={() => onOpen()}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        description={`Apakah anda yakin menghapus activity “${title}“?`}
        isOpen={isOpen}
        closeModal={onClose}
        onAction={() => onDelete(id)}
      />

      {childModalOpen && (
        <ChildModal
          description="Activity berhasil dihapus"
          isOpen={true}
          closeModal={onCloseChildModal}
        />
      )}
    </>
  );
};

export default ListActivity;
