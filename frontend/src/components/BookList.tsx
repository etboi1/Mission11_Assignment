/*
This component is responsible for getting the book data from the API and compiling it 
into a list of cards. Note that this page also uses the bootstrap grid to display the book cards.
*/

import { useEffect, useState } from "react";
import type { book } from "../types/book";
import BookCard from "./BookCard";
import { fetchBooks } from "../api/BookstoreAPI";
import Pagination from "./Pagination";

function BookList({ selectedCategories, sortOrder, pageNum, setPageNum }: { selectedCategories: string[]; sortOrder: string; pageNum: number; setPageNum: (num: number) => void; }) {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [numPages, setNumPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBooks = async () => {
      try{
        setIsLoading(true);
        const data = await fetchBooks(pageSize, pageNum, sortOrder, selectedCategories);
        setBooks(data.books);
        setNumPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container py-4">
      {/* Book grid */}
      <div className="row g-4">
        {books.map((b) => (
          <BookCard key={b.bookID} {...b} />
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
    </div>
  );
}

export default BookList;