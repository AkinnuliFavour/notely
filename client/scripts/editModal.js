const editButton = document.querySelector('.edit-button');

// window.addEventListener("DOMContentLoaded", (event) => {
//     const editButton = document.querySelector('.edit-button');
//     if (editButton) {
//     //   editButton.addEventListener('click', swapper, false);
//     console.log(editButton)
//     }
// });

const editBackdrop = document.createElement('div');
editBackdrop.classList.add('backdrop')

const createEditInput = (text, inputClass) => {
    const div = document.createElement('div')
    div.classList.add('input-container')
    const label = document.createElement('label')
    label.textContent = text
    const input = document.createElement('input')
    input.classList.add(inputClass)
    input.placeholder = 'Add Title'
    div.append(label, input)
    return div
}

const createEditSelect = (text, inputClass, divClass, choice1, choice2, choice3) => {
    const div = document.createElement('div')
    div.classList.add(divClass)
    const label = document.createElement('label')
    label.textContent = text
    const select = document.createElement('select')
    select.classList.add(inputClass)
    const option1 = document.createElement('option');
    option1.value = choice1;
    option1.innerHTML = choice1;
    const option2 = document.createElement('option');
    option2.value = choice2;
    option2.innerHTML = choice2;
    const option3 = document.createElement('option');
    option3.value = choice3;
    option3.innerHTML = choice3;
    select.append(option1, option2, option3)
    div.append(label, select)
    return div
}

const createEditButtons = () => {
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
    editButton.classList.add('add-button')
    editButton.addEventListener('click', updateNote)

    div.append(cancelButton, editButton)

    return div
}

const createEditModal = () => {
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
    const descriptionInput = document.createElement('textarea');
    descriptionInput.classList.add('description-input')
    descriptionInput.placeholder = 'Add description'
    
    descriptionContainer.append(descriptionLabel, descriptionInput)

    const buttonContainer = createEditButtons()



    modalForm.append( title, category, descriptionContainer)
    section.append(heading, modalForm, buttonContainer)
    editBackdrop.append(section)

    body.append(editBackdrop)
}

window.addEventListener("DOMContentLoaded", (event) => {
    const editButton = document.querySelector('.edit-button');
    if (editButton) {
    //   editButton.addEventListener('click', swapper, false);

    editButton.addEventListener('click', console.log('hello'))
    }
});