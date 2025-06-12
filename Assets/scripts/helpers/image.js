window.imageHelper = page => {
    const imageLink = page.image ?? "";
    let formattedImage = imageLink
      ? `![[${imageLink}|relative wmed center]]\n`
      : "No Image.";
    return formattedImage
};