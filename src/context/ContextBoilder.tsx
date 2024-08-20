import { createContext, ReactNode } from "react";

interface BoilderContextType {}

export const BoilderContext = createContext<BoilderContextType>(
  {} as BoilderContextType
);

export const BoilderContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <BoilderContext.Provider value={{}}>{children}</BoilderContext.Provider>
  );
};
