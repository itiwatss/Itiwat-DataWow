import "./List.css";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetchData from "../helper/fetchData";
import React, { useState } from "react";

const List = ({ item , edit , setEdit }) => {

  const [ editTask , setEditTask ] = useState("")


  const handleChecked = async (val) => {
    const data = {
      id: val.id,
      title: val.title,
      completed: !val.completed,
    };
    await fetchData("put", "/todos/" + val.id, data);
    window.location.reload();
  };

  const handleMenu = (id) => {
    const x = document.getElementById(id);
    x.style.display === "block"
      ? (x.style.display = "none")
      : (x.style.display = "block");
  };

  const handleEdit = (id) => {
    setEdit(id);
  };

  const saveEdit = async (id, editTitle, status) => {
    const data = {
      id: id,
      title: editTitle,
      completed: status
    }
    console.log('save edit', data)
    await fetchData("put", "/todos/" + id, data);

    window.location.reload();
  }
  
  const handleDelete = (value) => async () => {
    await fetchData("delete", "/todos/" + value.id);

    window.location.reload();
  };
  return (
    <div>
      {edit === item.id ? (
        <div key={item.id}>
          <div className="item" style={{ position: "relative" }}>
            <input
              type="text"
              className="editInput"
              placeholder={item.title}
              onChange={(e) => setEditTask(e.target.value)}
            />
            <button onClick={() => saveEdit(item.id, editTask, item.completed)} className="saveBtn">Save</button>
          </div>
        </div>
        
      ) : (
        <div key={item.id}>
          <div className="item" style={{ position: "relative" }}>
            <div
              style={
                item.completed
                  ? {
                      textDecorationLine: "line-through",
                      color: "#A9A9A9",
                      position: "relative",
                    }
                  : {}
              }
            >
              <input
                className="checkBox"
                type="checkbox"
                defaultChecked={item.completed}
                onClick={() => handleChecked(item)}
              />
              {item.title}
            </div>

            <div>
              <FontAwesomeIcon
                className="menuIcon"
                icon={faEllipsisH}
                onClick={() => handleMenu(item.id)}
              />
              <div>
                <ul id={item.id} className="dropdownMenu">
                  <div
                    id="edit"
                    style={{ padding: "10px 0" }}
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </div>
                  <div
                    id="delete"
                    style={{
                      padding: "10px 0 5px 0",
                      color: "red",
                    }}
                    onClick={handleDelete(item)}
                  >
                    Delete
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
