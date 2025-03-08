import React, { useEffect, useState } from "react";
import "./bootstrap.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    setTodos((prev) => {
      return [...prev, { text: newItem, completed: false }];
    });
    setNewItem("");
  }
  // console.log(todos);

  function toggleCompleted(index) {
    setTodos((prev) => {
      return prev.map((v, i) => {
        return i === index ? { ...v, completed: !v.completed } : v;
      });
    });
  }

  function handleDelete(index) {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  }
  return (
    <>
      <div className="bg-dark d-flex align-items-center justify-content-center py-3">
        <h1 className="text-white text-center fs-3 fs-md-2 fs-lg-1">
          To-Do List
        </h1>
      </div>

      <div className="container-fluid bg-dark min-vh-100 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 bg-white p-4 rounded shadow-lg">
              <form
                className="w-100 d-flex flex-column mb-3"
                onSubmit={handleSubmit}
              >
                <div className="mb-3">
                  <label htmlFor="task" className="fw-bold">
                    Enter a task to do:
                  </label>
                  <input
                    type="text"
                    id="task"
                    className="form-control"
                    placeholder="What do you want to do?"
                    required
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100 w-md-auto"
                >
                  Add
                </button>
              </form>

              <hr />

              <h2 className="text-decoration-underline text-center fs-4 fs-md-3">
                Tasks:
              </h2>
              <ul className="list-group">
                {todos.map((v, i) => {
                  let checkboxId = `task-${i}`;
                  return (
                    <li
                      key={i}
                      className="list-group-item d-flex align-items-center justify-content-between"
                    >
                      <div className="form-check d-flex align-items-center">
                        <input
                          type="checkbox"
                          id={checkboxId}
                          className="form-check-input mx-2"
                          checked={v.completed}
                          onChange={() => toggleCompleted(i)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={checkboxId}
                          style={{
                            textDecoration: v.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {v.text}
                        </label>
                      </div>
                      <button
                        className="btn btn-outline-danger m-lg-1"
                        onClick={() => handleDelete(i)}
                      >
                        Completed
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
