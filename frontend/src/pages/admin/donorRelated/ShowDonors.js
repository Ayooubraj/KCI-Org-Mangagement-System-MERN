import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDonors } from "../../../redux/donorRelated/donorHandle";
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

const ShowDonors = () => {
  const dispatch = useDispatch();
  const { donorsList, loading, error } = useSelector((state) => state.donor);
  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser?._id;

  useEffect(() => {
    if (adminID) {
      dispatch(getAllDonors(adminID));
    }
  }, [adminID, dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Donors List
      </Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && donorsList && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Donor Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Sponsored Students</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donorsList.map((donor) => (
                <TableRow key={donor._id}>
                  <TableCell>{donor.name}</TableCell>
                  <TableCell>{donor.country}</TableCell>
                  <TableCell>
                    {donor.studentsSponsored && donor.studentsSponsored.length > 0
                      ? donor.studentsSponsored.map((s) => s.studentNumber).join(", ")
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

export default ShowDonors;