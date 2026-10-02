const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    //write your code
    const { name, className, section, roll } = req.query;
    const students = await getAllStudents({ name, className, section, roll });
    if(!students || students.length === 0) {
        return res.status(404).json({ message: "No students found" });
    }
    res.json({ students });

});

const handleAddStudent = asyncHandler(async (req, res) => {
    //write your code
    const message = await addNewStudent(req.body);
    res.status(201).json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    //write your code
    const { id: userId } = req.params;
    const message = await updateStudent({ ...req.body, userId });
    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    //write your code
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    //write your code
    const { id: userId } = req.params;
    const { id: reviewerId } = req.user;
    const { status } = req.body;
    const message = await setStudentStatus({ userId, reviewerId, status });
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
