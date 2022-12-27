import React from "react";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";

const Main = () => {
  return (
    <div style={{ display: "flex", flexFlow: "column", height: "100vh" }}>
      <Navbar />
      <Chat />
    </div>
  );
};

export default Main;
