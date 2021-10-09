import './featureCard.scss';

function FeatureCard({ iconsrc, text }) {
  return (
    <div className="FeatureCard">
      <img src={iconsrc} alt="feature card icon" />
      <p>{text}</p>
    </div>
  );
}

export default FeatureCard;
