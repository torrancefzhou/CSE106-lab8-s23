function printToConsole() {
    username = document.getElementById("username").value
    password = document.getElementById("password").value

    console.log(username + " " + password)
}

function getStudentClasses() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/class");
    xhttp.onload = function() {
      var data = JSON.parse(this.responseText);
      var table = "<table border='1' id='classTable'>";
      table += "<tr><th>Name</th>" +
               "<th>Instructor</th>" +
               "<th>Time</th>" +
               "<th>Students Enrollment</th>" +
               "<th>Drop Class</th></tr>";

      for (var i = 0; i < data.length; i++) {
        table += "<tr><td>" + data[i].name + "</td>";
        table += "<td>" + data[i].instructor + "</td>";
        table += "<td>" + data[i].time + "</td>";
        table += "<td>" + data[i].currentEnrollment + "/" + data[i].maxEnrollment + "</td>";
        table += "<td><button onclick='dropCourse(\"" + data[i].name + "\")'>" + "Drop Class" + "</button></td></tr>"
      }
      document.getElementById("placeholder").innerHTML = table;
      document.getElementById("addHeader").classList.remove("active");
      document.getElementById("enrolledHeader").classList.add("active");
    };
    xhttp.send();
}

function getTeacherClasses() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/class");
    xhttp.onload = function() {
      var data = JSON.parse(this.responseText);
      var table = "<table border='1' id='classTable'>";
      table += "<tr><th>Name</th>" +
               "<th>Instructor</th>" +
               "<th>Time</th>" +
               "<th>Students Enrollment</th>" +
               "<th></th></tr>";
      for (var i = 0; i < data.length; i++) {
        classname = data[i].name;
        table += "<tr><td onclick='seeGrades(\"" + classname + "\")'>" + classname + "</td>";
        table += "<td>" + data[i].instructor + "</td>";
        table += "<td>" + data[i].time + "</td>";
        table += "<td>" + data[i].currentEnrollment + "/" + data[i].maxEnrollment + "</td>";
        table += "<td>" + "<button onclick='seeGrades(\"" + classname + "\")'>" + "View Grades</button></td></tr>";
      }
      document.getElementById("placeholder").innerHTML = table;
    };
    document.getElementById("header").innerHTML = "Your Courses"
    xhttp.send();
}

function allClasses() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/classes");
    xhttp.onload = function() {
      var data = JSON.parse(this.responseText);
      var table = "<table border='1' id='classTable'>";
      table += "<tr><th>Name</th>" +
               "<th>Instructor</th>" +
               "<th>Time</th>" +
               "<th>Students Enrollment</th>" +
               "<th>Add Class</th></tr>";

      for (var i = 0; i < data.length; i++) {
        table += "<tr><td>" + data[i].name + "</td>";
        table += "<td>" + data[i].instructor + "</td>";
        table += "<td>" + data[i].time + "</td>";
        table += "<td>" + data[i].currentEnrollment + "/" + data[i].maxEnrollment + "</td>";
        if (data[i].currentEnrollment == data[i].maxEnrollment){
            table += "<td>" + "Not available" + "</td></tr>";
        }
        else if ((checkEnrollment(data[i].name)) == "True"){
            table += "<td><button onclick='studentDropClass(\"" + data[i].name + "\")'>" + "Drop Class" + "</button></td></tr>"
        }
        else{
            table += "<td><button onclick='studentAddClass(\"" + data[i].name + "\")'>" + "Add Class" + "</button></td></tr>"
        }
      }
      document.getElementById("addHeader").classList.add("active");
      document.getElementById("enrolledHeader").classList.remove("active");
      document.getElementById("placeholder").innerHTML = table;
    };
    xhttp.send();
}

function checkEnrollment(course) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/class/" + course);
    xhttp.send();
    return this.responseText;
}

function seeGrades(course) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/classes/" + course);
  xhttp.onload = function() {
    var data = JSON.parse(this.responseText);
    var table = "<table border='1' id='classTable'>";
    table += "<tr><th>Student Name</th>" +
             "<th>Grade</th></tr>";

    for (var i = 0; i < data.length; i++) {
      table += "<tr><td>" + data[i].student + "</td>";
      table += "<td>" + data[i].grade + "</td>";
    }

    document.getElementById("placeholder").innerHTML = table;
  };
  document.getElementById("header").innerHTML = "<button style='float:left;' onclick=\"getTeacherClasses()\">Back to course list</button>" + course;
  xhttp.send();
}


function editGrades(course, grade, student) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/classes/" + course);
    xhttp.setRequestHeader("Content-Type", "application/json");
    const body = {"name": student, "grade": grade};
    xhttp.send(JSON.stringify(body));
    xhttp.onload = function() {
        document.getElementById("placeholder").innerHTML = "The grade has been edited";
    };
}

function deleteGrades(course, student) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/classes/" + course);
    xhttp.onload = function() {
      var data = JSON.parse(this.responseText);
      var table = "<table border='1' id='classTable'>";
      table += "<tr><th>Student Name</th>" +
               "<th>Grade</th></tr>";

      for (var i = 0; i < data.length; i++) {
        table += "<tr><td>" + data[i].name + "</td>";
        table += "<td>" + data[i].grade + "</td></tr>";
      }

      document.getElementById("placeholder").innerHTML = table;
    };
    xhttp.send();
}

function studentAddClass(course) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/classes/" + course);
    xhttp.send();
    xhttp.onload = function() {
        document.getElementById("placeholder").innerHTML = this.responseText;
    };
}

function dropCourse(course) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/classes/" + course);
  xhttp.onload = function() {
      var response = JSON.parse(this.responseText);
      if (response.success) {
          getStudentClasses();
          document.getElementById("message").innerHTML = "Unenrolled from " + course;
      } else {
          document.getElementById("message").innerHTML = response.message;
      }
  };
  xhttp.send();
}