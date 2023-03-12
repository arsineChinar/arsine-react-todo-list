import './App.css';
import Product from "./products/Product";

function App() {
  return (
    <div className="App">
      <Product 
      name="Banana"
      price="2$"
      description="Fresh bananas from Ecuador"
      />

      <Product 
      name="Apple"
      price="1$"
      description="Fresh apples"
      />

      <Product 
      name="Pear"
      price="5$"
      description="Fresh pears"
      />
    </div>
  );
}

export default App;
