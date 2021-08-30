import { injectReducer } from './dynamicReducers';
import { CRITICAL_MODAL_STATE } from '../actions/constants';
import HOFreducer from '../reducers/HOFreducer';
import fields from './fields';

const triggerCriticalModal = (event, heading, desc, deleteFunc) => () => {
  const field = fields('Critical modal');
  field['Critical modal'].heading = heading;
  field['Critical modal'].desc = desc;
  field.deleteFunc = deleteFunc;

  injectReducer(CRITICAL_MODAL_STATE, HOFreducer(CRITICAL_MODAL_STATE, field));
};

export default triggerCriticalModal;
