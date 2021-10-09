import { Link } from 'react-router-dom';

import {
  ABOUT_US_PAGE,
  POLICY_PAGE,
  TERMS_AND_CONDITIONS_PAGE,
} from '../../Routes/contants';

import FeatureCard from '../../components/FeatureCard';

import './footer.scss';

const features = [
  {
    iconsrc: '/assets/products-icon.svg',
    text: 'Branded products',
  },
  {
    iconsrc: '/assets/cash-icon.svg',
    text: 'Cash On Delivery',
  },
  {
    iconsrc: '/assets/delivery-icon.svg',
    text: 'Home Delivery',
  },
  {
    iconsrc: '/assets/best-deal-icon.svg',
    text: 'Best Offer',
  },
  {
    iconsrc: '/assets/customer-service-icon.svg',
    text: '24/7 Customer Service',
  },
];

export default function Footer() {
  return (
    <div className="Footer">
      <hr />

      <div className="Footer__features">
        {features.map((data) => (
          <FeatureCard {...data} />
        ))}
      </div>

      <div className="Footer__threeColumn">
        <div className="threeColumn">
          <h4>About us</h4>
          <p>
            Eazael is on online e-commerce company in Nepal. Where you can find
            all products related to Stationary, Beauty, Clothes, Electronics,
            Fashion, Home appliances, Household, Mobile phones, etc. at your
            door step with affortable delivery charge.
          </p>
          <p>
            <img src="/assets/phone.svg" alt="phone icon" /> Phone: 9807063379,
            9827346441
          </p>
          <Link to={ABOUT_US_PAGE}>Read more...</Link>
        </div>
        <div className="threeColumn">
          <h4>Social links</h4>
          <a
            href="https://www.facebook.com/eazealshopping"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/assets/fb.svg" alt="facebook icon" /> Facebook
          </a>
          <a
            href="https://www.instagram.com/eazealshooping/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/assets/insta.svg" alt="insta icon" /> Instagram
          </a>
          <a
            href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=eazealcare@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/assets/gmail.svg" alt="gmail icon" /> Email
          </a>
        </div>
        <div className="threeColumn">
          <h4>Payment methods</h4>
          <p>
            <img src="/assets/small-cash.svg" alt="cash icon" />
            Cash on Delivery
          </p>
        </div>
      </div>

      <p className="Footer__copyright">
        © Copyright 2021 eazeal.com.np |{' '}
        <Link to={TERMS_AND_CONDITIONS_PAGE}>Terms & Conditions</Link> |{' '}
        <Link to={POLICY_PAGE}>Policy</Link>
      </p>
    </div>
  );
}
