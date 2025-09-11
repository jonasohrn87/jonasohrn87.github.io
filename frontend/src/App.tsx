import React from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/MainLayout";
import FoodContainer from "./components/FoodContainer";
import "react-datepicker/dist/react-datepicker.css";

const headerTitle = "Hållbarhetskollen";
const containerTitle = "Muffins";
const containerTitle1 = "Kondisbitar";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header title={headerTitle} />
        <Main>
          <FoodContainer title={containerTitle} />
          <FoodContainer title={containerTitle1} />
        </Main>
      </div>
    </>
  );
}

export default App;
