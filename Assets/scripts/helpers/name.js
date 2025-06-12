// Assets/scripts/helpers/name.js
window.nameHelper = page => {
  // grab the frontmatter name or default, then immediately uppercase it
  return (page.name ?? "Item").toUpperCase();
};
