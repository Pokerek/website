import "./Terminal.scss";

const Terminal = () => {
  return (
    <div className="terminal">
      <div className="terminal__header">
        <p className="terminal__title">chrobok.dev@admin: ~/welcome.exe</p>
      </div>
      <div className="terminal__body">
        <p className="terminal__text">Hello stranger!</p>
        <p className="terminal__text">I’m Karol Chrobok</p>
        <p className="terminal__text">Padawan of Fullstack</p>
        <p className="terminal__text"></p>
        <p className="terminal__text">Press any key to continue ...</p>
      </div>
    </div>
  );
};

export default Terminal;
