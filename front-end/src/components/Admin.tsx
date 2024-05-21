
// function Admin() {
//
//
//     return (
//         <>
//             <h1>Admin Page</h1>
//             {/* add team */}
//
//             {/* add player */}
//
//             {/* delete player/team */}
//
//             {/* change player */}
//
//             {/* add week */}
//
//             {/* add games to week */}
//         </>
//     )
// }
//
// export default Admin;

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Admin() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

    {/* add team */}

    {/* add player */}

    {/* delete player/team */}

    {/* change player */}

    {/* add week */}

    {/* add games to week */}

  return (
    <Box sx={{ width: '100%', marginTop: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Add Teams/Players
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Modify Teams
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Add Week/Games
      </CustomTabPanel>
    </Box>
  );
}