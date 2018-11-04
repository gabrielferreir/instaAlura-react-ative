import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            foto: this.props.foto
        }
    }

    carregaIcone(likeada) {
        return likeada ? require('../icons/heart.png') : require('../icons/heart-flat.png');
    }

    like() {
        const {foto} = this.state;
        let novaLista = [];
        if (!foto.likeada) {

            novaLista = [
                ...foto.likers,
                {login: 'Meu usuario'}
            ];

        } else {
            novaLista = foto.likers.filter(liker => liker.login !== 'Meu usuario');
        }

        const fotoAtualizada = {
            ...foto,
            likeada: !foto.likeada,
            likers: novaLista
        };
        this.setState({foto: fotoAtualizada});
    }

    coment() {
        if (!this.state.foto.currentComent)
            return;

        this.currentComent.clear();

        const newListComentarios = [
            ...this.state.foto.comentarios,
            {id: Math.random(), texto: this.state.foto.currentComent}
        ];

        this.setState({
            foto: {
                ...this.state.foto,
                comentarios: newListComentarios,
                currentComent: ''
            }
        });
    }

    exibeLikers(likers) {
        if (likers.length <= 0)
            return;

        return (
            <Text style={styles.textLike}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        )
    };

    exibeLegenda(info) {
        if (!info.comentario)
            return;

        return (
            <View style={styles.comentarios}>
                <Text style={styles.comentariosText}>{info.loginUsuario}</Text>
                <Text>{info.comentario}</Text>
            </View>
        );
    }

    render() {
        const {foto} = this.state;

        return (
            <View style={{borderBottomWidth: 1, borderBottomColor: '#DDD' }}>

                <View style={{margin: 10, flexDirection: 'row', alignItems: 'center' }}>

                    <Image source={{uri: this.props.foto.urlPerfil}}
                           style={{marginRight: 10, width: 40, height: 40, borderRadius: 20}}/>

                    <Text>{this.props.foto.loginUsuario}</Text>

                </View>

                <Image source={{uri: this.props.foto.urlFoto}}
                       style={{width: width, height: width}}/>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.like.bind(this)}>
                        <Image style={styles.like}
                               source={this.carregaIcone(foto.likeada)}/>
                    </TouchableOpacity>

                    {this.exibeLikers(foto.likers)}

                    {this.exibeLegenda(foto)}

                    {foto.comentarios.map(comentario =>
                        <View style={styles.comentarios} key={comentario.id}>
                            <Text style={styles.comentariosText}>{this.props.foto.loginUsuario}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}

                    <View style={styles.comentariosCard}>
                        <TextInput
                            ref={input => this.currentComent = input}
                            onChangeText={texto => this.setState({foto: {...this.state.foto, currentComent: texto}})}
                            style={styles.input} placeholder="Adicione um comentario..."/>

                        <TouchableOpacity onPress={this.coment.bind(this)}>
                            <Image style={styles.iconComentario} source={require('../icons/send.png')}/>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        padding: 8
    },
    like: {
        marginLeft: 16
    },
    textLike: {
        marginTop: 8,
        fontWeight: 'bold'
    },
    comentarios: {
        flexDirection: 'row',
    },
    comentariosText: {
        fontWeight: 'bold',
        marginRight: 8
    },
    input: {
        marginTop: 8,
        height: 48,
        flex: 1,
        marginRight: 8
    },
    comentariosCard: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconComentario: {
        width: 32,
        height: 32
    }
});
