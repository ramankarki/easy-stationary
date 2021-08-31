import { injectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';
import classes from '../../utils/classes';

import InputField from '../../components/InputField';
import Button from '../../components/Button';
import RequestStatusModalBg from '../../templates/RequestStatusModalBg';
import SpinnerLoading from '../../components/SpinnerLoading';
import './updateForm.scss';

function UpdateEmailPassword(props) {
  const { UI_STATE, APP_STATE, appState, fields, user, onSubmitHandler } =
    props;
  const { requestStatus, modalMsg, errorTag } = appState;

  for (let field in fields) {
    fields[field].value = user[fields[field].dbProp];
  }

  injectReducer(UI_STATE, HOFreducer(UI_STATE, fields));

  const formElements = (fieldsObj, TYPE) =>
    Object.keys(fieldsObj).map((fieldName) => (
      <InputField
        key={fieldName}
        TYPE={TYPE}
        labelName={fieldName}
        dbProp={fieldsObj[fieldName].dbProp}
        reTypeCompareValue="New password"
      />
    ));

  const formClass = classes('updateForm', { 'updateForm-flex': props.flex });

  return (
    <form style={props.style} onSubmit={onSubmitHandler} className={formClass}>
      {formElements(fields, UI_STATE)}
      <Button value={props.buttonvalue} small="true" />

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
    </form>
  );
}

export default UpdateEmailPassword;
