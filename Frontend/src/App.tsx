import Header from "./components/layout/header";
import Container from "./components/layout/container";
import Footer from "./components/layout/footer";

import MainPage from "./pages/main-page";
import JournalPage from "./pages/journal-page";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        {/* <MainPage /> */}
        <JournalPage />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
