import React, { Component } from "react";
import Table from './components/Table'
import Questionnaire from './components/Questionnaire'

class App extends Component {
  
  render() {
    return(
      <div>
        <Table/>
        <Questionnaire/>
      </div>
    )
  }
}

export default App;
