export default function (startZone, dropZone, className) {
    let currentDrag;


    for (const item of startZone.children) {
        item.draggable = true;
        item.firstElementChild.draggable = false;
    }

    startZone.parentNode.parentNode.addEventListener('dragstart', (e) => {
        let elem;
  
        if (e.target.classList.contains(className)) {
            elem = e.target;
        }
        if (e.target.parentNode.classList.contains(className)) {
            elem = e.target.parentNode;
        }        

        currentDrag = { source: startZone, node: elem };     
    });
  
    startZone.parentNode.parentNode.addEventListener('dragover', (e) => {
        e.preventDefault();
    });


    dropZone.parentNode.parentNode.addEventListener('drop', (e) => {
        if (currentDrag) {
            e.preventDefault();

            currentDrag.node.lastElementChild.classList.toggle('friend-item__add');
            currentDrag.node.lastElementChild.classList.toggle('friend-item__remove');
      
            dropZone.insertBefore(currentDrag.node, dropZone.firstElementChild);

            currentDrag = null;
        }
  
    });

}