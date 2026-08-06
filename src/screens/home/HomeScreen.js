import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
} from "react-native";

import HeroBanner from "../../components/home/HeroBanner";
import SectionTitle from "../../components/home/SectionTitle";
import PopularServiceCard from "../../components/home/PopularServiceCard";
import QuickActionCard from "../../components/home/QuickActionCard";
import LiveQueueCard from "../../components/home/LiveQueueCard";
import { SERVICES } from "../../constants/DummyData";

import {
    COLORS,
    SPACING,
} from "../../theme";

export default function HomeScreen() {
    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <HeroBanner />
            <QuickActionCard
                title="Book Appointment"
                subtitle="Reserve your next salon visit."
                buttonText="Book Now"
                onPress={() => { }}
            />

            <LiveQueueCard />

            <SectionTitle
                title="लोकप्रिय सेवा"
            />

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {SERVICES.map((service) => (
                    <PopularServiceCard
                        key={service.id}
                        name={service.name}
                        price={service.price}
                    />
                ))}
            </ScrollView>

            <View style={{ height: 40 }} />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.lg,
    },
});