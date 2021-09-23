import asideButtonData from './asideButtonsData';

import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import RequestStatusModalBg from '../RequestStatusModalBg';
import SpinnerLoading from '../../components/SpinnerLoading';
import CriticalDeleteModal from '../CriticalDeleteModal';
import LinkButton from '../../components/LinkButton';

import './clientDashboard.scss';

function ClientDashboard(props) {
  const { requestStatus, modalMsg, errorTag, heading, APP_STATE } = props;

  const currentPath = window.location.hash.slice(1);

  return (
    <div className="client">
      <Header />
      <BreadCrumb />

      <div className="client__mainCover">
        <div className="client__aside">
          {asideButtonData.map(({ iconsrc, value, path }) => (
            <LinkButton
              key={iconsrc}
              to={path}
              iconsrc={iconsrc}
              alt={iconsrc}
              nobg={currentPath !== path ? 'true' : ''}
              bgonhover={'true'}
              style={{ padding: '1.3rem', fontSize: '.9rem' }}
            >
              {value}
            </LinkButton>
          ))}
        </div>

        {/* right panel */}
        <div className="client__panel">
          <h1>{heading}</h1>
          {props.children}
        </div>
      </div>

      {/* modal */}
      {requestStatus && (
        <RequestStatusModalBg
          requestStatus={requestStatus}
          APP_STATE={APP_STATE}
        >
          {requestStatus === 'pending' ? (
            <SpinnerLoading />
          ) : (
            modalMsg(requestStatus, errorTag)
          )}
        </RequestStatusModalBg>
      )}

      {/* critical modal for deleting account or cancelling order */}
      <CriticalDeleteModal />
    </div>
  );
}

export default ClientDashboard;
