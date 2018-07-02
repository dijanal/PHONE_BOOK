
import React, { Component } from 'react';
import './App.css';

import  {Button} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery'


class App extends Component {
  constructor(props){
    super(props);
    this.state={contacts:[],search:[],newContact:{}}; 

    this.deleteContact=this.deleteContact.bind(this);
    this.refresh=this.refresh.bind(this)
  }


  search(event){
    event.preventDefault();
    this.setState({search:event.target.value});
  }


  componentDidMount(){
        this.refresh()      
    }

    refresh(){
      fetch("http://localhost:3000/phone_book/contacts")
    .then(response => response.json())
    .then(json => this.setState({contacts:json}))
    .catch(error => {console.log(error)})
    }


  addNew(){

    let first_name=$('#first_name')
    let last_name=$('#last_name')
    let number=$('#number')

    let newContact={
      first_name:$('#first_name').val(),
      last_name:$('#last_name').val(),
      number:$('#number').val()
    }

    this.setState( prevState=>({contacts:[...prevState.contacts,newContact]}))

    fetch('http://localhost:3000/phone_book/post',{
    method:'POST',
    body:JSON.stringify(newContact),
    headers: {
                  'Content-Type': 'application/json'
              }
        })
    .then(()=> this.refresh())
    .then(console.log(this.state.contacts))
    .then((body)=>console.log(body))
    .then(console.log(newContact))
    .catch(error => {console.log(error)})

    first_name.val('');
    last_name.val('');
    number.val('');
    }


   
  deleteContact(id)  {
    let users= [...this.state.contacts];
    users.splice(id, 1);
    this.setState({contacts:users});
    let deleted={"id":id};

    fetch('http://localhost:3000/phone_book/delete', {
    method: 'DELETE',
    body:JSON.stringify(deleted),
    headers: {
            "Content-Type": "application/json"
        }
    }).then(()=>{this.refresh()})
    .catch(err => {
        console.log(err);
    });

  };

  clearInput(){
    $('#first_name').val('');
    $('#last_name').val('');
    $('#number').val('');
  }
     

  render() {
    const contacts=this.state.contacts.filter((name) =>{ return name.first_name.toLowerCase().indexOf(this.state.search.toString().toLowerCase()) !== -1})
    return (
      <div>
      <h1>Phone Book</h1>
      <form>
      <input type='text'  placeholder="Search by name..." onChange={this.search.bind(this)}/>
      <Button bsStyle="primary" data-toggle="modal"  data-target="#myModal">Add new contact</Button>
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" onClick={this.clearInput.bind(this)}>&times;</button>
              <h4 className="modal-title">Add new contact</h4>
            </div>
            <div className="modal-body">
              <p>First name: </p><input type='text' id='first_name'/>
              <p>Last name:</p><input type='text' id='last_name'/>
              <p>Phone number:</p> <input type='text' id='number'/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.addNew.bind(this)}>Save</button>
            </div>
          </div>
        </div>
      </div>
      </form>  
      <div className='dataWraper'>        
      <div className='tableWraper'>
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
                                delete={this.deleteContact}
                                />
        )}
      </table>
      </div>
      </div>
      </div>
    );
  }
}

class DisplayContacts extends Component{
    
  render(){
    return( 
      <tbody> 
        <tr>
          <td >{this.props.first_name}</td>
          <td >{this.props.last_name}</td>
          <td>{this.props.number}</td>
          <td onClick={()=>this.props.delete(this.props.id)}><i className="fa fa-minus-circle" title='Delete' ></i></td>

          </tr>
      </tbody>
    )};
}

export default App;

