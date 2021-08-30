import classes from '../../utils/classes';

import './button.scss';

function Button(props) {
  const classNames = classes('button', {
    'button-small': props.small,
    'button-danger': props.danger,
  });
  return (
    <button {...props} className={classNames}>
      {props.value}
    </button>
  );
}

export default Button;
