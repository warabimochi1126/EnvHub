"use client";

import { useState } from "react";
import Modal from "react-modal";

const modalStyle = {
    overlay: {
        // position: "fixed",
        backgroundColor: "rgba(0,0,0, 0.5)"
    },
    content: {
        // position: "absolute",
        top: "5rem",
        left: "5rem",
        right: "5rem",
        bottom: "",
    }
}

export function Disclaimer() {
    const [ modalIsOpen, setIsOpen ] = useState<boolean>(false);

    return (
        <div className="App">
            <button onClick={() => setIsOpen(true)} className="absolute top-3/4 left-1/2">免責事項</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} style={modalStyle}>
                <h1 className="text-center font-bold text-2xl">免責事項</h1>
                <p className="mt-4">・このウェブアプリを利用することによって生じるあらゆる損害や損失に対して、一切の責任を負いません</p>
            </Modal>
        </div>
    )
}