import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../global.css";
import "bootstrap/dist/css/bootstrap.min.css";
const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
