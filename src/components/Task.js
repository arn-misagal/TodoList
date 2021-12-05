import React,{useState, useEffect} from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./task.css"


function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div
      className="todo"
      
    >
      {/* For bootstrap button  */}
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <Button className="btn1" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>Delete</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group className="form">
      <Form.Label><b><i class="bi bi-plus-square-fill"></i> Add Tasks</b></Form.Label>
      <Form.Control type="text" size="xl" className="input"  value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group><br />
    <Button variant="danger mb-3" type="submit" className="btnS">
      Save
    </Button>
  </Form>
  );
}

function Task() {
  const [todos, setTodos] = useState([
  ]);
  useEffect(() => {
    const list = localStorage.getItem("todos")
    const loadedTodos =JSON.parse(list)

    if (loadedTodos){
      setTodos(loadedTodos)
    }
  }, [])

  useEffect(() => {
    const list = JSON.stringify(todos)
    localStorage.setItem("todos",list)
  },[todos])

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Task List</h1><br /><br />
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />   
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default Task;