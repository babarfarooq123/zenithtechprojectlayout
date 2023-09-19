import { useTranslation } from "react-i18next";
import UseMobile from "../customHooks/useMobile";

const About = () => {
    const { t } = useTranslation();
    const isMobile = UseMobile() <= 500;

    return (
        <>
            {/* <div style={{ height: "calc(100vh - 53px", display: "flex", width: isMobile ? "100%" : "calc(100vw - 252px)", marginRight: "0px", marginLeft: "auto" }}> */}
            <div style={{ padding: "20px" }}>
                {t("AboutPage")}
            </div>
            {/* </div> */}
        </>
    )
}

export default About;