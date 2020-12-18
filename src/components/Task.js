import React, { useState, useContext } from "react";
import "./Task.css";
// import CONSTANT from '../constant';
import fetchData from "../helper/fetchData";
import { StoreContext } from "../store/store";
import { Observer } from "mobx-react";
import List from './List'

const Task = () => {
  const store = useContext(StoreContext);

  const [task, setTask] = useState("");
  const [edit, setEdit] = useState("");

  const filterTask = (state) => {
    switch (state) {
      case "Done":
        return store.todoLists.filter((item) => item.completed === true);
      case "Undone":
        return store.todoLists.filter((item) => item.completed === false);
      default:
        return store.todoLists;
    }
  };

  const genId = (length) => {
    var randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  };

  const handleAdd = async () => {
    const data = {
      id: genId(10),
      title: task,
      completed: false,
    };
    await fetchData("post", "/todos", data);

    window.location.reload();
  };

  const filter = ["All", "Done", "Undone"]
  const [sta, setSta] = useState("All");

  return (
    <Observer>
      {() => (
        <div className="task">
          <div className="headerTask">
            <div className="headerTxt">Tasks</div>
            <select
              className="filter"
              onChange={(e) => setSta(filter[e.target.value])}
            >
              {filter.map((status, key) => (
                <option key={key} value={key}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="taskList">
            <div>
              {filterTask(sta).map((item) => {
                return (
                  <div key={item.id} >
                    <List item={item} edit={edit} setEdit={setEdit}/>
                  </div>
                );
              })}
            </div>
          </div>

          <input
            type="text"
            className="addInput"
            placeholder="Add your todo..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
      )}
    </Observer>
  );
};

export default Task;
