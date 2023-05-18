import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MapsHomeWorkSharpIcon from '@mui/icons-material/MapsHomeWorkSharp';
import AddHomeWorkSharpIcon from '@mui/icons-material/AddHomeWorkSharp';
import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
import { useSelector, useDispatch } from 'react-redux';
import {setAdminbar} from '../redux/slices/appSlice';
import { NavLink } from 'react-router-dom';

const openedMixin = (theme) => ({
    width: 240,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: "0 .5rem"
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        position: "relative",
        width: 240,
        ".MuiDrawer-paper": {
            zIndex: 1,
            top: "auto",
            position: "relative",
        },
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const SideBar = () => {
    const open = useSelector((state) => state.appState.isAdminbarOpen);
    const dispatch = useDispatch();
    const isMobileDevice = useMediaQuery('(max-width:640px)')

    const handleDrawerOpen = () => {
        dispatch(setAdminbar(!open));
    };

    useEffect(() => {
        if (isMobileDevice) {
            dispatch(setAdminbar(false));
        }
    }, [isMobileDevice, dispatch])

    return (
        <Drawer variant="permanent" open={open}>
            {!isMobileDevice && (
                <DrawerHeader>
                    <IconButton onClick={handleDrawerOpen} className="!text-blue-500">
                        {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
            )}
            <List className="!-mt-2">
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip title={open ? '' : 'Dashboard'} placement="right">
                        <NavLink to="/admin/dashboard">
                            {({ isActive }) => (
                                <ListItemButton
                                    selected={isActive}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <DashboardSharpIcon className="text-blue-400" />
                                    </ListItemIcon>
                                    <ListItemText className="text-blue-400 font-semibold" primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            )}
                        </NavLink>
                    </Tooltip>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip title={open ? '' : 'All Packages'} placement="right">
                        <NavLink to="/admin/Allpakages">
                            {({ isActive }) => (
                                <ListItemButton
                                    selected={isActive}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <MapsHomeWorkSharpIcon className="text-blue-400" />
                                    </ListItemIcon>
                                    <ListItemText className="text-blue-400 font-semibold" primary="All Packages" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            )}
                        </NavLink>
                    </Tooltip>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip title={open ? '' : 'Create Package'} placement="right">
                        <NavLink to="/admin/pakage/new">
                            {({ isActive }) => (
                                <ListItemButton
                                    selected={isActive}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <AddHomeWorkSharpIcon className="text-blue-400" />
                                    </ListItemIcon>
                                    <ListItemText className="text-blue-400 font-semibold" primary="Create Package" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            )}
                        </NavLink>
                    </Tooltip>
                </ListItem>

            </List>
        </Drawer>
    );
}

export default SideBar;