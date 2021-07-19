function GetCountryData(Countryname) {
    //Create a XML HTTP Object
    let xhr = new XMLHttpRequest();

    //Create a Request
    xhr.open('GET', 'https://restcountries.eu/rest/v2/name/' + Countryname, true);

    //Send a Request
    xhr.send();

    //Sort the request
    xhr.addEventListener('load', function () {
        let [data] = JSON.parse(xhr.responseText)
        console.log(data.currencies[0].code)
    })
}

GetCountryData('usa');
