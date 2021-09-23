import { Link } from 'react-router-dom';

import classes from '../../utils/classes';

import './linkButton.scss';

function LinkButton(props) {
  const { dark, bold, nobg, iconsrc, alt, bgonhover, center } = props;
  const classNames = classes('linkButton', {
    linkButton__dark: dark,
    linkButton__light: !dark,
    'linkButton-bold': bold,
    'linkButton-center': center,
    'linkButton__light-nobg': nobg,
    'linkButton__light-bgOnHover': bgonhover,
  });

  return (
    <div className={classNames}>
      <Link {...props}>
        {iconsrc && <img src={iconsrc} alt={alt} />}
        {props.children}
      </Link>
    </div>
  );
}

export default LinkButton;
