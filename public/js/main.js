// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });


$('#btnSearch').click(function(e) {
    e.preventDefault();
    const addLocation = $('#txtlocation').val();
    let error = 'Data is available';
    if (!addLocation) {
        renderError(error);
    } else {
        fetch('/weather?address=' + addLocation + '').then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    renderError(data.error);

                } else {
                    renderWeather(data);
                }
            })
        })
    }

});

const renderError = (error) => {
    $('.information').empty();
    if (error) {
        $('.information').append(
            `
            <p class="error">${error}</p>
            `
        );
    }
}
const renderWeather = (user = {}) => {
    $('.information').empty();
    if (user) {
        $('.information').append(
            `
            <p class="location">${user.location}</p>
            <p class="weather">${user.forcast}</p>
            `
        );
    }
}