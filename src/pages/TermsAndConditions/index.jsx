import { useEffect } from 'react';

import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import Footer from '../../templates/Footer';

import './termsAndConditions.scss';

function TermsAndConditions() {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <div className="TermsAndConditions">
      <Header />
      <BreadCrumb />
      <h1>Terms and Conditions</h1>

      <Footer />
    </div>
  );
}

export default TermsAndConditions;
