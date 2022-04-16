
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import {ThemeProvider} from 'next-themes'

function MyApp({ Component, pageProps}) {


  return (
    <ThemeProvider defaultTheme="system">
        <Navbar />
        <Component {...pageProps} />
        <Footer/>
    </ThemeProvider>
  )
}

export default MyApp
