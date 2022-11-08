import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./AppRoutes";
import { worker } from "./pages/search/resultSearch/_testUtils_/worker";

worker.start();

function App() {
  return (
    <CssBaseline>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CssBaseline>
  );
}

export default App;
