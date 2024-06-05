import * as React from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ModifyTeams from "./admin-components/ModifyTeams";
import AddWeekGames from "./admin-components/AddWeekGames";
import { Player, Team } from "../App";

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

type AdminPageProps = {
    teams: Team[];
    setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};

function Admin(props: AdminPageProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const getCurrentTab = () => {
        if (location.pathname === "/admin/modify-teams") return 0;
        if (location.pathname === "/admin/add-week-games") return 1;
        return 0; // default to the first tab
    };

    const [value, setValue] = React.useState(getCurrentTab);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        navigate(newValue === 0 ? "/admin/modify-teams" : "/admin/add-week-games");
    };

    React.useEffect(() => {
        setValue(getCurrentTab);
    }, [location.pathname]);

    return (
        <Box sx={{ width: '100%', marginTop: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                    <Tab label="Modify Teams" {...tabProps(0)} />
                    <Tab label="Add Week/Games" {...tabProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ModifyTeams teams={props.teams} setTeams={props.setTeams} players={props.players} setPlayers={props.setPlayers} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AddWeekGames teams={props.teams} />
            </TabPanel>
        </Box>
    );
}

export default function AdminPageWrapper(props: AdminPageProps) {
    return (
        <div className={'root'}>
            <Routes>
                <Route path="/" element={<Navigate to="/admin/modify-teams" />} />
                <Route path="/modify-teams" element={<Admin {...props} />} />
                <Route path="/add-week-games" element={<Admin {...props} />} />
                <Route path="*" element={<Navigate to="/admin/modify-teams" />} />
            </Routes>
        </div>
    );
}