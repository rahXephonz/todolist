import { useCallback, useState } from "react";
import { Priority } from "types/data";
import cx from "classnames";
import getColor from "utils/getColor";
import useProvideAction from "hooks/useProvideAction";

const optionList: Array<Priority> = [
  "very-high",
  "high",
  "normal",
  "low",
  "very-low",
];

type ListItemProps = {
  itemPriority: Priority;
  action: "create" | "update";
};

const ListItem = ({ itemPriority, action }: ListItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setState } = useProvideAction();

  const onSetPriority = useCallback(
    (item: Priority) => {
      setIsOpen(false);

      if (action === "create")
        setState({ priority: item, typeAction: "create" });
      else setState({ priority: item, typeAction: "update" });
    },
    [action, setState],
  );

  return (
    <>
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="w-44 h-12 border border-gray-300 focus:outline-none font-medium relative 
        rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
        type="button"
        onClick={() => setIsOpen((prevVal) => !prevVal)}
      >
        <div className="before:content-['\A'] capitalize">
          <div
            className={cx(
              "before:w-3 before:h-3 before:rounded-full before:mr-3 before:inline-block",
              getColor(itemPriority),
            )}
          >
            {itemPriority?.replace("-", " ")}
          </div>
        </div>

        <svg
          className="w-4 h-4 absolute right-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          id="dropdown"
          className="z-10 w-44 bg-gray divide-y mt-2 rounded-lg border-gray-300 border"
        >
          <ul
            className="py-1 text-sm text-dark"
            aria-labelledby="dropdownDefault"
          >
            {optionList.map((item) => (
              <li key={item} onClick={() => onSetPriority(item)}>
                <div
                  className="priority block py-2 px-4 hover:bg-gray-100 dark:hover:bg-blue
                dark:hover:text-white capitalize before:content-['\A']"
                >
                  <div
                    className={cx(
                      "before:w-3 before:h-3 before:rounded-full before:mr-3 before:inline-block",
                      getColor(item),
                    )}
                  >
                    {item.replace("-", " ")}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ListItem;
