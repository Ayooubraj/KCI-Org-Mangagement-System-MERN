import React, { useState, useEffect } from "react";
import {
  Container, Paper, Typography, Grid, TextField, Button, MenuItem,
  FormGroup, FormControlLabel, Checkbox, Alert
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../../../../redux/studentRelated/studentHandle";
import { getAllDonors } from "../../../../redux/donorRelated/donorHandle";
import "../AddStudent/AddStudent.css";

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { donorsList } = useSelector((state) => state.donor);
  const { loading, response, error, statestatus } = useSelector((state) => state.student);

  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    dob: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
    currentAddress: "",
    healthStatus: "",
    healthSpecify: "",
    maritalStatus: "",
    maritalSpecify: "",
    fatherName: "",
    fatherDob: "",
    fatherOccupation: "",
    fatherHealth: "",
    fatherHealthSpecify: "",
    motherName: "",
    motherDob: "",
    motherOccupation: "",
    motherHealth: "",
    motherHealthSpecify: "",
    remarks: "",
    siblings: [{ name: "", age: "", grade: "", school: "" }],
    promises: { studyHard: false, writeLetters: false, volunteer: false },
    profilePic: null,
    studentPic: null,
    familyPhoto: null,
    birthCertificate: null,
    fatherCitizenship: null,
    motherCitizenship: null,
    otherDocs: null,
    donors: []
  });

  useEffect(() => {
    dispatch(getAllDonors());
  }, [dispatch]);

  useEffect(() => {
    if (statestatus === "added") {
      navigate("/Admin/students");
    }
  }, [statestatus, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      promises: { ...formData.promises, [e.target.name]: e.target.checked }
    });
  };

  const handleDonorToggle = (donorId) => {
    let newDonors = [...formData.donors];
    if (newDonors.includes(donorId)) {
      newDonors = newDonors.filter((id) => id !== donorId);
    } else {
      newDonors.push(donorId);
    }
    setFormData({ ...formData, donors: newDonors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((val, i) => {
          if (typeof val === "object") {
            Object.keys(val).forEach((subKey) =>
              data.append(`${key}[${i}][${subKey}]`, val[subKey])
            );
          } else {
            data.append(`${key}[${i}]`, val);
          }
        });
      } else if (typeof formData[key] === "object" && formData[key] !== null) {
        Object.keys(formData[key]).forEach((subKey) =>
          data.append(`${key}[${subKey}]`, formData[key][subKey])
        );
      } else {
        data.append(key, formData[key]);
      }
    });
    dispatch(createStudent(data));
  };

  return (
    <Container className="add-student-container">
      <Paper className="add-student-paper">
        <Typography variant="h5" gutterBottom>
          KARUNA CARE STUDENT QUESTIONNAIRE
        </Typography>
        <form onSubmit={handleSubmit} className="add-student-form">
          <Grid container spacing={2}>
            {/* Profile Picture */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Profile Picture (Top)</Typography>
              <input type="file" name="profilePic" onChange={handleFileChange} />
            </Grid>

            {/* Basic Info */}
            <Grid item xs={6}><TextField label="First Name" name="firstname" fullWidth onChange={handleChange} /></Grid>
            <Grid item xs={6}><TextField label="Surname" name="surname" fullWidth onChange={handleChange} /></Grid>
            <Grid item xs={6}><TextField type="date" label="DOB" name="dob" fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange} /></Grid>
            <Grid item xs={6}><TextField label="Age" name="age" fullWidth onChange={handleChange} /></Grid>
            <Grid item xs={6}>
              <TextField select label="Gender" name="gender" fullWidth onChange={handleChange}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            {/* Promises */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Promises</Typography>
              <FormControlLabel control={<Checkbox name="studyHard" onChange={handleCheckboxChange} />} label="I am willing to study hard." />
              <FormControlLabel control={<Checkbox name="writeLetters" onChange={handleCheckboxChange} />} label="I am willing to write letters to my sponsor." />
              <FormControlLabel control={<Checkbox name="volunteer" onChange={handleCheckboxChange} />} label="I am willing to join the volunteer group." />
            </Grid>

            {/* Donor Assignment */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Assign Donors</Typography>
              <FormGroup>
                {donorsList && donorsList.map((donor) => (
                  <FormControlLabel
                    key={donor._id}
                    control={
                      <Checkbox
                        checked={formData.donors.includes(donor._id)}
                        onChange={() => handleDonorToggle(donor._id)}
                      />
                    }
                    label={donor.name}
                  />
                ))}
              </FormGroup>
            </Grid>

            {/* Submit */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Feedback */}
        {response && <Alert severity="success">{response}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Paper>
    </Container>
  );
};

export default AddStudent;



