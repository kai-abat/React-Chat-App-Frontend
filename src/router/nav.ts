// import { ReactNode } from "react";
import { Chat2 } from "../pages/Chat2";

interface navType {
  name: string;
  element: JSX.Element;
}

const nav: navType = [
  {
    name: "Chat Now",
    element: <Chat />,
  },
];
