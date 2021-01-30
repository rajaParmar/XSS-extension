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

}

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
  	blockingResponse = {
  		cancel : false
  	};
  	var string_to_check = "";
  	if(details.method == "POST"){
      try{
      if(details.requestBody.formData != undefined)
  		  string_to_check = details.requestBody.formData.data[0];
  	 }
     catch(e){
      console.log(e);
     }
    }
  	if(details.method == "GET"){	
      string_to_check = decodeURIComponent((details.url + '').replace(/\+/g, '%20'));
  	}
  	var result = validate(string_to_check);
  	if(result == false){
  		blockingResponse.cancel = true;
  	}
  	return blockingResponse;

  },
  {urls: ["<all_urls>"]},
  ["blocking","requestBody"]
);