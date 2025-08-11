namespace ComicViewAPI.Models
{
  public class Comic
  {
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string IssueNumber { get; set; } = "";
    public string Publisher { get; set; } = "";
    public decimal PurchasePrice { get; set; }
    public decimal CurrentPrice { get; set; }
    public DateTime PurchaseDate { get; set; } = DateTime.UtcNow; // store as UTC
    public int OwnerUserId { get; set; }
  }
}
