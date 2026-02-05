import 'bootstrap/dist/css/bootstrap.min.css';
import '../app/globals.css'
import Header from '@/components/common_components/header';
import Footer from '@/components/common_components/footer';
import { GlobalProvider } from '@/context/GlobalContext';
import { GoogleOAuthProvider } from "@react-oauth/google";

// toastify
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

export const metadata = {
  title: "Weaver",
  description: "Weaver the Shopping Plaza",
  icons: {
    icon: '/weaver-logo-transparent.png'
  }
};
const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GoogleOAuthProvider clientId={client_id}>
          <GlobalProvider>
            <Header />
            {children}
            <ToastContainer />
            <Footer />
          </GlobalProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
