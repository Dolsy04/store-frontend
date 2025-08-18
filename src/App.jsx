import { useState,useRef,useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./components/header.jsx";
import ResponsiveHeader from "./components/responsiveHeader.jsx";
import HeroSection from './components/hero-section.jsx';
import TopBanner from "./components/top-banner.jsx";
import About from './components/about.jsx';
import FeaturedProduct from "./components/featuredproduct.jsx";
import Testimonial from './components/testimonial.jsx';
import FAQSection from "./components/faq.jsx";
import Contact from "./components/contact.jsx";
import Footer from "./components/footer.jsx";
import { Route, Routes } from 'react-router-dom';
import Shop from "./pages/shop.jsx";
import SignUp from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Cart from './pages/cart.jsx';
import Checkout from "./pages/checkout.jsx";
import Success from './pages/success.jsx';
import OrderHistory from "./pages/orderHistory.jsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const aboutRef = useRef(null);
  const testimonialRef = useRef(null);
  const shopsRef = useRef(null);
  const contactRef = useRef(null);
  const [activeSection, setActiveSection] = useState("")

  const handleScrollToSection = (ref) =>{
    ref?.current?.scrollIntoView({behavior: "smooth"})
  }

  useEffect(()=>{
        const handleScroll = () =>{
            const scrollY = window.scrollY + 100

            const sections = [
                { name: "about", ref: aboutRef },
                { name: "testimonial", ref: testimonialRef },
                { name: "shop", ref: shopsRef },
                { name: "contact", ref: contactRef },
            ]

            let current = "home";
            sections.forEach(({name, ref}) =>{
                if(ref.current && scrollY >= ref.current.offsetTop){
                    current = name
                }
            });
            setActiveSection(current)
        }
        window.addEventListener("scroll",handleScroll)
        return ()=> window.removeEventListener("scroll",handleScroll)
  },[])

  
  return (<>
      <Routes>
     <Route path="/" element={
    <>
      <Header onScrollTo={{home: () => window.scrollTo({ top: 0, behavior: "smooth" }), about: () => handleScrollToSection(aboutRef), testimonial: () => handleScrollToSection(testimonialRef), shops: () => handleScrollToSection(shopsRef), contact: () => handleScrollToSection(contactRef),}} activeSection={activeSection} />

      <ResponsiveHeader onScrollTo={{home: () => window.scrollTo({ top: 0, behavior: "smooth" }), about: () => handleScrollToSection(aboutRef), testimonial: () => handleScrollToSection(testimonialRef), shops: () => handleScrollToSection(shopsRef), contact: () => handleScrollToSection(contactRef),}} activeSection={activeSection}/>

      <HeroSection  />
      <TopBanner />
      <div ref={aboutRef} id="about" className="scroll-mt-24">
        <About />
      </div>
      <FeaturedProduct/>
      <div ref={testimonialRef} id='testimonial' className="scroll-mt-24">
        <Testimonial />
      </div>
      <FAQSection />
      <div ref={contactRef} id='contact'>
        <Contact />
      </div>
      <Footer />
    </>
     } />
        <Route path="/shop" element={<Shop />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
    </Routes>
        <ToastContainer />
  </>)
}

export default App
