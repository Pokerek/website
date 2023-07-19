import { NavLink, Outlet } from "react-router-dom";

import Header from "./components/layout/header";
import Container from "./components/layout/container";

function App() {
  return (
    <main className="App">

      <Header />
      <Container>
        <Outlet />
      </Container>
      <NavLink to="/admin" style={{ display: "none" }}>Admin</NavLink>
      <NavLink to="/login" style={{ display: "none" }}>Login</NavLink>
    </main>
  );
}

export default App;
