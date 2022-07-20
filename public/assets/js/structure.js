function buildLocation(data) {
    document.title = "CareCenter | " + data.name;

    $("#structure-title").attr("style", `background-image: url(../assets/img/structure-${data.structureID}-background.jpg); background-position: center`);

    $("#name").append(
        `${data.name}`
    );

    $("#introduction").append(
        `${data.introduction}`
    );

    $("#breadcrumb-last").append(
        `${data.name}`
    );

    $("#map").attr("src", data.mapURL);

    $("#phone").append(
        `${data.phoneNumber}`
    );

    $("#mail").append(
        `${data.mailAddress}`
    );

    $("#mail").attr("href", "mailto:" + data.mailAddress);

    $("#address").append(
        `${data.structureAddress}`
    );

    /*only the first element of the carusel must have the class 'active'*/
    $("#carousel-image").append(
        `
    <div class="carousel-item active" style="background-image: url('../assets/img/structure-${data.structureID}-background.jpg')">
                                        <div class="carousel-caption d-none d-md-block">
                                        </div>
                                    </div>
        `
    )

    var arrayImage = ["room", "gym", "garden"];
    for (i = 0; i < arrayImage.length; i++) {
        addGallery(data.structureID, arrayImage[i]);
    }
    $(".carousel-item").css("height", $(".carousel-item").width());
}

function addGallery(id, elem) {
    $("#carousel-image").append(
        `
    <div class="carousel-item" style="background-image: url('../assets/img/structure-${id}-${elem}.jpg')">
                                        <div class="carousel-caption d-none d-md-block">
                                        </div>
                                    </div>
        `
    )
}

function generateServices(data) {
    $("#services").append(
        `<div class="col-md-4">
                <span class="fa-stack fa-4x">
                    <a href="service.html?serviceID=${data.serviceID}">
                        <i class="fa fa-circle fa-stack-2x text-primary"></i>
                        <i class="fa ${data.icon} fa-stack-1x fa-inverse" style="position: relative"></i>
                    </a>
                </span>
                <h4 class="section-heading">${data.name}</h4>
                <p class="section-subheading">${data.introduction}</p>
            </div>`
    );
}

function generateStructure(data) {
    $("#otherStructure").append(
        `
        <div class="col-md-3">
                <span class="fa-stack fa-4x">
                    <a href="structure.html?structureID=${data.structureID}"><img class="rounded-circle img-fluid d-block mx-auto" src="../assets/img/structure-${data.structureID}.jpg"></a>
                </span>
                <h4 class="section-heading adjusted">${data.name}</h4>
                <p class="section-subheading">${data.introduction}</p>
            </div>
        `
    );
}

/*select dayColumn.dayName from structureTimetable inner join structure on structure.structureID = structureTimetable.structureID inner join dayColumn on dayColumn.dayID =structureTimetable.dayID where structure.structureID = 1;*/
function generateTT(id) {
    for (i = 1; i <= 3; i++) {
        fetch(`/structures/${id}/structureTimetables/${i}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                data.map(appendTT);
            });
    }
}

function appendTT(data) {
    $(`#th${data.tableID}`).append(
        `<th>${data.dayName}</th>`
    );

    /* from morning */
    if (data.fromMorning != null) {
        $(`#fromMorning${data.tableID}`).append(
            `<td>${data.fromMorning}</td>`
        );
    } else {
        $(`#fromMorning${data.tableID}${data.tableID}`).append(
            `<td></td>`
        );
    }

    /* to morning */
    if (data.toMorning != null) {
        $(`#toMorning${data.tableID}`).append(
            `<td>${data.toMorning}</td>`
        );
    } else {
        $(`#toMorning${data.tableID}`).append(
            `<td></td>`
        );
    }

    /* from afternoon */
    if (data.fromAfternoon != null) {
        $(`#fromAfternoon${data.tableID}`).append(
            `<td>${data.fromAfternoon}</td>`
        );
    } else {
        $(`#fromAfternoon${data.tableID}`).append(
            `<td></td>`
        );
    }

    /* to afternoon */
    if (data.toAfternoon != null) {
        $(`#toAfternoon${data.tableID}`).append(
            `<td>${data.toAfternoon}</td>`
        );
    } else {
        $(`#toAfternoon${data.tableID}`).append(
            `<td></td>`
        );
    }
}

function startup() {
    var url = new URLSearchParams(window.location.search);
    var id = url.get('structureID');
    fetch(`/structures/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(buildLocation);
        });

    fetch(`/structures/${id}/services`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(generateServices);
        });

    fetch(`/structures?structureID=${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(generateStructure);
        });
    generateTT(id);
}

startup();

$(window).resize(function () {
    $(".carousel-item").css("height", $(".carousel-item").width());
});

$(document).ready(function () {
    
});
