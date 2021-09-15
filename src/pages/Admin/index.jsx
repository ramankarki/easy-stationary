import { useEffect } from 'react';
import { connect } from 'react-redux';

import { ejectReducer, injectReducer } from '../../utils/dynamicReducers';
import {
  APP_CATEGORY_STATE,
  APP_USER_STATE,
  CATEGORY,
} from '../../actions/constants';
import onGet from '../../actions/onGet';
import appState from '../../appState';
import HOFreducer from '../../reducers/HOFreducer';
import HOFdomainReducer from '../../reducers/HOFdomainReducer';

import AdminPageTemplate from '../../templates/AdminPageTemplate';

import './admin.scss';

function Admin(props) {
  const { user, categories } = props;
  const { cancelledOrders, deliveredOrders, pendingOrders } = user;

  useEffect(() => {
    injectReducer(
      APP_CATEGORY_STATE,
      HOFreducer(APP_CATEGORY_STATE, appState(APP_CATEGORY_STATE))
    );
    injectReducer(
      CATEGORY,
      HOFdomainReducer(CATEGORY, 'categories', 'category', 'categoryName')
    );

    props.onGet(APP_CATEGORY_STATE);
    props.onGet(APP_USER_STATE);
    return () => {
      ejectReducer(APP_CATEGORY_STATE);
      ejectReducer(CATEGORY);
    };
  }, []);

  const productsNum = categories
    ? categories.reduce((acc, category) => acc + category.noOfProducts, 0)
    : 0;

  return (
    <AdminPageTemplate heading="Admin Panel" {...props}>
      <div className="panel__division">
        <div className="panel__divisionChild">
          <p className="panel__subHeading">All products</p>
          <p className="panel__data">{productsNum}</p>
        </div>
        <div className="panel__divisionChild">
          <p className="panel__subHeading">Pending orders</p>
          <p className="panel__data">{pendingOrders}</p>
        </div>
        <div className="panel__divisionChild">
          <p className="panel__subHeading">Delivered orders</p>
          <p className="panel__data delivered">{deliveredOrders}</p>
        </div>
        <div className="panel__divisionChild">
          <p className="panel__subHeading">Cancelled orders</p>
          <p className="panel__data cancelled">{cancelledOrders}</p>
        </div>
      </div>
    </AdminPageTemplate>
  );
}

const mapStateToProps = ({ USER, CATEGORY, APP_CATEGORY_STATE }) => ({
  ...USER,
  ...CATEGORY,
  ...APP_CATEGORY_STATE,
});

export default connect(mapStateToProps, { onGet })(Admin);
