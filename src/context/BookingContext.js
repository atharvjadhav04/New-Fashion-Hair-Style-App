import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {

    const [booking, setBooking] = useState({
        service: null,
        bookingType: "FASTEST",
        barber: null,
        chair: null,
        date: null,
        time: null,
        amount: 0,
    });

    const updateBooking = (data) => {
        setBooking(prev => ({
            ...prev,
            ...data,
        }));
    };

    const resetBooking = () => {
        setBooking({
            service: null,
            bookingType: "FASTEST",
            barber: null,
            chair: null,
            date: null,
            time: null,
            amount: 0,
        });
    };

    return (
        <BookingContext.Provider
            value={{
                booking,
                updateBooking,
                resetBooking,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export const useBooking = () => useContext(BookingContext);
