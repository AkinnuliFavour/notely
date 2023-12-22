const editButton = document.querySelector('.edit-button');

const editBackdrop = document.createElement('div');
editBackdrop.classList.add('backdrop')

const editInput = document.createElement('input')

const editSelect = document.createElement('select')

const editDescriptionInput = document.createElement('textarea');

const createEditInput = (text, inputClass) => {
    const div = document.createElement('div')
    div.classList.add('input-container')
    const label = document.createElement('label')
    label.textContent = text
    editInput.classList.add(inputClass)
    editInput.placeholder = 'Add Title'
    div.append(label, editInput)
    return div
}

const createEditSelect = (text, inputClass, divClass, choice1, choice2, choice3) => {
    const div = document.createElement('div')
    div.classList.add(divClass)
    const label = document.createElement('label')
    label.textContent = text
    editSelect.classList.add(inputClass)
    const option1 = document.createElement('option');
    option1.value = choice1;
    option1.innerHTML = choice1;
    const option2 = document.createElement('option');
    option2.value = choice2;
    option2.innerHTML = choice2;
    const option3 = document.createElement('option');
    option3.value = choice3;
    option3.innerHTML = choice3;
    editSelect.append(option1, option2, option3)
    div.append(label, editSelect)
    return div
}

const createEditButtons = (id) => {
    const div = document.createElement('div')
    div.classList.add('button-container')
    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    cancelButton.classList.add('cancel-button')
    cancelButton.addEventListener('click', () => {
        editBackdrop.innerHTML = '';
        body.removeChild(editBackdrop)
    })
    const editButton = document.createElement('button')
    editButton.textContent = 'Edit'
    editButton.classList.add('edit')
    editButton.addEventListener('click', async() => {
       await updateNote(
            {
                id,  
                title: editInput.value,
                category: editSelect.value,
                description: editDescriptionInput.value,
                completed: false 
            }
        )
        editBackdrop.innerHTML = '';
        body.removeChild(editBackdrop)
        await location.reload()
    })

    div.append(cancelButton, editButton)

    return div
}

const createEditModal = (id) => {
    const section = document.createElement('section');
    section.classList.add('modal')
    const heading = document.createElement('p');
    heading.textContent = 'Edit note';
    heading.classList.add('heading')
    const modalForm = document.createElement('form')
    modalForm.classList.add('modal-form')
    const title = createEditInput('Title', 'title-input')
    const category = createEditSelect('Category', 'title-input', 'input-container', 'Personal', 'Home', 'Business')
    const descriptionContainer = document.createElement('div')
    descriptionContainer.classList.add('input-container', 'description-container')
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description(optional)';
    editDescriptionInput.classList.add('description-input')
    editDescriptionInput.maxLength = 200
    editDescriptionInput.placeholder = 'Add description'
    
    descriptionContainer.append(descriptionLabel, editDescriptionInput)

    const buttonContainer = createEditButtons(id)



    modalForm.append( title, category, descriptionContainer)
    section.append(heading, modalForm, buttonContainer)
    editBackdrop.append(section)

    body.append(editBackdrop)
}