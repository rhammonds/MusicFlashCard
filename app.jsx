class App extends React.Component {
  constructor(){
    super();
    this.state = {searchName:'', items: []


      
      
    }
  }

  
  render(){
    let items = this.state.items;
    console.log(items[0]);
  
    return (
      <div>
          <Controls/>
      </div>
    )
  }
}

const Person = (props) => <h4>{props.person.name}</h4>
const Controls  = (props) => 
    <div>
      <div><h1>Music Notes Flash Cards</h1></div>
        <button   className="btn btn-default" style={{ marginLeft:12 }}>Start</button>
        <button   className="btn btn-default" style={{ marginLeft:12 }}>Next</button>
        <label><input type="checkbox" />&nbsp;Show Score</label>
    </div>
    
const Staff = (props) =>
      <div id="staff" className="staff"  >
      </div>


ReactDOM.render(<App />, document.getElementById('root'));