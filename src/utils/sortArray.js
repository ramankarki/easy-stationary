const sortArray = (array, sortProp) => {
  const copyArray = [...array];

  if (sortProp)
    return copyArray.sort((a, b) =>
      a[sortProp] < b[sortProp] ? -1 : a[sortProp] > b[sortProp] ? 1 : 0
    );
  return copyArray.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
};

export default sortArray;
