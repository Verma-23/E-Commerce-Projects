import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import CardList from './Components/CardList/card-list-component';

class App extends Component {
  constructor () {
    super();

    this.state = {
      services : [],
      searchField: ''
    }
  }


  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => this.setState(() => {
      return {services : users}
    },
    () => {
      console.log(this.state)
    }
    ))
  }

  onSearchChange = (event) => {
    const searchString = event.target.value.toLocaleLowerCase();
    
    this.setState(() => {
      return {searchField : searchString}
    })
  }
  render(){
    const {services, searchField} = this.state;
    const {onSearchChange} = this;

    const filteredServices = services.filter((service) => {
      return service.name.toLocaleLowerCase().includes(searchField);
    })

    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hi Mohit {this.state.name} ! Preparing React Again ! and I work at {this.state.company}
          </p>
          <button onClick={() => {
            this.setState(() => {
              return {
                name : 'Rohit',
                company : 'Brivon Solutions'
              }
            }, () => {
              console.log(this.state)
            });
          }}>Change Name</button>

          <input type="text" className='searchInput' placeholder='Search Here' onChange={onSearchChange}/>

          <h1>OUR SERVICES</h1>
          {filteredServices?.map((service) => {
            return <p key={service.id}>{service.name}</p>
          })}

          {/* card list component */}

          <CardList/>
        </header>
      </div>
    );
  }
  
}

export default App;
