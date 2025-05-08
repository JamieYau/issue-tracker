using System.ComponentModel.DataAnnotations;

namespace issue_tracker_backend.Models
{
    public class IssueDto
    {
        public int IssueId { get; set; }
        [Required]
        public required string Title { get; set; } = "";
        [Required]
        public required string Description { get; set; } = "";
        [Required]
        public required string Status { get; set; } = "Open";
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
