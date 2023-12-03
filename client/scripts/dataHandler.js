const cardContainer = document.querySelector('.card-container')

const apiUrl = 'http://localhost:3500/notes'

let notesArray = []

// Create a function to generate the HTML code for the card
function generateCard(id, title, category, description) {
// Create the main div element for the card
const cardDiv = document.createElement('div');
cardDiv.classList.add('custom-card');
cardDiv.id = id

// Create the inner structure of the card using template literals
cardDiv.innerHTML = `
    <div class="flex justify-between">
        <p class="category-badge">${category}</p>
        <div class="flex items-center">
            <form action="" class="checkbox-form">
                <input type="checkbox" name="" id="" class="checkbox-input">
            </form>
            <button class="edit-button"><img src="./assets/pencil.svg" alt=""></button>
            <button class="delete-bin"><img src="./assets/bin.svg" alt=""></button>
        </div>
    </div>
    <p class="task-title">${title}</p>
    <p class="task-description">${description}</p>
    <p class="task-date">22.01.2023</p>
`;

// Append the generated card to the body or any other container element
cardContainer.appendChild(cardDiv);

return cardDiv
}
  

const fetchNotes = async() => {
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
            // Call the function to generate the card
            const card = generateCard(note._id, note.title, note.category, note.description)
            const editButton = card.querySelector('.edit-button')
            console.log(card)
            editButton.addEventListener('click', createEditModal)
            const deleteBin = card.querySelector('.delete-bin')
            console.log(deleteBin)
            
            deleteBin.addEventListener('click', createDeleteModal)
        } 

        )

        
    } catch (error) {
        console.error(error.message)
    }
}

const updateNote = async(data) => {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            method: "PATCH"
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

const deleteNote = async(data) => {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            method: "DELETE"
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

fetchNotes()