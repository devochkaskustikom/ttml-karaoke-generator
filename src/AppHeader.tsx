import {useState} from "react";
import {Dropdown, Label} from "@heroui/react";
import {useApp, LANG} from "./state";
import {MSG, messages} from "./i18n";
import {HelpModal} from "./HelpModal";

function CaretIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 10l5 5 5-5z" />
        </svg>
    );
}

function BrandMark() {
    return (
        <a className="app-header__brand" href="https://overflow.name" target="_blank" rel="noreferrer">
            <svg className="app-header__mark" viewBox="0 0 32 32" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="#cc0f8d" />
                <path
                    d="M6 17c2.2-4 4.2-6 6-6s3.2 2 4.4 4.2C17.8 17.8 19.4 20 22 20s3.4-1.4 4-3"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                />
            </svg>
            <span className="app-header__wordmark">
                overflow<span className="app-header__dot">.</span>name
            </span>
        </a>
    );
}

export function AppHeader() {
    const {language, setLanguage} = useApp();
    const [helpOpen, setHelpOpen] = useState(false);
    const t = messages[language];

    return (
        <header className="app-header">
            <BrandMark />
            <div className="app-header__spacer" />
            <button type="button" className="app-header__button" onClick={() => setHelpOpen(true)}>
                {t[MSG.headerHelpLink]}
            </button>
            <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
            <Dropdown>
                <button type="button" className="app-header__select" aria-label={t[MSG.languageLabel]}>
                    <span className="app-header__lang">
                        {language}
                        <CaretIcon />
                    </span>
                </button>
                <Dropdown.Popover placement="bottom end">
                    <Dropdown.Menu
                        selectionMode="single"
                        selectedKeys={new Set([language])}
                        onSelectionChange={(keys) => {
                            const key = [...keys][0];
                            if (key === LANG.RU || key === LANG.EN) setLanguage(key);
                        }}
                    >
                        <Dropdown.Item id={LANG.RU} textValue="RU">
                            <Dropdown.ItemIndicator />
                            <Label>RU</Label>
                        </Dropdown.Item>
                        <Dropdown.Item id={LANG.EN} textValue="EN">
                            <Dropdown.ItemIndicator />
                            <Label>EN</Label>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
        </header>
    );
}
