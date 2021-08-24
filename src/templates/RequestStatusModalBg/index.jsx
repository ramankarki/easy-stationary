import { createPortal } from 'react-dom';

import './requestStatusModalBg.scss';

function RequestStatusModalBg(props) {
  return createPortal(
    <div className="modalBg">
      <div className="modalBg__wrapper">
        {props.requestStatus === 'failed' && (
          <button className="modalBg__exit" onClick={props.onExit}>
            <img src="/assets/exit icon.svg" alt="exit icon" />
          </button>
        )}
        {props.children}
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export default RequestStatusModalBg;
