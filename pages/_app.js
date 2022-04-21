
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import {ThemeProvider} from 'next-themes'
import { MoralisProvider } from "react-moralis"
import {MORALIS_SERVER_URL, MORALIS_APPLICATION_ID} from '../config'

function MyApp({ Component, pageProps}) {

    return (
        <MoralisProvider serverUrl={MORALIS_SERVER_URL} appId={MORALIS_APPLICATION_ID}>
            <ThemeProvider defaultTheme="system">
                <Navbar />
                <Component {...pageProps} />
                <Footer/>
            </ThemeProvider>
        </MoralisProvider>
    )
}

export default MyApp
