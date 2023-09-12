const globalState = {
  publications: [],
  commentCounts: {},
};

export const updateCommentCount = (publicationId, count) => {
  globalState.commentCounts[publicationId] = count;
};

export default globalState;
