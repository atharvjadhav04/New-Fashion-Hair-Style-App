import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";

import AppScreen from "../../components/common/AppScreen";

import SearchBar from "../../components/services/SearchBar";
import CategoryChip from "../../components/services/CategoryChip";
import ServiceCard from "../../components/services/ServiceCard";

import { SERVICES } from "../../constants/DummyData";
import { COLORS, SPACING } from "../../theme";

const categories = [
    "All",
    "Hair",
    "Beard",
    "Face",
];

export default function ServicesScreen({ navigation }) {

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredServices = SERVICES.filter((service) => {

        const categoryMatch =
            selectedCategory === "All" ||
            service.category === selectedCategory;

        const searchMatch =
            service.marathi
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            service.name
                .toLowerCase()
                .includes(search.toLowerCase());

        return categoryMatch && searchMatch;

    });

    return (
        <AppScreen>

            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >

                <Text style={styles.title}>
                    सेवा
                </Text>

                <SearchBar
                    value={search}
                    onChangeText={setSearch}
                />

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categories}
                >
                    {categories.map((item) => (
                        <CategoryChip
                            key={item}
                            title={item}
                            active={selectedCategory === item}
                            onPress={() => setSelectedCategory(item)}
                        />
                    ))}
                </ScrollView>

                {filteredServices.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        onBook={() =>
                            navigation.navigate("BookingDetails")
                        }
                    />
                ))}

            </ScrollView>

        </AppScreen>
    );
}

const styles = StyleSheet.create({

    container: {
        padding: SPACING.lg,
        backgroundColor: COLORS.background,
        paddingBottom: 30,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 20,
        color: COLORS.black,
    },

    categories: {
        marginBottom: SPACING.lg,
    },

});