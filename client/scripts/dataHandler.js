const apiUrl = 'https://notely-orcin.vercel.app/notes'

// const apiUrl = 'http://localhost:3500/notes'

const cardContainer = document.querySelector('.card-container')

const allButton = document.querySelector('ul > li:nth-child(1) > button')

const personalButton = document.querySelector('ul > li:nth-child(2) > button')

const homeButton = document.querySelector('ul > li:nth-child(3) > button')

const businessButton = document.querySelector('ul > li:nth-child(4) > button')

const showCompletedNotesCheckbox = document.querySelector('input[id = "display"]')

let notesArray = []

// Create a function to generate the HTML code for the card
function generateCard(id, title, category, description, completed, date) {

// Create the main div element for the card
const cardDiv = document.createElement('div');
cardDiv.classList.add('custom-card');
cardDiv.setAttribute("data-aos", "fade-up")
cardDiv.setAttribute("data-aos-once", "false")
cardDiv.id = id

// Create the inner structure of the card using template literals
cardDiv.innerHTML = `
    <div class="flex justify-between">
        <h3 class="category-badge ${completed ? 'color' : null}">${category}</h3>
        <div class="flex items-center">
            <input type="checkbox" ${completed ? 'checked' : ''} name="" id="" class="checkbox-input">
            <button class="edit-button ${completed ? 'color' : null}"><img src="./assets/pencil.svg" alt=""></button>
            <button class="delete-bin ${completed ? 'color' : null}"><img src="./assets/bin.svg" alt=""></button>
        </div>
    </div>
    <p class="task-title ${completed ? 'line-through' : null}">${title}</p>
    <p class="task-description ${completed ? 'line-through' : null}">${description}</p>
    <p class="task-date ${completed ? 'line-through' : null}">${date}</p>
`;

// Append the generated card to the body or any other container element
cardContainer.appendChild(cardDiv);

}

const markNoteAsCompleted = async (note) => {
    const card = document.getElementById(note._id)
    if(note.completed === false){
        const updatedNote = {
            id: note._id,
            title: note.title,
            category: note.category,
            description: note.description,
            completed: !note.completed
        }
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedNote),
                method: "PATCH"
            })
            await location.reload()
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json()
    
            console.log(data)
    
        } catch (error) {
            console.error(error)
        }
        console.log(false)
    }
    if(note.completed === true){
        const uncompletedNote = {
            id: note._id,
            title: note.title,
            category: note.category,
            description: note.description,
            completed: !note.completed
        }
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(uncompletedNote),
                method: "PATCH"
            })
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            await location.reload()

            const data = await response.json()
        }catch (error) {
            console.error(error)
        }   
    }
}
  

const displayAllNotes = async() => {
    let noteCard = []
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

        if(notes.length === 0){
            cardContainer.innerHTML = '<p>No note to display</p>'
        }

        notes.map(note =>{
            // Call the function to generate the card
            const date = new Date(note.createdAt)
            const creationDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            const card = generateCard(note._id, note.title, note.category, note.description, note.completed, creationDate)

            noteCard.push(document.getElementById(note._id))
        })

        // add event istener to each delete bin
        noteCard.map(note => {
            const deleteBin = note.querySelector('.delete-bin')
            deleteBin.addEventListener("click", (e) => {
                const target = e.target.closest('.delete-bin')
                    if(target){
                        target.addEventListener('click', createDeleteModal(note.id))
                    }   
            })
            
            // add event listener to each edit pencil
            const editButton = note.querySelector('.edit-button')
            editButton.addEventListener("click", (e) => {
                const target = e.target.closest('.edit-button')
                if(target){
                    target.addEventListener('click', createEditModal(note.id))
                }
            })

            // add event listener to each checkbox
            const checkbox = note.querySelector('.checkbox-input')
            checkbox.addEventListener("click", (e) => {
                const target = e.target.closest('.checkbox-input')
                if(target){
                    target.addEventListener('change', () => {
                        const noteData = notes.find(data => data._id === note.id)
                        console.log(noteData)
                        markNoteAsCompleted(noteData)
                    })
                } 
            })
        })

        
    } catch (error) {
        console.error(error.message)
    }

}

const displayPersonalNotes = async() => {
    let noteCard = []
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

        if(personalNotes.length === 0){
            cardContainer.innerHTML = '<p class="no-notetext">No personal note to display</p>'
        }
        
        personalNotes.map(personalNote => {
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
                    target.addEventListener('click', createEditModal(note.id))
                }
            })

            // add event listener to each checkbox
            const checkbox = note.querySelector('.checkbox-input')
            checkbox.addEventListener("click", (e) => {
                const target = e.target.closest('.checkbox-input')
                if(target){
                    target.addEventListener('change', () => {
                        const noteData = notes.find(data => data._id === note.id)
                        console.log(noteData)
                        markNoteAsCompleted(noteData)
                    })
                } 
            })
        })

        
    } catch (error) {
        console.error(error.message)
    }
}

const displayHomeNotes = async() => {
    let noteCard = []
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

        if(homeNotes.length === 0){
            cardContainer.innerHTML = '<p class="no-notetext">No home note to display</p>'
        }
        
        homeNotes.map(homeNote => {
            const date = new Date(homeNote.createdAt)
            const creationDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            // Call the function to generate the card
            generateCard(homeNote._id, homeNote.title, homeNote.category, homeNote.description, homeNote.completed, creationDate)

            noteCard.push(document.getElementById(homeNote._id))
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
                    target.addEventListener('click', createEditModal(note.id))
                }
            })

            // add event listener to each checkbox
            const checkbox = note.querySelector('.checkbox-input')
            checkbox.addEventListener("click", (e) => {
                const target = e.target.closest('.checkbox-input')
                if(target){
                    target.addEventListener('change', () => {
                        const noteData = notes.find(data => data._id === note.id)
                        console.log(noteData)
                        markNoteAsCompleted(noteData)
                    })
                } 
            })
        })

    } catch (error) {
        console.error(error.message)
    }
}

const displayBusinessNotes = async() => {
    let noteCard = []
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
        
        if(businessNotes.length === 0){
            cardContainer.innerHTML = '<p class="no-notetext">No business note to display</p>'
        }

        businessNotes.map(businessNote => {
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
                    target.addEventListener('click', createEditModal(note.id))
                }
            })

            // add event listener to each checkbox
            const checkbox = note.querySelector('.checkbox-input')
            checkbox.addEventListener("click", (e) => {
                const target = e.target.closest('.checkbox-input')
                if(target){
                    target.addEventListener('change', () => {
                        const noteData = notes.find(data => data._id === note.id)
                        console.log(noteData)
                        markNoteAsCompleted(noteData)
                    })
                } 
            })
        })

        
    } catch (error) {
        console.error(error.message)
    }
}

const showCompletedNotes = async (e) => {
    console.log('clicked')
    let noteCard = []
    cardContainer.innerHTML = ''
    if(e.target.checked === false){
        await location.reload()
    }
    try {
        const response = await fetch(apiUrl)

        if(response.status == 404){
            console.log(response.statusText)
        }

        if(!response.ok){
            throw new Error(`Failed to fetch data. Status: ${response.status}`)
        }

        const notes = await response.json()

        const completedNotes = notes.filter(note => note.completed === true)    

        if(completedNotes.length === 0){
            cardContainer.innerHTML = '<p class="no-notetext">No completed note to display</p>'
        }
        
        completedNotes.map(completedNote => {
            const date = new Date(completedNote.createdAt)
            const creationDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            // Call the function to generate the card
            generateCard(completedNote._id, completedNote.title, completedNote.category, completedNote.description, completedNote.completed, creationDate)

            noteCard.push(document.getElementById(completedNote._id))
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
                    target.addEventListener('click', createEditModal(note.id))
                }
            })

            // add event listener to each checkbox
            const checkbox = note.querySelector('.checkbox-input')
            checkbox.addEventListener("click", (e) => {
                const target = e.target.closest('.checkbox-input')
                if(target){
                    target.addEventListener('change', () => {
                        const noteData = notes.find(data => data._id === note.id)
                        console.log(noteData)
                        markNoteAsCompleted(noteData)
                    })
                } 
            })
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

showCompletedNotesCheckbox.addEventListener('click', showCompletedNotes)