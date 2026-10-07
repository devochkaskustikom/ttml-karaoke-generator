import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {I18nProvider} from "@heroui/react";
import "./index.css";
import {AppProvider, useApp} from "./state";
import {AppHeader} from "./AppHeader";
import {App} from "./App";
import {localeFor} from "./i18n";

function Root() {
    const {language} = useApp();
    return (
        <I18nProvider locale={localeFor(language)}>
            <AppHeader />
            <App />
        </I18nProvider>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProvider>
            <Root />
        </AppProvider>
    </StrictMode>,
);
