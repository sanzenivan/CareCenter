function buildService(data) {
    $("#name").append(
        `${data.name}`
    );
    $("#introduction").append(
        `${data.introduction}`
    );
    $("#breadcrumb-last").append(
        `${data.name}`
    );
    $("#overview").append(
        `${data.overview}`
    );
    $("#goal").append(
        `${data.goals}`
    );

    document.title = "CareCenter | " + data.name;
}

function addAssistant(data) {
    $("#assistant").append(
        `
        <a href="doctor.html?doctorID=${data.doctorID}" class="docLink" style="position: relative">
                        <div class="row no-gutters mb-4">
                            <span class="col-3 col-md-4">
                                <img src="../assets/img/doctor-${data.doctorID}.jpg" class="docImage">
                            </span>
                            <span class="col-9 col-md-8" style="position: relative">
                                <div class="docName">${data.fullName}</div>
                            </span>
                        </div>
                    </a>
        `
    )
}

function addHeadOfService(data) {
    $("#headOfService").append(
        `
        <a href="doctor.html?doctorID=${data.doctorID}" class="docLink" style="position: relative">
                        <div class="row no-gutters mb-4">
                            <span class="col-3 col-md-4">
                                <img src="../assets/img/doctor-${data.doctorID}.jpg" class="docImage">
                            </span>
                            <span class="col-9 col-md-8" style="position: relative">
                                <div class="docName">${data.fullName}</div>
                            </span>
                        </div>
                    </a>
        `
    )
}

function addStructure(data) {
    $("#structure").append(
        `
        <div class="col-lg-3">
                <span class="fa-stack fa-4x">
                    <a href="structure.html?structureID=${data.structureID}"><img class="rounded-circle img-fluid d-block mx-auto" src="../assets/img/structure-${data.structureID}.jpg"></a>
                </span>
                <h4 class="section-heading adjusted">${data.name}</h4>
                <p class="section-subheading">${data.introduction}</p>
        </div>
        `
    );
}

function startup() {
    var url = new URLSearchParams(window.location.search);
    var id = url.get('serviceID');
    fetch(`/services/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            buildService(data[0]);

            fetch(`/doctors/${data[0].headOfServiceID}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    data.map(addHeadOfService);
                });
        });

    fetch(`/services/${id}/doctors`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(addAssistant);
        });

    fetch(`/services/${id}/structures`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(addStructure);
        });
}

startup();