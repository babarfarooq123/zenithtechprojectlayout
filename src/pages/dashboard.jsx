import { Grid, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import UseMobile from "../customHooks/useMobile";
import LineChartView from "../charts/lineChart";
import BarChartView from "../charts/barChart";
import { useTranslation } from "react-i18next";
import PieChartView from "../charts/pieChart";
import ScatterChartView from "../charts/scatterChart";
import DaviationBarChartView from "../charts/daviationBarChart";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "lightblue",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "white",
    height: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "20px"
}));

const Dashboard = () => {
    const isMobile = UseMobile() <= 500;
    const { t, i18n } = useTranslation();

    const data = [
        { x: 1, y: 5 },
        { x: 2, y: 9 },
        { x: 3, y: 7 },
        { x: 4, y: 3 },
        { x: 5, y: 8 },
    ];

    const data1 = [
        { x: 'Company A', y: 10 },
        { x: 'Company B', y: 25 },
        { x: 'Company C', y: 8 },
        { x: 'Company D', y: 15 },
    ];

    const data2 = [
        { x: 1, y: 5 },
        { x: 2, y: 12 },
        { x: 3, y: 20 },
        // Add more data points as needed
    ];

    const [selectedData, setSelectedData] = useState({ data: data });

    const handleDataSwitch = () => {
        console.log("hit: ",);
        setSelectedData(Object.keys(selectedData)[0] === "data" ? { data2: data2 } : { data: data });
    };


    return (
        // <div style={{ height: "calc(100vh - 53px", display: "flex", width: isMobile ? "100%" : "calc(100vw - 252px)", marginRight: "0px", marginLeft: "auto" }}>
        // <div style={{ height: "calc(100vh - 53px", display: "flex", width: isMobile ? "100%" : "calc(100vw - 269px)", marginRight: i18n.language == 'en' ? "0px" : "auto", marginLeft: i18n.language == 'en' ? "auto" : "0px"}}>
        <>
            <div id="tooltip" style={{ display: "none", position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white", padding: "5px", bordeRadius: "5px" }}></div>
            <div className="overflowYScroll" style={{
                width: "100%", overflowY: "scroll"
            }}>
                <Grid container rowSpacing={{ xs: 1, sm: 1, md: 1 }} columnSpacing={{ xs: 1, sm: 1, md: 2 }} style={{ margin: "auto", width: "100%", padding: "20px", paddingLeft: "0px", paddingTop: "8px", paddingRight: isMobile ? "8px" : "20px" }}>
                    <Grid item xs={12} sm={6} md={6} style={{ paddingTop: "0px" }}>
                        <Item>{t("TotalNumberOfEmployees")}: 200</Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} style={{ paddingTop: "0px", marginTop: isMobile ? "4px" : "" }}>
                        <Item>{t("NumberOfSoftwareEngineers")}: 100</Item>
                    </Grid>
                </Grid>

                <Grid container rowSpacing={{ xs: 1, sm: 1, md: 1 }} columnSpacing={{ xs: 1, sm: 1, md: 2 }} style={{ margin: "auto", width: "100%", padding: "20px", paddingLeft: "0px", paddingTop: "8px", paddingRight: isMobile ? "8px" : "20px" }}>
                    <Grid item xs={12} sm={12} md={6} style={{ paddingTop: "0px", width: "100%", minHeight: "260px" }}>
                        <button onClick={handleDataSwitch}>Switch Data</button>
                        <LineChartView data={selectedData[Object.keys(selectedData)[0]]} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} style={{ paddingTop: "0px", marginTop: isMobile ? "4px" : "", overflowX: "hidden", width: "100%", minHeight: "260px" }}>
                        <button onClick={handleDataSwitch}>Switch Data</button>
                        <BarChartView data={data1} />
                    </Grid>
                </Grid>

                <Grid container rowSpacing={{ xs: 1, sm: 1, md: 1 }} columnSpacing={{ xs: 1, sm: 1, md: 2 }} style={{ margin: "auto", width: "100%", padding: "20px", paddingLeft: "0px", paddingTop: "8px", paddingRight: isMobile ? "8px" : "20px" }}>
                    <Grid item xs={12} sm={12} md={6} style={{ paddingTop: "0px", width: "100%", minHeight: "260px" }}>
                        <PieChartView />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} style={{ paddingTop: "0px", marginTop: isMobile ? "4px" : "", overflowX: "hidden", width: "100%", minHeight: "260px" }}>
                        <button onClick={() => {
                            if (document.getElementsByClassName('scatterPlotLine')[0].style.display === 'none')
                                document.getElementsByClassName('scatterPlotLine')[0].style.display = 'block';
                            else
                                document.getElementsByClassName('scatterPlotLine')[0].style.display = 'none'
                        }}>Toggle Path</button>
                        <ScatterChartView />
                    </Grid>
                </Grid>

                <Grid container rowSpacing={{ xs: 1, sm: 1, md: 1 }} columnSpacing={{ xs: 1, sm: 1, md: 2 }} style={{ margin: "auto", width: "100%", padding: "20px", paddingLeft: "0px", paddingTop: "8px", paddingRight: isMobile ? "8px" : "20px" }}>
                    <Grid item xs={12} sm={12} md={6} style={{ paddingTop: "0px", width: "100%", minHeight: "260px" }}>
                    <button>Toggle Path</button>
                        <DaviationBarChartView />
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={6} style={{ paddingTop: "0px", marginTop: isMobile ? "4px" : "", overflowX: "hidden", width: "100%", minHeight: "260px" }}>
                        <button onClick={() => {
                            if (document.getElementsByClassName('scatterPlotLine')[0].style.display === 'none')
                                document.getElementsByClassName('scatterPlotLine')[0].style.display = 'block';
                            else
                                document.getElementsByClassName('scatterPlotLine')[0].style.display = 'none'
                        }}>Toggle Path</button>
                        <ScatterChartView />
                    </Grid> */}
                </Grid>
            </div>
            {/* </div> */}
        </>
    )
}

export default Dashboard;