/*
file: App.js
Author: Idan
Desc: Client side simulator
*/
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom'
/*
This component get data from user send it to the server and recieve the response from the server
*/
class Createorder extends Component {
  constructor(props) {
    super(props);
    this.state = { price: 333 ,
    firstname:'Idan',
    lastname:'malul',
    address:'shvil',
    city:'herzeliya',
    postcode:'25321',
    country:'israel',
    email:'idan@gmail.com',
    bademail:1,
    phone:'0526533646',
    url:''
   };
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleNameChange = this.handleNameChange.bind(this);
   this.handleLastChange = this.handleLastChange.bind(this);
   this.handleAddressChange = this.handleAddressChange.bind(this);
   this.handleCityChange = this.handleCityChange.bind(this);
   this.handlePostChange = this.handlePostChange.bind(this);
   this.handleCountryChange = this.handleCountryChange.bind(this);
   this.handleEmailChange = this.handleEmailChange.bind(this);
   this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }

  handleNameChange (event) {
      this.setState({firstname: event.target.value})
  }
  
    handleLastChange (event) {
      this.setState({lastname: event.target.value})
  }
    handleAddressChange (event) {
      this.setState({address: event.target.value})
  }
    handleCityChange (event) {
      this.setState({city: event.target.value})
  }
    handlePostChange (event) {
      this.setState({postcode: event.target.value})
  }
    handleCountryChange (event) {
      this.setState({country: event.target.value})
  }
    handleEmailChange (event) {
		this.setState({email: event.target.value) 
		if(event.target.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm))
      this.setState({bademail:0})
		else{  this.setState({bademail:1})
  }
    handlePhoneChange (event) {
      this.setState({phone: event.target.value})
  }
    
async handleSubmit() {

  /*
  send post request to the api with the user data, the api create a product and a matching woocommerce order
  */
await axios.post('http://localhost:3000/orders/createorder',{
  headers: {       
    "Content-Type": "application/json; charset=utf-8",
  },
price:this.state.price,
firstname:this.state.firstname,
lastname:this.state.lastname,
address:this.state.address,
city:this.state.city,
postcode:this.state.postcode,
country:this.state.country,
email:this.state.email,
phone:this.state.phone,
}).then(result => {
  console.log(result);
  this.setState({url:result.data},
  function () { this.props.onSubmit(this.state.url)})
})
.catch((error)=>{
  console.log(error);
});
}

render() {
    return (
      <div className="Createorder">
	          <form>
              <label>First Name:
              <input type="text" value={this.state.firstname} onChange={this.handleNameChange}/>
			  </label>
			  <br>
			  <label>Last Name:
              <input type="text" value={this.state.lastname} onChange={this.handleLastChange}/>
			  </label>
			  <br>
              <label>Address:
              <input type="text" value={this.state.address} onChange={this.handleAddressChange}/>
			  </label>
			  <br>
			  <label>City:
              <input type="text" value={this.state.city} onChange={this.handleCityChange}/>
			  </label>
			  <br>
              <label>Postcode:
              <input type="text" value={this.state.postcode} onChange={this.handlePostChange}/>
			  </label>
			  <br>
			  <label>Country:
              <input type="text" value={this.state.country} onChange={this.handleCountryChange}/>
			  </label>
			  <br>
              <label>email:
              <input type="text" value={this.state.email} onChange={this.handleEmailChange}/>
			  </label>
			  <br>
			  <label>Phone:
              <input type="text" value={this.state.firstname} onChange={this.handlePhoneChange}/>
			  </label>
			  <br>
              <button type="button" onclick="handleSubmit()" disabled=this.state.bademail >Submit</button>
          </form>
      </div>
      
    );
    }
}
/*
Route to the payment woocommerce page
*/
class Routetopayment extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
       this.props.url!=''?  window.location.assign(this.props.url): ''  
    )
}
}
/*
Main that contain the other components and link between them
*/
class App extends Component {
  constructor(props){
    super(props);
    this.state = {url : ''};
    this.handleUrlChange = this.handleUrlChange.bind(this);
  }

  handleUrlChange(event){
    const value = event;
    this.setState({url: value});
  }

  render() {
    return (
      <div className="App">
       <Router>
       <Route
          path='/createorder'
          render={(props) => <Createorder {...props} onSubmit={this.handleUrlChange} />}
/>
    </Router>
       
    <Routetopayment url={this.state.url}/>
      </div>
    );
  }
}

export default App;