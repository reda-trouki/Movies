import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import Template from '@/components/template';
import { getMovies } from '@/utils/getMovies';
import Movie from '@/components/Movie';

const URL = 'https://api.themoviedb.org/3/discover/movie';

export default function Movies() {
    const [movies, setMovies] = React.useState([]);

    React.useEffect(() => {
        getMovies(-1, URL).then((data) => {
            setMovies(data);
        });
    }, []);

    return (
        <Template>
            <Header title="Movies" />
            <View style={{flex:1}}>
            <ScrollView contentContainerStyle={styles.content}>
                {movies?.map((m) => (
                    <Movie key={m.id} image={m.poster_path} />
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