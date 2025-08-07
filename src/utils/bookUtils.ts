import { type ShortTitleResult } from "../types/index";

export const getShortTitle = (
  title: string = "",
  maxLength: number = 50
): ShortTitleResult => {
  const fullTitle = title.trim() || "No title";
  const shortTitle = fullTitle.substring(0, maxLength);
  return {
    fullTitle,
    shortTitle,
    isTruncated: fullTitle !== shortTitle,
  };
};

export const getAuthors = (authors: string[] | undefined): string => {
  return authors ? authors.join(", ") : "Unknown author";
};

export const getDescription = (description: string | undefined): string => {
  return description
    ? `${description.substring(0, 100)}...`
    : "No description available";
};
