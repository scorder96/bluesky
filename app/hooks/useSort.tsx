export default function useSort() {
  function sortEngagement(a: any) {
    for (let i = 1; i < a.length; i++) {
      for (let j = 0; j < a.length - 1; j++) {
        const engagement0 =
          a[j].post.replyCount +
          a[j].post.repostCount +
          a[j].post.quoteCount +
          a[j].post.likeCount;
        const engagement1 =
          a[j + 1].post.replyCount +
          a[j + 1].post.repostCount +
          a[j + 1].post.quoteCount +
          a[j + 1].post.likeCount;
        if (engagement0 > engagement1) {
          let temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
        }
      }
    }
    return a;
  }
  function sortReplies(a: any) {
    for (let i = 1; i < a.length; i++) {
      for (let j = 0; j < a.length - 1; j++) {
        if (a[j].post.replyCount > a[j + 1].post.replyCount) {
          let temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
        }
      }
    }
    return a;
  }
  function sortReposts(a: any) {
    for (let i = 1; i < a.length; i++) {
      for (let j = 0; j < a.length - 1; j++) {
        if (a[j].post.repostCount > a[j + 1].post.repostCount) {
          let temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
        }
      }
    }
    return a;
  }
  function sortQuotes(a: any) {
    for (let i = 1; i < a.length; i++) {
      for (let j = 0; j < a.length - 1; j++) {
        if (a[j].post.quoteCount > a[j + 1].post.quoteCount) {
          let temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
        }
      }
    }
    return a;
  }
  function sortLikes(a: any) {
    for (let i = 1; i < a.length; i++) {
      for (let j = 0; j < a.length - 1; j++) {
        if (a[j].post.likeCount > a[j + 1].post.likeCount) {
          let temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
        }
      }
    }
    return a;
  }
  return { sortEngagement, sortReplies, sortReposts, sortQuotes, sortLikes };
}
