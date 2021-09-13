import { useEffect } from 'react';
import { connect } from 'react-redux';
import { APP_USER_STATE } from '../../actions/constants';

import onGet from '../../actions/onGet';

import ClientDashboard from '../../templates/ClientDashboard';

import './dashboard.scss';

function Dashboard(props) {
  useEffect(() => {
    props.onGet(APP_USER_STATE);
  }, []);

  return (
    <ClientDashboard
      {...props.APP_USER_STATE}
      heading="Dashboard"
      APP_STATE={APP_USER_STATE}
    >
      <div className="dashboard">
        <div className="dashboard__boxes">
          <p>Total orders</p>
          <span>
            {props.user?.pendingOrders +
              props.user?.deliveredOrders +
              props.user?.cancelledOrders}
          </span>
        </div>
        <div className="dashboard__boxes">
          <p>My reviews</p>
          <span>{props.user?.reviews}</span>
        </div>
        <div className="dashboard__boxes">
          <p>My wishlists</p>
          <span>0</span>
        </div>
        <div className="dashboard__boxes">
          <p>Pending orders</p>
          <span>{props.user?.pendingOrders}</span>
        </div>
        <div className="dashboard__boxes dashboard__boxes-pending">
          <p>Delivered orders</p>
          <span>{props.user?.deliveredOrders}</span>
        </div>
        <div className="dashboard__boxes dashboard__boxes-cancelled">
          <p>Cancelled orders</p>
          <span>{props.user?.cancelledOrders}</span>
        </div>
      </div>
    </ClientDashboard>
  );
}

const mapStateToProps = ({ USER, APP_USER_STATE }) => ({
  ...USER,
  APP_USER_STATE,
});

export default connect(mapStateToProps, { onGet })(Dashboard);
