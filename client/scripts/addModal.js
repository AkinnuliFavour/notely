// button visible from 500px downwards
const button = document.querySelector('button');

// button visible from 500px downwards
const miniButton = document.querySelector('.mini-button')

const body = document.querySelector('body');

const backdrop = document.createElement('div');
backdrop.classList.add('backdrop')

// create title input field
const titleContainer = document.createElement('div')
titleContainer.classList.add('input-container')
const titleLabel = document.createElement('label')
titleLabel.textContent = 'Title'
const titleInput = document.createElement('input')
titleInput.classList.add('title-input')
titleInput.placeholder = 'Add Title'
titleContainer.append(titleLabel, titleInput)

// create category input field
const categoryContainer = document.createElement('div')
categoryContainer.classList.add('input-container')
const categoryLabel = document.createElement('label')
categoryLabel.textContent = 'category'
const categorySelect = document.createElement('select')
categorySelect.classList.add('category-input')
const option1 = document.createElement('option');
option1.value = 'Personal';
option1.innerHTML = 'Personal';
const option2 = document.createElement('option');
option2.value = 'Home';
option2.innerHTML = 'Home';
const option3 = document.createElement('option');
option3.value = 'Business';
option3.innerHTML = 'Business';
categorySelect.append(option1, option2, option3)
categoryContainer.append(categoryLabel, categorySelect)

// create button field
const buttonContainer = document.createElement('div')
buttonContainer.classList.add('button-container')
const cancelButton = document.createElement('button')
cancelButton.textContent = 'Cancel'
cancelButton.classList.add('cancel-button')
cancelButton.addEventListener('click', () => {
    backdrop.innerHTML = '';
    body.removeChild(backdrop)
})
const addButton = document.createElement('button')
addButton.textContent = 'Add'
addButton.classList.add('add-button')
buttonContainer.append(cancelButton, addButton)

// create description input field
const descriptionContainer = document.createElement('div')
descriptionContainer.classList.add('input-container', 'description-container')
const descriptionLabel = document.createElement('label');
descriptionLabel.textContent = 'Description(optional)';
const descriptionInput = document.createElement('textarea');
descriptionInput.classList.add('description-input')
descriptionInput.placeholder = 'Add description'
descriptionContainer.append(descriptionLabel, descriptionInput)

// creates the modal to fill the form for a new note
const createModal = () => {
    const section = document.createElement('section');
    section.classList.add('modal')
    const heading = document.createElement('p');
    heading.textContent = 'Add note';
    heading.classList.add('heading')
    const modalForm = document.createElement('form')
    modalForm.classList.add('modal-form')

    modalForm.append( titleContainer, categoryContainer, descriptionContainer)
    section.append(heading, modalForm, buttonContainer)
    backdrop.append(section)

    body.append(backdrop)

}

// attach event listener to the visible add button for screen width 500px upwards
button.addEventListener('click', createModal)

// attach event listener to the visible add button for screen width 500px downwards
miniButton.addEventListener('click', createModal)

// function that sends request to the server to create a new note
const createNewNote = async(data) => {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            method: "POST"
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
          }

        const note = await response.json()
        return note

    } catch (error) {
        console.error(error)
    }
}

// Attach an event listener to the add button on the add note modal
document.addEventListener("click", (e) => {
    const target = e.target.closest('.add-button')

    if(target){
        console.log('hi')
        createNewNote({
            title: titleInput.value,
            category: categorySelect.value,
            description: descriptionInput.value
        })
        backdrop.innerHTML = '';
        body.removeChild(backdrop)
        location.reload()
    }
})

