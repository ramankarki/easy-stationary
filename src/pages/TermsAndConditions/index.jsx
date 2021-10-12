import { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion';

import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import Footer from '../../templates/Footer';

import 'react-notion/src/styles.css';
import './termsAndConditions.scss';

function TermsAndConditions() {
  const [terms, setTerms] = useState({});

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    fetch(
      'https://notion-api.splitbee.io/v1/page/19c246d2395e481a91345ea5e5642821'
    )
      .then((res) => res.json())
      .then((data) => setTerms(data));
  }, []);

  return (
    <div className="TermsAndConditions">
      <Header />
      <BreadCrumb />

      <div className="TermsAndConditions__markdown">
        <h1>Terms & Conditions</h1>
        <hr />

        <NotionRenderer blockMap={terms} />
      </div>

      <Footer />
    </div>
  );
}

export default TermsAndConditions;
