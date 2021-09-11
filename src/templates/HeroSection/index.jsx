import './heroSection.scss';

function HeroSection(props) {
  return (
    <div className="hero__section">
      <picture style={{ backgroundImage: props.imgUrl }}></picture>
      <div className="hero__content">
        <h1>{props.heading}</h1>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default HeroSection;
