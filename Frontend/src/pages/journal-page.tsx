import JournalPost from "../components/journal-post/journal-post";
import Container from "../components/layout/container";

import "./journal-page.scss";

export default function JournalPage() {
  return (
    <Container>
      <div className="journal">
        <JournalPost />
        <JournalPost />
      </div>
    </Container>
  );
}
