import { useEffect, useState } from "react"
import Note from "../components/Note"

type Notes = {
    id: number;
    category: string;
    title: string;
    description: string;
    date: string;
    completed: boolean;
}[]

const Home = () => {
    // const apiUrl = 'https://notely-orcin.vercel.app/notes'
    const [notes, setNotes] = useState<Notes>([])
    const [isLoading, setIsLoading] = useState(true)
    // const [error, setError] = useState(null)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await fetch('https://notely-orcin.vercel.app/notes')
                const data = await res.json()
                console.log(data)
                setNotes(data)
                setIsLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        fetchNotes()
    }, [])

  return (
    <div>
        {
            notes.map(note => (
                <Note key={note.id} category={note.category} title={note.title} description={note.description} date={note.date} completed={note.completed} />
            ))
        }
    </div>
  )
}

export default Home
