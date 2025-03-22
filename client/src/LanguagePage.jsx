import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import axios from "axios";
import dayjs from "dayjs";
import {
    Container,
    Typography,
    MenuItem,
    Select,
    AppBar,
    Toolbar,
    IconButton,
    CssBaseline,
    TextField,
    Switch,
    ThemeProvider,
    createTheme,
    Paper,
    Card,
    CardContent,
    Tabs,
    Tab,
    Box
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function LanguagePage() {
    const { t, i18n } = useTranslation();
    const [country, setCountry] = useState("");
    const [name, setName] = useState("Ralph");
    const [darkMode, setDarkMode] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);

    const countryLanguageMap = {
        US: "en",
        ES: "es",
        PH: "fil",
        JP: "ja",
        FR: "fr",
        HK: "zh",
        KR: "ko",
        PT: "pt"
    };

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await axios.get("http://ip-api.com/json");
                const userCountry = response.data.countryCode;
                setCountry(userCountry);
                const language = countryLanguageMap[userCountry] || "en";
                i18n.changeLanguage(language);
            } catch (error) {
                console.error("Error detecting location:", error);
                i18n.changeLanguage("en");
            }
        };

        fetchCountry();
    }, []);

    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    const handleThemeToggle = () => {
        setDarkMode((prev) => !prev);
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light"
        }
    });

    const formattedDate = dayjs().format("MMMM D, YYYY h:mm A");
    const formattedCurrency = new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD"
    }).format(1000);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {t("Multilingual-app")}
                    </Typography>
                    <IconButton onClick={handleThemeToggle} color="inherit">
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" style={{ marginTop: "2rem" }}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {t("welcomeMessage", { name })}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            {t("detectedCountry")}: {country}
                        </Typography>

                        <TextField
                            label={t("enterName")}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <div className="language-selector">
                            <Typography>{t("selectLanguage")}</Typography>
                            <Select
                                value={i18n.language}
                                onChange={handleLanguageChange}
                                fullWidth
                                variant="outlined"
                            >
                                <MenuItem value="en">English</MenuItem>
                                <MenuItem value="es">Español</MenuItem>
                                <MenuItem value="fil">Filipino</MenuItem>
                                <MenuItem value="ja">Japanese</MenuItem>
                                <MenuItem value="fr">French</MenuItem>
                                <MenuItem value="zh">Chinese</MenuItem>
                                <MenuItem value="ko">Korean</MenuItem>
                                <MenuItem value="vi">Vietnamese</MenuItem>
                                <MenuItem value="th">Thai</MenuItem>
                                <MenuItem value="pt">Portuguese</MenuItem>
                            </Select>
                        </div>

                        <Typography
                            variant="body1"
                            style={{ marginTop: "1rem" }}
                        >
                            {t("currentDate")}: {formattedDate}
                        </Typography>
                        <Typography variant="body1">
                            {t("currency")}: {formattedCurrency}
                        </Typography>

                        <Box
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                                marginTop: "2rem"
                            }}
                        >
                            <Tabs
                                value={tabIndex}
                                onChange={(event, newValue) =>
                                    setTabIndex(newValue)
                                }
                                centered
                            >
                                <Tab label={t("homeLink")} />
                                <Tab label={t("aboutLink")} />
                                <Tab label={t("contactLink")} />
                            </Tabs>
                        </Box>

                        <Card style={{ marginTop: "2rem" }}>
                            <CardContent>
                                {tabIndex === 0 && (
                                    <>
                                        <Typography variant="h5">
                                            {t("homeTitle", { name })}
                                        </Typography>
                                        <Typography variant="body1">
                                            {t("homeParagraph", { name })}
                                        </Typography>
                                    </>
                                )}
                                {tabIndex === 1 && (
                                    <>
                                        <Typography variant="h5">
                                            {t("aboutTitle")}
                                        </Typography>
                                        <Typography variant="body1">
                                            {t("aboutParagraph")}
                                        </Typography>
                                    </>
                                )}
                                {tabIndex === 2 && (
                                    <>
                                        <Typography variant="h5">
                                            {t("contactTitle")}
                                        </Typography>
                                        <Typography variant="body1">
                                            {t("contactParagraph")}
                                        </Typography>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
}

export default LanguagePage;
