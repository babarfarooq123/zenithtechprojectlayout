import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideNavigation from './sideNavigation';
import { useState } from "react";
import UseMobile from "../customHooks/useMobile";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { language } from "../redux/reducer";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [lang, setLang] = useState();
    const open = Boolean(anchorEl);
    const isMobile = UseMobile() <= 500;
    const [siderMobile, setSiderMobile] = useState(false);
    const { i18n } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (i18n.language && lang) {
            document.body.dir = lang?.slice(0, 2)?.toLowerCase() === 'ar' ? 'rtl' : 'ltr';
            dispatch(language({language: lang?.slice(0, 2)?.toLowerCase()}));
        }
    }, [lang]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (val) => {
        setLang(val);
        i18n.changeLanguage(val);
        setAnchorEl(null);
    };

    return (
        <>
            {/* <div style={{ width: "100%", height: "50px", position: "sticky", top: 0, zIndex: 99, borderBottom: "1px solid lightblue", backgroundColor: "white" }}> */}
            <div style={{ width: "99%", height: "50px", position: "sticky", top: 0, zIndex: 99, borderBottom: "1px solid lightblue", backgroundColor: "white" }}>
                <div style={{ height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: "20px", paddingRight: "20px" }}>
                    <h2 style={{ color: "lightblue", marginTop: "auto", marginBottom: "auto", fontSize: "20px" }}>Zenith Technology</h2>

                    {isMobile ?
                        <MenuIcon onClick={() => {
                            setSiderMobile(true);
                        }} style={{ width: "25px", height: "25px", color: "lightblue", cursor: "pointer" }} /> : null}

                    <div style={{
                        // border: "1px solid lightblue", 
                        borderRadius: "20px",
                        // padding: "0px 10px" 
                    }}>
                        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleClick}>
                            <h3 style={{ color: "lightblue", marginTop: "auto", marginBottom: "auto" }}>{i18n.language?.slice(0, 2)?.toUpperCase()}</h3>
                            <KeyboardArrowDownIcon style={{ color: "lightblue", width: "30px", height: "40px" }} />
                        </div>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => { setAnchorEl(null); }}
                        >
                            <MenuItem style={i18n.language.toLowerCase() === "en" ? { backgroundColor: "lightblue", color: "white" } : { backgroundColor: "white" }} onClick={() => handleClose("en")}>
                                Eng
                            </MenuItem>
                            <MenuItem style={i18n.language.toLowerCase() === "ar" ? { backgroundColor: "lightblue", color: "white" } : {}} onClick={() => handleClose("ar")}>
                                Arb
                            </MenuItem>
                        </StyledMenu>
                    </div>
                </div>
            </div>

            < div style={{ height: "calc(100vh - 52px" }}>
                <SideNavigation />
                <Outlet />
            </div >
            {isMobile ? <SideNavigation siderMobile={siderMobile} setSiderMobile={setSiderMobile} /> : null}
        </>
    )
}

export default Header;