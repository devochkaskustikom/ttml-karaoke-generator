import {Button, Modal} from "@heroui/react";
import {useApp} from "./state";
import {MSG, messages} from "./i18n";

function HelpText() {
    const {language} = useApp();
    return (
        <div
            className="help-content"
            dangerouslySetInnerHTML={{__html: messages[language][MSG.helpModalText]}}
        />
    );
}

export function HelpModal({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
    const {language} = useApp();
    const t = messages[language];

    return (
        <Modal.Backdrop isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Container>
                <Modal.Dialog className="sm:max-w-[640px]">
                    <Modal.CloseTrigger />
                    <Modal.Header>
                        <Modal.Heading>{t[MSG.headerHelpLink]}</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body>
                        <HelpText />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button slot="close">{t[MSG.helpModalClose]}</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal.Container>
        </Modal.Backdrop>
    );
}
