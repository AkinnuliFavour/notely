const button = document.querySelector('button');
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
option1.value = 'personal';
option1.innerHTML = 'Personal';
const option2 = document.createElement('option');
option2.value = 'home';
option2.innerHTML = 'Home';
const option3 = document.createElement('option');
option3.value = 'business';
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
// addButton.addEventListener('click', console.log('hi'))
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


const createNewNote = async(data) => {
    try {
        console.log(data)
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
        console.log(note)
        return note

    } catch (error) {
        console.error(error)
    }
}

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

button.addEventListener('click', createModal)

// Attach an event listener to the add button
document.addEventListener("click", (e) => {
    const target = e.target.closest('.add-button')

    if(target){
        console.log('hi')
        createNewNote({
            title: titleInput.value,
            category: categorySelect.value,
            description: descriptionInput.value
        })
        titleInput.value = ''
        categorySelect.value = ''
        descriptionInput.value = ''
    }
})