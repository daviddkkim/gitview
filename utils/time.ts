export const getUpdatedTime = (lastUpdatedAt: number) => {
  const now = Date.now();
  const delta = Math.floor(now / 1000) - Math.floor(lastUpdatedAt / 1000);
  if (delta > 31 * 24 * 3600) {
    return "more than a month ago";
  }
  if (delta > 7 * 24 * 3600) {
    return "a week ago";
  }
  if (delta > 2 * 24 * 3600) {
    return "a few days ago";
  }
  if (delta > 24 * 3600) {
    return "yesterday";
  }

  if (delta > 3600) {
    return "a few hours ago";
  }
  if (delta > 1800) {
    return "Half an hour ago";
  }
  if (delta > 60) {
    return Math.floor(delta / 60) + " minutes ago";
  }
};
