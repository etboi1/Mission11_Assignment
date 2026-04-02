import { useEffect, useState } from "react";
import type { book } from "../types/book";
import { deleteBook, fetchBooks } from "../api/BookstoreAPI";
import AdminBookCard from "../components/AdminBookCard";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";

function AdminBooksPage() {
    const [books, setBooks] = useState<book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pageNum, setPageNum] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [numPages, setNumPages] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editingBook, setEditingBook] = useState<book | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(pageSize, pageNum, "none", []);
                setBooks(data.books);
                setNumPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        }

        loadBooks();
    }, [pageSize, pageNum]);


    const handleDeleteBook = async (bookID: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;
        try {
            await deleteBook(bookID);
            setBooks((books.filter((b) => b.bookID !== bookID)));
        } catch (error) {
            alert("Failed to delete book. Please try again.");
        }
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <>

        {!showForm && (
            <button
            className="btn btn-primary mb-3"
            onClick={() => setShowForm(true)}
            >
                Add Book
            </button>
        )}
        
        {showForm && (
            <NewBookForm 
                onSuccess={() => {
                    setShowForm(false); 
                    fetchBooks(pageSize, pageNum, "none", []).then((data) => 
                        setBooks(data.books)
                    );
                }}
                onCancel={() => setShowForm(false)}
            />
        )}

        {editingBook && (
            <EditBookForm 
                book={editingBook}
                onSuccess={() => {
                    setEditingBook(null);
                    fetchBooks(pageSize, pageNum, "none", []).then((data) => setBooks(data.books));
                }}
                onCancel={() => setEditingBook(null)}
            />
        )}

        {/* Book grid */}
        <div className="row g-4">
            {books.map((b) => (
                <AdminBookCard key={b.bookID} {...b} />
            ))}
        </div>
        
        {/* Pagination */}
        <Pagination 
            currentPage={pageNum} 
            totalPages={numPages} 
            pageSize={pageSize} 
            onPageChange={setPageNum} 
            onPageSizeChange={(newSize) => {
                setPageNum(1);
                setPageSize(newSize);
            }} 
        />
        </>
    );
};

export default AdminBooksPage;