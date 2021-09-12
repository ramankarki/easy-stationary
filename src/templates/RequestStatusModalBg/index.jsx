import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import resetAppState from '../../actions/resetAppState';
import appState from '../../appState';

import './requestStatusModalBg.scss';

function RequestStatusModalBg(props) {
  const { APP_STATE } = props;

  useEffect(() => {
    window.addEventListener('popstate', onModalExit);

    return () => window.removeEventListener('popstate', onModalExit);
  }, []);

  const onModalExit = () => props.resetAppState(APP_STATE, appState(APP_STATE));
  return createPortal(
    <div className="modalBg">
      <div className="modalBg__wrapper">
        {props.requestStatus !== 'pending' && (
          <button className="modalBg__exit" onClick={onModalExit}>
            <img src="/assets/exit icon.svg" alt="exit icon" />
          </button>
        )}
        {props.children}
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export default connect(null, { resetAppState })(RequestStatusModalBg);
