const deleteBin = document.querySelector('.delete-bin');

const deleteBackdrop = document.createElement('div');
deleteBackdrop.classList.add('backdrop')

const createDeleteModalButtons = (id) => {
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
    deleteButton.addEventListener('click', () => {
        console.log(id)
        deleteNote({ id })
        deleteBackdrop.innerHTML = '';
        body.removeChild(deleteBackdrop)
        location.reload()
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

    const buttonContainer = createDeleteModalButtons(id)

    section.append(heading, warningText, buttonContainer)
    deleteBackdrop.append(section)

    body.append(deleteBackdrop)
}

const displayDeleteModal = async () => {
    let noteCard = []
    try {
        const response = await fetch(apiUrl)

        if(response.status == 404){
            console.log(response.statusText)
        }

        if(!response.ok){
            throw new Error(`Failed to fetch data. Status: ${response.status}`)
        }

        const notes = await response.json()

        notes.map(note =>{
            // get notes from dom and add them to the noteCard array
            noteCard.push(document.getElementById(note._id))
            console.log(noteCard)
            
        })

        // map over noteCard array and add an event listener to each delete bin
        noteCard.map(note => {
            const deleteBin = note.querySelector('.delete-bin')
            deleteBin.addEventListener("click", (e) => {
                const target = e.target.closest('.delete-bin')
                for (let index = 0; index < 1; index++) {
                    if(target){
                        target.addEventListener('click', createDeleteModal(note.id))
                    }   
                }
            })
        })

        return response

        
    } catch (error) {
        console.error(error.message)
    }
}

displayDeleteModal()

// deleteBin.addEventListener('click', createDeleteModal)