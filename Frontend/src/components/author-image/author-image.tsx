import "./author-image.scss";

const AuthorImage = () => {
  const handleToggleImage = () => {
    const image = document.querySelector(".authorImage") as HTMLImageElement;
    image.src = "/images/author.png";
  };

  return (
    <img
      onClick={handleToggleImage}
      src="/images/logo.png"
      alt="Logo"
      className="authorImage"
    />
  );
};

export default AuthorImage;
