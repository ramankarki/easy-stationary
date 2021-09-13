import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  APP_ORDER_STATE,
  CRITICAL_MODAL_STATE,
  ORDERS,
} from '../../actions/constants';
import appState from '../../appState';
import HOFreducer from '../../reducers/HOFreducer';
import HOFdomainReducer from '../../reducers/HOFdomainReducer';
import { ejectReducer, injectReducer } from '../../utils/dynamicReducers';
import onGet from '../../actions/onGet';
import onPatch from '../../actions/onPatch';
import triggerCriticalModal from '../../utils/triggerCriticalModal';

import ClientDashboard from '../../templates/ClientDashboard';
import OrderCard from '../../templates/OrderCard';

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
    injectReducer(
      'BLANK',
      HOFreducer('BLANK', {
        blank: {
          value: 'blank',
          dbProp: 'blank',
          validate: () => 'blank',
          validationFailed: 'blank',
        },
      })
    );

    props.onGet(APP_ORDER_STATE, () => {}, page, sort, filter);

    return () => {
      ejectReducer(APP_ORDER_STATE);
      ejectReducer(ORDERS);
      ejectReducer('BLANK');
    };
  }, []);

  const onStatusFilterChange = (event) => setFilter(event.target.value);

  const onOrderIdFilterChange = (event) => setSort(event.target.value);

  const onOrderCancel = (orderObj) => () => {
    props.onPatch(
      APP_ORDER_STATE,
      'BLANK',
      orderObj,
      () => ejectReducer(CRITICAL_MODAL_STATE),
      orderObj.orderId
    );
  };

  return (
    <ClientDashboard
      {...props.APP_ORDER_STATE}
      heading="Orders"
      APP_STATE={APP_ORDER_STATE}
    >
      <div className="orders">
        {/* filter buttons */}
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

        {/* order cards */}
        <div className="orders__cards">
          {props.orders?.map((order) => (
            <OrderCard
              key={order._id}
              {...order}
              onOrderCancel={triggerCriticalModal(
                null,
                'Cancel order',
                `Type 'cancel', to cancel orderId:${order.orderId}.`,
                onOrderCancel(order),
                'Cancel order'
              )}
            />
          ))}
        </div>
      </div>
    </ClientDashboard>
  );
}

const mapStateToProps = ({ ORDERS, APP_ORDER_STATE }) => ({
  ...ORDERS,
  APP_ORDER_STATE,
});

export default connect(mapStateToProps, { onGet, onPatch })(DashboardOrders);
