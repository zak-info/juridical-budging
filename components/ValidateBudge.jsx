"use client"
import { createCondidat, SendBudge } from "@/actions/badge.action";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Select,
    SelectItem,
} from "@heroui/react";
import { useState } from "react";

const ValidateBudge = ({setData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postloader, setPostLoader] = useState(false);

    const [credentials, setCredentials] = useState(null)

    const handleOnPress = async () => {
        setPostLoader(true);
        const result = await SendBudge(credentials);
        if (result?.success) {
            const resultCond = await createCondidat(credentials)
            setData(prev => ([JSON.parse(resultCond?.condidat),...prev]))
        }
        setCredentials(null)
        onClose()
        setPostLoader(false);
    };

    return (
        <>
            <Button onPress={() => { onOpen() }} color="secondary" variant="flat" size="md" >
                send budge
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{"validate" || "Modal Title"}</ModalHeader>
                            <ModalBody>
                                {/* <h1>Are you sure ??</h1> */}
                                <form >
                                    <Input type="text" label="Name" className='w-full mt-4' value={credentials?.fullname} onChange={(e) => { setCredentials({ ...credentials, fullname: e.target.value }) }} />
                                    <Input type="text" label="Role" className='w-full mt-4' value={credentials?.fonction} onChange={(e) => { setCredentials({ ...credentials, fonction: e.target.value }) }} />
                                    {/* <Input type="text" label="Type" className='w-full mt-4' value={credentials?.type} onChange={(e) => { setCredentials({ ...credentials, type:e.target.value }) }} /> */}
                                    <Select
                                        items={[
                                            { id: "participant", name: "Participant" },
                                            { id: "premuim", name: "Premuim" },
                                            { id: "exposant", name: "Exposant" },
                                        ]}
                                        label="Nb of Medications"
                                        placeholder="Choose"
                                        className="max-w-xs mt-4"
                                        onChange={(e) => { setCredentials({ ...credentials, type: e.target.value }); }}
                                        selectedKey={credentials?.level}
                                    >
                                        {(item) => <SelectItem className='flex justify-end' key={item?.id}>{item?.name}</SelectItem>}
                                    </Select>
                                    <Input type="email" label="Email" className='w-full mt-4' value={credentials?.email} onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }} />
                                </form>
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

export default ValidateBudge;
