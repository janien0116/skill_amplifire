import React, { createContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

const ErrorHandlingModalContext = createContext();

export const ErrorHandlingModalContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [showErrorHandling, setShowErrorHandling] = useState(false);
    const [body, setBody] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const showErrorHandlingMessage = (body) => {
        setBody(body);
        setShowErrorHandling(true);
    }

    const testAuthentication = () => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }


    return (
        <ErrorHandlingModalContext.Provider value={{ showErrorHandlingMessage, setIsAuthenticated, testAuthentication }}>
            <Modal
                show={showErrorHandling}
                onHide={() => setShowErrorHandling(false)}
                backdrop="static"
                keyboard={false}
                id="modal-handler"
            >
                <Modal.Header closeButton id="dialog-header">
                </Modal.Header>
                <Modal.Body id="dialog">
                    {body}
                </Modal.Body>
            </Modal>
            {children}
        </ErrorHandlingModalContext.Provider>
    );
}

export default ErrorHandlingModalContext;
