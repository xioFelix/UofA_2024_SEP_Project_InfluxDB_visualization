import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
    typography: {
        // Global font settings
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        // Define styles for different typography variants
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
        },
        // Add more variants if needed
    },
    palette: {
        // Define theme colors
        primary: {
            main: '#1976d2', // Blue color
        },
        secondary: {
            main: '#f57c00', // Orange color
        },
        // You can define more colors here
    },
    // You can also customize other theme settings
});

export default theme;
