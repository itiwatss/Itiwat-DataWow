import React, { useEffect, useState, useContext } from "react";
import "./ProgressBar.css";
import { StoreContext } from "../store/store";
import { autorun } from "mobx";
import { Observer } from "mobx-react";

const ProgressBar = () => {
  const store = useContext(StoreContext);

  const [percentages, setPercentages] = useState(0);
  const [done, setDone] = useState(0);
  useEffect(() => {
    autorun(() => {
      const taskMax = store.todoLists.length;
      const taskUndone = store.todoLists.filter(
        (item) => item.completed === false
      ).length;

      const taskDone = taskMax - taskUndone;
      setDone(taskDone)
      setPercentages((taskDone / taskMax) * 100 );
    });
  }, [percentages, done, store]);

  console.log('DOne',done)
  return (
    <Observer>
      {() => (
        <div className="progressBox">
          <div className="header">Progress</div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: percentages  + "%" }}
            ></div>
          </div>
          <div className="countCom">{done} completed</div>
        </div>
      )}
    </Observer>
  );
};

export default ProgressBar;
