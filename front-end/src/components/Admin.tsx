import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ModifyTeams from "./admin-components/ModifyTeams.tsx";
import AddWeekGames from "./admin-components/AddWeekGames.tsx";
import {Player, Team} from "../App.tsx";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function tabProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

type AdminPageProps = { teams: Team[], setTeams: React.Dispatch<React.SetStateAction<Team[]>>, players: Player[], setPlayers: React.Dispatch<React.SetStateAction<Player[]>> };

export default function Admin(props : AdminPageProps) {

    const currentTab = () : number  => {
        let path = window.location.pathname
        if (path === "/Search") return 1
        return 2
    }

    const [value, setValue] = React.useState(currentTab);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
    <Box sx={{ width: '100%', marginTop: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          <Tab label="Modify Teams" {...tabProps(0)} />
          <Tab label="Add Week/Games" {...tabProps(1)} />
        </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <ModifyTeams teams={props.teams} setTeams={props.setTeams} players={props.players} setPlayers={props.setPlayers}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <AddWeekGames teams={props.teams}/>
        </TabPanel>
    </Box>
    );
}