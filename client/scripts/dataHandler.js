const apiUrl = 'https://notely-orcin.vercel.app/notes'

const cardContainer = document.querySelector('.card-container')

const allButton = document.querySelector('ul > li:nth-child(1) > button')

const personalButton = document.querySelector('ul > li:nth-child(2) > button')

const homeButton = document.querySelector('ul > li:nth-child(3) > button')

const businessButton = document.querySelector('ul > li:nth-child(4) > button')

let notesArray = []

// Create a function to generate the HTML code for the card
function generateCard(id, title, category, description, completed, date) {
// Create the main div element for the card
const cardDiv = document.createElement('div');
cardDiv.classList.add('custom-card');
cardDiv.id = id

// Create the inner structure of the card using template literals
cardDiv.innerHTML = `
    <div class="flex justify-between">
        <p class="category-badge">${category}</p>
        <div class="flex items-center">
            <button class="edit-button"><img src="./assets/pencil.svg" alt=""></button>
            <button class="delete-bin"><img src="./assets/bin.svg" alt=""></button>
        </div>
    </div>
    <p class="task-title">${title}</p>
    <p class="task-description">${description}</p>
    <p class="task-date">${date}</p>
`;

// Append the generated card to the body or any other container element
cardContainer.appendChild(cardDiv);

}
  

const displayAllNotes = async() => {
    let noteCard = []
    cardContainer.innerHTML = ''
    try {
        const response = await fetch(apiUrl, headers)

        if(response.status == 404){
            console.log(response.statusText)
        }

        if(!response.ok){
            throw new Error(`Failed to fetch data. Status: ${response.status}`)
        }

        const notes = await response.json()

        notes.map(note =>{
            // Call the function to generate the card
            const date = new Date(note.createdAt)
            const creationDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            console.log(creationDate)
            const card = generateCard(note._id, note.title, note.category, note.description, note.completed, creationDate)

            noteCard.push(document.getElementById(note._id))
        })

        noteCard.map(note => {
            const deleteBin = note.querySelector('.delete-bin')
            deleteBin.addEventListener("click", (e) => {
                const target = e.target.closest('.delete-bin')
                    if(target){
                        target.addEventListener('click', createDeleteModal(note.id))
                    }   
            })

            const editButton = note.querySelector('.edit-button')
            editButton.addEventListener("click", (e) => {
                const target = e.target.closest('.edit-button')
                if(target){
                    console.log(target)
                    target.addEventListener('click', createEditModal(note.id))
                }
            })

            // deleteBin.addEventListener('click', createDeleteModal(note.id))
        })

        
    } catch (error) {
        console.error(error.message)
    }

}

const displayPersonalNotes = async() => {
    let noteCard = []
    console.log('clicked!')
    cardContainer.innerHTML = ''
    try {
        const response = await fetch(apiUrl)

        if(response.status == 404){
            console.log(response.statusText)
        }

        if(!response.ok){
            throw new Error(`Failed to fetch data. Status: ${response.status}`)
        }

        const notes = await response.json()

        const personalNotes = notes.filter(note => note.category === 'Personal')    

        console.log(notes)
        
        personalNotes.map(personalNote => {
            console.log(personalNote)
            const date = new Date(personalNote.createdAt)
            const creationDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            // Call the function to generate the card
            generateCard(personalNote._id, personalNote.title, personalNote.category, personalNote.description, personalNote.completed, creationDate)

            noteCard.push(document.getElementById(personalNote._id))
        })

        noteCard.map(note => {
            const deleteBin = note.querySelector('.delete-bin')
            deleteBin.addEventListener("click", (e) => {
                const target = e.target.closest('.delete-bin')
                    if(target){
                        target.addEventListener('click', createDeleteModal(note.id))
                    }   
            })

            const editButton = note.querySelector('.edit-button')
            editButton.addEventListener("click", (e) => {
                const target = e.target.closest('.edit-button')
                if(target){
                    console.log(target)
                    target.addEventListener('click', createEditModal(note.id))
                }
            })
            // deleteBin.addEventListener('click', createDeleteModal(note.id))
        })

        
    } catch (error) {
        console.error(error.message)
    }
}

const displayHomeNotes = async() => {
    let noteCard = []
    console.log('clicked!')
    cardContainer.innerHTML = ''
    try {
        const response = await fetch(apiUrl)

        if(response.status == 404){
            console.log(response.statusText)
        }

        if(!response.ok){
            throw new Error(`Failed to fetch data. Status: ${response.status}`)
        }

        const notes = await response.json()

        const homeNotes = notes.filter(note => note.category === 'Home')    

        console.log(notes)
        
        homeNotes.map(homeNote => {
            console.log(homeNote)
            const date = new Date(homeNote.createdAt)
            const creationDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            // Call the function to generate the card
            generateCard(homeNote._id, homeNote.title, homeNote.category, homeNote.description, homeNote.completed, creationDate)

            noteCard.push(document.getElementById(homeNote._id))
        })

        console.log(noteCard)

        noteCard.map(note => {
            const deleteBin = note.querySelector('.delete-bin')
            deleteBin.addEventListener("click", (e) => {
                const target = e.target.closest('.delete-bin')
                    if(target){
                        target.addEventListener('click', createDeleteModal(note.id))
                    }   
            })

            const editButton = note.querySelector('.edit-button')
            editButton.addEventListener("click", (e) => {
                const target = e.target.closest('.edit-button')
                if(target){
                    console.log(target)
                    target.addEventListener('click', createEditModal(note.id))
                }
            })

            // deleteBin.addEventListener('click', createDeleteModal(note.id))
        })

    } catch (error) {
        console.error(error.message)
    }
}

const displayBusinessNotes = async() => {
    let noteCard = []
    console.log('clicked!')
    cardContainer.innerHTML = ''
    try {
        const response = await fetch(apiUrl)

        if(response.status == 404){
            console.log(response.statusText)
        }

        if(!response.ok){
            throw new Error(`Failed to fetch data. Status: ${response.status}`)
        }

        const notes = await response.json()

        const businessNotes = notes.filter(note => note.category === 'Business')    

        console.log(notes)
        
        businessNotes.map(businessNote => {
            console.log(businessNote)
            const date = new Date(businessNote.createdAt)
            const creationDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            // Call the function to generate the card
            generateCard(businessNote._id, businessNote.title, businessNote.category, businessNote.description, businessNote.completed, creationDate)

            noteCard.push(document.getElementById(businessNote._id))
        })

        // map over noteCard array and add an event listener to each delete bin
        noteCard.map(note => {
            const deleteBin = note.querySelector('.delete-bin')
            deleteBin.addEventListener("click", (e) => {
                const target = e.target.closest('.delete-bin')
                    if(target){
                        target.addEventListener('click', createDeleteModal(note.id))
                    }   
            })

            const editButton = note.querySelector('.edit-button')
            editButton.addEventListener("click", (e) => {
                const target = e.target.closest('.edit-button')
                if(target){
                    console.log(target)
                    target.addEventListener('click', createEditModal(note.id))
                }
            })
            // deleteBin.addEventListener('click', createDeleteModal(note.id))
        })

        
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

displayAllNotes()

allButton.addEventListener('click', displayAllNotes)

personalButton.addEventListener('click', displayPersonalNotes)

homeButton.addEventListener('click', displayHomeNotes)

businessButton.addEventListener('click', displayBusinessNotes)
