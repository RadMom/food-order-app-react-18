import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length == 5;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const cityInputRef = useRef();
    const postalCodeInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid,
        });

        const formIsValid =
            enteredCityIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCode;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode,
        });
    };

    const nameControlClasses = `${classes.control} ${
        formInputValidity.name ? "" : classes.invalid
    }`;
    const streetControlClasses = `${classes.control} ${
        formInputValidity.street ? "" : classes.invalid
    }`;
    const cityControlClasses = `${classes.control} ${
        formInputValidity.city ? "" : classes.invalid
    }`;
    const postalCodeControlClasses = `${classes.control} ${
        formInputValidity.postalCode ? "" : classes.invalid
    }`;

    return (
        <form
            className={classes.form}
            onSubmit={confirmHandler}
        >
            <div className={nameControlClasses}>
                <label htmlFor="name">Name</label>
                <input
                    ref={nameInputRef}
                    type="text"
                    id="name"
                />
                {!formInputValidity.name && <p>Please enter valid name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input
                    ref={streetInputRef}
                    type="text"
                    id="street"
                />
                {!formInputValidity.street && <p>Please enter valid street</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input
                    ref={cityInputRef}
                    type="text"
                    id="city"
                />
                {!formInputValidity.city && <p>Please enter valid city</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor="postal">Postal code</label>
                <input
                    ref={postalCodeInputRef}
                    type="text"
                    id="postal"
                />
                {!formInputValidity.postalCode && (
                    <p>Please enter valid postal code(5 chars long)</p>
                )}
            </div>
            <div className={classes.actions}>
                <button
                    type="button"
                    onClick={props.onCancel}
                >
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
