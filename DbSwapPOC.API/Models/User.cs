using Microsoft.AspNetCore.Identity;

namespace DbSwapPOC.API.Models
{
    public class User : IdentityUser
    {
        public override string UserName { get => Email ; set => base.UserName = value; }
        public override string Email { get => base.Email; set { base.Email = value; base.UserName = value; }  }

    }
}