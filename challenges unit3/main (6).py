class student:

def __init__(self, name, self.name = name

roll_number, cgpa):

self.roll_number = roll_number self.cgpa = cgpa

def sort_students(student_list): sorted students sorted(student_list,

key-lambda student:student.cgpa,

reverse=True)

students=[

student("jack", "a124",10),

return sorted_students

student("hendry','a125,9.6),

student(joel, a126,6.3),

student(lional, a127,8.6),

student.roll_number, student.cgpa))