import { useState } from "react";

import { Close, Menu } from "@mui/icons-material";
import { Button, IconButton, AppBar as MuiAppBar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useStrings } from "../../texts";
import Logo from "../Logo";
import { useAppBar } from "./AppBarContext";
import loadable from "@loadable/component";

const Drawer = loadable(() => import(
    /* webpackChunkName: "Drawer" */ 
    /* webpackPrefetch: true */
    '../Drawer/Drawer'
    ));

interface AppBarProps {
};

function AppBar({ }: AppBarProps) {

    /* Hooks */

    const navigate = useNavigate();
    const strings = useStrings();
    const openAppBar = useAppBar();

    /* States */
    const [openDrawer, setOpenDrawer] = useState(false);
    const [ animateDrawerClose, setAnimateDrawerClose ] = useState(false);


    /* Event handlers  */
    const handleTitleButtonClick = () => {
        setAnimateDrawerClose(false);
        setOpenDrawer(false);
        navigate('home');
    }
    const handleMenuButtonClick = () => {
        setAnimateDrawerClose(true);
        setOpenDrawer(true);
    };
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    }
    const handleDrawerItemClick = () =>{        
        setAnimateDrawerClose(false);
        setOpenDrawer(false);
    }

    return (
        openAppBar &&
        <>
            <MuiAppBar elevation={1}>
                <Toolbar className="">
                    <Button onClick={handleTitleButtonClick} className='app-title' startIcon={<Logo id={"app"} />}>
                        {strings.public.common.title}
                    </Button>
                    {
                        openDrawer
                            ?
                            <IconButton
                                edge="end"
                                aria-label="menu"
                                onClick={handleDrawerClose}
                            >
                                <Close />
                            </IconButton>
                            :
                            <IconButton
                                edge="end"
                                aria-label="menu"
                                onClick={handleMenuButtonClick}
                            >
                                <Menu />
                            </IconButton>
                    }
                </Toolbar>
            </MuiAppBar>
            {
                animateDrawerClose &&
                <Drawer
                    open={openDrawer}
                    onDrawerItemClick={ handleDrawerItemClick }
                />
            }
        </>
    );
}
export default AppBar;