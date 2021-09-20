import { useEffect } from 'react';
import { connect } from 'react-redux';

import { injectReducer, ejectReducer } from '../../utils/dynamicReducers';
import { APP_WISHLISTS_STATE, WISHLISTS } from '../../actions/constants';
import HOFreducer from '../../reducers/HOFreducer';
import getWishlists from '../../actions/getWishlists';
import appState from '../../appState';

import ClientDashboard from '../../templates/ClientDashboard';
import ProductCardGen from '../../templates/ProductCardGen';

function DashboardMyWishlists(props) {
  useEffect(() => {
    injectReducer(
      APP_WISHLISTS_STATE,
      HOFreducer(APP_WISHLISTS_STATE, appState(APP_WISHLISTS_STATE))
    );
    injectReducer(WISHLISTS, HOFreducer(WISHLISTS, []));

    props.getWishlists();

    return () => {
      ejectReducer(APP_WISHLISTS_STATE);
      ejectReducer(WISHLISTS);
    };
  }, []);

  return (
    <ClientDashboard
      {...props.APP_WISHLISTS_STATE}
      heading="My wishlists"
      APP_STATE={APP_WISHLISTS_STATE}
    >
      <ProductCardGen products={props.WISHLISTS} />
    </ClientDashboard>
  );
}

const mapStateToProps = ({ APP_WISHLISTS_STATE, WISHLISTS }) => ({
  APP_WISHLISTS_STATE,
  WISHLISTS,
});

export default connect(mapStateToProps, { getWishlists })(DashboardMyWishlists);
