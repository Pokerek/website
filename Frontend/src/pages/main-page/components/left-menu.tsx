import "./left-menu.scss";

const MAIN_PAGE_SECTIONS = {
  ABOUT: '#about',
  SKILLS: '#skills',
  EXPERIENCE: '#experience',
  OTHERS: '#others',
  CONTACT: '#contact'
}

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
