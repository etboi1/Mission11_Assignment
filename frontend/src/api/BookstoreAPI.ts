import type { book } from "../types/book";

interface FetchBookstoreResponse {
    books: book[];
    totalNumBooks: number;
}

const API_BASE_URL = "https://localhost:5000/api/Bookstore";

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    sortOrder: string,
    selectedCategories: string[]
): Promise<FetchBookstoreResponse> => {
    try {
        const categoryParams = selectedCategories
        .map((c) => `bookCategories=${encodeURIComponent(c)}`)
        .join("&");
        
        const response = await fetch(
            `${API_BASE_URL}?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ""}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const addBook = async (newBook: book): Promise<book> => {
    try {
        const response = await fetch(`${API_BASE_URL}/AddBook`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        });

        if (!response.ok) {
            throw new Error('Failed to add book');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

export const updateBook = async (bookID: number, updatedBook: book): Promise<book> => {
    try {
        const response = await fetch(`${API_BASE_URL}/UpdateBook/?id=${bookID}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        });

        if (!response.ok) {
            throw new Error('Failed to update book');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    } 
}

export const deleteBook = async (bookID: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/DeleteBook/?id=${bookID}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete book');
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    } 
}