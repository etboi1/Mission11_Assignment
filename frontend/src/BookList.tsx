/*
This component is responsible for getting the book data from the API and compiling it 
into a list of cards
*/

import { useEffect, useState } from "react";
import type { book } from "./types/book";
import BookCard from "./BookCard";

function BookList() {
    const [books, setBooks] = useState<book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('https://localhost:5000/api/Bookstore');
            const data = await response.json();
            console.log(data);
            setBooks(data);
        }

        fetchBooks();
    }, []);

    return (
        <div className='row g-4 p-5'>
            {books.map((b) => <BookCard {...b} />)}
        </div>
    )
}

export default BookList;