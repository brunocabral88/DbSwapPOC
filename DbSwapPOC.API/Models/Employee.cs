using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DbSwapPOC.API.Models
{
    // [Table("Employee")]
    public class Employee
    {
        [Key]
        public int businessentityid { get; set; }
        public string nationalidnumber { get; set; }
        public string loginid { get; set; }
        public string jobtitle { get; set; }
        public DateTime birthdate { get; set; }
        public string maritalstatus { get; set; }
        public DateTime hiredate { get; set; }
        
    }
}