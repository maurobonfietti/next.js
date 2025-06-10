function insertIntoTarget(element, options) {
  var root =
    options.target ||
    document.querySelector('script[data-nextjs-dev-overlay] > nextjs-portal')
      .shadowRoot

  root.insertBefore(element, root.firstChild)
}

module.exports = insertIntoTarget
