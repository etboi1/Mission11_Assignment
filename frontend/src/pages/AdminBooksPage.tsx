import { useEffect, useState } from "react";
import type { book } from "../types/book";
import { deleteBook, fetchBooks } from "../api/BookstoreAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";
import Header from "../components/Header";

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
        <Header />

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
        <div className="table-responsive p-5">
            <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Pages</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((b) => (
                        <tr key={b.bookID}>
                            <td className="fw-semibold">{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.publisher}</td>
                            <td><span className="text-muted small">{b.isbn}</span></td>
                            <td>{b.classification}</td>
                            <td>{b.category}</td>
                            <td>{b.pageCount}</td>
                            <td>${b.price.toFixed(2)}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-primary m-1"
                                    onClick={() => setEditingBook(b)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDeleteBook(b.bookID)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Container for pagination and add book button */}
        <div className="d-flex align-items-center justify-content-between mt-4 mb-3 ms-5 me-5">
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

            {!showForm && (
                <button
                    className="btn btn-primary"
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
        </div>

        </>
    );
};

export default AdminBooksPage;