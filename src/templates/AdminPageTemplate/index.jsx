import getAside from '../../utils/asideButtonsData';

import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import RequestStatusModalBg from '../../templates/RequestStatusModalBg';
import SpinnerLoading from '../../components/SpinnerLoading';
import LinkButton from '../../components/LinkButton';

import './adminPageTemplate.scss';

function Admin(props) {
  const { requestStatus, modalMsg, errorTag, heading } = props;

  const aside = getAside(
    'Dashboard',
    'Category',
    'Add new product',
    'Orders',
    'Settings'
  );

  const currentPath = window.location.hash.slice(1);

  return (
    <div className="admin">
      <Header />
      <BreadCrumb />

      <div className="admin__sectionCover">
        <div>
          {aside.map(({ iconsrc, value, path }) => (
            <LinkButton
              key={iconsrc}
              to={path}
              iconsrc={iconsrc}
              alt={iconsrc}
              nobg={currentPath !== path ? 'true' : ''}
              bgonhover={'true'}
              style={{ padding: '1rem', fontSize: '.9rem' }}
            >
              {value}
            </LinkButton>
          ))}
        </div>

        {/* right panel */}
        <div className="panel">
          <h1>{heading}</h1>
          {props.children}
        </div>
      </div>

      {/* modal */}
      {requestStatus && (
        <RequestStatusModalBg requestStatus={requestStatus}>
          {requestStatus === 'pending' ? (
            <SpinnerLoading />
          ) : (
            modalMsg(requestStatus, errorTag)
          )}
        </RequestStatusModalBg>
      )}
    </div>
  );
}

export default Admin;
