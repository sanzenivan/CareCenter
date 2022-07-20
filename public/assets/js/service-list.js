function createSectionService(data) {
    $("#label-content").append(
        `
        <h1 class="my-4">${data.category} services</h1>
            <div class="row d-flex justify-content-center text-center mb-4" id="${data.category}">
            
            </div>
        `
    );

    fetch(`/services?category=${data.category}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(createServiceByType);
        });
}

/*genera la 'preview' del signolo servizio*/
function createServiceByType(data) {
    var category = "#" + data.category;
    $(category).append(
        `
        <div class="col-md-4">
                <span class="fa-stack fa-4x">
                    <a href="service.html?serviceID=${data.serviceID}">
                        <i class="fa fa-circle fa-stack-2x text-primary"></i>
                        <i class="fa ${data.icon} fa-stack-1x fa-inverse" style="position: relative"></i>
                    </a>
                </span>
                <h4 class="section-heading">${data.name}</h4>
                <p class="section-subheading">${data.introduction}</p>
            </div>
        `
    );
}

function createSectionLocation(data) {
    $("#label-content").append(
        `
        <h1 class="my-4">${data.name}</h1>
            <div class="row d-flex justify-content-center text-center mb-4" id="${data.structureID}">
            
            </div>
        `
    );

    fetch(`/structures/${data.structureID}/services`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(createServiceByLocation);
        });
}

function createServiceByLocation(data) {
    var structureId = "#" + data.structureID;
    $(structureId).append(
        `
        <div class="col-md-4">
                <span class="fa-stack fa-4x">
                    <a href="service.html?serviceID=${data.serviceID}">
                        <i class="fa fa-circle fa-stack-2x text-primary"></i>
                        <i class="fa ${data.icon} fa-stack-1x fa-inverse" style="position: relative"></i>
                    </a>
                </span>
                <h4 class="section-heading">${data.name}</h4>
                <p class="section-subheading">${data.introduction}</p>
            </div>
        `
    );
}

function byLocation() {
    $("#label-content").empty();
    document.getElementById("byType").disabled = false;
    document.getElementById("byLocation").disabled = true;

    fetch(`/structures`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(createSectionLocation);
        });
}

function byType() {
    $("#label-content").empty();
    document.getElementById("byType").disabled = true;
    document.getElementById("byLocation").disabled = false;

    fetch(`/services`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(createSectionService);
        });
}

document.title="CareCenter | Services"

byType();
