---
title: "Azure Functions first steps"
date: "2022-07-28"
---

Azure Functions

Kubernetes is one of the most popular platforms for deploying your application, but last year I saw that functions are the next big thing coming. Do you have any part that is not big, maybe not used every day (weekly import) by clients? Does it require a separated container? Maybe this is a good place to start thinking about functions! 

The reason, why I'm using weekly import as an example is that it needs to run only for some time in a whole month. Using containers requires DevOps to think about some additional resources behind Kubernetes to be ready for additional traffic. Such containers may need to work also during heavy traffic and use resources that may be planned for other containers. One of the solutions for this case may be using FaaS (function as a service).

Azure Functions allow you to run your code only at a time when it is required and close your application when there is no traffic. It's achieved by a mechanism called triggers. Every function can have only one of it. For example, we have HTTP, Event Hub and Blob triggers. In mentioned case for weekly import, we can use HTTP and Blob triggers. 

The flow of our process:
- customer sends a request with a payload containing import files
- the function saves the file in blob storage
- once the file is saved in blob storage we have to process it with other functions and save (or log) some result 

and with Azure functions, we can do it just with a few lines of code! 

To work with functions we need [Azure Functions Core Tools ](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Cmacos%2Ccsharp%2Cportal%2Cbash) and [Visual Studio Code](https://code.visualstudio.com/). Let's code!

I really recommend installing Azure [extension](https://code.visualstudio.com/docs/azure/extensions) for VSC, it provides easy setup for initialization function. Once installed you should have Azure tab in VSC, go there, in workspace section click + and select "Create function". Select Http Trigger, then type name and namespace and pick Anonymous in last select. It will generate code for us. 

Next let's generate our blob trigger function. Click + and select "Create function". Select Azure Blob Storage Trigger, then type name and namespace, in last step pick AzureWebJobsStorage and storage name. 

Now we have our default functions. Let's replace default code with our triggers

HTTP trigger
``` 
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Azure.Storage.Blobs;

namespace Demo
{
    public static class FileSave
    {
        [FunctionName("FileSave")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(
                AuthorizationLevel.Anonymous, 
                "post", 
                Route = "{name}")] HttpRequest req,
            [Blob(
                "files/{name}", 
                FileAccess.Write ,
                Connection = "AzureWebJobsStorage")] BlobClient output,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            await output.UploadAsync(req.Body, true);
            return new OkObjectResult("Done");
        }
    }
}
```

Blob trigger (same as generated)
```
using System.IO;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace Demo
{
    public static class BlobTrigger
    {
        [FunctionName("BlobTrigger")]
        public static void Run([BlobTrigger(
            "files/{name}", 
            Connection = "AzureWebJobsStorage")]Stream myBlob, 
            string name, 
            ILogger log)
        {
            log.LogInformation(
                $"C# Blob trigger function processed blob\n Name:{name} \n Size: {myBlob.Length} Bytes"
                );
        }
    }
}
```

Let's dive into code 

This attribute is our function name and will be part of URL.
```
[FunctionName("FileSave")]
```

Our key part is trigger in this case it's HTTP Post request, part of URL should be some name.
```
[HttpTrigger(
    AuthorizationLevel.Anonymous, 
    "post", 
    Route = "{name}")] HttpRequest req
```

Output of function is blob storage, files will be saved into files container with same name from query. Connection is our connection string from Values section in local.settings.json, replace it with your connection string to local emulator or cloud resource.
```
[Blob(
    "files/{name}", 
    FileAccess.Write ,
    Connection = "AzureWebJobsStorage")] BlobClient output
```

Saving file to blob storage, second parameter is responsible for overriding existing files with same name.
```
await output.UploadAsync(req.Body, true);
```

Returning some message after upload.
```
return new OkObjectResult("Done");
```

Blob trigger listening for events in our blob at files container.
```
[BlobTrigger(
    "files/{name}", 
    Connection = "AzureWebJobsStorage")]Stream myBlob
```

This parameter value will be same as {name} from trigger.
```
string name
```

Then in console you can type ```func start``` to run functions. Result should be same as below.

```
Functions:

        FileSave: [POST] http://localhost:7071/api/{name}

        BlobTrigger: blobTrigger
```

Let's try to post file!

```
curl http://localhost:7071/api/file.json 
    -d @testFile.json 
    -H "Content-Type: application/javascript"
```

In your Storage Explorer you should see new file with name from query!

Resources:
- [HTTP trigger docs](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook?tabs=in-process%2Cfunctionsv2&pivots=programming-language-csharp)
- [Blob trigger docs](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob?tabs=in-process%2Cextensionv5%2Cextensionv3&pivots=programming-language-csharp)

