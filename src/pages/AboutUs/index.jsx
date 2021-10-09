import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import Footer from '../../templates/Footer';

import './aboutUs.scss';

function AboutUs() {
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
