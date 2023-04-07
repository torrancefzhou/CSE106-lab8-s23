from app import db, User, Course, Enrollment, Instruction

# user
test1 = User(username = "test", password = "1234")

# course
course1 = Course(name = "Exploratory Computing", instructor = "Amon Hepsworth", time = "TR 3:00PM - 4:15PM", currentEnrollment = 4, maxEnrollment = 10)

# enrollment
enrollment1 = Enrollment(studentid = 123, classid = 456, grade = 100)

# instruction
instruction1 = Instruction(classid = 456, teacherid = 789, grade = 90)

# add
# db.session.add(test1)
# db.session.add(course1)
# db.session.add(enrollment1)
# db.session.add(instruction1)

# delete
# User.query.filter_by(username = "test").delete()
# Course.query.filter_by(name = "Exploratory Computing").delete()
# Enrollment.query.filter_by(studentid = 123).delete()
# Instruction.query.filter_by(classid = 456).delete()

db.session.commit()