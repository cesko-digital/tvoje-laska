export const fixImageURL = (imageUrl: string) => {
  try {
    if (!imageUrl.startsWith("http")) {
      imageUrl = `https:${imageUrl}`;
    }

    const url = new URL(imageUrl);
    return url;
  } catch (error) {
    /* TODO: Log error */
    console.error(error);
  }
};
