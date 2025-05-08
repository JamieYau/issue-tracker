using IssueTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace issue_tracker_backend.Services
{
    public class IssueTrackerContext : DbContext
    {
        public IssueTrackerContext(DbContextOptions options) : base(options)
        {
        }

        // tables
        public required DbSet<Issue> Issues { get; set; }
        // public DbSet<User> Users { get; set; }
    }
}
