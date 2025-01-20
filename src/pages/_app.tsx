import type { AppProps } from 'next/app'
import '../global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const App = ({ Component, pageProps }: AppProps) =>{
    console.log("_app")
    return <Component {...pageProps} />
}

export default App