// ShowStudents.js
// This component lists all students for the Admin.
// It fetches students from the backend via Redux and displays them in a table.

import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';

import {
  Paper, Box, IconButton, Button, ButtonGroup,
  ClickAwayListener, Grow, Popper, MenuItem, MenuList
} from '@mui/material';

import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

import { BlackButton, BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowStudents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { studentsList, loading, error, response } = useSelector((state) => state.student);
  const { currentUser } = useSelector(state => state.user);

  // Fetch students when component mounts
  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllStudents(currentUser._id));
    }
  }, [currentUser?._id, dispatch]);

  if (error) {
    console.log(error);
  }

  // Popup state for messages
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  // Delete handler
  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address))
      .then(() => {
        dispatch(getAllStudents(currentUser._id));
      });
  };

  // ✅ Updated columns to match new backend schema
  const studentColumns = [
    { id: 'firstname', label: 'First Name', minWidth: 150 },
    { id: 'surname', label: 'Surname', minWidth: 150 },
    { id: 'studentNumber', label: 'Student Number', minWidth: 120 },
    { id: 'school', label: 'School', minWidth: 150 },
    { id: 'region', label: 'Region', minWidth: 150 },
  ];

  // ✅ Updated rows mapping to match backend fields
  const studentRows = Array.isArray(studentsList) && studentsList.length > 0
    ? studentsList.map((student) => ({
        firstname: student.firstname,
        surname: student.surname,
        studentNumber: student.studentNumber,
        school: student.school?.name || "N/A",
        region: student.region?.name || "N/A",
        id: student._id,
      }))
    : [];

  // Buttons for each student row
  const StudentButtonHaver = ({ row }) => {
    const options = ['Take Attendance', 'Provide Marks'];
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = () => {
      if (selectedIndex === 0) {
        navigate("/Admin/students/student/attendance/" + row.id);
      } else if (selectedIndex === 1) {
        navigate("/Admin/students/student/marks/" + row.id);
      }
    };

    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    return (
      <>
        {/* Delete student button */}
        <IconButton onClick={() => deleteHandler(row.id, "Student")}>
          <PersonRemoveIcon color="error" />
        </IconButton>

        {/* View student details */}
        <BlueButton variant="contained"
          onClick={() => navigate("/Admin/students/student/" + row.id)}>
          View
        </BlueButton>

        {/* Attendance / Marks split button */}
        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick}>{options[selectedIndex]}</Button>
          <BlackButton
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </BlackButton>
        </ButtonGroup>
        <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  };

  // SpeedDial actions (floating menu)
  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
      action: () => navigate("/Admin/addstudents")
    },
    {
      icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
      action: () => deleteHandler(currentUser._id, "Students")
    },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {response ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <GreenButton variant="contained" onClick={() => navigate("/Admin/addstudents")}>
                Add Students
              </GreenButton>
            </Box>
          ) : (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              {/* ✅ Render table only if studentsList has data */}
              {Array.isArray(studentRows) && studentRows.length > 0 ? (
                <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
              ) : (
                <Box sx={{ p: 2 }}>No students found</Box>
              )}
              <SpeedDialTemplate actions={actions} />
            </Paper>
          )}
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ShowStudents;