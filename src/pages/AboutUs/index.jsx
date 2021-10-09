import { useEffect } from 'react';

import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import Footer from '../../templates/Footer';

import './aboutUs.scss';

function AboutUs() {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <div className="AboutUs">
      <Header />
      <BreadCrumb />
      <h1>About us</h1>

      <Footer />
    </div>
  );
}

export default AboutUs;
