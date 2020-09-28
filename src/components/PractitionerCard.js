import React, {Component} from 'react'
import PropTypes from 'prop-types'


class PractitionerCard extends Component {

    //do data validation and formatting on init
    state = {
        data: {
            id: this.props.data.id ? this.props.data.id : "N/A",
            name: (this.props.data.name && !this.props.data.name.match(/undefined/i)) ? this.props.data.name : "N/A",
            gender: this.props.data.gender ? this.props.data.gender : "N/A",
            dob: this.props.data.dob ? this.props.data.dob.slice(0,4) + "/" + this.props.data.dob.slice(5,7) + "/" + this.props.data.dob.slice(8,10): "N/A",
            photo: this.props.data.photo ? this.props.data.photo : "N/A"
        },
        deletePending: false
    }

    //call parent delete function and pass the ID
    deletePractitioner() {
        this.props.deleteMe(this.state.data.id)
    }


    render() {
        return (
            <div>
                <img
                    src={this.state.data.photo}
                    alt="Avatar"
                    style={{ height: 50, width: 50, borderRadius: "50%" }}
                />
                <div>Name: {this.state.data.name}</div>
                <div>Gender: {this.state.data.gender}</div>
                <div>DOB: {this.state.data.dob}</div>
                
                {/* Require confirmation if delete buttin is clicked */}
                {this.state.deletePending? 
                    <div>
                        <div>Are you sure you want to delete this practitioner?</div>
                        <button onClick={() => this.deletePractitioner()}>Yes</button>
                        <button onClick={() => this.setState({deletePending: false})}>Cancel</button>
                    </div>
                :
                    <button onClick={() => this.setState({deletePending: true})}>Delete</button>
                }

            </div>
        )
    }
}


//typechecking
PractitionerCard.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        gender: PropTypes.string,
        dob: PropTypes.string,
        photo: PropTypes.string

    }).isRequired,

    deleteMe: PropTypes.func.isRequired
}


export default PractitionerCard