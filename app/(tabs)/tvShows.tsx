import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Template from '@/components/template'
import Header from '@/components/Header'
import { getMovies } from '@/utils/getMovies';
import Movie from '@/components/Movie';

const URL = 'https://api.themoviedb.org/3/discover/tv';

export default function tvShows() {
    const [movies, setMovies] = React.useState([]);

    React.useEffect(() => {
        getMovies(-1, URL).then((data) => {
            setMovies(data);
        });
    }, []);

    return (
        <Template>
            <Header title="Tv Shows" />
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.content}>
                    {movies?.map((m) => (
                        <Movie title='tv' id={m.id} key={m.id} image={m.poster_path} />
                    ))}
                </ScrollView>
            </View>
        </Template>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
});