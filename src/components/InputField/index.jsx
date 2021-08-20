import { connect } from 'react-redux';

import classes from '../../utils/classes';

import onChangeAndBlur from '../../actions/onChangeAndBlur';
import './index.scss';

const InputField = (props) => {
  const {
    labelName,
    TYPE,
    value,
    onChangeAndBlur,
    dbProp,
    validationFailed,
    validationMsg,
  } = props;

  const validateFuncName = Object.keys(props).filter(
    (key) => key.startsWith('is') || key.startsWith('_is')
  )[0];

  // event handlers
  const onChangeHandler = (event) =>
    onChangeAndBlur(TYPE, labelName, event.target.value, validateFuncName);

  const onBlurHandler = (event) =>
    onChangeAndBlur(
      TYPE,
      labelName,
      event.target.value,
      validateFuncName,
      'onBlur'
    );

  // dynamic class names
  const labelClass = classes('label', { [dbProp]: true });
  const inputClass = classes('label__field', {
    'label__field-error': validationFailed,
  });

  return (
    <label className={labelClass}>
      <p className="label__name">{labelName}</p>
      <input
        className={inputClass}
        type="text"
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
      <p className="label__validationMsg">
        {validationFailed ? validationMsg : ''}
      </p>
    </label>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { TYPE, labelName } = ownProps;
  return state[TYPE][labelName];
};

export default connect(mapStateToProps, { onChangeAndBlur })(InputField);
