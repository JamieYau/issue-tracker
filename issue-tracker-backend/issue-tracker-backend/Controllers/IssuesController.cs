using Microsoft.AspNetCore.Mvc;
using IssueTracker.Models;
using issue_tracker_backend.Services;
using issue_tracker_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace issue_tracker_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IssuesController : ControllerBase
    {
        private readonly IssueTrackerContext context;

        public IssuesController(IssueTrackerContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Issue>>> GetAll()
        {
            return await context.Issues.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Issue>> GetById(int id)
        {
            var issue = await context.Issues.FindAsync(id);
            if (issue == null)
            {
                return NotFound();
            }
            return Ok(issue);
        }

        [HttpPost]
        public async Task<ActionResult<Issue>> Create(IssueDto issueDto)
        {
            var issue = new Issue 
            { 
                Title = issueDto.Title, 
                Description = issueDto.Description,
                Status = issueDto.Status,
                CreatedDate = DateTime.UtcNow,
            };
            context.Issues.Add(issue);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = issue.Id }, issue);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, IssueDto issueDto)
        {
            var issue = context.Issues.Find(id);
            if (issue == null)
            {
                return NotFound();
            }

            issue.Title = issueDto.Title;
            issue.Description = issueDto.Description;
            issue.Status = issueDto.Status;
            issue.UpdatedDate = DateTime.UtcNow;

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var issue = context.Issues.Find(id);
            if (issue == null)
            {
                return NotFound();
            }

            context.Issues.Remove(issue);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
} 