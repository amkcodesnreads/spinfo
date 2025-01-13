import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    Image,
    Alert,
    Platform
} from "react-native";
import axios from "axios";

export default class IssLocationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {}
        };
    }

    componentDidMount() {
        this.getIssLocation()
        try {
            setInterval(async () => {
                this.getIssLocation()
            }, 5000);
        } catch (e) {
            console.log(e);
        }
    }

    getIssLocation = () => {
        axios
            .get("https://api.wheretheiss.at/v1/satellites/25544")
            .then(response => {
                this.setState({ location: response.data })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    render() {
        if (Object.keys(this.state.location).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading...</Text>
                </View>
            )
        } else {
            return (
              
                            <View style={styles.infoContainer}>
                             <SafeAreaView style={styles.droidSafeArea} />
                    <Text style={styles.infoText}>Latitude: {this.state.location.latitude}</Text>
                    <Text style={styles.infoText}>Longitude: {this.state.location.longitude}</Text>
                    <Text style={styles.infoText}>Altitude (KM): {this.state.location.altitude}</Text>
                    <Text style={styles.infoText}>Velocity (KM/H): {this.state.location.velocity}</Text>
                </View>
                
            );
        }
    }
}

const styles = StyleSheet.create({
    infoContainer: {
        flex: 2,
        justifyContent: "center"
    },
    infoText: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        alignItems: "center",
        textAlign: "center"
    },
     droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});
