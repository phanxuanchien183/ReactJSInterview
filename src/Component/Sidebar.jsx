import { memo, useState } from "react";

const data = [
  {
    id: 1,
    name: "Dashboard",
  },
  {
    id: 8,
    name: "Manage",
    arrChild: [
      {
        id: 9,
        name: "Item children",
      },
      {
        id: 10,
        name: "Item children",
      },
      {
        id: 11,
        name: "Item children",
      },
    ],
  },
  {
    id: 15,
    name: "Item Parent",
    arrChild: [
      {
        id: 16,
        name: "Item children",
      },
      {
        id: 17,
        name: "Item children",
      },
      {
        id: 18,
        name: "Item children",
      },
    ],
  },
];

const RenderMenu = (objMenu) => {
  const { id, name } = objMenu;
  const [active, setActive] = useState(false);

  return (
    <ul key={id} className="sidebar_parent">
      <div onClick={() => setActive(!active)} role="presentation">
        {name}
        {objMenu.arrChild && objMenu.arrChild.length > 0 && (
          <img
            src={
              active ? "assets/icon/arrow-up.svg" : "assets/icon/arrow-down.svg"
            }
            alt="arrow-down"
            width={12}
            height={12}
          />
        )}
      </div>

      {objMenu.arrChild &&
        objMenu.arrChild.length > 0 &&
        objMenu.arrChild.map((child) => {
          return (
            <li key={child.id} hidden={!active}>
              {child.name}
            </li>
          );
        })}
    </ul>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar  col-md-2">
      {data.map((child) => RenderMenu(child))}
    </div>
  );
};

export default memo(Sidebar);
