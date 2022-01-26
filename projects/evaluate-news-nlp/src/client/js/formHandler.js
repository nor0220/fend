const getData = async ()=>{
    const res = await fetch('/api');
    try {
        const api_data = await res.json();
        console.log('Client - data from get:' , api_data);
        return api_data;
    }catch(error) {
        console.log("getData error", error);
    }
};

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    //Client.checkForName(formText)
    getData()
    .then(function(api_data){
        const API_key = api_data.API_key;
        const API_url = api_data.API_url;

        const formdata = new FormData();
        formdata.append("key", API_key);
        formdata.append("txt", formText);
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
            document.getElementById('results').innerHTML = response.agreement
        })
        .catch(error => console.log('error', error));
    })
    
}

export { handleSubmit }
