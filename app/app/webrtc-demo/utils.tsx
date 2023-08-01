import React from "react"
import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc"

registerGlobals()

let cameraCount = 0

export const getAvailableMediaDevices = async () => {
  try {
    const devices: any = await mediaDevices.enumerateDevices()

    devices.map((device) => {
      if (device.kind !== "videoinput") {
        return null
      }

      cameraCount = cameraCount + 1
    })
  } catch (err) {
    // Handle Error
    console.log("getAvailableMediaDevices", err)
  }
  return cameraCount
}

export const mediaConstraints = {
  audio: true,
  video: {
    frameRate: 30,
    facingMode: "user",
  },
}

let localMediaStream: MediaStream

export const getMediaStream = async () => {
  const isVoiceOnly = false

  try {
    const mediaStream = await mediaDevices.getUserMedia(mediaConstraints)

    if (isVoiceOnly) {
      let videoTrack = await mediaStream.getVideoTracks()[0]
      videoTrack.enabled = false
    }

    localMediaStream = mediaStream
  } catch (err) {
    // Handle Error
  }
  return localMediaStream
}

export const destroyMediaStream = () => {
  localMediaStream.getTracks().forEach((track) => track.stop())

  localMediaStream = null
}

// STUN and TURN server setup
const peerConstraints = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
}

//creating peer
let peerConnection = new RTCPeerConnection(peerConstraints)
// event listener
peerConnection.addEventListener("connectionstatechange", (event) => {})
peerConnection.addEventListener("icecandidate", (event) => {})
peerConnection.addEventListener("icecandidateerror", (event) => {})
peerConnection.addEventListener("iceconnectionstatechange", (event) => {})
peerConnection.addEventListener("icegatheringstatechange", (event) => {})
peerConnection.addEventListener("negotiationneeded", (event) => {})
peerConnection.addEventListener("signalingstatechange", (event) => {})
peerConnection.addEventListener("track", (event) => {})

//add media stream
localMediaStream.getTracks().forEach((track) => peerConnection.addTrack(track, localMediaStream))

//creating data channel
let datachannel = peerConnection.createDataChannel("my_channel")

datachannel.addEventListener("open", (event) => {})
datachannel.addEventListener("close", (event) => {})
datachannel.addEventListener("message", (message) => {})

// peerConnection.addEventListener( 'datachannel', event => {
// 	let datachannel = event.channel;

// 	// Now you've got the datachannel.
// 	// You can hookup and use the same events as above ^
// } );

let sessionConstraints = {
  mandatory: {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true,
    VoiceActivityDetection: true,
  },
}

let offer
export const createOffer = async () => {
  try {
    offer = await peerConnection.createOffer(sessionConstraints)
    await peerConnection.setLocalDescription(offer)

    // Send the offerDescription to the other participant.
  } catch (err) {
    // Handle Errors
  }
}

export const createAnswer = async () => {
  try {
    // Use the received offerDescription
    const offerDescription = new RTCSessionDescription(offer)
    await peerConnection.setRemoteDescription(offerDescription)

    const answerDescription = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answerDescription)

    // Send the answerDescription back as a response to the offerDescription.
  } catch (err) {
    // Handle Errors
  }
}

export const toggleMicrophone = async () => {
  let isMuted = false

  try {
    const audioTrack = await localMediaStream.getAudioTracks()[0]
    audioTrack.enabled = !audioTrack.enabled

    isMuted = !isMuted
  } catch (err) {
    // Handle Error
  }
}

export const toggleCamera = async () => {
  let isFrontCam = true

  try {
    // Taken from above, we don't want to flip if we don't have another camera.
    if (cameraCount < 2) {
      return
    }

    const videoTrack = await localMediaStream.getVideoTracks()[0]
    videoTrack._switchCamera()

    isFrontCam = !isFrontCam
  } catch (err) {
    // Handle Error
  }
}

const RTC = () => {
  return (
    <RTCView mirror={true} objectFit={"cover"} streamURL={localMediaStream.toURL()} zOrder={0} />
  )
}

export default RTC
