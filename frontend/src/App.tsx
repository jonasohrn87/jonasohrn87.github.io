import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/MainLayout";
import DateChecker from "./components/DateChecker";
import StoreHelper from "./components/StoreHelper";
import "react-datepicker/dist/react-datepicker.css";

const headerTitle = "ButiksKollen";

type TabKey = "dateChecker" | "storeHelper";

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("storeHelper");

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header title={headerTitle} />
        <Main>
          <div className="mb-4">
            <div className="flex space-x-2">

              <button
                onClick={() => setActiveTab("storeHelper")}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === "storeHelper"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border"
                }`}
              >
                Gavlar
              </button>
              <button
                onClick={() => setActiveTab("dateChecker")}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === "dateChecker"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border"
                }`}
              >
                Datum
              </button>
            </div>
          </div>

          <div>
            {activeTab === "dateChecker" && <DateChecker />}
            {activeTab === "storeHelper" && <StoreHelper />}
          </div>
        </Main>
      </div>
    </>
  );
}

export default App;
