import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Modal } from "react-native";
import spaGame from '../constants/spaGame';
import SharedLayout from "./SharedLayout"

const { height } = Dimensions.get('window');

const SpaGame = () => {
    const [start, setStart] = useState(false);
    const [game, setGame] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [resultsVisible, setResultsVisible] = useState(false);

    const startGame = (card) => {
        if (card) {
            setSelectedTopic(card);
            setTimeout(() => setGame(true), 1000);
        }
    };

    const handleSelect = (option) => {
        selectedOptions.some((op) => op === option) ?
            setSelectedOptions(selectedOptions.filter((op) => op !== option))
            : setSelectedOptions((prev) => [...prev, option])
    };

    const handleRetry = () => {
        setGame(false);
        setSelectedTopic(null);
        setSelectedOptions([]);
        setResultsVisible(false);
    };

    const handleLeave = () => {
        setStart(false);
        setGame(false);
        setSelectedTopic(null);
        setSelectedOptions([]);
        setResultsVisible(false);
    }

    return (
        <SharedLayout menu={true} back={'1'}>
            <View style={styles.container}>

                {
                    (!start && !game) && (
                        <>
                            <Text style={styles.title}>Put together the perfect spa day</Text>

                            <Image source={require('../assets/decor/vacation.png')} style={styles.decor} />

                            <TouchableOpacity onPress={() => setStart(true)}>
                                <Image source={require('../assets/icons/start.png')} style={{width: height * 0.14, height: height * 0.14, resizeMode: 'contain'}} />
                            </TouchableOpacity>
                        </>
                    )
                }

                {
                    (start && !game) && (
                        <>
                            <Text style={[styles.title, {marginTop: height * 0.13, marginBottom: height * 0.17}]}>Select a card</Text>
                            <View style={{width: '100%', height: 143, flexDirection: 'row'}}>
                                {
                                    spaGame.map((card, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.topicCard, index !== 0 && { marginLeft: -130 }, selectedTopic === card && { transform: [{ translateY: -100 }] }]}
                                            onPress={() => startGame(card)}
                                        >
                                            <Image source={require('../assets/decor/vacation.png')} style={{width: 102, height: 83, resizeMode: 'contain'}} />
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </>
                    )
                }

                {
                    (start && game) && (
                        <>
                            <View style={[styles.topicCard, {width: 250, height: height * 0.2, alignSelf: 'center', borderWidth: 2, marginBottom: height > 700 ? height * 0.1 : height * 0.05}]}>
                                <Text style={styles.topic}>{selectedTopic.topic}</Text>
                            </View>

                            {
                                selectedTopic.options.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.optionBtn, selectedOptions.some((op) => op === option) && {backgroundColor: '#a5855d'}]}
                                        onPress={() => handleSelect(option)}
                                    >
                                        <Text style={styles.optionBtnText}>{option}</Text>
                                    </TouchableOpacity>
                                ))
                            }

                            <TouchableOpacity
                                style={[styles.btn, (selectedOptions.length !== 2) && { backgroundColor: '#696969' }]}
                                disabled={selectedOptions.length !== 2}
                                onPress={() => setResultsVisible(true)}
                            >
                                <Text style={[styles.btnText,(selectedOptions.length !== 2) && { color: 'rgba(255, 255, 255, 0.25)' }]}>Select</Text>
                            </TouchableOpacity>
                        </>
                    )
                }

                {
                    (selectedOptions.length === 2 && resultsVisible) && (
                        <Modal
                            animationType="fade"
                            transparent
                            visible={resultsVisible}
                            onRequestClose={() => setResultsVisible(false)}
                        >
                            <View style={styles.modalLayout}>
                                <View style={styles.modalContent}>

                                    <Image source={require('../assets/decor/vacation.png')} style={{ width: 210, height: 140, resizeMode: 'contain' }} />
                                    
                                    {
                                       selectedTopic.combo.find((c) => 
                                            Array.isArray(c.options) &&
                                            c.options.length === selectedOptions.length &&
                                            c.options.every((opt) => selectedOptions.includes(opt))
                                        ) && (
                                            <>
                                                <View style={{width: '100%'}}>
                                                    <Text style={styles.modalTitle}>
                                                        {selectedTopic.combo.find((c) =>
                                                        Array.isArray(c.options) &&
                                                        c.options.length === selectedOptions.length &&
                                                        c.options.every((opt) => selectedOptions.includes(opt))
                                                        ).text}
                                                    </Text>

                                                    <Text style={[styles.modalTitle, {fontSize: 45, marginBottom: 10}]}>
                                                        {selectedTopic.combo.find((c) =>
                                                        Array.isArray(c.options) &&
                                                        c.options.length === selectedOptions.length &&
                                                        c.options.every((opt) => selectedOptions.includes(opt))
                                                        ).match}
                                                    </Text>

                                                    <Text style={styles.modalText}>
                                                        {
                                                            selectedTopic.combo.find((c) =>
                                                                Array.isArray(c.options) &&
                                                                c.options.length === selectedOptions.length &&
                                                                c.options.every((opt) => selectedOptions.includes(opt))
                                                            ).options.join(" + ")
                                                        }
                                                    </Text>
                                                </View>
                                            </>
                                        )
                                    }

                                    <View style={styles.row}>
                                        <TouchableOpacity onPress={handleRetry}>
                                            <Image source={require('../assets/icons/retry.png')} style={{width: 63, height: 63, resizeMode: 'contain'}} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleLeave}>
                                            <Image source={require('../assets/icons/leave.png')} style={{width: 63, height: 63, resizeMode: 'contain'}} />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </Modal>
                    )
                }

            </View>
        </SharedLayout>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center'
    },

    title: {
        fontSize: 35,
        fontWeight: '900',
        color: '#a5855d',
        textAlign: 'center',
        marginVertical: height * 0.05
    },

    decor: {
        width: 295,
        height: 156,
        resizeMode: 'contain',
        marginBottom: height * 0.06,
        alignSelf: 'center'
    },

    topicCard: {
        width: 168,
        height: 143,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2d2d2d',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },

    topic: {
        fontSize: 25,
        fontWeight: '900',
        color: '#fff',
    },

    optionBtn: {
        width: '100%',
        padding: 19,
        borderRadius: 13,
        backgroundColor: '#2d2d2d',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2
    },

    optionBtnText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#fff'
    },

    btn: {
        width: '100%',
        padding: 15,
        borderRadius: 54,
        backgroundColor: '#a5855d',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        position: 'absolute',
        bottom: 130,
        alignSelf: 'center'
    },

    btnText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#fff'
    },

    modalLayout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    modalContent: {
        width: '90%',
        backgroundColor: '#2d2d2d',
        borderRadius: 25,
        padding: 33,
        alignItems: 'center'
    },

    modalTitle: {
        fontSize: 25,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center'
    },

    modalText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 24,
        textAlign: 'center'
    },

    row: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

});

export default SpaGame;