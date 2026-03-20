using Microsoft.EntityFrameworkCore;
using Mission11_Assignment.Data;

namespace Mission11_Assignment.Data
{
    public class BookstoreContext : DbContext
    {
        public BookstoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
    }
}