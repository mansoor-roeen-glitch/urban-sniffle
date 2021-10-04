import React from "react";
import Index from "./routes/Index";

function App() {
  return (
    <div className="App_Wrapper" style={{display: "flex", flexDirection: "column", minHeight: "calc(100vh - 150px)", height: "fit-content", paddingBottom: "150px", overflowX: "hidden"}}>
      <Index authenticated={true} />
    </div>
  );
}

export default App;
