// let backBoneDomain="http://localhost:8555/backbone";
let backBoneDomain="https://dev.optimgrow.com" ;


let cockpitUrl = backBoneDomain+'/cockpit/';






async function makeLobbyBackboneRequest(inputJson,cockpitBackBoneRequestUrl) {
    try {
        let api=cockpitUrl+cockpitBackBoneRequestUrl;

        let result=  await fetch(api, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'input='+JSON.stringify(inputJson)+''
        })

        return await result.json();
    } catch (error) {
        let response={};
        response["error"]="true";
        response["message"]="Internet disconnected! Please check your network connection";
        return response;
    }
}



let AccountController= {
    saveOptimGrowWebsiteLeads: async function (restaurantName,name,email,mobile,countryId) {
        let body = {"restaurantName":restaurantName,"name":name,"email":email,"mobile":mobile,"countryId":$("#countryId").val()};
        return await makeLobbyBackboneRequest(body, "account/saveOptimGrowWebsiteLeads");
    }
}

let saveWebsiteLeads=async function ()  {
    if($("#restaurantName").val()===''){
        alert("Please enter restaurant name");
        return;
    }

    if($("#name").val()===''){
        alert("Please enter your good  name");
        return;
    }

    if($("#email").val()===''){
        alert("Please enter email for communication");
        return;
    }

    if($("#mobile").val()===''){
        alert("Please enter mobile number");
        return;
    }

    if(!validateEmail($("#email").val())){
        alert("Please enter valid email");
        return;
    }

    let response=await AccountController.saveOptimGrowWebsiteLeads($("#restaurantName").val(),$("#name").val(),$("#email").val(),$("#mobile").val(),$("#countryId").val());
    if(response["error"]==="false"){
        $("#restaurantName").val('');
        $("#name").val('');
        $("#email").val('');
        $("#mobile").val('');
        alert("Thank for you interest. We shall contact you within 1 working day!");
    }else{
        alert("Please try again");
    }
}



function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}