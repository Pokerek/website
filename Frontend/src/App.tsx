import { Header } from "./components/Layout/header/Header";
import { Container } from "./components/Layout/container/Container";
import { Footer } from "./components/Layout/footer/Footer";

import Main from "./pages/Main/Main";
import Journal from "./pages/Journal/journal-page";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        {/* <Main /> */}
        <Journal />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
