import './App.css';
import AddProduct from './Components/AddProduct';
import Navbar from './Components/Navbar';
import AllRoutes from './Routes/AllRoutes';
 

function App() {
  return (
    <>
     <div
  style={{
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',    
    //  border: '1px solid red',
   boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
   background: '#d3d3d3',
   height: '60px'
  }}
>
  <Navbar />
 
</div>

<AllRoutes/>

    </>
  );
}

export default App;
