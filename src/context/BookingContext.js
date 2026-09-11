import React, {
    createContext,
    useContext,
    useState,
} from "react";

const BookingContext = createContext();

const INITIAL_BOOKING = {
    services: [],

    // Customer's preferred booking option
    bookingType: "PREFERRED",

    barber: null,
    chair: null,

    // Customer requested time
    date: null,
    time: null,

    // Salon-confirmed time
    confirmedDate: null,
    confirmedTime: null,

    // Appointment lifecycle
    status: "DRAFT",

    // Queue information
    queueNumber: null,
    queuePosition: null,

    amount: 0,

    // Appointment information
    appointmentId: null,
    rescheduleCount: 0,
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
    const setAppointmentStatus = (status) => {
        setBooking((prev) => ({
            ...prev,
            status,
        }));
    };

    const setConfirmedAppointment = ({
        confirmedDate,
        confirmedTime,
        appointmentId = null,
    }) => {
        setBooking((prev) => ({
            ...prev,
            confirmedDate,
            confirmedTime,
            appointmentId,
            status: "CONFIRMED",
        }));
    };

    const rescheduleAppointment = ({
        confirmedDate,
        confirmedTime,
    }) => {
        setBooking((prev) => ({
            ...prev,
            confirmedDate,
            confirmedTime,
            status: "RESCHEDULED",
            rescheduleCount: prev.rescheduleCount + 1,
        }));
    };

    const setQueueDetails = ({
        queueNumber,
        queuePosition,
    }) => {
        setBooking((prev) => ({
            ...prev,
            queueNumber,
            queuePosition,
            status: "WAITING",
        }));
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

                setAppointmentStatus,
                setConfirmedAppointment,
                rescheduleAppointment,
                setQueueDetails,

                resetBooking,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export const useBooking = () =>
    useContext(BookingContext);