import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inquiry from "./components/Inquiry";
function App() {
  return (
    <Fragment>
      <Inquiry />
      {/* <BrowserRouter>
        <Routes> */}
      {/* <Route exact path="/" element={<Inquiry />} /> */}
      {/* </Routes>
      </BrowserRouter> */}
    </Fragment>
  );
}

export default App;
