function checkedAppend(rawHtml, appendTo) {
  var html = $(rawHtml);
  if (0 == html.length) {
    throw "Built ourselves bad html : " + rawHtml;
  }

  html.appendTo(appendTo);
  return html;
}
