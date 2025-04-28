using Microsoft.AspNetCore.Mvc;
using IssueTracker.Models;

namespace issue_tracker_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IssuesController : ControllerBase
    {
        private static List<Issue> _issues = new List<Issue>();
        private static int _nextId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<Issue>> GetAll()
        {
            return Ok(_issues);
        }

        [HttpGet("{id}")]
        public ActionResult<Issue> GetById(int id)
        {
            var issue = _issues.FirstOrDefault(i => i.Id == id);
            if (issue == null)
            {
                return NotFound();
            }
            return Ok(issue);
        }

        [HttpPost]
        public ActionResult<Issue> Create(Issue issue)
        {
            issue.Id = _nextId++;
            issue.CreatedDate = DateTime.Now;
            _issues.Add(issue);
            return CreatedAtAction(nameof(GetById), new { id = issue.Id }, issue);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Issue updatedIssue)
        {
            var existingIssue = _issues.FirstOrDefault(i => i.Id == id);
            if (existingIssue == null)
            {
                return NotFound();
            }

            existingIssue.Title = updatedIssue.Title;
            existingIssue.Description = updatedIssue.Description;
            existingIssue.Status = updatedIssue.Status;
            existingIssue.UpdatedDate = DateTime.Now;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var issue = _issues.FirstOrDefault(i => i.Id == id);
            if (issue == null)
            {
                return NotFound();
            }

            _issues.Remove(issue);
            return NoContent();
        }
    }
} 