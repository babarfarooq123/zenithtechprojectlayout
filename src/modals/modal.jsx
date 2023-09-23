import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import UseMobile from '../customHooks/useMobile';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal(props) {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false);
  const isMobile = UseMobile() < 500;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log("props: ", props);

  return (
    <div>
      <Button onClick={handleOpen}>View In Full Screen Mode {props?.library}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
      >
        <Box sx={{ ...style, width: isMobile ? "90%" : "100%", marginLeft: "auto", marginRight: "auto", height: "90%" }} id="fullChartModal">
          <h2 id="parent-modal-title">{props.title ? t(props.title) : "Pie Chart"}</h2>
          {props.children}
        </Box>
      </Modal>
    </div>
  );
}

