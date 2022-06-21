import React, { createContext, useContext, useState } from "react";

export const DataContext = createContext({});

function Provider({ children }) {
  const [userData, setUserData] = useState({});

  return (
    <DataContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}


function useData() {
    const context = useContext(DataContext);

    return context;
}

export {
    Provider,
    useData
}