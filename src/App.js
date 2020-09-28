import React, { Component } from "react";
import Table from './components/Table'
import Questionnaire from './components/Questionnaire'
import Practitioner from './components/Practitioner'
import ErrorBoundary from './hoc/ErrorBoundary'

class App extends Component {
  
  render() {
    return(
      <div>
        <Table/>
        <Questionnaire/>
        <ErrorBoundary>
          <Practitioner/>
        </ErrorBoundary>
        
      </div>
    )
  }
}

export default App;
