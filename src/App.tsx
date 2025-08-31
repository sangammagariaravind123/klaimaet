import "./App.css";
// import { Button } from './components/ui/button'
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/ui/layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>Hello</Layout>
    </BrowserRouter>
  );
}

export default App;
