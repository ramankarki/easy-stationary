import inActive from './inactive-star.svg';
import active from './active-star.svg';
import './ratingStars.scss';

function RatingsStar(props) {
  if (!props.ratings) return '';

  let noOfPeople = 0,
    totalRatings = 0;
  for (let star in props.ratings) {
    noOfPeople += props.ratings[star];
    totalRatings += props.ratings[star] * +star;
  }
  const avg = Math.round(totalRatings / noOfPeople);

  return (
    <div className="ratings">
      {Object.keys(props.ratings).map((star, index) => {
        let src = inActive;
        if (index + 1 <= avg) src = active;
        return <img key={src} src={src} alt="star" />;
      })}
    </div>
  );
}

export default RatingsStar;
