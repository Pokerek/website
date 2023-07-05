import { MAIN_PAGE_SECTIONS } from "../../constants";
import "./left-menu.scss";

const LeftMenu = () => {
  return (
    <ul className="left-menu">
      {Object.entries(MAIN_PAGE_SECTIONS).map(([key, value]) => (
        <li
          key={key}
          className="left-menu__item"
        >
          <a
            className="left-menu__link"
            href={value}
          >
            {key}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default LeftMenu;
