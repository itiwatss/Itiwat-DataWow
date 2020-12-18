import React from "react";
import { useLocalStore } from "mobx-react";

export const StoreContext = React.createContext();

const StoreProvider = ({ children = null }) => {
  const store = useLocalStore(() => ({
    todoList: [],
    get todoLists() {
      return [...store.todoList]
    }
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
