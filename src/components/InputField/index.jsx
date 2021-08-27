import { connect } from 'react-redux';

import classes from '../../utils/classes';

import onChangeAndBlur from '../../actions/onChangeAndBlur';
import './inputField.scss';

const InputField = (props) => {
  const {
    labelName,
    TYPE,
    value,
    onChangeAndBlur,
    dbProp,
    validationFailed,
    validationMsg,
    hideLabel,
  } = props;

  // event handlers
  const onChangeHandler = (event) =>
    onChangeAndBlur(TYPE, labelName, event.target.value);

  const onBlurHandler = (event) =>
    onChangeAndBlur(TYPE, labelName, event.target.value, 'onBlur');

  // dynamic class names
  const labelClass = classes('label', { [dbProp]: true });
  const inputClass = classes('label__field', {
    'label__field-error': hideLabel ? false : validationFailed,
    'label__field-nomargin': hideLabel,
  });

  return (
    <label className={labelClass}>
      {!hideLabel && (
        <p className="label__name">
          {labelName}
          {validationFailed ? (
            <span className="label__validationMsg">
              &nbsp; *{validationMsg}
            </span>
          ) : (
            ''
          )}
        </p>
      )}
      <input
        className={inputClass}
        type="text"
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        placeholder={hideLabel ? 'Search' : ''}
      />
    </label>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { TYPE, labelName } = ownProps;
  return state[TYPE] ? state[TYPE][labelName] : {};
};

export default connect(mapStateToProps, { onChangeAndBlur })(InputField);
