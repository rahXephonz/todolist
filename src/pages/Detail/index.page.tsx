import { useRouter } from "hooks/useRouter";
import { useEffect, useState } from "react";
import Modal, { ChildModal } from "components/Modal";
import useDisclosure from "hooks/useDisclosure";
import Helmet from "components/Helmet";
import BackIcon from "components/icon/BackIcon";
import EditIcon from "components/icon/EditIcon";

export const Detail = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { query, push } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { id } = query;

  useEffect(() => {
    if (!id) push("/");
  }, [id, push]);

  const onClick = () => onOpen();
  const onAction = () => {
    onClose();
    console.log("api running");
    setIsOpened(true);
  };

  const onCloseChildModal = () => setIsOpened(false);

  return (
    <>
      <Helmet
        description="Todo detail dashboard"
        title="To Do Detail - Dashboard"
      />

      <div className="header flex justify-between items-center my-10">
        <div className="header-container flex space-x-6 items-center">
          <BackIcon />
          <h1 className="text-4xl font-bold">Testt</h1>
          <EditIcon />
        </div>

        <div className="action-menu flex space-x-4 items-center"></div>
      </div>

      <button onClick={onClick}>Click Me</button>
      <Modal
        closeModal={onClose}
        isOpen={isOpen}
        onAction={onAction}
        description="Apakah anda yakin menghapus item"
      />
      {isOpened && (
        <ChildModal
          description="Todo berhasil dihapus"
          isOpen={true}
          closeModal={onCloseChildModal}
        />
      )}
    </>
  );
};
