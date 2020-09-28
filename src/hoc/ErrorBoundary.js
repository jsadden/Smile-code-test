import React, {Component} from 'react'

class ErrorBoundary extends Component {

    constructor(props) {
        super (props)

        this.state = {
            hasError: false,
        }
    }

    //sets error state
    static getDerivedStateFromError(error) {
        return {hasError: true}
    }


    //render fallback UI if error state exists
    render(){
        if (this.state.hasError) {
            return (
                <h1>
                    I Crashed!
                </h1>
            )

        } 
        return this.props.children
    }

}

export default ErrorBoundary