// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function ShowCountryCreateModal() {
    $.ajax({
        url: "/country/CreateModalForm",
        type: 'get',
        success: function (response) {
            $("#DivCreateDialog").html(response);
            ShowCreateModalForm();
        }
    });
    return;
}

function ShowCityCreateModal() {
    var lstCountryCtrl = document.getElementById('lstCountryId');
    var countryId = lstCountryCtrl?.value;

    if (!countryId) {
        alert("Please select a country first.");
        return;
    }

    $.ajax({
        url: "/city/CreateModalForm?countryId=" + countryId,
        type: 'get',
        success: function (response) {
            $("#DivCreateDialog").html(response);
            ShowCreateModalForm();
        },
        error: function () {
            console.error("Error loading city create modal.");
        }
    });
}
function FillCities(lstCountryCtrl, lstCityId) {
    var lstCities = $("#" + lstCityId);
    lstCities.empty();

    lstCities.append($('<option/>',
        {
            value: null,
            text: "Select City"
        }));

    var selectedCountry = lstCountryCtrl.options[lstCountryCtrl.selectedIndex].value;

    if (selectedCountry != null && selectedCountry != '') {
        $.getJSON('/Customer/getcitiesbycountry', { countryId: selectedCountry }, function (cities) {
            if (cities != null && !jQuery.isEmptyObject(cities)) {
                $.each(cities, function (index, city) {
                    lstCities.append($('<option/>',
                        {
                            value: city.value,
                            text: city.text
                        }));
                });
            };
        });
    }
    return;
}

$(".custom-file-input").on("change", function () {

    var fileName = $(this).val().split("\\").pop();

    document.getElementById('PreviewPhoto').src = window.URL.createObjectURL(this.files[0]);

    document.getElementById('PhotoUrl').value = fileName;

});

function ShowCreateModalForm() {
    const modalElement = document.getElementById('DivCreateDialogHolder');
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    modal.show();
}

function submitModalForm() {
    var btnSubmit = document.getElementById('btnSubmit');
    if (btnSubmit) btnSubmit.click();
    else console.error("Submit button with id 'btnSubmit' not found.");
}

function refreshCountryList() {
    var btnBack = document.getElementById('dupBackBtn');
    btnBack.click();
    FillCountries("lstCountryId");
}

function refreshCityList() {
    var btnBack = document.getElementById('dupBackBtn');
    btnBack.click();
    var lstCountryCtrl = document.getElementById('lstCountryId');
    FillCities(lstCountryCtrl, "lstCity")
}

function FillCountries(lstCountryId) {

    var lstCountries = $("#" + lstCountryId);
    lstCountries.empty();

    lstCountries.append($('<option/>',
        {
            value: null,
            text: "Select Country"
        }));

    $.getJSON("/country/GetCountries", function (countries) {
        if (countries != null && !jQuery.isEmptyObject(countries)) {
            $.each(countries, function (index, country) {
                lstCountries.append($('<option/>',
                    {
                        value: country.value,
                        text: country.text
                    }));
            });
        }
    });
    
}

