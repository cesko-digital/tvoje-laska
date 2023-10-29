import "../app/globals.css";
import { AppProps } from "next/app";
import RootLayout from "../app/layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
