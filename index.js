var dragSrcEl = null;

function allowDrop(ev) {
  ev.preventDefault();
}

function handleDragStart(ev) {
  dragSrcEl = this;
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData('text/html', this.outerHTML);
  console.log(this.outerHTML);
}

function drop(ev) {
  ev.preventDefault();
  //   ev.dataTransfer.effectAllowed = 'copy';

  var data = ev.dataTransfer.getData('text');
  console.log(ev);
  console.log(ev.target.getAttribute('data-allow-drop'));

  if (ev.target.getAttribute('data-allow-drop') === 'false') {
    return false;
  } else {
    ev.target.appendChild(document.getElementById(data));
  }
}

function dragOver(ev) {}

function dropAction(ev) {
  var data = ev.dataTransfer.getData('text');
  ev.target.appendChild(document.getElementById(data));
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  this.classList.add('over');

  e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

  return false;
}

function handleDragLeave(e) {
  this.classList.remove('over'); // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  this.classList.remove('over');
  return false;
}
function handleDragEnd(e) {
  this.classList.remove('over');
}

function addDnDHandlers(elem) {
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', handleDragEnd, false);
}

var cols = document.querySelectorAll('.action');
[].forEach.call(cols, addDnDHandlers);
