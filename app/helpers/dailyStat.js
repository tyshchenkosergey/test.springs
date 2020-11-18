exports.countPosts = (arr) => {
  arr.freduce(function (prev, next) {
    prev[next] = prev[next] + 1 || 1;
    return prev;
  }, {});
};
