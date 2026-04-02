using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11_Assignment.Data;

namespace Mission11_Assignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreContext _bookstoreContext;
        public BookstoreController(BookstoreContext temp)
        {
            _bookstoreContext = temp;
        }

        [HttpGet(Name = "GetBooks")]
        public IActionResult Get(int pageSize=5, int pageNum=1, string sortOrder = "none", [FromQuery] List<string>? bookCategories = null)
        {
            
            IQueryable<Book> query = sortOrder switch
            {
                "asc"  => _bookstoreContext.Books.OrderBy(b => b.Title),
                "desc" => _bookstoreContext.Books.OrderByDescending(b => b.Title),
                _      => _bookstoreContext.Books  // default: no sorting, natural DB order
            };

            if (bookCategories != null && bookCategories.Any())
            {
                query = query.Where(b => bookCategories.Contains(b.Category));
            }

            var totalNumBooks = query.Count();

            return Ok(new
            {
                Books = query
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList(),
                TotalNumBooks = totalNumBooks
            });
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _bookstoreContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook(Book book)
        {
            _bookstoreContext.Books.Add(book);
            _bookstoreContext.SaveChanges();
            return Ok(book);
        }

        [HttpPut("UpdateBook")]
        public IActionResult UpdateBook(Book book)
        {
            _bookstoreContext.Books.Update(book);
            _bookstoreContext.SaveChanges();
            return Ok(book);
        }

        [HttpDelete("DeleteBook")]
        public IActionResult DeleteBook(int id)
        {
            var book = _bookstoreContext.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }
            _bookstoreContext.Books.Remove(book);
            _bookstoreContext.SaveChanges();
            return Ok(book);
        }
    }
}