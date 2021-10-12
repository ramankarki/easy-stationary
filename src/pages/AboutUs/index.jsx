import { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion';

import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import Footer from '../../templates/Footer';

import 'react-notion/src/styles.css';
import './aboutUs.scss';

function AboutUs() {
  const [about, setAbout] = useState({});

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    fetch(
      'https://notion-api.splitbee.io/v1/page/07e50b637a0542969e8782ce01dfce66'
    )
      .then((res) => res.json())
      .then((data) => setAbout(data));
  }, []);

  return (
    <div className="AboutUs">
      <Header />
      <BreadCrumb />

      <div className="AboutUs__markdown">
        <h1>About us</h1>
        <hr />

        <NotionRenderer blockMap={about} />
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;
