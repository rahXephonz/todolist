import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import SortIcon from "components/icon/SortIcon";
import useProvideTodos from "hooks/useProvideTodos";
import {
  AZ,
  SelectionOne,
  SelectionThree,
  SelectionTwo,
  ZA,
} from "components/icon/CommonIcon";
import lib from "libs/transforms";

const Dropdown = () => {
  const { state, setState } = useProvideTodos();

  const sortedOlder = () => {
    const sorted = state.todosItem.sort((a, b) => a.id - b.id);

    setState({ todosItem: sorted });
  };

  const sortedNewer = () => {
    const sorted = state.todosItem.sort((a, b) => b.id - a.id);

    setState({ todosItem: sorted });
  };

  const sortedAZ = () => {
    const sorted = state.todosItem.sort((a, b) =>
      a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1,
    );

    setState({ todosItem: sorted });
  };

  const sortedZA = () => {
    const sorted = state.todosItem.sort((a, b) =>
      a.title.toUpperCase() < b.title.toUpperCase() ? 1 : -1,
    );

    setState({ todosItem: sorted });
  };

  const sortedIncomplete = () => {
    const todos = lib.transformObjectKeysToCamelCase(state.todosItem);

    const sorted = todos.sort((a, b) => {
      return b.isActive - a.isActive;
    });

    setState({ todosItem: sorted });
  };

  const items = [
    {
      id: 0,
      icon: <SelectionTwo />,
      title: "Terbaru",
      function: sortedNewer,
    },
    {
      id: 1,
      icon: <SelectionOne />,
      title: "Terlama",
      function: sortedOlder,
    },
    {
      id: 2,
      icon: <AZ />,
      title: "A - Z",
      function: sortedAZ,
    },
    {
      id: 3,
      icon: <ZA />,
      title: "Z - A",
      function: sortedZA,
    },
    {
      id: 4,
      icon: <SelectionThree />,
      title: "Belum Selesai",
      function: sortedIncomplete,
    },
  ];

  return (
    <div className="w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            title="sort button"
            data-cy="todo-sort-button"
            className="justify-center rounded-full px-4 py-2 mt-2 bg-transparent h-14 w-14 border 
            border-solid border-gray-300"
          >
            <SortIcon />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            data-cy="sort-parent"
            className="absolute mt-2 w-56 origin-top-right divide-y
           divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {items.map((item) => (
              <div className="px-1 py-1" key={item.id} data-cy="sort-selection">
                <Menu.Item>
                  {({ active }) => (
                    <div>
                      <button
                        type="button"
                        className={`${
                          active && "bg-gray-200 text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-5`}
                        onClick={item.function}
                      >
                        <span className="scale-125">{item.icon}</span>
                        <span data-cy="sort-selection-title">{item.title}</span>
                      </button>
                    </div>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
