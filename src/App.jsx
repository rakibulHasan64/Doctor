import { Outlet } from "react-router-dom";
import Footer from "./componet/home/naver/Footer";
import Naver from "./componet/home/naver/Naver";



function App() {


  return (
    <>
    
      
      <Naver />
      <Outlet />
      <Footer />
    </>
  )
} 

export default App;
