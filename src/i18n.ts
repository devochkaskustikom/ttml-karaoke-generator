export type Language = "RU" | "EN";

export const MSG = {
    headerHelpLink: "headerHelpLink",
    helpModalClose: "helpModalClose",
    helpModalText: "helpModalText",
    startMessage: "startMessage",
    startContinue: "startContinue",
    workMessage: "workMessage",
    inputLabelAuthor: "inputLabelAuthor",
    inputLabelTrackName: "inputLabelTrackName",
    inputLabelText: "inputLabelText",
    inputPlaceholderAuthor: "inputPlaceholderAuthor",
    inputPlaceholderTrackName: "inputPlaceholderTrackName",
    inputPlaceholderText: "inputPlaceholderText",
    errorNextLevelTitle: "errorNextLevelTitle",
    errorNextLevelMessage: "errorNextLevelMessage",
    errorNextLevelClose: "errorNextLevelClose",
    errorPlayTitle: "errorPlayTitle",
    errorPlayMessage: "errorPlayMessage",
    errorPlayClose: "errorPlayClose",
    playerReset: "playerReset",
    playerPlay: "playerPlay",
    playerPause: "playerPause",
    playerStatusNoPlaying: "playerStatusNoPlaying",
    playerStatusPlaying: "playerStatusPlaying",
    dragDropMessage: "dragDropMessage",
    errorFileFormatTitle: "errorFileFormatTitle",
    errorFileFormatMessage: "errorFileFormatMessage",
    errorFileFormatClose: "errorFileFormatClose",
    successTitle: "successTitle",
    successDownloadTTMLFile: "successDownloadTTMLFile",
    successResetThisTrackLink: "successResetThisTrackLink",
    successResetAppLink: "successResetAppLink",
    languageLabel: "languageLabel",
} as const;

export type MsgId = (typeof MSG)[keyof typeof MSG];

const ru: Record<MsgId, string> = {
    headerHelpLink: "Как это работает?",
    helpModalClose: "Понятно",
    helpModalText: `<h6><strong>overflow.name</strong> помогает создавать и загружать синхронизированные тексты песен в Apple Music.</h6>

<p>В Apple Music синхронизированные тексты песен (Time Synced Lyrics) автоматически прокручиваются вместе с песней. Это так называемый стиль караоке, так что слушатели могут следовать (и петь) вместе.</p>
<div>Интерфейс синхронизации сделан максимально простым:</div>
<ol>
    <li>Загрузите MP3 или WAV файл песни.</li>
    <li>Заполните поле «Имя исполнителя». Указывайте имя или имена в соответствии с названием в треке. Если несколько исполнителей — через запятую.</li>
    <li>Заполните поле «Название композиции». Название трека должно полностью совпадать с названием в вашем личном кабинете.</li>
    <li>Заполните поле «Текст песни». Требования к тексту:
        <ol class="nested">
            <li>Не используйте дополнительный текст, например – «вступление», «хор», ссылки в социальных сетях и т.д.</li>
            <li>Записывайте все слова — даже если секция повторяется. Повторные строки должны быть выписаны.</li>
            <li>Не пишите "Припев", "Припев 2раза" и т.д.</li>
            <li>Начинайте каждую строку с заглавной буквы.</li>
            <li>Не используйте пунктуацию в конце строки.</li>
            <li>Не включайте пустые строки, кроме как между стихами или хором.</li>
            <li>Избегайте чрезмерно длинных строк. Используйте одно предложение в строке.</li>
            <li>Не подвергайте цензуре Explicit текст, если эти слова не пропущены в аудиозаписи. Полные требования: <a href="https://help.apple.com/itc/musicstyleguide/en.lproj/static.html#itccfbeba319" target="_blank" rel="noreferrer">Apple Music Style Guide</a>.</li>
        </ol>
    </li>
    <li>Нажмите «Продолжить» или Play. После Play отмечайте строки, удерживая «Пробел». После записи скачайте TTML или запишите трек ещё раз.</li>
    <li>В личном кабинете добавьте файл в поле "Synced Lyrics" и отправьте релиз на модерацию.</li>
</ol>

<div>Можно подгружать такие файлы и к уже выпущенным релизам (через редактирование). Укажите в «Дополнительной информации об альбоме» Synced Lyrics, чтобы модерация знала, что именно вы меняли.</div>
<p class="help-note">Продукт <strong>overflow.name</strong>. Основан на workflow оригинального TTML-генератора НЦА (2022).</p>`,
    startMessage: "Добавьте аудиофайл в формате MP3/WAV и текст песни, после нажмите",
    startContinue: "продолжить",
    workMessage: `<p>Держите пробел НАЖАТЫМ когда вы слышите начало строки.</p><p>ОТПУСТИТЕ когда строка будет закончена.</p><p>ПОВТОРИТЕ действие до конца текста.</p><p>BACKSPACE отменить выбор строки.</p><p><reset>Сбросить текущие отметки</reset></p><return>Вернуться к редактированию текста или данных композиции</return>`,
    inputLabelAuthor: "Исполнитель",
    inputLabelTrackName: "Композиция",
    inputLabelText: "Текст песни",
    inputPlaceholderAuthor: "Введите имя исполнителя",
    inputPlaceholderTrackName: "Введите название композиции",
    inputPlaceholderText: "Поместите сюда текст песни",
    errorNextLevelTitle: "Не добавлен файл или данные",
    errorNextLevelMessage: "Прежде чем перейти к следующему этапу, выберите аудио файл и заполните все поля",
    errorNextLevelClose: "Закрыть",
    errorPlayTitle: "Не добавлен файл или данные",
    errorPlayMessage: "Прежде чем запустить проигрывание, выберите аудио файл и заполните все поля",
    errorPlayClose: "Закрыть",
    playerReset: "СБРОСИТЬ",
    playerPlay: "Play",
    playerPause: "Pause",
    playerStatusPlaying: "ЗАПИСЬ...",
    playerStatusNoPlaying: "НАЖМИТЕ PLAY ЧТОБЫ НАЧАТЬ",
    dragDropMessage: "<b>Выберите аудио файл</b> или перетащите его сюда",
    errorFileFormatTitle: "Неверный формат файла",
    errorFileFormatMessage: "Используйте файл с расширением wav или mp3",
    errorFileFormatClose: "Закрыть",
    successTitle: "Готово",
    successDownloadTTMLFile: "Скачать TTML файл",
    successResetThisTrackLink: "Записать текущий трек ещё раз",
    successResetAppLink: "Вернуться в начало и записать новый файл",
    languageLabel: "Язык",
};

const en: Record<MsgId, string> = {
    headerHelpLink: "How it works?",
    helpModalClose: "Got it",
    helpModalText: `<h6><strong>overflow.name</strong> helps you create and upload synchronized lyrics to Apple Music.</h6>

<p>In Apple Music, Time Synced Lyrics scroll with the music — karaoke-style, so listeners can follow (and sing) along.</p>
<div>The syncing interface is intentionally simple:</div>
<ol>
    <li>Upload the MP3 or WAV file of the song.</li>
    <li>Fill in the "Artist name" field. Use the name(s) exactly as they appear on the track. Separate multiple artists with commas.</li>
    <li>Fill in the "Song title" field. It must match the track title in your dashboard.</li>
    <li>Fill in the "Lyrics" field. Follow these requirements:
        <ol class="nested">
            <li>Do not use extra text such as "intro", "chorus", social media links, etc.</li>
            <li>Write out all the words — even if a section repeats.</li>
            <li>Do not write "Chorus", "Chorus x2", etc.</li>
            <li>Start each line with a capital letter.</li>
            <li>Do not use punctuation at the end of a line.</li>
            <li>Do not include empty lines, except between verses or choruses.</li>
            <li>Avoid overly long lines. Use one sentence per line.</li>
            <li>Do not censor explicit text if those words are not bleeped in the audio. Full requirements: <a href="https://help.apple.com/itc/musicstyleguide/en.lproj/static.html#itccfbeba319" target="_blank" rel="noreferrer">Apple Music Style Guide</a>.</li>
        </ol>
    </li>
    <li>Click "Continue" or Play. Mark lines by holding SPACE. After recording, download the TTML or record again.</li>
    <li>Attach the file in the "Synced Lyrics" field in your dashboard, then submit for moderation.</li>
</ol>

<div>You can also attach synced lyrics to previously released tracks via edit. Mention Synced Lyrics in additional album information so moderation knows what changed.</div>
<p class="help-note">Product by <strong>overflow.name</strong>. Based on the workflow of the original NCA TTML generator (2022).</p>`,
    startMessage: "Add an MP3/WAV audio file and lyrics, then click",
    startContinue: "continue",
    workMessage: `<p>Keep the space PRESSED when you hear the beginning of a line.</p><p>RELEASE when the line is finished.</p><p>REPEAT until the end of the text.</p><p>BACKSPACE undoes the last mark.</p><p><reset>Reset current marks</reset></p><return>Return to editing text or song data</return>`,
    inputLabelAuthor: "Artist",
    inputLabelTrackName: "Song title",
    inputLabelText: "Lyrics",
    inputPlaceholderAuthor: "Enter artist name",
    inputPlaceholderTrackName: "Enter song title",
    inputPlaceholderText: "Put the lyrics here",
    errorNextLevelTitle: "No file or data added",
    errorNextLevelMessage: "Before proceeding to the next step, select an audio file and fill in all fields",
    errorNextLevelClose: "Close",
    errorPlayTitle: "No file or data added",
    errorPlayMessage: "Before starting playback, select an audio file and fill in all fields",
    errorPlayClose: "Close",
    playerReset: "RESET",
    playerPlay: "Play",
    playerPause: "Pause",
    playerStatusPlaying: "RECORDING...",
    playerStatusNoPlaying: "PRESS PLAY TO START",
    dragDropMessage: "<b>Choose an audio file</b> or drag it here",
    errorFileFormatTitle: "Invalid file format",
    errorFileFormatMessage: "Use a file with the wav or mp3 extension",
    errorFileFormatClose: "Close",
    successTitle: "Done",
    successDownloadTTMLFile: "Download TTML file",
    successResetThisTrackLink: "Record the current track again",
    successResetAppLink: "Go back and record a new file",
    languageLabel: "Language",
};

export const messages: Record<Language, Record<MsgId, string>> = {RU: ru, EN: en};

export function localeFor(language: Language): string {
    return language === "EN" ? "en-US" : "ru-RU";
}
