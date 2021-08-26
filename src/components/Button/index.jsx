import './button.scss';

function Button(props) {
  return (
    <button {...props} className="button">
      {props.value}
    </button>
  );
}

export default Button;
