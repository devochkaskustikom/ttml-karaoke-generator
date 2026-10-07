import {createContext, useCallback, useContext, useState} from "react";
import type {ReactNode} from "react";
import type WaveSurfer from "wavesurfer.js";
import type {Language} from "./i18n";

export const LANG = {
    RU: "RU",
    EN: "EN",
} as const satisfies Record<string, Language>;

interface AppState {
    language: Language;
    setLanguage: (lang: Language) => void;
    waveForm: WaveSurfer | null;
    setWaveForm: (ws: WaveSurfer | null) => void;
    isPlaying: boolean;
    setPlaying: (playing: boolean) => void;
    url: string;
    setUrl: (url: string) => void;
}

const AppContext = createContext<AppState>({
    language: LANG.RU,
    setLanguage: () => {},
    waveForm: null,
    setWaveForm: () => {},
    isPlaying: false,
    setPlaying: () => {},
    url: "",
    setUrl: () => {},
});

export function AppProvider({children}: {children: ReactNode}) {
    const [language, setLang] = useState<Language>(
        () => (sessionStorage.getItem("lang") as Language) || LANG.RU,
    );
    const [waveForm, setWaveForm] = useState<WaveSurfer | null>(null);
    const [isPlaying, setPlaying] = useState(false);
    const [url, setUrl] = useState("");

    const setLanguage = useCallback((lang: Language) => {
        setLang(lang);
        sessionStorage.setItem("lang", lang);
    }, []);

    return (
        <AppContext.Provider
            value={{language, setLanguage, waveForm, setWaveForm, isPlaying, setPlaying, url, setUrl}}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}
