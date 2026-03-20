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
        public IEnumerable<Book> Get(int pageSize=10, int pageNum=1, string sortOrder = "none")
        {
            IQueryable<Book> query = sortOrder switch
            {
                "asc"  => _bookstoreContext.Books.OrderBy(b => b.Title),
                "desc" => _bookstoreContext.Books.OrderByDescending(b => b.Title),
                _      => _bookstoreContext.Books  // default: no sorting, natural DB order
            };

            return query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

    }
}