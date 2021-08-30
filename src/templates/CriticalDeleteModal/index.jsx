// only show up this modal if there is app reducer injected for this component.

import { createPortal } from 'react-dom';
import { connect } from 'react-redux';

import { CRITICAL_MODAL_STATE } from '../../actions/constants';
import { ejectReducer } from '../../utils/dynamicReducers';

import InputField from '../../components/InputField';
import Button from '../../components/Button';

import './criticalModal.scss';

function CriticalModal(props) {
  const targetValue = props['Critical modal']?.desc
    .match(/'(.*?)'/g)[0]
    .replace(/'/g, '');
  const currentValue = props['Critical modal']?.value;
  const isDeleteAble = targetValue === currentValue;
  const buttonOpacity = { opacity: isDeleteAble ? '1' : '.5' };

  const exitModal = () => ejectReducer(CRITICAL_MODAL_STATE);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (isDeleteAble) props.deleteFunc();
  };

  if (props['Critical modal'])
    return createPortal(
      <div className="criticalModal">
        <div className="criticalModal__wrapper">
          <div className="criticalModal__heading">
            <h1>{props['Critical modal']?.heading}</h1>
            <button onClick={exitModal}>
              <img src="/assets/exit icon.svg" alt="exit icon" />
            </button>
          </div>
          <p className="criticalModal__desc">{props['Critical modal']?.desc}</p>
          <form onSubmit={onSubmitHandler} className="criticalModal__form">
            <InputField
              labelName="Critical modal"
              hideLabel={true}
              TYPE={CRITICAL_MODAL_STATE}
              dbProp={'dull, wont be used'}
            />
            <Button
              style={buttonOpacity}
              value="Delete"
              small="true"
              danger="true"
            />
          </form>
        </div>
      </div>,
      document.getElementById('critical-action-modal')
    );
  return '';
}

const mapStateToProps = ({ CRITICAL_MODAL_STATE }) => ({
  ...CRITICAL_MODAL_STATE,
});

export default connect(mapStateToProps, {})(CriticalModal);
