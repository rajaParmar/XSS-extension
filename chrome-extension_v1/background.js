function validate(string_to_check){
	//check if <script> tag is present in the stirng_to_check
	//if yes ... return false
	//else return true



}

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
  	blockingResponse = {
  		cancel : false
  	};
  	var string_to_check = "";
  	if(details.method == "POST"){
  		string_to_check = details.requestBody.formData.data[0];
  	}
  	if(details.method == "GET"){	
  		string_to_check = details.url;
  	}
  	//need to confirm if only POST and GET requests are needed to be checked or more...eg PUT,HEAD,etc.
  	console.log(string_to_check)
  	var result = validate(string_to_check);
  	if(validate == false){
  		blockingResponse.cancel = true;
  	}
  	return blockingResponse;

  },
  {urls: ["<all_urls>"]},
  ["blocking","requestBody"]
);