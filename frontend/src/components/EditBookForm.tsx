import { useState } from "react"
import type { book } from "../types/book"
import { updateBook } from "../api/BookstoreAPI";

interface EditBookFormProps {
    book: book;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
    const [ formData, setFormData ] = useState<book>({...book});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateBook(formData.bookID, formData);
        onSuccess();
    }

    return (
        <>
        <div className="modal-backdrop fade show" />
        <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Book</h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="author" className="form-label">Author</label>
                                <input type="text" name="author" className="form-control" value={formData.author} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="publisher" className="form-label">Publisher</label>
                                <input type="text" name="publisher" className="form-control" value={formData.publisher} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="isbn" className="form-label">ISBN</label>
                                <input type="text" name="isbn" className="form-control" value={formData.isbn} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="classification" className="form-label">Classification</label>
                                <input type="text" name="classification" className="form-control" value={formData.classification} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <input type="text" name="category" className="form-control" value={formData.category} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pageCount" className="form-label">Page Count</label>
                                <input type="number" name="pageCount" className="form-control" value={formData.pageCount} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Update Book</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default EditBookForm;