import {Button, Modal} from "@heroui/react";

export function InfoModal({
    isOpen,
    onClose,
    title,
    message,
    closeLabel,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    closeLabel: string;
}) {
    return (
        <Modal.Backdrop isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Container size="sm">
                <Modal.Dialog>
                    <Modal.CloseTrigger />
                    <Modal.Header>
                        <Modal.Heading>{title}</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{message}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button slot="close" onPress={onClose}>
                            {closeLabel}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal.Container>
        </Modal.Backdrop>
    );
}
