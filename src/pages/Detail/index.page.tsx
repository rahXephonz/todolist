import useDisclosure from "hooks/useDisclosure";
import PopupAdd from "./components/PopupAdd";
import Helmet from "components/Helmet";
import BackIcon from "components/icon/BackIcon";
import EditIcon from "components/icon/EditIcon";
import SortIcon from "components/icon/SortIcon";
import TablePlus from "components/icon/TablePlus";
import TrashIcon from "components/icon/TrashIcon";
import cx from "classnames";
import getColor from "utils/getColor";

import { useRouter } from "hooks/useRouter";
import { useEffect } from "react";
import { useFetchAllTodos, useFetchDetailActivities } from "hooks/useFetch";
import { TodoEmptyState } from "components/icon/EmptyState";
import { Priority } from "types/data";

export const Detail = () => {
  const { query, push } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { id } = query;
  const idQuery = parseInt(id as string);

  const {
    data: listTodos,
    isLoading: listLoading,
    isError: listError,
  } = useFetchAllTodos(idQuery);

  const { data: detailActivity } = useFetchDetailActivities(idQuery);

  useEffect(() => {
    if (!id) push("/");
  }, [id, push]);

  return (
    <>
      <Helmet
        description="Todo detail dashboard"
        title="To Do Detail - Dashboard"
      />
      <div className="header flex justify-between items-center my-10">
        <div className="header-container flex space-x-6 items-center">
          <button type="button" onClick={() => push("/")}>
            <BackIcon />
          </button>
          <h1 className="text-4xl font-bold">{detailActivity?.data?.title}</h1>
          <button type="button">
            <EditIcon />
          </button>
        </div>

        <div className="action-menu flex space-x-4 items-center">
          <button
            type="button"
            title="sorting data"
            className="rounded-full bg-transparent h-14 w-14 border 
            border-solid border-gray-300"
          >
            <div className="flex justify-center">
              <SortIcon />
            </div>
          </button>

          <button
            type="button"
            className="bg-blue py-3 px-6 font-bold text-white 
            flex items-center space-x-2 rounded-full"
            onClick={() => onOpen()}
          >
            <TablePlus />
            <p className="text-lg">Tambah</p>
          </button>
        </div>
      </div>
      <div className="detail-content mb-10">
        {listError && (
          <div className="flex justify-center w-full mt-20">
            Oops! Something went wrong
          </div>
        )}
        {listLoading && (
          <div className="flex justify-center w-full mt-20">
            Fetching data...
          </div>
        )}

        {listTodos?.data?.length > 0
          ? listTodos?.data.map(({ id, priority, title }) => (
              <div
                className="content-item flex mb-3 shadow-normal p-7 rounded-xl justify-between bg-white"
                key={id}
              >
                <div className="flex items-center space-x-5">
                  <div>
                    <input
                      type="checkbox"
                      id="vehicle2"
                      name="vehicle2"
                      value="Car"
                    />
                  </div>
                  <div className="before:content-['\A'] capitalize">
                    <div
                      className={cx(
                        "before:w-3 before:h-3 before:rounded-full before:mr-3 before:inline-block",
                        getColor(priority as Priority),
                      )}
                    >
                      {title}
                    </div>
                  </div>

                  <div className="scale-75 mt-1">
                    <button type="button">
                      <EditIcon />
                    </button>
                  </div>
                </div>
                <TrashIcon
                  onClick={() => console.log("yey")}
                  dataTesting="xxx"
                />
              </div>
            ))
          : !listLoading && (
              <div className="flex justify-center w-full mt-20">
                <TodoEmptyState />
              </div>
            )}
      </div>
      <PopupAdd closeModal={onClose} isOpen={isOpen} id={id as string} />
    </>
  );
};
