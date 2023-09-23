import { useTranslation } from "react-i18next";
import UseMobile from "../customHooks/useMobile";

const About = () => {
    const { t } = useTranslation();
    const isMobile = UseMobile() <= 500;

    return (
        <>
            <div style={{ padding: "20px" }}>
                {t("AboutPage")}
            </div>
        </>
    )
}

export default About;