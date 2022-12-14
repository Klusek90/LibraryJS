const draggables = document.querySelectorAll('.draggable')
const containers= document.querySelectorAll('.boxcont')

draggables.forEach(draggable =>{
    draggable.addEventListener('dragstart',()=>{
        console.log('drag start');
        draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', ()=>{
        console.log(('drag stops'));
        draggable.classList.remove('dragging')
    })
})

containers.forEach( container => {
    container.addEventListener('dragover',e => {
        e.preventDefault();


        const afterElement= getDragAfter(container,e.clientY)
        console.log(afterElement)
        const draggable = document.querySelector('.dragging')
                if(afterElement ==null){
                container.appendChild(draggable)
                }else{
                    container.insertBefore(draggable, afterElement)
                }
    })
})

function getDragAfter(conteiner,y){
    const draggableElements =[...conteiner.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        console.log(offset)
        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child}
        } else {
            return closest
        }
    },{offset: Number.NEGATIVE_INFINITY}).element
}