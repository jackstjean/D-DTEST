window.nameHelper = page => {
  const nameInput = page.name ?? "Item";
  let formattedName = nameInput.toUpperCase();
  return formattedName;
};
