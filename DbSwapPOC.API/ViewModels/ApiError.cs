using System.Collections.Generic;

namespace DbSwapPOC.API.ViewModels
{
    public class ApiError
    {
        public List<ApiErrorItem> Errors { get; set; } = new List<ApiErrorItem>();

        public ApiError(string[] errors)
        {
            foreach (var error in errors) {
                var item = new ApiErrorItem(error);
                Errors.Add(item);
            }
        }

        public ApiError(string error)
        {
            var item = new ApiErrorItem(error);
            Errors.Add(item);
        }
    }

    public class ApiErrorItem {
        public string Description { get; set; }

        public ApiErrorItem(string description)
        {
            this.Description = description;
        }
    }
}