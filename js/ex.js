  form.onsubmit = function(event){
          event.preventDefault();
          submitBtn.innerHTML = "Uploading...";
          var formData = new FormData();
          if(filesList)
          {
            for(var i=0; i < filesList.length; i++)
            {
              var file = filesList[i];
              formData.append('files[]', file, file.name);
            }
            formData.append("user", username);
          }
          $.ajax({
                  url: 'handler.php',
                  type: 'POST',
                  data: formData,
                  dataType: 'json',
                  cache: false,
                  processData: false,
                  contentType: false,
                  success: function(response, textStatus)
                  {
                    // print list of timesheets uploaded so far
                  },
                  error: function(response, textStatus)
                  {
                    // print list of timesheets uploaded so far
                  }
            });


