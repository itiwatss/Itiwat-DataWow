import { useEffect, useContext } from "react";
import ProgressBar from "../components/ProgressBar";
import Task from "../components/Task";
import fetchData from "../helper/fetchData";
import "./todos.css";
import { StoreContext } from "../store/store";
import { Observer } from "mobx-react";

const Todos = () => {
  const store = useContext(StoreContext);

  useEffect(() => {
      const handleGet = async () => {
        store.todoList = await fetchData("get", "/todos");
      };
      handleGet();

    console.log('auto',store.todoLists)

    
    console.log('effect',store.todoLists)

    // console.log(todos)
    // eslint-disable-next-line
  },[]);

  return (
    <Observer>
      {() => (
        <div className="todos">
          <div className="container">
            <ProgressBar />
            <Task />
          </div>
        </div>
      )}
    </Observer>
  );
};

export default Todos;
