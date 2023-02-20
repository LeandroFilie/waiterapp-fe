import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Orders from './components/Orders';
import { GlobalStyles } from './styles/GlobalStyle';

export default function App(){
  return (
    <>
      <GlobalStyles />
      <Header />
      <Orders />
      <ToastContainer position='bottom-center'></ToastContainer>
    </>
  );
}
