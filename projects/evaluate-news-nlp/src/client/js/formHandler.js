const dotenv = require('dotenv');
dotenv.config();

const API = 'https://api.meaningcloud.com/sentiment-2.1';
const API_key = process.env.API_KEY;

console.log(`Your API key is ${API_key}`);

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    //Client.checkForName(formText)

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
    const response = fetch(API, requestOptions)
    .then(response => response.json())
    .then(function(response) {
        document.getElementById('results').innerHTML = response.message
    })
    .catch(error => console.log('error', error));
}

export { handleSubmit }
