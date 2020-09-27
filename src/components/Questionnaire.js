import React, {Component} from 'react'

class Questionnaire extends Component {

    state = {
        allergies: false,
        gender: '',
        dob: '',
        birthCountry: '',
        maritalStatus: '',
        smoke: false,
        alchohol: false,

        submitSuccess: false,
        snapshot: {
            allergies: null,
            gender: null,
            dob: null,
            birthCountry: null,
            maritalStatus: null,
            smoke: null,
            alchohol: null
        },
        error: null
    }

    //build FHIR QuestionnaireResponse -- included required fields and printed to console
    buildQuestionnaireResponse() {
        const item = [
            {
                linkId: "1",
                text: "Do you have allergies?",
                answer: [{
                    valueBoolean: this.state.allergies
                }]
            },
            {
                linkId: "2",
                text: "General questions",
                item: [
                    {
                    linkId: "2.1",
                    text: "What is your gender?",
                    answer: [{
                        valueString: this.state.gender
                    }]
                    },
                    {
                        linkId: "2.2",
                        text: "What is your date of birth?",
                        answer: [{
                            valueDate: this.state.dob
                        }]
                    }, 
                    {
                        linkId: "2.3",
                        text: "What is your country of birth?",
                        answer: [{
                            valueDate: this.state.birthCountry
                        }]
                    },
                    {
                        linkId: "2.4",
                        text: "What is your marital status?",
                        answer: [{
                            valueDate: this.state.maritalStatus
                        }]
                    }
                ]
            },
            {
                linkId: "3",
                text: "Intoxications",
                item: [
                    {
                    linkId: "3.1",
                    text: "Do you smoke?",
                    answer: [{
                        valueBoolean: this.state.smoke
                    }]
                    },
                    {
                        linkId: "3.2",
                        text: "Do you drink alchohol?",
                        answer: [{
                            valueBoolean: this.state.alchohol
                        }]
                    }
                ]
            },
        ]



        const response = {
            resourceType: "QuestionnaireResponse",
            status: 'completed',
            item: item
        }

        this.setState({submitSuccess: true})

        console.log(JSON.stringify(response))
    }

    //validate inputs and then build FHIR response
    handleSubmit(event) {
        event.preventDefault()

        if (!(this.state.allergies || this.state.allergies === false)) {
            this.setState({error: 'Something went wrong, please try again' })
            return

        } else if (this.state.gender.match(/\d/)) {
            this.setState({error: 'Gender must only contain alphabetic characters' })
            return
            
        } else if (this.state.gender === '') {
            this.setState({error: 'Please provide a gender' })
            return

        } else if (this.state.dob === '') {
            this.setState({error: 'Please provide a date' })
            return
            
        } else if (this.state.birthCountry.match(/\d/)) {
            this.setState({error: 'Birth country must only contain alphabetic characters' })
            return 

        } else if (this.state.birthCountry === '') {
            this.setState({error: 'Please provide a country of birth' })
            return 

        } else if (this.state.maritalStatus.match(/\d/)) {
            this.setState({error: 'Marital status must only contain alphabetic characters' })
            return 

        } else if (this.state.maritalStatus === '') {
            this.setState({error: 'Please provide a marital status' })
            return 

        } else if (!(this.state.smoke || this.state.smoke === false)) {
            this.setState({error: 'Something went wrong, please try again' })
            return

        } else if (!(this.state.alchohol || this.state.alchohol === false)) {
            this.setState({error: 'Something went wrong, please try again' })
            return

        } else {
            this.setState({error: null })
        }

        this.setState({snapshot: {
            allergies: this.state.allergies,
            gender: this.state.gender,
            dob: this.state.dob,
            birthCountry: this.state.birthCountry,
            maritalStatus: this.state.maritalStatus,
            smoke: this.state.smoke,
            alchohol: this.state.alchohol
        }})

        this.buildQuestionnaireResponse()
    }


    //handles changes in input elements
    handleChange(event) {
        const target = event.target
        const val = target.type === 'checkbox' ? target.checked : target.value

        this.setState({
            [target.name] : val
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <h3>Allergies</h3>
                    <div>
                        <label htmlFor='allergies'>Do you have allergies?</label>
                        <input 
                            type='checkbox' 
                            checked = {this.state.allergies}
                            onChange={(e) => this.handleChange(e)}
                            name='allergies'
                            id='allergies'
                        ></input>
                    </div>
                    

                    <h3>General Questions</h3>
                    <div>
                        <label htmlFor='gender'>What is your gender?</label>
                        <input 
                            type='text' 
                            value = {this.state.gender}
                            onChange={(e) => this.handleChange(e)}
                            name='gender'
                            id='gender'
                        ></input>
                    </div>
                    
                    <div>
                        <label htmlFor='dob'>What is your date of birth?</label>
                        <input 
                            type='date' 
                            value = {this.state.dob}
                            onChange={(e) => this.handleChange(e)}
                            name='dob'
                            id='dob'
                        ></input>
                    </div>
                    
                    <div>
                        <label htmlFor='birthCountry'>What is your country of birth?</label>
                        <input 
                            type='text' 
                            value = {this.state.birthCountry}
                            onChange={(e) => this.handleChange(e)}
                            name='birthCountry'
                            id='birthCountry'
                        ></input>
                    </div>

                    <div>
                        <label htmlFor='maritalStatus'>What is your marital status?</label>
                        <input 
                            type='text' 
                            value = {this.state.maritalStatus}
                            onChange={(e) => this.handleChange(e)}
                            name='maritalStatus'
                            id='maritalStatus'
                        ></input>                
                    </div>

                    <h3>Intoxications</h3>
                    <div>
                        <label htmlFor='smoke'>Do you smoke?</label>
                        <input 
                            type='checkbox' 
                            checked = {this.state.smoke}
                            onChange={(e) => this.handleChange(e)}
                            name='smoke'
                            id='smoke'
                        ></input>
                    </div>

                    <div>
                        <label htmlFor='alchohol'>Do you drink alchohol?</label>
                        <input 
                            type='checkbox' 
                            checked = {this.state.alchohol}
                            onChange={(e) => this.handleChange(e)}
                            name='alchohol'
                            id='alchohol'
                        ></input>
                    </div>

                    <input
                        type='submit'
                        value='Submit'
                    ></input>
                </form>

                {/* If submitting the form returns a validation error, display it */}
                {this.state.error? 
                <div>
                    {this.state.error}
                </div> 
                :null}

                {/* If submitting the form was successful, display the results -- snapshot ensures results do not change when input fields change*/}
                {this.state.submitSuccess? 
                    <div>
                        <h3>Questionnaire Results</h3>
                        <div>
                            Do you have allergies? 
                        </div>
                        <div>
                            {this.state.snapshot.allergies ? "Y":"N"}
                        </div>
                        <br/>

                        <div>
                            What is your gender? 
                        </div>
                        <div>
                            {this.state.snapshot.gender}
                        </div>
                        <br/>

                        <div>
                            What is your date of birth? 
                        </div>
                        <div>
                            {this.state.snapshot.dob}
                        </div>
                        <br/>

                        <div>
                            What is your country of birth? 
                        </div>
                        <div>
                            {this.state.snapshot.birthCountry}
                        </div>
                        <br/>

                        <div>
                            What is your marital status? 
                        </div>
                        <div>
                            {this.state.snapshot.maritalStatus}
                        </div>
                        <br/>

                        <div>
                            Do you smoke? 
                        </div>
                        <div>
                            {this.state.snapshot.smoke ? "Y":"N"}
                        </div>
                        <br/>

                        <div>
                            Do you drink alchohol? 
                        </div>
                        <div>
                            {this.state.snapshot.alchohol ? "Y":"N"}
                        </div>
                        <br/>
                    </div>
                :null}
                
            </div>
        )
    }
}
export default Questionnaire