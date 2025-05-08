using System;

namespace IssueTracker.Models
{
    public class Issue
    {
        public int IssueId { get; set; }
        public required string Title { get; set; } = "";
        public required string Description { get; set; } = "";
        public required string Status { get; set; } = "Open";
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
} 