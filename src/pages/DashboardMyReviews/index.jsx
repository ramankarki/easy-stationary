import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import { APP_REVIEWS_STATE, REVIEWS } from '../../actions/constants';
import { ejectReducer, injectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';
import appState from '../../appState';
import HOFdomainReducer from '../../reducers/HOFdomainReducer';
import { useIntersection } from '../../utils/useIntersection';
import onGet from '../../actions/onGet';

import ClientDashboard from '../../templates/ClientDashboard';
import SpinnerLoading from '../../components/SpinnerLoading';
import ProductCardGen from '../../templates/ProductCardGen';

function DashboardMyReviews(props) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('-date');
  const [showSpinner, setShowSpinner] = useState(true);
  const spinnerRef = useRef();

  useEffect(() => {
    injectReducer(
      APP_REVIEWS_STATE,
      HOFreducer(APP_REVIEWS_STATE, appState(APP_REVIEWS_STATE))
    );
    injectReducer(REVIEWS, HOFdomainReducer(REVIEWS, 'reviews', 'review'));

    return () => {
      ejectReducer(APP_REVIEWS_STATE);
      ejectReducer(REVIEWS);
    };
  }, []);

  const loadAllReviews = () => {
    if (showSpinner) {
      props.onGet(
        APP_REVIEWS_STATE,
        (data) => {
          setShowSpinner(!!data.reviews.length);
          setPage(page + 1);
        },
        null,
        page,
        sort,
        true
      );
    }
  };

  useIntersection(spinnerRef, loadAllReviews, props.reviews);

  return (
    <ClientDashboard {...props.APP_ORDER_STATE} heading="My reviews">
      <div className="dashboardMyReviews">
        <div className="dashboardMyReviews__products">
          <ProductCardGen products={props.reviews} />
        </div>
        {showSpinner && (
          <div ref={spinnerRef} className="orders__spinner">
            <SpinnerLoading />
          </div>
        )}
      </div>
    </ClientDashboard>
  );
}

const mapStateToProps = ({ REVIEWS, APP_ORDER_STATE }) => ({
  ...REVIEWS,
  APP_ORDER_STATE,
});

export default connect(mapStateToProps, { onGet })(DashboardMyReviews);
