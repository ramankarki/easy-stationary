import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import './breadCrumb.scss';

function BreadCrumb() {
  const breads = getBreads();

  return (
    <div className="breadCrumb">
      <Link to="/">Home</Link>
      {breads.map(([key, value]) => (
        <Fragment key={key}>
          <span>&gt;</span> <Link to={value}>{key}</Link>
        </Fragment>
      ))}
    </div>
  );
}

function getBreads() {
  let breads = [];

  const path = window.location.hash.slice(1).split('?')[0];
  if (path.length === 1) return breads;

  const breadKeys = path.split('/').filter(Boolean);
  const breadValues = breadKeys.map((keys) => '/' + keys);

  breadKeys.forEach((key, index) => {
    let titleCase = key[0].toUpperCase() + key.replace(/\//g, ' ').slice(1);
    let route = breadValues.slice(0, index + 1).join('');
    breads = [...breads, [titleCase, route]];
  });

  return breads;
}

export default BreadCrumb;
