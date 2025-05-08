"use client"
import { SendBudge } from "@/actions/badge.action";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { useState } from "react";

const Vildate = ({ }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postloader, setPostLoader] = useState(false);

    const handleOnPress = async () => {
        setPostLoader(true);
        await SendBudge({ fullname: "zaki bens", fonction: "ceo", type: "participant", email: "z.benslite@esi-sba.dz" })
        onClose()
        setPostLoader(false);
    };

    return (
        <>
            <Button onPress={() => { onOpen() }} color="success" variant="flat" size="md" >
                validate
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{"validate" || "Modal Title"}</ModalHeader>
                            <ModalBody>
                                <h1>Are you sure ??</h1>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" variant="flat" onPress={handleOnPress} isLoading={postloader}>
                                    Action
                                </Button>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default Vildate;
