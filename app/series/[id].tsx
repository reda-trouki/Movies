import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, StatusBar, Pressable, FlatList, ScrollView } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { getMovies } from '@/utils/getMovies'; // Assume this fetches TV series data
import { Ionicons } from '@expo/vector-icons';
import BackButton from '@/components/BackButton';
import { getCredits } from '@/utils/getCredits';
import Credit from '@/components/Credit';

const URL = 'https://api.themoviedb.org/3/tv';

export default function SerieDetails() {
    const { id } = useLocalSearchParams();
    const [series, setSeries] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [casts, setCasts] = React.useState([]);

    React.useEffect(() => {
        const fetchSeriesDetails = async () => {
            try {
                // Fetch TV series details by its ID
                const data = await getMovies(1,`${URL}/${id}`, "tv");
                if (data) {
                    setSeries(data);
                } else {
                    setError('TV series not found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchCast = async () => {
            try {
                const data = await getCredits(`${URL}/${id}/credits`);
                setCasts(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchSeriesDetails();
        fetchCast();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Error: {error}</Text>
            </View>
        );
    }

    if (!series) {
        return (
            <View style={styles.container}>
                <Text>No TV series data found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <ImageBackground
                style={styles.backgroundImage}
                source={{ uri: `https://image.tmdb.org/t/p/w500${series.backdrop_path}` }}
            >
                <View style={styles.header}>
                    <BackButton />
                    <Pressable style={{ width: 50 }}>
                        <Ionicons name="ellipsis-horizontal" color={'white'} size={40} />
                    </Pressable>
                </View>
                <View style={styles.playButtonContainer}>
                    <Ionicons name="play-circle" color="rgba(255,255,255,0.7)" size={100} />
                </View>
            </ImageBackground>
            <ScrollView style={styles.mainContent}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{series.name}</Text>
                    <Ionicons name="bookmark-outline" size={30} />
                </View>
                <Text style={styles.rating}>
                    <Ionicons name="star" color="gold" size={14} />
                    {series.vote_average}/10 IMDB
                </Text>
                <View style={styles.genresContainer}>
                    {series.genres.map((genre) => (
                        <Text key={genre.id} style={styles.genre}>
                            {genre.name}
                        </Text>
                    ))}
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>First Air Date</Text>
                        <Text style={styles.detailValue}>{series.first_air_date}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Last Air Date</Text>
                        <Text style={styles.detailValue}>{series.last_air_date}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Seasons</Text>
                        <Text style={styles.detailValue}>{series.number_of_seasons}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Episodes</Text>
                        <Text style={styles.detailValue}>{series.number_of_episodes}</Text>
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionLabel}>Description</Text>
                    <Text style={styles.descriptionText}>{series.overview ? series.overview : "no descreption provided !!" }</Text>
                </View>
                <View style={styles.networksContainer}>
                    <Text style={styles.descriptionLabel}>Networks</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {series.networks.map((network) => (
                            <Text key={network.id} style={styles.network}>
                                {network.name}
                            </Text>
                        ))}
                    </View>
                </View>
                <View>
                    <Text style={styles.descriptionLabel}>Cast</Text>
                    <FlatList
                        horizontal
                        data={casts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Credit cast={item} />
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        paddingTop: StatusBar.currentHeight,
        flex: 0.5,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    playButtonContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContent: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -100,
        padding: 20,
    },
    title: {
        width: '92%',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 14,
    },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 14,
    },
    genre: {
        fontSize: 10,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#D9EAFD',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    error: {
        fontSize: 14,
        color: 'red',
        textAlign: 'center',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailItem: {
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 12,
        color: '#000',
        fontWeight: 'bold',
    },
    descriptionContainer: {
        marginTop: 10,
    },
    descriptionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 12,
        color: '#666',
        lineHeight: 20,
        textAlign: 'justify',
    },
    networksContainer: {
        marginTop: 10,
    },
    network: {
        fontSize: 12,
        color: '#000',
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
});