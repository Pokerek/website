import { Outlet } from "react-router-dom";

import Header from "./components/layout/header";

function App() {
  return (
    <main className="App">
      <Header />
      <Outlet />
    </main>
  );
}

export default App;
