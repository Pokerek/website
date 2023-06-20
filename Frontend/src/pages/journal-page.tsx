import JournalPost from "../components/journal-post/journal-post";

import "./journal-page.scss";

export default function JournalPage() {
  return (
    <div className="journal">
      <JournalPost />
      <JournalPost />
    </div>
  );
}
