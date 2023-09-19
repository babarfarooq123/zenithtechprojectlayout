import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import UseMobile from '../customHooks/useMobile';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

const SideNavigation = ({ siderMobile, setSiderMobile = () => {} }) => {
  const navigate = useNavigate();
  const isMobile = UseMobile() <= 500;
  const { t, i18n } = useTranslation();
  console.log("mob: ", i18n.language);

  return (
    <div>
      <Drawer
        variant={isMobile ? '' : "permanent"}
        anchor={isMobile ? 'left' : ''}
        open={siderMobile}
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: isMobile ? { width: 200 } : { width: 250, boxSizing: 'border-box', height: "calc(100% - 52px)", top: "52px", borderRight: "1px solid lightblue" },
        }}
      >
        <Box sx={isMobile ? { width: 200 } : { overflow: 'auto' }} role={isMobile && 'presentation'}>
          <List style={isMobile ? { textAlign: "right" } : {}}>
          {isMobile ? <CloseIcon onClick={() => { setSiderMobile(false); }} style={{ cursor: "pointer" }} /> : null}
            {['Dashboard', 'About'].map((text, index) => (
              <ListItem style={{ cursor: "pointer", padding: "0px" }} onClick={() => { if(index === 0) navigate("/"); else navigate(`/${text.toLowerCase()}`) }} key={text} className={window.location.pathname === "/" && index === 0 ? "active" : window.location.pathname.includes(text.toLowerCase()) ? "active" : ""}>
                <ListItemButton>
                  <ListItemText style={{ textAlign: i18n.language == "ar" ? "right" : "" }} primary={t(text)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div >
  );
}

export default SideNavigation;