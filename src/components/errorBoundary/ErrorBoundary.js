import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state={
        error: false
    }

    // static getDerivedStateFromError(error){                 //Метод, який ТІЛЬКИ оновлює state
    //     return ({error: true})                              //Повертає об'єкт, який оновлює state
    // }

    componentDidCatch(err, info){
        console.log(err, info)
        this.setState({error: true})
    }

    render(){
        if(this.state.error){
            return <ErrorMessage/>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;