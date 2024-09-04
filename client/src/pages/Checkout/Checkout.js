import { useEffect, useState } from "react";
import { getDeliveryMethods, getOrdersCartForUser } from "./helpers/useEffectHelper.js";
import { OrderBar } from "./styled/OrderBar.js";
import handleInputChange from "../../utils/formHandlers.js";
import { submitPay } from "./helpers/submitPay.js";
import { getAddressDb } from "./helpers/getAddress.js";
import { useNavigate } from "react-router-dom";
import { basicUrl } from "../../config/store.config.js";

export function Checkout(props) {
    const navigate = useNavigate();
    const payments = ['Przelewy24', 'Blik'];
    const [deliveryMethods, setDeliveryMethods] = useState([]);
    const [delivery, setDelivery] = useState({});
    const [ordersCart, setOrdersCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(payments[0] || '');
    const [address, setAddress] = useState({});
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

    useEffect( ()=> {
        const getAddress = async () => {
            const address = await getAddressDb();
            setAddress( address );
        };
        getAddress();
    }, [])    

    const onChangeDeliveryMethod = (event) => {
        const selectedId = event.target.value;
        const selectedDelivery = deliveryMethods.find(delivery => delivery.id === selectedId);
        if (selectedDelivery) setDelivery(selectedDelivery);
    }

    const onSubmitPay = (event) => {
        event.preventDefault();
        submitPay(  );
    }

    const onClickUpdateAddress = (event) => {
        navigate(basicUrl + '/address/add')
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
                    <div className="col-12">
                        <h4>Address</h4>
                        <div className="card p-1">
                            <div className="card-title">Dane do wysyłki:</div>
                            <div className="card-body">
                                <table>
                                    {
                                     address ? (
                                     <div>
                                        <tr>
                                            <th>Street</th><td>{address.street}</td>
                                        </tr>
                                        <tr>
                                            <th>House Number</th><td>{address.house_number}</td>
                                        </tr>
                                        <tr>
                                            <th>City</th><td>{address.city}</td>
                                        </tr>
                                        <tr>
                                            <th>State</th><td>{address.state}</td>
                                        </tr>
                                        <tr>
                                            <th>Postal Code</th><td>{address.postal_code}</td>
                                        </tr>
                                        <tr>
                                            <th>Country</th><td>{address.country}</td>
                                        </tr>
                                     </div>
                                     ) : null
                                    
                                    }
                                    <tr>
                                        <td colSpan='2'>
                                            <button className="btn btn-warning ms-2 w-100" onClick={ onClickUpdateAddress }>Update Address</button>
                                        </td>
                                    </tr>
                                </table>

                            </div>

                        </div>
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
