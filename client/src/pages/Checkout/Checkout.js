import { useEffect, useState } from "react";
import { getDeliveryMethods, getOrdersCartForUser } from "./helpers/useEffectHelper.js";
import { OrderBar } from "./styled/OrderBar.js";
import handleInputChange from "../../utils/formHandlers.js";
import { submitPay } from "./helpers/submitPay.js";

export function Checkout(props) {
    const payments = ['Przelewy24', 'Blik'];

    const [deliveryMethods, setDeliveryMethods] = useState([]);
    const [delivery, setDelivery] = useState({});
    const [ordersCart, setOrdersCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(payments[0] || ''); // domyślna wartość
    const [address, setAddress] = useState({ country: 'Poland' });
    const [summaryPrice, setSummaryPrice] = useState(0);

    useEffect(() => {
        const getAsyncData = async () => {
            const orders = await getOrdersCartForUser();
            setOrdersCart(orders);
        }
        getAsyncData();
    }, []);

    useEffect(() => {
        const getDeliveries = async () => {
            const deliveries = await getDeliveryMethods();
            setDeliveryMethods(deliveries);
        }
        getDeliveries();
    }, []);

    useEffect(() => {
        let price = ordersCart.reduce((accumulator, currentValue) => {
            const orderItem = currentValue.orderItem;
            const product = currentValue.product;
            return accumulator + (Number(orderItem.quantity) * Number(product.price));
        }, 0);

        if (delivery.price) price += Number(delivery.price);

        setSummaryPrice(Math.round(price * 100) / 100);
    }, [delivery, ordersCart]);

    function onClickAddress(event) {
        const name = event.target.name;
        const value = event.target.value;
        setAddress(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const onChangeDeliveryMethod = (event) => {
        const selectedId = event.target.value;
        const selectedDelivery = deliveryMethods.find(delivery => delivery.id === selectedId);
        if (selectedDelivery) setDelivery(selectedDelivery);
    }

    const onSubmitPay = (event) => {
        event.preventDefault();
        submitPay(  );
    }

    return (
        <div className="container p-2">
            <div className="row">
                <div className="col-12">
                    <h1>Twoje zamówienie</h1>
                </div>
                <form onSubmit={onSubmitPay}>
                    <div className="col-12 m-2">
                        <h4>Produkty</h4>
                        {ordersCart.map((value, index) => (
                            <div className="row" key={value.id}>
                                <div className="col-1">
                                    {index + 1}
                                </div>
                                <div className="col-11">
                                    <OrderBar order={value} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h4>Delivery</h4>
                        <select
                            className="form-control"
                            onChange={onChangeDeliveryMethod}
                        >
                            {
                                deliveryMethods.map(delivery => (
                                    <option key={delivery.id} value={delivery.id}>
                                        {delivery.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <h4>Address</h4>
                        <label htmlFor="streetControl" className="form-label">Street</label>
                        <input
                            type="text"
                            name="street"
                            id="streetControl"
                            className="form-control"
                            onChange={onClickAddress}
                            required
                        />
                        <label htmlFor="houseNumberControl" className="form-label">House Number</label>
                        <input
                            type="text"
                            name="house_number"
                            id="houseNumberControl"
                            className="form-control"
                            onChange={onClickAddress}
                        />
                        <label htmlFor="cityControl" className="form-label">City</label>
                        <input
                            type="text"
                            name="city"
                            id="cityControl"
                            className="form-control"
                            onChange={onClickAddress}
                            required
                        />
                        <label htmlFor="postalCodeControl" className="form-label">Postal Code</label>
                        <input
                            type="text"
                            name="postal_code"
                            id="postalCodeControl"
                            className="form-control"
                            onChange={onClickAddress}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <h4>Payment Method</h4>
                        <select
                            className="form-control"
                            onChange={event => handleInputChange(event, setPaymentMethod)}
                            value={paymentMethod}
                        >
                            {
                                payments.map((value, index) => (
                                    <option key={index} value={value}>
                                        {value}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-12">
                        <h4>To pay: {summaryPrice} zł</h4>
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                        <button type="submit" className="btn btn-success">Pay</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
