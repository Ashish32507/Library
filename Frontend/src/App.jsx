import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookList from "./Component/BookList";
import Carousel from "./Component/Carousel";

function App() {
  return (
    <>
      <Navbar />
      <Carousel />
      <BookList />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
