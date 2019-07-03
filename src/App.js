import React, { useState , useRef} from 'react';
import { Icon } from 'antd'
import './App.css';
const axios = require('axios');

function App() {
  
  const [ideas, setIdeas] = useState([{
    id: 0,
    title: "title 0",
    created_date: "2018-05-14T01:29:21.000Z",
    body: "body 0"
  },
  {
    id: 1,
    title: "title 1",
    created_date: "2018-05-14T01:29:21.000Z",
    body: "body 1"
  },
  {
    id: 2,
    title: "title 2",
    created_date: "2018-05-14T01:29:21.000Z",
    body: "body 2"
  }
,
{
  id: 3,
  title: "title 3",
  created_date: "2018-05-14T01:29:21.000Z",
  body: "body 3"
}
  ]);

  const [isCreate, setCreate] = useState(false);
  let [NewID, setNewID] = useState({
    id: 0,
    title: "",
    created_date: "",
    body: ""
  });

  const addNew = e => {
    if (!isCreate){
      axios.get('ideas/new') // fetch new ideas id
      .then(function (response) {
        setNewID(response);
      })
      .catch(function (error) {
        // handle error
        let tmpRes = {
          id: 4,
          created_date: "2018-05-14T01:29:21.000Z",
          title: "",
          body: ""
        } // assuming the format of the json object is like this
        setNewID(tmpRes);
        console.log(error);
      })
    }
    setCreate(!isCreate);
  };


  const removeIdea = id => {
    axios.delete('idea/delete', {
      id: id
    })
    .then(function (response) {
      //if successfully deleted in the backend the remove it in the view
      setIdeas(ideas.filter(idea => idea.id !== id));
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      setIdeas(ideas.filter(idea => idea.id !== id)); //since it will fail just remove it for the sake of sample
    });
    console.log('call remove');
  };

  return (
    <div className="App">
      <div className="idea-container">
      {ideas.map((object, i)=> (
        <div key={i} className="idea-box">
          <ul className="item-list">
            <li><span>ID </span>: {object.id}</li>
            <li><span>Title </span>: {object.title}</li>
            <li><span>Body</span>: {object.body}</li>
          </ul>
          <button onClick={() => removeIdea(object.id)} className="remove-btn"><Icon type="delete" /></button>
        </div>
      ))}
      </div>
      {!isCreate && 
        <button className="add-new" onClick={() => addNew()}>ADD NEW IDEA</button>
      }
      {isCreate && 
        <button className="add-new" onClick={() => addNew()}>HIDE INPUT</button>
      }
      {isCreate && <div className="add-form">
      <h1>ADD NEW IDEA</h1>
      <div className="form">
      <div>ID: {NewID.id}</div>
        <div><label>
          Title:
          <input type="text" placeholder="title" autoFocus={true} />
        </label></div>
        <div><label>
          Body:
          <input type="text" placeholder="body"/>
        </label></div>
        </div>
      </div>}
     
    </div>
  );
}

export default App;
