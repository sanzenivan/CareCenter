function createDoctor(data) {
    document.title = "CareCenter | " + data.fullName;
    $("#title").append(
        `${data.fullName}`
    );
    $("#subtitle").append(
        `${data.position}`
    );
    $("#breadcrumb-last").append(
        `${data.fullName}`
    );
    $("#top-left").append(
        `
            <img src="../assets/img/doctor-${data.doctorID}.jpg" style="width:100%" alt="Avatar">
            <div class="team-display-bottomleft team-container">
                <h4 class="section-heading photo-name no-margin-bottom">${data.fullName}</h4>
                <p class="section-subheading no-margin-bottom photo-title">${data.position}</p><br>
            </div>
        `
    );
    $("#bottom-left").append(
        `
            <p class="left">
                <i class="material-icons md-dark">mail_outline</i>
                <a href="mailto:mario.rossi@carecenter.com">${data.mailAddress}</a>
            </p>
            <p class="left">
                <i class="material-icons md-dark">call</i> ${data.phoneNumber}
            </p>
        `
    );
        
    fetch(`/doctors/${data.doctorID}/doctorTimetable`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(createDays);
    });
    
    if(data.biography_1 != null || data.biography_2!=null){
        $("#biography").append(
            `
                <div class="team-twothird"> 
                    <div class="team-container team-card team-white team-margin-bottom" id ="paragraphs">
                        <h4 class="section-heading team-title">Short biography</h4>
                    </div>
                </div>
            `
        );
        if(data.biography_1 != null){
            $("#paragraphs").append(
                `
                    <p class="section-paragraph">${data.biography_1}</p>
                `
            );
        }
        if(data.biography_2 != null){
            $("#paragraphs").append(
                `
                    <p class="section-paragraph">${data.biography_2}</p>
                `
            );
        }
    }
    
    fetch(`/services?id=${data.doctorID}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(createHeadServices);
    });
    
    fetch(`/doctors/${data.doctorID}/services`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(createOtherServices);
    });
    
}

function createDays(data) {
    /* day name*/
    $("#th").append(
        `<th>${data.dayName}</th>`
    );
    
    /* from morning */
    if(data.fromMorning != null){
        $("#fromMorning").append(
            `<td>${data.fromMorning}</td>`
        );
    }else{
        $("#fromMorning").append(
            `<td></td>`
        );
    }
    
    /* to morning */
    if(data.toMorning != null){
        $("#toMorning").append(
            `<td>${data.toMorning}</td>`
        );
    }else{
        $("#toMorning").append(
            `<td></td>`
        );
    }
    
    /* from afternoon */
    if(data.fromAfternoon != null){
        $("#fromAfternoon").append(
            `<td>${data.fromAfternoon}</td>`
        );
    }else{
        $("#fromAfternoon").append(
            `<td></td>`
        );
    }
    
    /* to afternoon */
    if(data.toAfternoon != null){
        $("#toAfternoon").append(
            `<td>${data.toAfternoon}</td>`
        );
    }else{
        $("#toAfternoon").append(
            `<td></td>`
        );
    }
}

function createHeadServices(data) {
    $("#services").append(
        `
            <a href="service.html?serviceID=${data.serviceID}">
            <li class="areasName">${data.name}</li>
            </a>
        `
        );
}

function createOtherServices(data) {
    $("#services").append(
        `
            <a href="service.html?serviceID=${data.serviceID}">
            <li class="areasName">${data.name}</li>
            </a>
        `
        );
}

function startup() {
    var url = new URLSearchParams(window.location.search);
    var id = url.get('doctorID');
    fetch(`/doctors/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.map(createDoctor);
        });
}

startup();