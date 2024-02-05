import { useState, useEffect } from 'react';

type Notes = {
    id: number;
    category: string;
    title: string;
    description: string;
    date: string;
    completed: boolean;
  }[];

export function useFetch(){
    const [notes, setNotes] = useState<Notes>([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://notely-orcin.vercel.app/notes');
                const data = await response.json();
                setNotes(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data', error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return { notes, loading };    
}