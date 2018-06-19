import React, { Component } from 'react';
import './App.css';

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
      <h1>Phone Book APP</h1>
       {contacts.map((contact)=> <DisplayContacts 
                                key={contact.id}
                                id={contact.id}
                                first_name={contact.first_name}
                                last_name={contact.last_name}
                                number={contact.number}
                                />
      )}
      <DisplayContacts contacts={contacts}/>
      </div>
    );
  }
}

function DisplayContacts(props){
  return(
    <table>
   
    <tbody>
    <tr>
    <td>{props.id}</td>
    <td>{props.first_name}</td>
    <td>{props.last_name}</td>
    <td>{props.number}</td>
    </tr>
    </tbody>
    </table>
    )}
  // return(
  //   <div>
  //   {props.contacts.map((contact) => {
  //     return (
  //       <div>
  //       <p>{contact.first_name}</p>
  //       <p>{contact.last_name}</p>
  //       <p>{contact.number}</p>
  //       </div>
  //       )
  //   })}
  //   </div>
  //   )}



export default App;
