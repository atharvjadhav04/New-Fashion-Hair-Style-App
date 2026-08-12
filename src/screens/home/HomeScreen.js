import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import AppScreen from "../../components/common/AppScreen";

import HeroBanner from "../../components/home/HeroBanner";
import AppointmentCard from "../../components/home/AppointmentCard";
import LiveQueueCard from "../../components/home/LiveQueueCard";
import BookNowCard from "../../components/home/BookNowCard";
import SectionTitle from "../../components/home/SectionTitle";
import PopularServiceCard from "../../components/home/PopularServiceCard";

import { SERVICES } from "../../constants/DummyData";
import { COLORS, SPACING } from "../../theme";

export default function HomeScreen({ navigation }) {
    return (
        <AppScreen>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <HeroBanner />

                <AppointmentCard />

                <LiveQueueCard
                    barberName="Rajesh"
                    chairNumber={2}
                    currentToken={14}
                    yourToken={18}
                    estimatedMinutes={20}
                />

                <BookNowCard
                    onPress={() => navigation.navigate("Services")}
                />

                <SectionTitle title="Popular Services" />

                {SERVICES.slice(0, 3).map((service) => (
                    <PopularServiceCard
                        key={service.id}
                        name={service.marathi}
                        price={service.price}
                    />
                ))}
            </ScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: SPACING.lg,
        paddingBottom: 40,
        backgroundColor: COLORS.background,
    },
});