import { Button } from "../../components/button/button";
import { SuperBox } from "../../components/custom/SuperBox/SuperBox";
import "./ErrorPage.scss";

export default function ErrorPage() {
  return (
    <SuperBox className="error-page">
      <h1 className="error-page__title">Oops!</h1>
      <p className="error-page__text">
        Sorry, an unexpected error has occurred.
      </p>
      <Button className="btn--green" link="/" text="Back to start" />
    </SuperBox>
  );
}
