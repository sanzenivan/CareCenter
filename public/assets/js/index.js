function appendLocation(data){
    $("#structure").append(
        `
        <div class="col-md-4">
                <span class="fa-stack fa-4x">
                    <a href="pages/structure.html?structureID=${data.structureID}"><img class="rounded-circle img-fluid d-block mx-auto" src="assets/img//structure-${data.structureID}.jpg"></a>
                </span>
                <h4 class="section-heading adjusted">${data.name}</h4>
                <p class="section-subheading">${data.introduction}</p>
            </div>
        `
    );
}

function startup() {
    fetch(`/structures`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(appendLocation);
        });
}

startup();