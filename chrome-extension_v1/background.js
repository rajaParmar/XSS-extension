function detect_ads(url){
  // var pattern1 = /[^]*< *script *>[^]*< *\/ *script *>[^]*/i;
  var pattern = /[^]*doubleclick[^]*/i;
  if(pattern.test(url) == true){
    console.log("add pattern matched!");
    return false;
  }
  return true;
}

function validate(string_to_check){
	//check if <script> tag is present in the stirng_to_check
	//if yes ... return false
	//else return true

//   <script>asdf</script>

// <   ScrIpt  > asdasdf < / Script >

// <script type="text/javascript"> asdf </script>

// <script src="asf"> asdf </script>  

// <  ScriPt type="text/javascript"> asdf </script>

// <scripT src="asf"> asdf </  Script>  

//need to check such possibilities....above list is not exhaustive.
var pattern1 = /[^]*< *script *>[^]*< *\/ *script *>[^]*/i;

var pattern2 = /[^]*< *script *type *= *" *text *\/ *javascript *" *>[^]*< *\/ *script *>[^]*/i;

var pattern3 = /[^]*< *script *src *= *"[^]*">[^]*< *\/ *script *>[^]*/i;

var pattern4 = /<\s*script[^>]*>(.*?)<\s*\/\s*script>/i;

if(pattern1.test(string_to_check) == true){
  console.log("pattern1 matched!");
  return false;
}

if(pattern2.test(string_to_check) == true){
  console.log("pattern2 matched!");
  return false;
}
if(pattern3.test(string_to_check) == true){
  console.log("pattern3 matched!");
  return false;
}

if(pattern4.test(string_to_check) == true){
  console.log("pattern4 matched!");
  return false;
}
return true;

}

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
  	blockingResponse = {
  		cancel : false
  	};

  	var string_to_check = "";
    try{
      console.log(details);
    	if(details.method == "POST"){
        if(details.requestBody.formData != undefined)
    		  string_to_check = details.requestBody.formData.data[0];
      }
    	if(details.method == "GET"){	
        string_to_check = decodeURIComponent((details.url).replace(/\+/g, '%20'));

    	}
    	var result = validate(string_to_check) && detect_ads(string_to_check);
    	if(result == false){
    		blockingResponse.cancel = true;
    	}
    	return blockingResponse;
    }
    catch(e){
      console.log(e);
     }
  },
  {urls: ["<all_urls>"]},
  ["blocking","requestBody"]
);
