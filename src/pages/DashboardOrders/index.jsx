import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { APP_ORDER_STATE, ORDERS } from '../../actions/constants';
import appState from '../../appState';
import HOFreducer from '../../reducers/HOFreducer';
import HOFdomainReducer from '../../reducers/HOFdomainReducer';
import { ejectReducer, injectReducer } from '../../utils/dynamicReducers';
import onGet from '../../actions/onGet';

import ClientDashboard from '../../templates/ClientDashboard';

import './dashboardOrders.scss';

function DashboardOrders(props) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('-orderId');
  const [filter, setFilter] = useState('');
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    injectReducer(
      APP_ORDER_STATE,
      HOFreducer(APP_ORDER_STATE, appState(APP_ORDER_STATE))
    );
    injectReducer(ORDERS, HOFdomainReducer(ORDERS, 'orders', 'order'));

    props.onGet(APP_ORDER_STATE);

    return () => {
      ejectReducer(APP_ORDER_STATE);
      ejectReducer(ORDERS);
    };
  }, []);

  const onStatusFilterChange = (event) => setFilter(event.target.value);

  const onOrderIdFilterChange = (event) => setSort(event.target.value);

  return (
    <ClientDashboard
      {...props.APP_ORDER_STATE}
      heading="Orders"
      APP_STATE={APP_ORDER_STATE}
    >
      <div className="orders">
        <label className="orders__filterBtn">
          <span>Sort by status:</span>
          <select value={filter} onChange={onStatusFilterChange}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
        <label value={sort} className="orders__filterBtn">
          <span>Sort by orderId:</span>
          <select onChange={onOrderIdFilterChange}>
            <option value="-orderId">Desc</option>
            <option value="orderId">Asc</option>
          </select>
        </label>
      </div>
    </ClientDashboard>
  );
}

const mapStateToProps = ({ ORDERS, APP_ORDER_STATE }) => ({
  ...ORDERS,
  APP_ORDER_STATE,
});

export default connect(mapStateToProps, { onGet })(DashboardOrders);
