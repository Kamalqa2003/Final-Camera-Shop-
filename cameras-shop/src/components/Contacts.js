
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/contacts.css';

const Contacts = ({ onClose }) => {
    const navigate = useNavigate();

    const [contacts] = useState({
        name: "AIVIDEON",
        address: "г. Алматы, ул. Ислам Каримова 56",
        phone: "+7 (747) 245-93-43",
        email: "aivideon@shop.kz"
    });

    const [feedback, setFeedback] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [feedbackSent, setFeedbackSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [name]: value,
        }));
    };

    const handleSubmitFeedback = (e) => {
        e.preventDefault();

        // Имитация успешной отправки данных
        console.log('Отправлено:', feedback);

        // Сбросить состояние формы
        setFeedback({
            name: "",
            email: "",
            message: ""
        });

        // Установить состояние об успешной отправке
        setFeedbackSent(true);

        if (onClose) {
            onClose();
        }
    };

    const handleNavigateHome = () => {
        navigate('/');
    }

    return (
        <div className="contacts">
            <div>
                <h1>CONTACTS</h1>

                <div className="contacts-info">
                    <h3>{contacts.name}</h3>
                    <p>{contacts.address}</p>
                    <p>{contacts.phone}</p>
                    <p>{contacts.email}</p>
                </div>

                {feedbackSent ? (
                    <p className="success-message">Ожидайте обратной связи!</p>
                ) : (
                    <form onSubmit={handleSubmitFeedback}>
                        <div className="form-group">
                            <label htmlFor="name">Имя</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={feedback.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={feedback.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Сообщение</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={feedback.message}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit">Отправить</button>
                    </form>
                )}

                <button className="close-icon" onClick={handleNavigateHome}>
                    &#10006;
                </button>
            </div>
        </div>
    );
};

export default Contacts;

