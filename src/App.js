import React from "react";
import Index from "./routes/Index";

function App() {
  return (
    <div className="App_Wrapper">
      <Index authenticated={true} />
    </div>
  );
}

export default App;
