import React,{useState, useEffect} from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';





function Thought({ thought, index, markThought, removeThought }) {
  return (
    <div
      className="thought"
    >
      {/* For bootstrap button  */}
      <span style={{ textDecoration: thought.isDone ? "line-through" : "" }}>{thought.text}</span>
      <div>
        <Button className="btn1" onClick={() => markThought(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeThought(index)}>Delete</Button>
      </div>
    </div>
  );
}

function FormThought({ addThought }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addThought(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group className="form">
      <Form.Label ><b><i class="bi bi-plus-square-fill"></i> Add New Thoughts</b></Form.Label>
      <Form.Control type="text" size="xl" className="input"  value={value} onChange={e => setValue(e.target.value)} placeholder="Add new thoughts" />
    </Form.Group><br />
    <Button variant="danger mb-3" type="submit" className="btnS">
      Save
    </Button>
  </Form>
  );
}

function App() {
  const [thoughts, setThoughts] = useState([
  ]);
  useEffect(() => {
    const list = localStorage.getItem("thoughts")
    const loadedThoughts =JSON.parse(list)

    if (loadedThoughts){
      setThoughts(loadedThoughts)
    }
  }, [])

  useEffect(() => {
    const list = JSON.stringify(thoughts)
    localStorage.setItem("thoughts",list)
  },[thoughts])

  const addThought = text => {
    const newThoughts = [...thoughts, { text }];
    setThoughts(newThoughts);
  };

  const markThought = index => {
    const newThoughts = [...thoughts];
    newThoughts[index].isDone = true;
    setThoughts(newThoughts);
  };

  const removeThought = index => {
    const newThoughts = [...thoughts];
    newThoughts.splice(index, 1);
    setThoughts(newThoughts);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Thoughts for the day</h1><br /><br />
        <FormThought addThought={addThought} />
        <div>
          {thoughts.map((thought, index) => (
            <Card>
              <Card.Body>
                <Thought
                key={index}
                index={index}
                thought={thought}
                markThought={markThought}
                removeThought={removeThought}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;