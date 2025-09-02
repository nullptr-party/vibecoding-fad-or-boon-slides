import React from "react";
import { createRoot } from "react-dom/client";
import DeckApp from "./slides/Deck";
import "./style.css";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<DeckApp />);