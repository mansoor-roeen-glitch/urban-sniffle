import React from "react";
import Index from "./routes/Index";

function App() {
  return (
    <div className="App_Wrapper" style={{display: "flex", flexDirection: "column", minHeight: "100vh", height: "fit-content", paddingBottom: "60px", overflowX: "hidden"}}>
      <Index authenticated={true} />
    </div>
  );
}

export default App;
