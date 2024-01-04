const data = require("../../config/db");
const {
  SELECT_ALL_STUDENTS,
  SELECT_STUDENT_BY_ID,
  CHECK_EMAIL_EXISTENCE,
} = require("./queries");

// Get all students
const getStudents = async (req, res) => {
  try {
    const result = await data.query(SELECT_ALL_STUDENTS);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await data.query(SELECT_STUDENT_BY_ID, [Number(id)]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Add a new student
const addStudent = async (req, res) => {
  try {
    const { name, email, age, dob } = req.body;

    // Check if email exists
    const emailExistenceResult = await data.query(CHECK_EMAIL_EXISTENCE, [email]);

    if (emailExistenceResult.rows.length) {
      res.status(400).send("Email Already Exists");
    } else {
      // Perform the insertion logic here
      // Example: await data.query("INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)", [name, email, age, dob]);

      res.status(200).send("Student added successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getStudents, getStudentById, addStudent };