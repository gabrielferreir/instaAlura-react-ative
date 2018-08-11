import React, {Component} from 'react';
import {StyleSheet, Dimensions, FlatList, Platform, KeyboardAvoidingView} from 'react-native';
import Post from "./Post";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const width = Dimensions.get('screen').width;

type Props = {};
export default class App extends Component<Props> {
    constructor() {
        super()
        this.state = {
            fotos: []
        }
    }

    componentDidMount() {
        fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
            .then(res => res.json())
            .then(json => {
                const obj = {
                    urlPerfil: "https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/profile-photo-rafael.jpg",
                    loginUsuario: "rafael",
                    horario: "11/08/2018 13:55",
                    urlFoto: "https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/photo-1.jpg",
                    id: '5',
                    likeada: false,
                    likers: [],
                    comentarios: [{id: 1, texto: 'TEXTO'}],
                    comentario: "Legenda da foto"
                };
                const result = json.concat(obj);
                this.setState({fotos: result});
            })
            .catch(err => console.error)
    }


    render() {

        return (
                <FlatList
                    style={styles.list}
                    keyExtractor={item => 'key' + item.id}
                    data={this.state.fotos}
                    renderItem={({item}) =>
                        <Post foto={item}/>
                    }
                />
        );
    }
}

const margem = Platform.OS === 'ios' ? 20 : 0;

const styles = StyleSheet.create({
    list: {
        marginTop: margem
    }
});