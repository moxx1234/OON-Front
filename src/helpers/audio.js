
export const convertBufferIntoAudio = async (buffer) => {
	const audioContext = new AudioContext()
	const decodedAudio = await audioContext.decodeAudioData(buffer)
	const audioBuffer = audioContext.createBuffer(1, decodedAudio.length, audioContext.sampleRate)
	audioBuffer.getChannelData(0).set(decodedAudio)
	const source = audioContext.createBufferSource()
	source.buffer = audioBuffer
	source.connect(audioContext.destination)
	source.start()
}