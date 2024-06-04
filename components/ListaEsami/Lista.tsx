import React from 'react';
import { Text, View, Modal, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { primary_color, rapportoOrizzontale, rapportoVerticale, secondary_color, tertiary_color } from '../../global';
import Esame from './Esame';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencil, faTimes, faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface EsameItem {
    nome: string,
    corso: string,
    tipologia: string,
    image: any,
    voto: string | null,
    CFU: number,
    data: Date,
    profEsame: string | null,
    ora: string,
    luogo: string,
    diario: string | null,
    lode: boolean,
    categoria: string[]
}

type ListaProps = {
    esami: EsameItem[],
    tema: boolean,
    setModalVisible: (text: string) => void,
    modalVisible: string,
    naviga: (esame:string) => void,
    delete: (esame: string) => void,
    children: React.ReactNode | undefined,
}

const Lista = (props: ListaProps) => {

    const Bottoni = (btnProps: {esame:string}) => (
        <View style={style.bottoniContainer}>
            <TouchableOpacity style={style.eliminaContainer} onPress={() => props.delete(btnProps.esame)} >
                <FontAwesomeIcon icon={faTrashCan} style={style.elimina} size={30} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.naviga(btnProps.esame)} style={style.modificaContainer}>
                <FontAwesomeIcon icon={faPencil} style={style.modifica} size={30} />
            </TouchableOpacity>
        </View>
    )
    const itemSeparator = () => <View style={style.separator}></View>;

    return (
        <>
            <SwipeListView
                ListHeaderComponent={props.children ? <>{props.children}</> : null}
                data={props.esami}
                renderItem={(item) => <Esame item={item.item} diario={(text: string) => props.setModalVisible(text)} tema={props.tema} />}
                ItemSeparatorComponent={itemSeparator}
                keyExtractor={(e) => e.nome}
                style={{ backgroundColor: primary_color(props.tema) }}
                leftOpenValue={75}
                stopLeftSwipe={90}
                rightOpenValue={-75}
                stopRightSwipe={-90}
                renderHiddenItem={(data) => (<Bottoni esame={data.item.nome} />)}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.modalVisible !== ''}
                onRequestClose={() => props.setModalVisible('')}
            >
                <Pressable android_disableSound={true} android_ripple={{ color: 'transparent' }} onPress={() => props.setModalVisible('')} style={[style.modalContainer, { backgroundColor: primary_color(props.tema) + 'd0' }]}>
                    <Pressable style={[style.modalContent, { backgroundColor: primary_color(props.tema) }]}>
                        <Text style={[style.modalTitle, { color: props.tema ? 'white' : 'black' }]}>Diario</Text>
                        <TouchableOpacity style={[style.closeButton, props.tema ? { borderColor: 'red', borderWidth: 2 } : { backgroundColor: 'red' }]} onPress={() => props.setModalVisible('')}>
                            <FontAwesomeIcon icon={faTimes} style={{ color: props.tema ? 'red' : 'white' }} />
                        </TouchableOpacity>
                        <Text
                            style={[style.text, { color: tertiary_color(props.tema) }]}
                        >{props.modalVisible}</Text>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}
const style = StyleSheet.create({
    bottoniContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    eliminaContainer: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '100%',
    },
    elimina: {
        color: 'white',
    },
    modificaContainer: {
        backgroundColor: 'darkgray',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '100%',
    },
    modifica: {
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        maxWidth: 250,
        width: '80%'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
        top: rapportoVerticale(10),
        left: rapportoOrizzontale(10),
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: secondary_color,

    },
    text: {
        marginTop: rapportoVerticale(25),
        width: '100%',
        maxWidth: rapportoOrizzontale(200),
        height: rapportoVerticale(100),
        borderColor: secondary_color,
        borderWidth: 1,
        borderRadius: 5,
        padding: rapportoOrizzontale(10),
        marginBottom: rapportoVerticale(10),
        textAlignVertical: 'top',
    },
    closeButton: {
        position: 'absolute',
        top: rapportoVerticale(10),
        right: rapportoOrizzontale(10),
        width: rapportoOrizzontale(25),
        height: rapportoOrizzontale(25),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    
});


export default Lista