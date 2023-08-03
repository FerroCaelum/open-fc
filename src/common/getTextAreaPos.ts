function createCopy(textArea: HTMLTextAreaElement) {
  var copy = document.createElement('div');
  copy.textContent = textArea.value;
  var style = getComputedStyle(textArea);
  [
    'fontFamily',
    'fontSize',
    'fontWeight',
    'wordWrap',
    'whiteSpace',
    'borderLeftWidth',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
  ].forEach(function (key) {
    (copy.style as any)[key] = (style as any)[key];
  });
  copy.style.overflow = 'auto';
  copy.style.width = textArea.offsetWidth + 'px';
  copy.style.height = textArea.offsetHeight + 'px';
  copy.style.position = 'absolute';
  copy.style.left = textArea.offsetLeft + 'px';
  copy.style.top = textArea.offsetTop + 'px';
  document.body.appendChild(copy);
  return copy;
}

export function getCaretPosition(textArea: HTMLTextAreaElement) {
  var start = textArea.selectionStart;
  var end = textArea.selectionEnd;
  var copy = createCopy(textArea);
  var range = document.createRange();
  range.setStart(copy.firstChild as any, start);
  range.setEnd(copy.firstChild as any, end);
  var selection = document.getSelection()!;
  selection.removeAllRanges();
  selection.addRange(range);
  var rect = range.getBoundingClientRect();
  document.body.removeChild(copy);
  textArea.selectionStart = start;
  textArea.selectionEnd = end;
  textArea.focus();
  return {
    x: rect.left - textArea.scrollLeft,
    y: rect.top - textArea.scrollTop,
  };
}
