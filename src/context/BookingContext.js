import React, {
    createContext,
    useContext,
    useState,
} from "react";

const BookingContext = createContext();

const INITIAL_BOOKING = {
    services: [],

    bookingType: "FASTEST",

    barber: null,
    chair: null,

    date: null,
    time: null,

    amount: 0,
};

export function BookingProvider({
    children,
}) {
    const [booking, setBooking] =
        useState(INITIAL_BOOKING);

    const updateBooking = (data) => {
        setBooking((prev) => ({
            ...prev,
            ...data,
        }));
    };

    const addService = (service) => {
        setBooking((prev) => {
            const alreadyAdded =
                prev.services.some(
                    (item) =>
                        item.id === service.id
                );

            if (alreadyAdded) {
                return prev;
            }

            const services = [
                ...prev.services,
                service,
            ];

            const amount = services.reduce(
                (total, item) =>
                    total +
                    Number(item.price || 0),
                0
            );

            return {
                ...prev,
                services,
                amount,
            };
        });
    };

    const removeService = (serviceId) => {
        setBooking((prev) => {
            const services =
                prev.services.filter(
                    (item) =>
                        item.id !== serviceId
                );

            const amount = services.reduce(
                (total, item) =>
                    total +
                    Number(item.price || 0),
                0
            );

            return {
                ...prev,
                services,
                amount,
            };
        });
    };

    const resetBooking = () => {
        setBooking({
            ...INITIAL_BOOKING,
            services: [],
        });
    };

    return (
        <BookingContext.Provider
            value={{
                booking,
                updateBooking,
                addService,
                removeService,
                resetBooking,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export const useBooking = () =>
    useContext(BookingContext);