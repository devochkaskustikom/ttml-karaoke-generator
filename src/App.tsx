import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Button, Label, TextArea, TextField, Input} from "@heroui/react";
import {useApp} from "./state";
import {MSG, messages} from "./i18n";
import {Player} from "./Player";
import {InfoModal} from "./InfoModal";
import {buildTtml, makeFileName, toTimestamp} from "./ttml";
import type {LyricLine} from "./ttml";

const STEP = {
    UPLOAD: 0,
    RECORD: 1,
    RESULT: 2,
} as const;

function CheckIcon() {
    return (
        <svg className="success-icon" viewBox="0 0 24 24" fill="#4caf50" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg className="dl-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
    );
}

export function App() {
    const {language, waveForm, isPlaying, setPlaying, setWaveForm, setUrl} = useApp();
    const t = messages[language];

    const [step, setStep] = useState<number>(STEP.UPLOAD);
    const [lyrics, setLyrics] = useState("");
    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [currentLine, setCurrentLine] = useState(0);
    const [marks, setMarks] = useState<LyricLine[]>([]);
    const [spacePressed, setSpacePressed] = useState(false);
    const [errorNext, setErrorNext] = useState(false);
    const [errorPlay, setErrorPlay] = useState(false);

    const lineRef = useRef(currentLine);
    lineRef.current = currentLine;
    const marksRef = useRef(marks);
    marksRef.current = marks;
    const stepRef = useRef(step);
    stepRef.current = step;

    const posMs = useRef(0);
    const beginMs = useRef(0);
    const pressedRef = useRef(false);

    const lines = lyrics.length ? lyrics.split("\n") : [];
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ws = waveForm;
        if (!ws) return;
        const onTime = (time: number) => {
            posMs.current = time * 1000;
        };
        ws.on("audioprocess", onTime);
        ws.on("timeupdate", onTime);
        ws.on("seeking", onTime);
        return () => {
            ws.un("audioprocess", onTime);
            ws.un("timeupdate", onTime);
            ws.un("seeking", onTime);
        };
    }, [waveForm]);

    const scrollToLine = useCallback((index: number, duration = 300) => {
        const nodes = textRef.current?.querySelectorAll<HTMLElement>(".lyrics-text__str");
        const el = nodes?.[index];
        if (!el) return;
        el.scrollIntoView({behavior: duration >= 500 ? "smooth" : "auto", block: "center"});
    }, []);

    const resetRecording = useCallback(
        (clearMarks = true) => {
            setCurrentLine(0);
            setPlaying(false);
            setSpacePressed(false);
            pressedRef.current = false;
            posMs.current = 0;
            waveForm?.setTime(0);
            if (clearMarks) setMarks([]);
        },
        [waveForm, setPlaying],
    );

    useEffect(() => {
        if (step === STEP.RECORD) scrollToLine(0, 1300);
    }, [step, scrollToLine]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement | null)?.tagName;
            if (["INPUT", "TEXTAREA"].includes(tag ?? "")) return;
            if (e.code !== "Space") return;
            e.preventDefault();
            e.stopPropagation();
            if (stepRef.current !== STEP.RECORD || pressedRef.current) return;
            if (lineRef.current >= lines.length) return;
            pressedRef.current = true;
            setSpacePressed(true);
            beginMs.current = posMs.current;
            if (!isPlaying) setPlaying(true);
        };

        const onKeyUp = (e: KeyboardEvent) => {
            if (e.code !== "Space") return;
            if (stepRef.current !== STEP.RECORD) return;
            if (!pressedRef.current) return;
            pressedRef.current = false;
            setSpacePressed(false);
            const next = lineRef.current + 1;
            const text = lines[lineRef.current] ?? "";
            setMarks((prev) => [
                ...prev,
                {
                    begin: toTimestamp(beginMs.current),
                    end: toTimestamp(posMs.current),
                    text,
                },
            ]);
            setCurrentLine(next);
            if (next >= lines.length) {
                waveForm?.pause();
                setPlaying(false);
                setStep(STEP.RESULT);
            } else {
                scrollToLine(next);
            }
        };

        const onBackspace = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement | null)?.tagName;
            if (["INPUT", "TEXTAREA"].includes(tag ?? "")) return;
            if (e.code !== "Backspace" || stepRef.current !== STEP.RECORD) return;
            e.preventDefault();
            if (lineRef.current <= 0) return;
            const prev = lineRef.current - 1;
            setCurrentLine(prev);
            setMarks((prevMarks) => prevMarks.slice(0, -1));
            if (!isPlaying) setPlaying(true);
            scrollToLine(prev);
        };

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        window.addEventListener("keydown", onBackspace);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
            window.removeEventListener("keydown", onBackspace);
        };
    }, [lines, waveForm, isPlaying, setPlaying, scrollToLine]);

    const goNext = () => {
        if (lyrics.trim() && artist.trim() && title.trim() && waveForm) setStep(STEP.RECORD);
        else setErrorNext(true);
    };

    const backToUpload = () => {
        resetRecording();
        setStep(STEP.UPLOAD);
    };

    const resetFile = () => {
        setWaveForm(null);
        setUrl("");
    };

    const ttmlXml = useMemo(
        () => buildTtml({title: title.trim() || makeFileName(artist, title, false), name: artist.trim(), items: marks}),
        [artist, title, marks],
    );

    const downloadUrl = useMemo(() => {
        if (!marks.length) return "";
        return URL.createObjectURL(new Blob([ttmlXml], {type: "text/xml"}));
    }, [marks, ttmlXml]);

    useEffect(() => {
        return () => {
            if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        };
    }, [downloadUrl]);

    const fileName = useCallback(
        (withDate: boolean) => `${makeFileName(artist, title, withDate)}.ttml`,
        [artist, title],
    );

    return (
        <div className="app-shell">
            <InfoModal
                isOpen={errorNext}
                onClose={() => setErrorNext(false)}
                title={t[MSG.errorNextLevelTitle]}
                message={t[MSG.errorNextLevelMessage]}
                closeLabel={t[MSG.errorNextLevelClose]}
            />
            <InfoModal
                isOpen={errorPlay}
                onClose={() => setErrorPlay(false)}
                title={t[MSG.errorPlayTitle]}
                message={t[MSG.errorPlayMessage]}
                closeLabel={t[MSG.errorPlayClose]}
            />

            {step !== STEP.RESULT && (
                <div className="levels levels--primary">
                    {step === STEP.UPLOAD && (
                        <div className="start-message">
                            <span>{t[MSG.startMessage]} </span>
                            <Button className="inline-link" variant="ghost" onPress={goNext}>
                                {t[MSG.startContinue]}
                            </Button>
                            <span> {language === "RU" ? "или Play" : "or Play"}</span>
                        </div>
                    )}
                    {step === STEP.RECORD && <WorkMessage onReset={() => resetRecording()} onReturn={backToUpload} />}

                    <div className="divider" />

                    <div
                        className={
                            waveForm && step === STEP.UPLOAD
                                ? "player-reset-container player-reset-container--visible"
                                : "player-reset-container"
                        }
                    >
                        <button type="button" className="player-reset" onClick={resetFile}>
                            {t[MSG.playerReset]}
                        </button>
                    </div>

                    {step === STEP.RECORD && (
                        <div className="player-status-container">
                            <div className={isPlaying ? "player-status player-status--rec" : "player-status"}>
                                {isPlaying ? (
                                    <>
                                        <span className="rec-dot" />
                                        {t[MSG.playerStatusPlaying]}
                                    </>
                                ) : (
                                    t[MSG.playerStatusNoPlaying]
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <Player disabled={step === STEP.RESULT} allowSeek={step === STEP.UPLOAD} />

            {step === STEP.RECORD && (
                <div className="levels levels--primary">
                    <div className="lyrics-text" ref={textRef}>
                        {lines.map((line, i) => {
                            const selected = i === currentLine;
                            const pressed = selected && spacePressed;
                            return (
                                <span
                                    key={i}
                                    className={[
                                        "lyrics-text__str",
                                        selected ? "lyrics-text__str--selected" : "",
                                        pressed ? "is-pressed" : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                >
                                    {line || "\u00A0"}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {step !== STEP.RESULT && (
                <div className="fields">
                    <div className="meta">
                        <TextField
                            className="field"
                            value={artist}
                            onChange={setArtist}
                            isDisabled={step !== STEP.UPLOAD}
                        >
                            <Label>{t[MSG.inputLabelAuthor]}</Label>
                            <Input placeholder={t[MSG.inputPlaceholderAuthor]} />
                        </TextField>
                        <TextField
                            className="field"
                            value={title}
                            onChange={setTitle}
                            isDisabled={step !== STEP.UPLOAD}
                        >
                            <Label>{t[MSG.inputLabelTrackName]}</Label>
                            <Input placeholder={t[MSG.inputPlaceholderTrackName]} />
                        </TextField>
                    </div>
                    {step === STEP.UPLOAD && (
                        <div className="area">
                            <TextField className="w-full" value={lyrics} onChange={setLyrics}>
                                <Label>{t[MSG.inputLabelText]}</Label>
                                <TextArea
                                    aria-label={t[MSG.inputPlaceholderText]}
                                    placeholder={t[MSG.inputPlaceholderText]}
                                    rows={10}
                                    className="min-h-[240px] text-lg"
                                />
                            </TextField>
                        </div>
                    )}
                </div>
            )}

            {step === STEP.RESULT && (
                <div className="success">
                    <CheckIcon />
                    <div className="success-title">{t[MSG.successTitle]}</div>
                    <div className="message">
                        <a
                            className="download download--primary"
                            download={fileName(true)}
                            href={downloadUrl || undefined}
                        >
                            <DownloadIcon />
                            <span>{t[MSG.successDownloadTTMLFile]}</span>
                        </a>
                        <div className="link">
                            <button
                                type="button"
                                onClick={() => {
                                    setMarks([]);
                                    resetRecording();
                                    setStep(STEP.RECORD);
                                }}
                            >
                                {t[MSG.successResetThisTrackLink]}
                            </button>
                        </div>
                        <div className="link">
                            <button
                                type="button"
                                onClick={() => {
                                    resetRecording();
                                    setLyrics("");
                                    setArtist("");
                                    setTitle("");
                                    resetFile();
                                    setStep(STEP.UPLOAD);
                                }}
                            >
                                {t[MSG.successResetAppLink]}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function WorkMessage({onReset, onReturn}: {onReset: () => void; onReturn: () => void}) {
    const {language} = useApp();
    const raw = messages[language][MSG.workMessage];
    const renderTags = raw.split(/(<p>|<\/p>|<reset>|<\/reset>|<return>|<\/return>)/);
    const out: React.ReactNode[] = [];
    let block: React.ReactNode[] = [];
    let mode: "p" | "reset" | "return" | null = null;

    const flush = () => {
        if (!block.length) return;
        const content = block;
        block = [];
        if (mode === "reset") {
            out.push(
                <p key={out.length}>
                    <Button className="inline-link" variant="ghost" onPress={onReset}>
                        {content}
                    </Button>
                </p>,
            );
        } else if (mode === "return") {
            out.push(
                <p key={out.length}>
                    <Button className="inline-link" variant="ghost" onPress={onReturn}>
                        {content}
                    </Button>
                </p>,
            );
        } else {
            out.push(<p key={out.length}>{content}</p>);
        }
    };

    for (const part of renderTags) {
        if (part === "<p>") {
            mode = "p";
            continue;
        }
        if (part === "</p>") {
            flush();
            mode = null;
            continue;
        }
        if (part === "<reset>") {
            mode = "reset";
            continue;
        }
        if (part === "</reset>") {
            flush();
            mode = null;
            continue;
        }
        if (part === "<return>") {
            mode = "return";
            continue;
        }
        if (part === "</return>") {
            flush();
            mode = null;
            continue;
        }
        if (part) block.push(part);
    }
    flush();
    return <div className="work-message">{out}</div>;
}
