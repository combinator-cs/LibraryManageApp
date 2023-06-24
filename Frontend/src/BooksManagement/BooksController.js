import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import React from 'react';
import FetchBooks from './FetchBooks';
import ManageBooks from './ManageBooks';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BooksController() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div>
                <h3 align="center">Books Management</h3>
            </div>
            <div className="BooksView">
                <body>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="">
                                <Tab label="Manage Book" {...a11yProps(0)} />
                                <Tab label="Fetch Books" {...a11yProps()} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <ManageBooks />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <FetchBooks />
                        </TabPanel>
                    </Box>

                </body>
            </div>
        </>
    );
}