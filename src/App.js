import React, { Component } from 'react';
import './App.css';

import  {Button} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery'


class App extends Component {
  constructor(props){
    super(props);
    this.state={contacts:[],search:null,newContact:{}}  
  }


  search(event){
    event.preventDefault()
    this.setState({search:event.target.value})
  }

  setSearch(){
    console.log(this.state.search)
    // let search=this.state.search
    // let first_name=$('#first_name')
    // let last_name=$('#last_name')
    // if(search==first_name){
    //   alert (search)}
    
  }

  componentDidMount(){
       fetch("http://localhost:3000/phone_book/contacts")
      .then(response => response.json())
     .then(json => this.setState({contacts:json}))
      .catch(error => {console.log(error)})
    }




    
   addNew(){
      let newContact={
        first_name:$('#first_name').val(),
        last_name:$('#last_name').val(),
        number:$('#number').val()
      }

      fetch('http://localhost:3000/phone_book/post',{
      method:'POST',
      body:JSON.stringify(newContact),
          }).then((body)=>console.log(body)
          ).then(this.setState(prev => ({ contacts:[...prev.contacts,newContact]})))
      }
    

   //  let firstName=$('#insert')
   //  let lastName=$('#last')
   //  let phoneNumber=$('#num')

   //  let post={
   //    first_name:firstName.val(),
   //      last_name:lastName.val(),
   //      number:phoneNumber.val()
   //  }
   //  fetch('http://localhost:3000/phone_book/post',{
   //    method: 'POST',
   //    body: JSON.stringify(post)
      
   //  })
   //  .then(res=>console.log(res))
   // }

  render() {
    const contacts=this.state.contacts;
    return (
      <div>
      <h1>Phone Book</h1>
      <form>
      <input type='text'  onChange={this.search.bind(this)}/>
      <Button bsStyle="success" className='searchButton'  onClick={this.setSearch.bind(this)}>Search</Button>
      <Button bsStyle="primary" data-toggle="modal" data-target="#exampleModalCenter" data-toggle="modal" data-target="#myModal">Add new</Button>
  <div className="modal fade" id="myModal" role="dialog">
    <div className="modal-dialog">
    
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Add new contact</h4>
        </div>
        <div className="modal-body">
          <p>First name: </p><input type='text' id='first_name'/>
          <p>Last name:</p><input type='text' id='last_name'/>
          <p>Phone number:</p> <input type='number' id='number'/>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" onClick={this.addNew.bind(this)}>Save</button>
        </div>
      </div>
      
    </div>
  </div>
      </form>          
      <table className="table table-striped table-dark">
      <thead>
      <tr>
      <th>First name</th>
      <th>Last name</th>
      <th>Phone number</th>
      </tr>
      </thead>
       {contacts.map((contact,key)=> <DisplayContacts
                                key={key} 
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
    <td >{props.first_name}</td>
    <td >{props.last_name}</td>
    <td>{props.number}</td>
    <td><i className="fa fa-minus-circle" title='Delete'></i></td>
  </tr>
  </tbody>
    )}


export default App;
