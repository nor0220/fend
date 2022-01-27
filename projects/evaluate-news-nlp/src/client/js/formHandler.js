function handleSubmit(event) {
    event.preventDefault();

    const getData = async ()=>{
        const res = await fetch('http://localhost:8081/api');
        try {
            const api_data = await res.json();
            console.log('Client - data from get:' , api_data);
            return api_data;
        }catch(error) {
            console.log("getData error", error);
        }
    };

    let website = document.getElementById('website').value;
    // check what text was put into the form field
    let check = Client.checkForWebsite(website);
    //if valid site then get data from meaningcloud
    if (check){
        getData()
        .then(function(api_data){
            const API_key = api_data.API_key;
            const API_url = api_data.API_url;

            const formdata = new FormData();
            formdata.append("key", API_key);
            formdata.append("txt", website);
            formdata.append("lang", "en");

            const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };

            console.log("::: Form Submitted :::");
            const response = fetch(API_url, requestOptions)
            .then(response => response.json())
            .then(function(response) {
                document.getElementById('results').innerHTML = JSON.stringify(response, null, '\t');
            })
            .catch(error => console.log('error', error));
        })
    //if not valid website drop alert
    }else{
        alert("Please use a valid website!");
    }
}

export { handleSubmit }
