import { useEffect } from 'react';

import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import Footer from '../../templates/Footer';

import './policy.scss';

function Policy() {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <div className="Policy">
      <Header />
      <BreadCrumb />
      <h1>Policy</h1>

      <Footer />
    </div>
  );
}

export default Policy;
