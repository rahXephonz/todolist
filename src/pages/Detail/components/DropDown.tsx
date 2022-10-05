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
    const sorted = state.todosItem.sort((a, b) => b.is_active - a.is_active);

    setState({ todosItem: sorted });
  };

  const items = [
    {
      id: 0,
      icon: <SelectionOne />,
      title: "Terlama",
      function: sortedOlder,
    },
    {
      id: 1,
      icon: <SelectionTwo />,
      title: "Terbaru",
      function: sortedNewer,
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
            className="absolute mt-2 w-56 origin-top-right divide-y
           divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {items.map((item) => (
              <div className="px-1 py-1" key={item.id} data-cy="sort-selection">
                <Menu.Item data-cy="sort-selection-selected">
                  {({ active }) => (
                    <div>
                      <button
                        type="button"
                        className={`${
                          active && "bg-gray-200 text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-3`}
                        onClick={item.function}
                      >
                        {item.icon}
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
