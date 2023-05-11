import {FlatList, StyleSheet, Text, View} from "react-native";
import {WHITE} from "../colors";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import PostList from "../components/PostList";

const ListScreen = () => {
    const {top} = useSafeAreaInsets()

    return (
        <View style={[styles.container, {paddingTop: top}]}>
            <PostList isMyPost={false}/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})

export default ListScreen;
