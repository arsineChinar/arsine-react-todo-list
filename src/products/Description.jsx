import {Component} from "react";

class Description extends Component{

    render(){
        const {text} = this.props;
        return(
            <div>{text}</div>
        );
    }
}

export default Description;