const Note = require('../models/Note')

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllNotes = async (req, res) => {
    const { userId } = req.body

    // Get all user's notes from MongoDB
    const notes = await Note.find({ 'userId': userId }).lean()

    // If no notes 
    if (!notes?.length) {
        return res.status(404).json({ message: 'No notes found' })
    }

    res.json(notes)
}

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = async (req, res) => {
    const { userId, title, category, description } = req.body


    console.log(req.body)

    // Confirm data
    if (!userId || !title || !category || !description) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    // Create and store the new note 
    const note = await Note.create({ userId, title, category, description })

    if (note) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }

}

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = async (req, res) => {
    const { id, userId, title, category, description, completed } = req.body

    // Confirm data
    if (!id || !userId || !title || !category || !description || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    note.title = title
    note.category = category
    note.description = description
    note.completed = completed

    const updatedNote = await note.save()

    res.json(`'${updatedNote.title}' updated`)
}

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    // Confirm note exists to delete 
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    const result = await note.deleteOne()

    const reply = `Note '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}