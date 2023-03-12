import {Component} from "react";

class Price extends Component{

    render(){
        const {text} = this.props;
        return(
            <span>{text}</span>
        );
    }
}

export default Price;