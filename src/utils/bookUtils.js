export const getShortTitle = (title = "", maxLength = 50) => {
    const fullTitle = title.trim() || "No title";
    const shortTitle = fullTitle.split('.')[0].substring(0, maxLength);
    return {
      fullTitle,
      shortTitle,
      isTruncated: fullTitle !== shortTitle
    };
  };
  
  export const getAuthors = (authors) => {
    return authors ? authors.join(', ') : 'Unknown author';
  };
  
  export const getDescription = (description) => {
    return description
      ? `${description.substring(0, 100)}...`
      : "No description available";
  };