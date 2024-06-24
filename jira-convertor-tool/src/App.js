import React, { useState } from 'react';
import './App.css';
// import backgroundImage from './dark-grunge-texture.jpg';
import '@trimbleinc/modus-react-bootstrap/css/dist/modus-react-bootstrap.min.css';

import {Button} from '@trimbleinc/modus-react-bootstrap';
import {Form} from '@trimbleinc/modus-react-bootstrap';
import {Tabs, Tab} from '@trimbleinc/modus-react-bootstrap';
import {ListGroup} from '@trimbleinc/modus-react-bootstrap';
import {Modal} from '@trimbleinc/modus-react-bootstrap';
import {Spinner} from '@trimbleinc/modus-react-bootstrap';
import { BsDiagram3Fill } from 'react-icons/bs';
// import WorkflowDiagram from './WorkflowDiagram';


function App() {

  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [teamStructure, setTeamStructure] = useState('');
  const [architecturalImplications, setArchitecturalImplications] = useState('');
  const [industry, setIndustry] = useState('');
  const [data, setData] = useState(null); 
  // const [data1] = useState({
  //   "epics": [
  //     {
  //       "Architectural Implications": "Secure handling of image uploads, Scalability for handling large numbers of image uploads.",
  //       "Impacted_Features": "Floor Plan Management",
  //       "acceptance_criteria": "Users can upload floor plans.\n  - Images are validated for format and size.\n  - Images are stored in the cloud storage.\n  - Uploaded floor plans are displayed in a list.\n-",
  //       "dependencies": "Cloud storage setup for floor plans.",
  //       "description": null,
  //       "estimation": "5 Story Points",
  //       "priority": "High",
  //       "title": "Upload Floor Plans",
  //       "workflow": ""
  //     },
  //     {
  //       "Architectural Implications": "Secure and efficient connection handling.",
  //       "Impacted_Features": "360 Camera Integration",
  //       "acceptance_criteria": "Users can connect to a 360 camera via WiFi.\n  - Connection status is displayed to the user.\n-",
  //       "dependencies": "WiFi connection handling.",
  //       "description": null,
  //       "estimation": "4 Story Points",
  //       "priority": "High",
  //       "title": "Connect to 360 Camera",
  //       "workflow": ""
  //     },
  //     {
  //       "Architectural Implications": "Secure handling of image captures, Efficient mapping of images to points on the floor plan.",
  //       "Impacted_Features": "Capture and Map 360 Images",
  //       "acceptance_criteria": "Users can select a floor plan.\n  - Users can mark points on the floor plan.\n  - Users can capture images at marked points.\n-",
  //       "dependencies": "Floor plan upload functionality, 360 camera connection.",
  //       "description": null,
  //       "estimation": "6 Story Points",
  //       "priority": "High",
  //       "title": "Mark Points on Floor Plan",
  //       "workflow": ""
  //     },
  //     {
  //       "Architectural Implications": "Secure storage of images, Scalability for handling large numbers of images.",
  //       "Impacted_Features": "Capture and Map 360 Images",
  //       "acceptance_criteria": "Captured images are saved to the cloud.\n  - Images are correctly mapped to the points on the floor plan.\n-",
  //       "dependencies": "Cloud storage setup, Point marking functionality.",
  //       "description": null,
  //       "estimation": "5 Story Points",
  //       "priority": "High",
  //       "title": "Save Captured Images to Cloud",
  //       "workflow": ""
  //     },
  //     {
  //       "Architectural Implications": "Efficient image rendering, Secure access to images.",
  //       "Impacted_Features": "View Captured 360 Images",
  //       "acceptance_criteria": "Users can view captured 360 images.\n  - Images are displayed at the correct points on the floor plan.\n-",
  //       "dependencies": "Image capture and saving functionality.",
  //       "description": null,
  //       "estimation": "4 Story Points",
  //       "priority": "Medium",
  //       "title": "Display Captured Images",
  //       "workflow": ""
  //     }
  //   ],
  //   "user_stories": [
  //     {
  //       "Impacted_Features": "Floor Plan Management",
  //       "acceptance_criteria": "Users can upload floor plans.\n  - Images are validated for format and size.\n  - Images are stored in the cloud storage.\n  - Uploaded floor plans are displayed in a list.\n-",
  //       "dependencies": "Cloud storage setup for floor plans.",
  //       "description": "As a user, I want to upload floor plans so that I can manage and view them within the application.",
  //       "estimation": "5 Story Points",
  //       "priority": "High",
  //       "title": "Implement Floor Plan Upload Functionality",
  //       "workflow": "User -> Floor Plan Upload Component: Select floor plan\nFloor Plan Upload Component -> Frontend: Validate image size and format\nFrontend -> Floor Plan Upload Component: Display validation errors (if any)\nUser -> Floor Plan Upload Component: Correct errors and submit floor plan\nFloor Plan Upload Component -> Cloud Storage: Store floor plan\nCloud Storage -> Floor Plan Upload Component: Return image URL\nFloor Plan Upload Component -> User: Display uploaded floor plan"
  //     },
  //     {
  //       "Impacted_Features": "360 Camera Integration",
  //       "acceptance_criteria": "Users can connect to a 360 camera via WiFi.\n  - Connection status is displayed to the user.\n-",
  //       "dependencies": "WiFi connection handling.",
  //       "description": "As a user, I want to connect to a 360 camera via WiFi so that I can capture images.",
  //       "estimation": "4 Story Points",
  //       "priority": "High",
  //       "title": "Implement 360 Camera Connection",
  //       "workflow": "User -> Mobile App: Connect to 360 camera\nMobile App -> WiFi Service: Establish connection\nWiFi Service -> Mobile App: Confirm connection\nMobile App -> User: Display connection status"
  //     },
  //     {
  //       "Impacted_Features": "Capture and Map 360 Images",
  //       "acceptance_criteria": "Users can select a floor plan.\n  - Users can mark points on the floor plan.\n  - Users can capture images at marked points.\n-",
  //       "dependencies": "Floor plan upload functionality, 360 camera connection.",
  //       "description": "As a user, I want to mark points on a floor plan and capture images at those points using a 360 camera.",
  //       "estimation": "6 Story Points",
  //       "priority": "High",
  //       "title": "Implement Point Marking on Floor Plan",
  //       "workflow": "+------------------+\n|   Dashboard/Main |\n|   Page           |\n+------------------+\n|        v         |\n+------------------+\n|   Floor Plan     |\n|   Selection      |\n+------------------+\n|        v         |\n+------------------+\n|   Mark Points    |\n+------------------+\n|        v         |\n+------------------+\n|   Capture Images |\n+------------------+"
  //     },
  //     {
  //       "Impacted_Features": "Capture and Map 360 Images",
  //       "acceptance_criteria": "Captured images are saved to the cloud.\n  - Images are correctly mapped to the points on the floor plan.\n-",
  //       "dependencies": "Cloud storage setup, Point marking functionality.",
  //       "description": "As a user, I want to save captured 360 images to the cloud and map them to the corresponding points on the floor plan.",
  //       "estimation": "5 Story Points",
  //       "priority": "High",
  //       "title": "Implement Image Saving to Cloud",
  //       "workflow": "User -> 360 Camera: Capture image\n360 Camera -> Mobile App: Send captured image\nMobile App -> Cloud Storage: Save image\nCloud Storage -> Mobile App: Return image URL\nMobile App -> Floor Plan Service: Map image URL to point\nFloor Plan Service -> Database: Save mapping\nDatabase -> Floor Plan Service: Confirm save\nFloor Plan Service -> Mobile App: Confirm mapping"
  //     },
  //     {
  //       "Impacted_Features": "View Captured 360 Images",
  //       "acceptance_criteria": "Users can view captured 360 images.\n  - Images are displayed at the correct points on the floor plan.\n-",
  //       "dependencies": "Image capture and saving functionality.",
  //       "description": "As a user, I want to view the captured 360 images mapped to the points on the floor plan.",
  //       "estimation": "4 Story Points",
  //       "priority": "Medium",
  //       "title": "Implement Viewing of Captured 360 Images",
  //       "workflow": "+------------------+\n|   Dashboard/Main |\n|   Page           |\n+------------------+\n|        v         |\n+------------------+\n|   Floor Plan     |\n|   Selection      |\n+------------------+\n|        v         |\n+------------------+\n|   View Images    |\n+------------------+\n|        v         |\n+------------------+\n|   Display Images |\n+------------------+"
  //     }
  //   ]
  // }
  // );

const [show, setShow] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);
//const [resData, setData] = useState({ epics: [], user_stories: [] });

const handleClose = () => setShow(false);
const handleShow = (task) => {
  setSelectedTask(task);
  setShow(true);
};


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const message = `\nDescription: It is a mobile based application and needs cloud solution ${text} Team Structure: ${teamStructure}\nArchitectural Implications: ${architecturalImplications}\nIndustry: ${industry} `;
    console.log(message);
    fetch('http://127.0.0.1:5000/sendmessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        stream: false,
        model_id: 'gpt-4'
      })
    })
    .then(response => {
      setIsLoading(false);
      if (response.ok) {
        console.log('Success:', response);
        return response.json();
      } else {
        console.error('Error:', response);
      }
    })
    .then(data => {
      setData(data);
      //console.log('Data:.....', resData);
  })
    .catch(error => {
      setIsLoading(false);
      console.error('Fetch Error:', error);
    });
  };
  return (
    <div className="App" style={{
    backgroundColor: '#dcedf9',
       display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
     {isLoading && (
      <div className="overlay">
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    )}
      <div style={{background: 'rgba(255, 255, 255, 0.8)', padding: '20px', margin: '40px', width: '90%'}}>
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
      id="custom-inline-checkbox2"
      label="API/Services"
      className="mr-3"
    />
    <Form.Check
      custom
      inline
      type="checkbox"
      id="custom-inline-checkbox3"
      label="DB"
      className="mr-3"
    />
    <Form.Check
      custom
      inline
      type="checkbox"
      id="custom-inline-checkbox4"
      label="Mobile"
      className="mr-3"
    />
    <Form.Check
      custom
      inline
      type="checkbox"
      id="custom-inline-checkbox5"
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
    <Form.Control as="input" placeholder="Placeholder Text" value={teamStructure} onChange={e => setTeamStructure(e.target.value)} />
  </Form.Group>
  <Form.Group controlId="formBasicEmail1">
    <Form.Label>Architectural Implications</Form.Label>
    <Form.Control as="input" placeholder="Placeholder Text" value={architecturalImplications} onChange={e => setArchitecturalImplications(e.target.value)} />
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Industry</Form.Label>
    <Form.Control as="input" placeholder="Placeholder Text" value={industry} onChange={e => setIndustry(e.target.value)} />
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

<div style={{background: 'rgba(255, 255, 255, 0.8)', padding: '20px', margin: '40px', width: '90%', height:'300px', overflow: 'auto'}}>
<Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
    <Tab eventKey="home" title="EPICS">
      <br/>
    <div>
    <ListGroup style={{ maxWidth: "100%" }}>
              {data && data.epics && data.epics.map((epic, index) => (
                <ListGroup.Item key={index}>{epic.title}</ListGroup.Item>
              ))}
  </ListGroup>
    </div>
    </Tab>
    <Tab eventKey="profile" title="USER STORIES">
    <br/>
    <div>
    <ListGroup style={{ maxWidth: "100%" }}>
              {data && data.user_stories && data.user_stories.map((user_story, index) => (
               <ListGroup.Item key={index} onClick={() => handleShow(user_story)}>
               {user_story.title}
             </ListGroup.Item>
              ))}
    </ListGroup>

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{selectedTask ? selectedTask.title : ''}</Modal.Title>
    </Modal.Header>
    <div class="jira-board-container">
        <div class="jira-board">
            <button class="diagram-button" onClick={window.downloadWorkflowImage}><BsDiagram3Fill /> Download</button>
            <br/>
            <div class="field">
                <label>Description:</label>
                <p>{selectedTask ? selectedTask.description : ''}</p>
            </div>
            <div class="field">
                <label>Workflow:</label>
                <p>{selectedTask ? selectedTask.workflow : ''}</p>
            </div>
            <div class="field">
                <label>Acceptance Criteria:</label>
                <p>{selectedTask ? selectedTask.acceptance_criteria : ''}</p>
            </div>
            <div class="field">
                <label>Dependencies:</label>
                <p>{selectedTask ? selectedTask.dependencies : ''}</p>
            </div>
            <div class="field">
                <label>Impacted Features:</label>
                <p>{selectedTask ? selectedTask.Impacted_Features : ''}</p>
            </div>
            <div class="field">
                <label>Estimation:</label>
                <p>{selectedTask ? selectedTask.estimation : ''}</p>
            </div>
        </div>
    </div>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
    </div>
    </Tab>
  </Tabs>
</div>

</div>
  );
}

export default App;