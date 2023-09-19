import { useTranslation } from "react-i18next";
import UseMobile from "../customHooks/useMobile";

const GeneralLayout = ({ children }) => {
    const isMobile = UseMobile() <= 500;
    const { i18n } = useTranslation();

    return (
        <div style={{ height: "calc(100vh - 53px", display: "flex", width: isMobile ? "100%" : "calc(100vw - 252px)", marginRight: i18n.language == 'en' ? "0px" : "auto", marginLeft: i18n.language == 'en' ? "auto" : "0px"}}>
        {/* // <div style={{ height: "calc(100vh - 53px", display: "flex", width: isMobile ? "100%" : "calc(100vw - 269px)", marginRight: i18n.language == 'en' ? "0px" : "auto", marginLeft: i18n.language == 'en' ? "auto" : "0px"}}> */}
        {/* // <div style={{ height: "calc(100vh - 53px", display: "flex", width: isMobile ? "100%" : "calc(100vw - 252px)", marginRight: i18n.language == 'en' ? "0px" : "auto", marginLeft: i18n.language == 'en' ? "auto" : "0px"}}> */}
            {children}
        </div>
    )
}

export default GeneralLayout;