import {Component} from "react";

class Name extends Component{

    render(){
        const {text} = this.props;
        return(
            <span>{text}</span>
        );
    }
}

export default Name;