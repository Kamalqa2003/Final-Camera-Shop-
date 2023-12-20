import React, { useState } from 'react';
import { FaShopify } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Order from './Order';
import About from './About';
import Contacts from './Contacts';

const ShowOrders = (props) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        paymentMethod: 'creditCard',
    });

    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        setFormErrors({ ...formErrors, [name]: '' });
    };

    const handlePaymentMethodChange = (e) => {
        setFormData({ ...formData, paymentMethod: e.target.value });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};


        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Введите имя';
            isValid = false;
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Введите фамилию';
            isValid = false;
        }

        if (!formData.contactNumber.trim()) {
            newErrors.contactNumber = 'Введите контактный номер';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Введите почту';
            isValid = false;
        }

        setFormErrors(newErrors);

        return isValid;
    };

    const handleOrderSubmit = () => {

        if (!validateForm()) {

            return;
        }


        alert('Заказ успешно оформлен. Ожидайте обратной связи от менеджера!');
        props.onCloseBuyForm();


        props.onClearCart();
    };

    let summa = 0;
    props.orders.forEach((el) => (summa += Number.parseFloat(el.price)));
    return (
        <div>
            {props.orders.map((el) => (
                <Order onDelete={props.onDelete} key={el.id} item={el} />
            ))}
            <p className='summa'> Сумма: {new Intl.NumberFormat().format(summa)}$ </p>
            <button className='buy-button' onClick={props.onBuy}>
                Купить
            </button>
            {props.buyFormVisible && (
                <div className='about'>
                    <div>
                        <span className='close-icon' onClick={props.onCloseBuyForm}>
                            &times;
                        </span>
                        <h2>Форма покупки заказа</h2>
                        <form>
                            <label>
                                Имя:
                                <input type='text' name='firstName' value={formData.firstName} onChange={handleInputChange} />
                                {formErrors.firstName && <span className='error'>{formErrors.firstName}</span>}
                            </label>
                            <label>
                                Фамилия:
                                <input type='text' name='lastName' value={formData.lastName} onChange={handleInputChange} />
                                {formErrors.lastName && <span className='error'>{formErrors.lastName}</span>}
                            </label>
                            <label>
                                Контактный номер:
                                <input type='text' name='contactNumber' value={formData.contactNumber} onChange={handleInputChange} />
                                {formErrors.contactNumber && <span className='error'>{formErrors.contactNumber}</span>}
                            </label>
                            <label>
                                Почта:
                                <input type='email' name='email' value={formData.email} onChange={handleInputChange} />
                                {formErrors.email && <span className='error'>{formErrors.email}</span>}
                            </label>
                            <label>
                                Вид оплаты:
                                <select name='paymentMethod' value={formData.paymentMethod} onChange={handlePaymentMethodChange}>
                                    <option value='creditCard'>Кредитная карта</option>
                                    <option value='paypal'>PayPal</option>
                                    <option value='kaspi'>Kaspi</option>
                                    <option value='qiwi'>QIWI</option>
                                    <option value='visa'>VISA</option>
                                </select>
                            </label>
                            <button type='button' onClick={handleOrderSubmit}>
                                Оформить заказ
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const ShowNothing = () => {
    return (
        <div className='empty'>
            <h2>Товаров нет!</h2>
        </div>
    );
};

const Header = (props) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [buyFormVisible, setBuyFormVisible] = useState(false);

    const onCloseAbout = () => {
        setAboutOpen(false);
    };

    const onCloseContact = () => {
        setContactOpen(false);
    };

    const onBuy = () => {
        setBuyFormVisible(true);
    };

    const onCloseBuyForm = () => {
        setBuyFormVisible(false);
    };

    return (
        <header>
            <div>
                <span className='logo'>AIVIDEON</span>
                <ul className='nav'>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/contacts'>Contacts</Link>
                    </li>
                </ul>
                <FaShopify
                    onClick={() => setCartOpen((cartOpen) => !cartOpen)}
                    className={`shop-cart-button ${cartOpen && 'active'}`}
                />
                {cartOpen && (
                    <div className='shop-cart'>
                        {props.orders.length > 0 ? (
                            <ShowOrders
                                orders={props.orders}
                                onDelete={props.onDelete}
                                onBuy={onBuy}
                                buyFormVisible={buyFormVisible}
                                onCloseBuyForm={onCloseBuyForm}
                                onClearCart={props.onClearCart}
                            />
                        ) : (
                            <ShowNothing />
                        )}
                    </div>
                )}

                {aboutOpen && <About onClose={onCloseAbout} orders={props.orders} onDelete={props.onDelete} />}

                {contactOpen && <Contacts onClose={onCloseContact} orders={props.orders} onDelete={props.onDelete} />}
            </div>
            <div className='presentation'></div>
        </header>
    );
};

export default Header;
