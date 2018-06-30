
import React, { Component } from 'react';
import './App.css';

import  {Button} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery'


class App extends Component {
  constructor(props){
    super(props);
    this.state={contacts:[],search:[],newContact:{}}  

    this.deleteContact=this.deleteContact.bind(this)
  }


  search(event){
    event.preventDefault()
    this.setState({search:event.target.value})
  }

  setSearch(){
    console.log(this.state.search)
  //   this.state.contacts.filter((name) =>{ console.log( name.first_name.toLowerCase().indexOf(this.state.search.toLowerCase()) >=0)})
  //    // this.state.contacts.filter(
  //    //  (contact) => {console.log( contact.first_name.toLowerCase().indexOf(this.state.search) !== -1);
  //    //  }
  //     // )
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

      this.setState( prev=>({contacts:[...prev.contacts,newContact]}))

      fetch('http://localhost:3000/phone_book/post',{
      method:'POST',
      body:JSON.stringify(newContact),
      headers: {
                    'Content-Type': 'application/json'
                }
          })
      // .then(()=> {this.componentDidMount()})
      .then((body)=>console.log(body))
      .then(console.log(newContact))
      .catch(error => {console.log(error)})
      }

       
      deleteContact(contacts){
        this.setState({contacts})
      }   

// deletedContact= (key,user_id) => {

//   let users= [...this.state.contacts];
//   users.splice(key, 1);
//   this.setState({contacts:users});
//     let del={"id":user_id};}

//   fetch('http://localhost:3000/phone_book/delete' + id,{
//     method:'DELETE',
//     body:JSON.stringify(del),
//     headers:{"Content-Type":"application/json"}
//   }) 
// }

  render() {
    const contacts=this.state.contacts.filter((name) =>{ return name.first_name.toLowerCase().indexOf(this.state.search) !==-1})
    return (
      <div>
      <h1>Phone Book</h1>
      <form>
      <input type='text'   onChange={this.search.bind(this)}/>
      <Button bsStyle="success" className='searchButton'  onClick={this.setSearch.bind(this)}>Search</Button>
      <Button bsStyle="primary" data-toggle="modal" data-target="#modal" data-toggle="modal" data-target="#myModal">Add new</Button>
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
          <p>Phone number:</p> <input type='text' id='number'/>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.addNew.bind(this)}>Save</button>
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
                                contact={contact}
                                deleteContact={this.deleteContact}
                                />
      )}
      </table>
      <div>
      
      </div>

      </div>
    );
  }
}

class DisplayContacts extends Component{

  // constructor(props){
  //   super(props)
  //   this.state={contacts:[]}
  // }

  // componentDidMount(){
  //     fetch("http://localhost:3000/phone_book/contacts")
  //     .then(response => response.json())
  //     .then(json => this.setState({contacts:json}),console.log(this.state.contacts))
  //     .catch(error => {console.log(error)}) 

  // }


  deleteContact(){

      // this.setState( prev=>({contacts:[...prev.contacts,this.props.deletedContact]}))

        fetch('http://localhost:3000/phone_book/delete' + this.props.id, {
            method: 'DELETE',

        })
        // .then(()=> {this.componentDidMount()})
        .catch(err => {
            console.log(err);
        })

window.location.reload()      
}



      
  render(){
  return( 
  <tbody> 
  <tr>
    <td >{this.props.first_name}</td>
    <td >{this.props.last_name}</td>
    <td>{this.props.number}</td>
    <td onClick={this.deleteContact.bind(this)}><i className="fa fa-minus-circle" title='Delete' ></i></td>
  </tr>
  </tbody>
    )}
}


export default App;

