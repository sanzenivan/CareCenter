# General information about the team and the web application

* Bitbucket repo URL: https://polimi-hyp-2018-10459971@bitbucket.org/polimihyp2018team10468326/polimi-hyp-2018-project.git

* Heroku URL: https://tranquil-reaches-62897.herokuapp.com/

* Team administrator: Ivan Sanzeni, 10468326, polimi-hyp-2018-10468326

* Team member n.2 : Matteo Vantadori, 10459971, polimi-hyp-2018-10459971


# Client-side language used

* Html

* Css

* Javascript


# Template used

* https://startbootstrap.com/


# External vendors' fonts used

* https://startbootstrap.com/

* https://fontawesome.com/

* https://samcome.github.io/webfont-medical-icons/

* https://material.io/tools/icons/?style=baseline


# Description of the REST API

* /structures (returns the data of all the structures)

* /structures?structureID=... (structureID = integer, returns the data of all the structures, except the one specified by the ID)

* /structure/:id (:id = identifier of the structure in the database, returns the data of that specific structure)

* /structure/:id/services (:id = identifier of the structure in the database, returns the data of all the services of that structure)

* /structures/:id/structureTimetables/:table (:id = identifier of the structure in the database, :table = identifier of the table in the database [ID = 1 for the info point timetable, ID = 2 for the activities timetable, ID = 3 for the opening hours timetable], returns the specific timetable of that structure)

* /services (returns the data of all the services)

* /services?doctorID=... (doctorID = integer, returns the data of all the services provided by that doctor)

* /services?category=... (category = String, returns the data of all the services belonging to that category)

* /services/:id (:id = identifier of the service in the database, returns the data of that specific service)

* /services/:id/doctors (:id = identifier of the service in the database, returns the data of all the doctors providing that service)

* /services/:id/structures (:id = identifier of the service in the database, returns the data of all the structures providing that service)

* /doctors (returns the data of all the doctors)

* /doctors?category=... (category = String, returns the data of all the doctors belonging to a specific category)

* /doctors/:id (:id = identifier of the doctor in the database, returns the data of that specific doctor)

* /doctors/:id/doctorTimetable (:id = identifier of the doctor in the database, returns the timetable of that doctor)

* /doctors/:id/services (:id = identifier of the doctor in the database, returns the data of all the services provided by that doctor)