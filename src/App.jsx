import {Component} from 'react';
import './App.css';
import Product from "./products/Product";

class App extends Component{

  state = {
    products:[
      {    
        name:'banana', 
        price:'5', 
        description: 'Fresh bananas from Ecuador'
      },
      {    
        name:'apple', 
        price:'4', 
        description: 'Golden apples'
      },
      {    
        name:'pear', 
        price:'8', 
        description: 'Sweet pears!'
      },
    ],
  }
  render(){

    const productComponents = this.state.products.map((product)=>{
      return (
        <Product 
        key={product.name}
        name={product.name} 
        price={product.price} 
        description={product.description}
        />
      )
    });

    return (
      <div className="App">

        {productComponents}

      </div>
    );
  }
  
}

export default App;
