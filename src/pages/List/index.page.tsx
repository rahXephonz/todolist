import cx from "classnames";
import Helmet from "components/Helmet";
import TablePlus from "components/icon/TablePlus";

import EmptyState from "components/icon/EmptyState";
import Spinner from "components/icon/Spinner";
import ListActivity from "./components/ListActivity";

import { useFetchActivities } from "hooks/useFetch";
import { useCreateActivities } from "hooks/useMutation";

export const List = () => {
  const {
    data: listActivity,
    isLoading: listLoading,
    isError: listError,
    refetch,
  } = useFetchActivities();

  const { mutate: createActivity, isLoading: createLoading } =
    useCreateActivities();

  const onCreate = () =>
    createActivity({ email: "mrizkyy027@gmail.com", title: "" });

  return (
    <>
      <Helmet
        description="Todo list dashboard"
        title="To Do List - Dashboard"
      />
      <div className="header flex justify-between items-center my-10">
        <h1 data-cy="activity-title" className="text-4xl font-bold">
          Activity
        </h1>

        <button
          className="bg-blue py-3 px-6 font-bold text-white flex items-center 
          space-x-2 rounded-full"
          type="button"
          onClick={onCreate}
          data-cy="activity-add-button"
          disabled={createLoading}
        >
          <TablePlus />
          {createLoading ? <Spinner /> : <p className="text-lg">Tambah</p>}
        </button>
      </div>

      <div
        className={cx("dashboard-content", {
          "grid grid-cols-4 gap-y-3 gap-x-6": listActivity?.data.length > 0,
        })}
      >
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
        {listActivity?.data.length > 0
          ? listActivity?.data.map((item) => (
              <ListActivity key={item.id} {...item} refetch={refetch} />
            ))
          : !listLoading && (
              <div className="flex justify-center w-full mt-20">
                <EmptyState
                  dataTesting="activity-empty-state"
                  onClick={onCreate}
                />
              </div>
            )}
      </div>
    </>
  );
};
