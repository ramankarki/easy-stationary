import { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion';

import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import Footer from '../../templates/Footer';

import 'react-notion/src/styles.css';
import './policy.scss';

function Policy() {
  const [policy, setPolicy] = useState({});

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    fetch(
      'https://notion-api.splitbee.io/v1/page/31b833419b1c40ffa46ab4e86070e7f1'
    )
      .then((res) => res.json())
      .then((data) => setPolicy(data));
  }, []);

  return (
    <div className="Policy">
      <Header />
      <BreadCrumb />

      <div className="Policy__markdown">
        <h1>
          <img src="/assets/policy.svg" alt="policy icon" /> Policy
        </h1>
        <hr />

        <NotionRenderer blockMap={policy} />
      </div>

      <Footer />
    </div>
  );
}

export default Policy;
