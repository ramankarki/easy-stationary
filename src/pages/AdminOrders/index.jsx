import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import {
  APP_ORDER_STATE,
  CRITICAL_MODAL_STATE,
  ORDERS,
  RESET,
} from '../../actions/constants';
import appState from '../../appState';
import HOFreducer from '../../reducers/HOFreducer';
import HOFdomainReducer from '../../reducers/HOFdomainReducer';
import { ejectReducer, injectReducer } from '../../utils/dynamicReducers';
import onGet from '../../actions/onGet';
import onPatch from '../../actions/onPatch';
import triggerCriticalModal from '../../utils/triggerCriticalModal';
import { useIntersection } from '../../utils/useIntersection';
import resetAppState from '../../actions/resetAppState';
import fields from '../../utils/fields';

import SpinnerLoading from '../../components/SpinnerLoading';
import AdminPageTemplate from '../../templates/AdminPageTemplate';
import OrderCard from '../../templates/OrderCard';

import './adminOrders.scss';

function AdminOrders(props) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('-orderId');
  const [filter, setFilter] = useState('');
  const [showSpinner, setShowSpinner] = useState(true);

  const spinnerRef = useRef();

  useEffect(() => {
    injectReducer(
      APP_ORDER_STATE,
      HOFreducer(APP_ORDER_STATE, appState(APP_ORDER_STATE))
    );
    injectReducer(ORDERS, HOFdomainReducer(ORDERS, 'orders', 'order'));
    injectReducer(
      'UI_CANCEL_ORDER_ADMIN',
      HOFreducer('UI_CANCEL_ORDER_ADMIN', fields('CancelOrderAdmin'))
    );

    return () => {
      ejectReducer(APP_ORDER_STATE);
      ejectReducer(ORDERS);
      ejectReducer('UI_CANCEL_ORDER_ADMIN');
    };
  }, []);

  const onStatusFilterChange = (event) => setFilter(event.target.value);

  const onOrderIdFilterChange = (event) => setSort(event.target.value);

  const onOrderCancel = (orderObj) => () => {
    props.onPatch(
      APP_ORDER_STATE,
      'UI_CANCEL_ORDER_ADMIN',
      orderObj,
      () => ejectReducer(CRITICAL_MODAL_STATE),
      orderObj.orderId
    );
  };

  const loadAllOrders = () => {
    if (showSpinner) {
      props.onGet(
        APP_ORDER_STATE,
        (data) => {
          setShowSpinner(!!data.orders.length);
          setPage(page + 1);
        },
        page,
        sort,
        filter
      );
    }
  };

  useIntersection(spinnerRef, loadAllOrders, props.orders);

  const resetMultipleProducts = () => {
    setShowSpinner(true);
    setPage(1);
    props.resetAppState(ORDERS + RESET, {});
  };

  useEffect(() => {
    if (!props.orders) return;

    resetMultipleProducts();
  }, [sort, filter]);

  if (!props.CRITICAL_MODAL_STATE) {
    props = { ...props, APP_ORDER_STATE: {} };
  }

  return (
    <AdminPageTemplate
      {...props.APP_ORDER_STATE}
      APP_STATE={APP_ORDER_STATE}
      heading="Orders"
    >
      <div className="adminOrders">
        {/* filter buttons */}
        <label className="adminOrders__filterBtn">
          <span>Sort by status:</span>
          <select value={filter} onChange={onStatusFilterChange}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
        <label value={sort} className="adminOrders__filterBtn">
          <span>Sort by orderId:</span>
          <select onChange={onOrderIdFilterChange}>
            <option value="-orderId">Desc</option>
            <option value="orderId">Asc</option>
          </select>
        </label>

        {/* order cards */}
        <div className="adminOrders__cards">
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

        {showSpinner && (
          <div ref={spinnerRef} className="adminOrders__spinner">
            <SpinnerLoading />
          </div>
        )}
      </div>
    </AdminPageTemplate>
  );
}

const mapStateToProps = ({
  ORDERS,
  APP_ORDER_STATE,
  CRITICAL_MODAL_STATE,
}) => ({
  ...ORDERS,
  APP_ORDER_STATE,
  CRITICAL_MODAL_STATE,
});

export default connect(mapStateToProps, { onGet, onPatch, resetAppState })(
  AdminOrders
);
