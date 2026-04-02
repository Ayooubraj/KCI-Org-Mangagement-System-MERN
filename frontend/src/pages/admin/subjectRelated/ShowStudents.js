import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";

const ShowStudents = () => {
  const dispatch = useDispatch();
  const { studentsList, loading, error } = useSelector((state) => state.student);
  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser?._id;

  useEffect(() => {
    if (adminID) {
      dispatch(getAllStudents(adminID));
    }
  }, [adminID, dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Students List
      </Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && studentsList && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Number</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>School</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Donor(s)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsList.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.studentNumber}</TableCell>
                  <TableCell>{student.firstname}</TableCell>
                  <TableCell>{student.surname}</TableCell>
                  <TableCell>{student.school?.name || "N/A"}</TableCell>
                  <TableCell>{student.region?.name || "N/A"}</TableCell>
                  <TableCell>
                    {student.donors && student.donors.length > 0
                      ? student.donors.map((d) => d.name).join(", ")
                      : "None"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ShowStudents;