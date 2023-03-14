import {Component} from "react";

class Price extends Component{
    constructor(props){
        super(props);
        this.state = {
            price: `${props.text}$`,
            exchangeRate: 390,
        };
    }

    changeCurrency = ()=>{
        const { price, exchangeRate } = this.state;
        let modifiedPrice;
        if(price.endsWith('$')){
            modifiedPrice = parseFloat(price)*exchangeRate + '֏';
        }
        else {
            modifiedPrice = parseFloat(price)/exchangeRate + '$';
        }
    
        this.setState({
            price: modifiedPrice,
        });
    };

    render(){

        return(
            <span>
                {this.state.price}
                <button
                onClick={this.changeCurrency}
                >
                Change the currency
                </button>
            </span>
        );
    }
}

export default Price;