import React, { useState } from 'react';
import './App.css';
import backgroundImage from './dark-grunge-texture.jpg';
import '@trimbleinc/modus-react-bootstrap/css/dist/modus-react-bootstrap.min.css';

import {Button} from '@trimbleinc/modus-react-bootstrap';
import {Form} from '@trimbleinc/modus-react-bootstrap';
import {Tabs, Tab} from '@trimbleinc/modus-react-bootstrap';
import {ListGroup} from '@trimbleinc/modus-react-bootstrap';
import {Modal} from '@trimbleinc/modus-react-bootstrap';


function App() {

  const [text, setText] = useState('');

  const [data] = useState({
    "epics": [
        {
            "title": "Epic 1",
            // ... rest of the epic data ...
        },
        {
            "title": "Epic 2",
            // ... rest of the epic data ...
        }
    ],
    "tasks": [
        {
            "title": "Task 1",
            // ... rest of the task data ...
        },
        {
            "title": "Task 2",
            // ... rest of the task data ...
        }
    ],
    "user_stories": [
        {
            "title": "User Story 1",
            // ... rest of the user story data ...
        },
        {
            "title": "User Story 2",
            // ... rest of the user story data ...
        }
    ]
  });

const [show, setShow] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);

const handleClose = () => setShow(false);
const handleShow = (task) => {
  setSelectedTask(task);
  setShow(true);
};


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    fetch('http://127.0.0.1:5000/sendmessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: text,
        stream: false,
        model_id: 'gpt-4'
      })
    })
    .then(response => {
      if (response.ok) {
        console.log('Success:', response);
      } else {
        console.error('Error:', response);
      }
    })
    .catch(error => console.error('Fetch Error:', error));
  };
  return (
    <div className="App" style={{backgroundImage: 
      `url(${backgroundImage})`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{background: 'rgba(255, 255, 255, 0.6)', padding: '20px', margin: '40px', width: '80%'}}>
        <h1>Provide us with details about your requirements.</h1>
      <div>
    <br></br>
    <Form onSubmit={handleSubmit}>
    <div key="custom-inline-checkbox">
    <Form.Check
      custom
      inline
      type="checkbox"
      id="custom-inline-checkbox"
      label="UI"
      className="mr-3"
    />
    <Form.Check
      custom
      inline
      type="checkbox"
      id="custom-inline-checkbox"
      label="API/Services"
      checked
      className="mr-3"
    />
    <Form.Check
      custom
      inline
      type="checkbox"
      id="custom-inline-checkbox"
      label="DB"
      className="mr-3"
    />
    <Form.Check
      custom
      inline
      type="checkbox"
      id="custom-inline-checkbox"
      label="Mobile"
      className="mr-3"
    />
    <Form.Check
      custom
      inline
      type="checkbox"
      id="custom-inline-checkbox"
      label="All"
      className="mr-3"
    />
    <Form.Check
      custom
      inline
      type="checkbox"
      id="custom-inline-checkbox"
      label="None"
      className="mr-3"
    />
  </div>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Team Structure</Form.Label>
    <Form.Control as="input" placeholder="Placeholder Text"></Form.Control>
  </Form.Group>
  <Form.Group controlId="formBasicEmail1">
    <Form.Label>Architectural Implications</Form.Label>
    <Form.Control as="input" placeholder="Placeholder Text"></Form.Control>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Industry</Form.Label>
    <Form.Control as="input" placeholder="Placeholder Text"></Form.Control>
  </Form.Group>
  <div key="custom-inline-checkbox">
    <Form.Check
      custom
      inline
      type="checkbox"
      id="custom-inline-checkbox-1"
      label="Does it require a cloud solution"
      className="mr-3"
    />
  </div>
  <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label className="label-lg">Describe the Requirements in detail</Form.Label>
        <Form.Control as="textarea" rows={5} size="lg" value={text} onChange={e => setText(e.target.value)} />
      </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>

</div>

<div style={{background: 'rgba(255, 255, 255, 0.6)', padding: '20px', margin: '40px', width: '80%', height:'300px', overflow: 'auto'}}>
<Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
    <Tab eventKey="home" title="EPICS">
      <br/>
    <div>
    <ListGroup style={{ maxWidth: "100%" }}>
              {data.epics && data.epics.map((epic, index) => (
                <ListGroup.Item key={index}>{epic.title}</ListGroup.Item>
              ))}
  </ListGroup>
    </div>
    </Tab>
    <Tab eventKey="profile" title="TASKS">
    <br/>
    <div>
    <ListGroup style={{ maxWidth: "100%" }}>
              {data.tasks && data.tasks.map((task, index) => (
               <ListGroup.Item key={index} onClick={() => handleShow(task)}>
               {task.title}
             </ListGroup.Item>
              ))}
    </ListGroup>

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{selectedTask ? selectedTask.title : ''}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{selectedTask ? selectedTask.description : ''}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
    </div>
    </Tab>
    <Tab eventKey="contact" title="USER STORIES" >
    <br/>
    <div>
    <ListGroup style={{ maxWidth: "100%" }}>
              {data.user_stories && data.user_stories.map((user_story, index) => (
                <ListGroup.Item key={index}>{user_story.title}</ListGroup.Item>
              ))}
    </ListGroup>
    </div>
    </Tab>
  </Tabs>
</div>

</div>
  );
}

export default App;