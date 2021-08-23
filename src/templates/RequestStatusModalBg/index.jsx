import { createPortal } from 'react-dom';

import './requestStatusModalBg.scss';

function RequestStatusModalBg(props) {
  return createPortal(
    <div className="modalBg">
      <div className="modalBg__wrapper">{props.children}</div>
    </div>,
    document.getElementById('modal')
  );
}

export default RequestStatusModalBg;
