import {useEffect, useRef, useState} from "react";
import WaveSurfer from "wavesurfer.js";
import {useApp} from "./state";
import {MSG, messages} from "./i18n";
import {InfoModal} from "./InfoModal";

function PlayIcon({playing}: {playing: boolean}) {
    return playing ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
    ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}

export function Player({disabled, allowSeek = true}: {disabled?: boolean; allowSeek?: boolean}) {
    const {waveForm, setWaveForm, isPlaying, setPlaying, url, setUrl, language} = useApp();
    const t = messages[language];

    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [dragEnter, setDragEnter] = useState(false);
    const [badFormat, setBadFormat] = useState(false);

    useEffect(() => {
        if (isPlaying) void waveForm?.play();
        else waveForm?.pause();
    }, [isPlaying, waveForm]);

    useEffect(() => {
        if (!waveForm) return;
        waveForm.setOptions({interact: allowSeek});
    }, [waveForm, allowSeek]);

    useEffect(() => {
        if (!containerRef.current || !url) return;
        const ws = WaveSurfer.create({
            container: containerRef.current,
            height: 60,
            cursorWidth: 1,
            progressColor: "#cc0f8d",
            waveColor: "#343a40",
            cursorColor: "#cc0f8d",
            interact: allowSeek,
        });
        setWaveForm(ws);
        return () => {
            ws.destroy();
            setWaveForm(null);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    useEffect(() => {
        if (!waveForm || !url) return;
        let cancelled = false;
        const unsub = waveForm.on("loading", (p) => {
            if (!cancelled) setProgress(p);
        });
        setLoading(true);
        void waveForm.load(url).then(
            () => {
                if (cancelled) return;
                setTimeout(() => setProgress(0), 200);
                setLoading(false);
            },
            () => setLoading(false),
        );
        return () => {
            cancelled = true;
            unsub();
        };
    }, [waveForm, url]);

    const acceptFile = (file: File) => {
        if (!/(mp3|mpeg|wav)$/.test(file.type)) {
            setBadFormat(true);
            return;
        }
        setLoading(true);
        setUrl(URL.createObjectURL(file));
    };

    return (
        <div className={disabled ? "player player--hidden" : "player"}>
            <InfoModal
                isOpen={badFormat}
                onClose={() => setBadFormat(false)}
                title={t[MSG.errorFileFormatTitle]}
                message={t[MSG.errorFileFormatMessage]}
                closeLabel={t[MSG.errorFileFormatClose]}
            />
            <div className="player__button-container">
                <button
                    type="button"
                    className="player__play"
                    disabled={!url || loading}
                    onClick={() => setPlaying(!isPlaying)}
                    aria-label={isPlaying ? t[MSG.playerPause] : t[MSG.playerPlay]}
                >
                    <PlayIcon playing={isPlaying} />
                </button>
            </div>
            <div className="player__content">
                <div className={loading ? "player__progress player__progress--active" : "player__progress"}>
                    <progress value={progress} max={100} />
                    <span className="tabular-nums">{progress}%</span>
                </div>
                {!url && (
                    <label
                        className={dragEnter ? "player__dropzone player__dropzone--drag" : "player__dropzone"}
                        onDragEnter={() => setDragEnter(true)}
                        onDragLeave={() => setDragEnter(false)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            setDragEnter(false);
                            const file = e.dataTransfer.files[0];
                            if (file) acceptFile(file);
                        }}
                    >
                        <span className="player__dropzone-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
                            </svg>
                        </span>
                        <span dangerouslySetInnerHTML={{__html: t[MSG.dragDropMessage]}} />
                        <input
                            type="file"
                            accept="audio/mpeg, audio/wav"
                            hidden
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) acceptFile(file);
                            }}
                        />
                    </label>
                )}
                {url && <div ref={containerRef} className="player__waveform" />}
            </div>
        </div>
    );
}
