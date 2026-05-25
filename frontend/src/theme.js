// src/theme.js
import { createTheme } from "@mui/material/styles";
const theme = createTheme({
    palette: {
        primary: { main: "#ee4723" },
        secondary: { main: "#016776" },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    components: {
        MuiContainer: {
            defaultProps: {
                maxWidth: false, // disables default maxWidth
            },
            styleOverrides: {
                root: {
                    maxWidth: "100% !important",
                },
            },
        },
    },
});

export default theme;
