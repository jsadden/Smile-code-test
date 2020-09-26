import React, {Component} from 'react'
import { getPatients } from "../services/";

class Table extends Component {

    state = {
        patients: [],
        timestamp: null,
        searchName: '',
        searchDate: '',
        errors: null
    }

    //get patient data and set initial data
    componentDidMount() {
        getPatients().then((res) => {
          this.setState({
              patients: res.data.entry, 
              timestamp: res.headers['last-modified']}
           )
        });
    }

    //handles name input change
    handleNameChange(event) {
        this.setState({searchName: event.target.value})
    }

    //handles date input change
    handleDateChange(event) {
        this.setState({searchDate: event.target.value})
    }


    //handles form submit, checks name string for numbers, date input has built-in validation
    updateSearch(event) {
        event.preventDefault()

        //if a number is found in the name input, do not search, instead set an error
        if (this.state.searchName.match(/\d/)) {
            this.setState({errors: "Name field can only contain alphabetic characters."})
            return

        } else {
            this.setState({errors: null})
        }

        //get patients with search parameters
        getPatients(this.state.searchName, this.state.searchDate).then((res) => {
            this.setState({
                patients: res.data.entry, 
                timestamp: res.headers['last-modified']
            })
        });

    }

    render() {

        return(
            <div>
                <div>
                    {/* Search form */}
                    <form onSubmit={(e) => this.updateSearch(e)}>
                        <input placeholder="Name" value={this.state.searchName} onChange={(e) => this.handleNameChange(e)}></input>
                        <input type='date' value={this.state.searchDate} onChange={(e) => this.handleDateChange(e)}></input>
                        <input type='submit' value='Search'></input>
                    </form>
                    
                    {/* Displays errors from search form if they exist */}
                    {this.state.errors? 
                        <div>
                            {this.state.errors}
                        </div>
                    :null}
                    
                </div>
                
                {/* Displays formatted timestamp if it exists */}
                {this.state.timestamp? 
                    <div>
                        Results as of: {this.state.timestamp.slice(0, -12)} at {this.state.timestamp.slice(-12,-3)}
                    </div>
                :null}
                
                {/* Patient table */}
                <table>
                    <thead>
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* sort based on birthdate if it exists, undefined goes to bottom */}
                        {this.state.patients ? this.state.patients.sort(function(a, b) {
                            if (a.resource.birthDate && b.resource.birthDate) {
                                return a.resource.birthDate > b.resource.birthDate ? -1: 1

                            } else if (!a.resource.birthDate) {
                                return 1
                            }
                            else{
                                return -1
                            }

                        }).map((patient, i) => (
                            <tr key={i}> 
                                
                                <td>{(patient.resource.name && patient.resource.name[0].family) ? patient.resource.name[0].family : "N/A"}</td>
                                <td>{(patient.resource.name && patient.resource.name[0].given) ? patient.resource.name[0].given : "N/A"}</td>
                                <td>{patient.resource.birthDate ? patient.resource.birthDate : "N/A"}</td>
                                <td>{patient.resource.gender ? patient.resource.gender : "N/A"}</td>
                                <td>{patient.resource.id ? patient.resource.id : "N/A"}</td>
                            </tr>
                        ))
                        : 
                        null}
                    </tbody>
                </table>
            
            </div>
            
        )
    }
}

export default Table