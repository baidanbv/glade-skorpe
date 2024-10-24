const sortedByDate = (array) => {
  return [...array].sort((a, b) => new Date(b.created) - new Date(a.created));
};

export default sortedByDate;
