import React, { Component } from 'react';
import './App.css';

import  {Button} from 'react-bootstrap';


class App extends Component {
  constructor(props){
    super(props);
    this.state={contacts:[]}
  }


  componentDidMount(){
       fetch("http://localhost:3000/phone_book/contacts")
      .then(response => response.json())
     .then(json => this.setState({contacts:json}))
      .catch(error => {console.log(error)})
    }
    
   

  render() {
    const contacts=this.state.contacts;
    console.log(contacts)

    return (
      <div>
      <h1>Phone Book</h1>
      <form>
      <input type='text'/>
      <Button bsStyle="primary">Search</Button>
      </form>
      <table className="table table-striped table-dark">
      <thead>
      <tr>
      <th>ID</th>
      <th>First name</th>
      <th>Last name</th>
      <th>Phone number</th>
      </tr>
      </thead>
       {contacts.map((contact)=> <DisplayContacts 
                                key={contact.id}
                                id={contact.id}
                                first_name={contact.first_name}
                                last_name={contact.last_name}
                                number={contact.number}
                                />
      )}
      <DisplayContacts contacts={contacts}/>
      </table>
      </div>
    );
  }
}

function DisplayContacts(props){
  return(   
    <tbody>
    <tr>
    <td>{props.id}</td>
    <td>{props.first_name}</td>
    <td>{props.last_name}</td>
    <td>{props.number}</td>
    </tr>
    </tbody>
    )}


export default App;
