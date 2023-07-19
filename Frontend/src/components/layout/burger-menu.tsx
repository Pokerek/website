import "./burger-menu.scss";

type props = {
  isActive: boolean;
  onClick: () => void;
};

const BurgerMenu = ({ isActive, onClick }: props) => {
  return (
    <button
      className={`hamburger ${isActive ? "hamburger--active" : ""}`}
      onClick={onClick}
    >
      <span className="hamburger__box">
        <span className="hamburger__inner"></span>
      </span>
    </button>
  );
};

export default BurgerMenu;
