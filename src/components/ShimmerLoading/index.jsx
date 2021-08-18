import './shimmerLoading.scss';

function ShimmerLoading(props) {
  let style = {
    width: (props.width || '100%') + '',
    height: (props.height || '100%') + '',
  };

  return <div className="shimmerLoading" style={style}></div>;
}

export default ShimmerLoading;
