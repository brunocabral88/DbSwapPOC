using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DbSwapPOC.API.Models
{
    [Table("Employee", Schema = "HumanResources")]
    public class Employee
    {
        [Key]
        public int BusinessEntityID { get; set; }
        public string NationalIDNumber { get; set; }
        public string LoginID { get; set; }
        public string JobTitle { get; set; }
        public DateTime BirthDate { get; set; }
        public string MaritalStatus { get; set; }
        public DateTime HireDate { get; set; }
        
    }
}