window.imageHelper = page => {
    const imageLink = page.image ?? "";
    let formattedImage = imageLink
      ? `![[${imageLink}|relative static wmed hmed center]]`
      : "No Image.";
    return formattedImage
};