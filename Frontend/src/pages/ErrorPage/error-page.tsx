import Button from "../../components/button/button";

import "./error-page.scss";

export default function ErrorPage() {
  return (
    <div className="error-page">
      <h1 className="error-page__title">Oops!</h1>
      <p className="error-page__text">
        Sorry, an unexpected error has occurred.
      </p>
      <Button link="/">Back to home page</Button>
    </div>
  );
}
