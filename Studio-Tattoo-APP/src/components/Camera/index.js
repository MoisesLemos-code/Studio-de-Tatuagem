import React, { useState, useEffect, useRef } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen(props) {
	const camRef = useRef(null);
	const [modo, setModo] = useState(Camera.Constants.Type.back);
	const [temPermissao, setTemPermissao] = useState(null);
	const [fotoCapturada, setFotoCapturada] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setTemPermissao(status === 'granted');
		})();
		(async () => {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			setTemPermissao(status === 'granted');
		})();
	}, []);

	if (temPermissao === null) {
		return <View />;
	}
	if (temPermissao === false) {
		return <Text> Acesso negado! </Text>;
	}

	async function tirarFoto() {
		if (camRef) {
			const options = { quality: 0.5, base64: true };
			const data = await camRef.current.takePictureAsync(options);
			setFotoCapturada(data.uri);
			setModalVisible(true);
		}
	}

	async function salvarFoto() {
		props.capturarFoto(fotoCapturada)
	}

	async function salvarFotoGaleria() {
		const asset = await MediaLibrary.createAssetAsync(fotoCapturada)
			.then(() => {
				Alert.alert(
					"Mensagem",
					"Foto salva na galeria com sucesso!",
					[
						{ text: "OK" }
					],
					{ cancelable: false }
				)
			})
			.catch(error => {
				console.log('err: ', error)
				Alert.alert(
					"Falha!",
					"Não foi possível salvar a foto!",
					[
						{ text: "OK" }
					],
					{ cancelable: false }
				)
			})
	}

	return (
		<SafeAreaView style={styles.container}>
			<Camera
				style={styles.camera}
				type={modo}
				ref={camRef}
			>
				<View style={styles.boxCamera}>
					<TouchableOpacity style={styles.btnVoltar}
						onPress={() => props.voltar()}
					>
						<FontAwesome name="chevron-circle-left" size={30} color="#FFF" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.btnTrocar}
						onPress={() => {
							setModo(
								modo === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							)
						}}
					>
						<FontAwesome5 name="redo" size={30} color="#FFF" />
					</TouchableOpacity>
				</View>
			</Camera>

			<TouchableOpacity style={styles.btnFoto} onPress={tirarFoto}>
				<FontAwesome name="camera" size={30} color="#FFF" />
			</TouchableOpacity>

			{fotoCapturada &&
				<Modal
					animationType="slide"
					transparent={false}
					visible={modalVisible}
				>
					<View style={styles.containerFoto}>
						<Image
							style={styles.containerFotoImagem}
							source={{ uri: fotoCapturada }}
						/>
						<View style={styles.containerFotoBtnBox}>
							<TouchableOpacity
								onPress={() => setModalVisible(false)}>
								<FontAwesome name="chevron-circle-left" size={50} color="#121212" />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={salvarFoto}>
								<FontAwesome5 name="save" size={50} color="#121212" />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={salvarFotoGaleria}>
								<FontAwesome5 name="images" size={50} color="#121212" />
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			}

		</SafeAreaView>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
	},
	boxCamera: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'row'
	},
	btnVoltar: {
		position: 'absolute',
		bottom: 20,
		left: 20,
	},
	btnTrocar: {
		position: 'absolute',
		bottom: 20,
		right: 20,
	},
	btnFoto: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#121212',
		margin: 20,
		borderRadius: 10,
		height: 50,
	},
	containerFoto: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 20
	},
	containerFotoBtnBox: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		margin: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	containerFotoImagem: {
		width: '100%',
		height: '70%',
		borderRadius: 20
	}
});