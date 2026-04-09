import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../../../redux/studentRelated/studentHandle";
import { getAllDonors } from "../../../redux/donorRelated/donorHandle";
import {
  Container, Paper, Typography, Grid, TextField, Button, MenuItem, Alert
} from "@mui/material";

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { donorsList } = useSelector((state) => state.donor);
  const { loading, response, error, statestatus } = useSelector((state) => state.student);

  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    dob: "",
    grade: "",
    gender: "",
    address: "",
    bio: "",
    profilePic: null,
    birthCertificate: null,
    parentCitizenship1: null,
    parentCitizenship2: null,
    familyPic: null,
    donors: []
  });

  useEffect(() => {
    dispatch(getAllDonors());
  }, [dispatch]);

  // ✅ Redirect after successful creation
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createStudent(formData));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">Add Student Profile</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Basic Info */}
            <Grid item xs={6}>
              <TextField required label="First Name" name="firstname" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField required label="Surname" name="surname" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField type="date" label="DOB" name="dob" fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField required label="Grade" name="grade" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField select required label="Gender" name="gender" fullWidth onChange={handleChange}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Address" name="address" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Bio" name="bio" fullWidth multiline rows={3} onChange={handleChange} />
            </Grid>

            {/* File Uploads */}
            {["profilePic","birthCertificate","parentCitizenship1","parentCitizenship2","familyPic"].map((field) => (
              <Grid item xs={12} key={field}>
                <Typography variant="subtitle1">{field}</Typography>
                <input type="file" name={field} onChange={handleFileChange} />
              </Grid>
            ))}

            {/* Donor Assignment */}
            <Grid item xs={12}>
              <TextField
                select
                label="Assign Donors"
                name="donors"
                fullWidth
                SelectProps={{ multiple: true }}
                value={formData.donors}
                onChange={handleChange}
              >
                {donorsList.map((donor) => (
                  <MenuItem key={donor._id} value={donor._id}>{donor.name}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Submit */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? "Saving..." : "Save Student"}
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