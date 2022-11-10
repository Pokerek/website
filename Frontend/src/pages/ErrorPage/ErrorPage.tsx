import { Button } from "../../components/Button/Button";
import { SuperBox } from "../../components/SuperBox/SuperBox";
import "./ErrorPage.scss";

export default function ErrorPage() {
  return (
    <SuperBox className="error-page">
      <h1 className="error-page__title">Oops!</h1>
      <p className="error-page__text">
        Sorry, an unexpected error has occurred.
      </p>
      <Button className="btn--green" href="/" text="Back to start" />
    </SuperBox>
  );
}
