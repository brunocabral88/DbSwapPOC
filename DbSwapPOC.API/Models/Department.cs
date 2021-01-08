using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DbSwapPOC.API.Models
{
    // [Table("Department")]
    public class Department
    {
        [Key]
        public Int16 departmentid { get; set; }
        public string name { get; set; }
        public string groupname { get; set; }
        public DateTime modifieddate { get; set; }
    }
}