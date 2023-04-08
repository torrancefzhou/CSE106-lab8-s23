function printToConsole() {
    username = document.getElementById("username").value
    password = document.getElementById("password").value

    console.log(username + " " + password)
}

function getGrades() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:5000/home");
    xhttp.onload = function() {
      var data = JSON.parse(this.responseText);
      var table = "<table border='1'>";
      table += "<thead><tr><th>Name</th><th>Instructor</th><th>Time</th><th>Current Enrollment</th><th>Max Enrollment</th></tr></thead>";
      table += "<tbody>";
      for (var i = 0; i < data.length; i++) {
        table += "<tr><td>" + data[i].name + "</td>";
        table += "<td>" + data[i].instructor + "</td>";
        table += "<td>" + data[i].time + "</td>";
        table += "<td>" + data[i].currentEnrollment + "</td>";
        table += "<td>" + data[i].maxEnrollment + "</td></tr>";
      }
      table += "</tbody></table>";
      document.getElementById("demo").innerHTML = table;
    };
    xhttp.send();
}
// getGrades()

function enrolledCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:5000/enrolled");
    xhttp.onload = function() {
        var data = JSON.parse(this.responseText);
        var table = "<table border='1'>";
        table += "<thead><tr><th>Class id</th><th>Grade</th><th>Student id</th></tr></thead>";
        table += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            table += "<tr><td>" + data[i].classid + "</td>";
            table += "<td>" + data[i].grade + "</td>";
            table += "<td>" + data[i].studentid + "</td>";
        }
        table += "</tbody></table>";
        document.getElementById("demo").innerHTML = table;
    };
    xhttp.send();
}
enrolledCourses();
