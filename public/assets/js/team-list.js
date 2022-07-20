function createSectionDoctors(data) {
    fetch(`/doctors?category=${data.category}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(createDoctor);
        });
}

function createDoctor(data) {
    var category = "#" + data.category;
    $(category).append(
        `
        <div class="col-md-4">
                <span class="fa-stack fa-4x">
                 <a href="doctor.html?doctorID=${data.doctorID}"><img class="rounded-circle img-fluid d-block mx-auto" src="../assets/img/doctor-${data.doctorID}.jpg"></a>
                </span>
                <h4 class="section-heading">${data.fullName}</h4>
                <h6 class="section-subheading redefine-margin-bottom">${data.position}</h6>
                <p class="section-preview">${data.introduction}</p>
        </div>
        `
    );
}


function startup() {
        fetch(`/doctors`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(createSectionDoctors);
        });
}

startup();