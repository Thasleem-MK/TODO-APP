import React, { useEffect, useRef, useState } from "react";
import "./body.css";
import { Button } from "react-bootstrap";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Body = () => {
  const [data, setData] = useState("");
  const [todos, setTodos] = useState([]);
  const [editID, setEditId] = useState(0);

  const addTodo = () => {
    if (data !== "") {
      setTodos([...todos, { list: data, id: Date.now(), status: false }]);
      setData("");
    }
    if (editID) {
      const updateTodo = todos.map((lists) => 
        (lists.id === editID ? { ...lists, list: data } : { ...lists })
      );
      setTodos(updateTodo)
      setEditId(0)
      setData("")
    }
  };

  const RefState = useRef("null");

  useEffect(() => {
    RefState.current.focus();
  });

  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    let Complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(Complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((list) => list.id === id);
    setData(editTodo.list);
    setEditId(editTodo.id);
  };

  return (
    <div className="container">
      <h2 className="text-white">TODO APP</h2>
      <form
        className="form-group form-control"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          className="InputBox "
          type="text"
          placeholder="Enter your TODO"
          ref={RefState}
          value={data}
          onChange={(event) => {
            setData(event.target.value);
          }}
        />
        <Button className="bg-white text-black AddButton" onClick={addTodo}>
          {editID ? "EDIT" : "ADD"}
        </Button>
      </form>
      <div>
        <ul>
          {todos.map((todo) => (
            <li className="m-1 bg-black text-white p-2">
              <div id={todo.status ? "list-item" : ""}>
                {todo.list.toUpperCase()}
              </div>
              <span className="Icons">
                <IoMdDoneAll
                  className="icon text-success"
                  title="Complete"
                  onClick={() => onComplete(todo.id)}
                />
                <FiEdit
                  className="icon text-warning"
                  title="Edit"
                  onClick={() => onEdit(todo.id)}
                />
                <MdDelete
                  className="icon text-danger"
                  title="Delete"
                  onClick={() => onDelete(todo.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Body;
