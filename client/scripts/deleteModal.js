const deleteBin = document.querySelector('.delete-bin');

const deleteBackdrop = document.createElement('div');
deleteBackdrop.classList.add('backdrop')

const createDeleteModalButtons = () => {
    const div = document.createElement('div')
    div.classList.add('button-container')
    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    cancelButton.classList.add('cancel-button')
    cancelButton.addEventListener('click', () => {
        deleteBackdrop.innerHTML = '';
        body.removeChild(deleteBackdrop)
    })
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.classList.add('delete-button')

    document.addEventListener("click", (e) => {
        const target = e.target.closest('.delete-button')
    
        if(target){
            deleteButton.addEventListener('click', deleteNote)
            console.log('hi')
        }
    })
    div.append(cancelButton, deleteButton)

    return div
}


const createDeleteModal = (id) => {
    console.log(id)
    const section = document.createElement('section');
    section.classList.add('delete-modal')
    const heading = document.createElement('p');
    heading.textContent = 'Delete note';
    heading.classList.add('heading')
    const warningText = document.createElement('p');
    warningText.textContent = 'Are you sure you want to delete this note?'

    const buttonContainer = createDeleteModalButtons()

    section.append(heading, warningText, buttonContainer)
    deleteBackdrop.append(section)

    body.append(deleteBackdrop)
}

// deleteBin.addEventListener('click', createDeleteModal)