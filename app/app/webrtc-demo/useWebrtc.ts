import { useEffect, useRef, useState } from "react"
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
  MediaStream,
} from "react-native-webrtc"
import SocketIOClient from "socket.io-client"

const offerOptions = {
  mandatory: {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true,
    VoiceActivityDetection: true,
  },
}

type IType = "JOIN" | "INCOMING_CALL" | "OUTGOING_CALL" | "WEBRTC_ROOM"

export const useWebRTC = () => {
  const [localStream, setLocalStream] = useState<MediaStream>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream>(null)
  const [localMicOn, setLocalMicOn] = useState(true)
  const [localWebcamOn, setLocalWebcamOn] = useState(true)
  const [type, setType] = useState<IType>("WEBRTC_ROOM")

  const otherUserId = useRef(null)
  const remoteRTCMessage = useRef(null)

  const socket = SocketIOClient("http://192.168.2.201:3500", {
    transports: ["websocket"],
    query: {
      callerId: 123,
    },
  })

  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        {
          urls: "stun:stun1.l.google.com:19302",
        },
        {
          urls: "stun:stun2.l.google.com:19302",
        },
      ],
    }),
  )

  useEffect(() => {
    socket.on("newCall", (data) => {
      remoteRTCMessage.current = data.rtcMessage
      otherUserId.current = data.callerId
      setType("INCOMING_CALL")
    })

    socket.on("callAnswered", (data) => {
      remoteRTCMessage.current = data.rtcMessage
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current),
      )
      setType("WEBRTC_ROOM")
    })

    socket.on("ICEcandidate", (data) => {
      const message = data.rtcMessage

      if (peerConnection.current) {
        peerConnection.current
          .addIceCandidate(
            new RTCIceCandidate({
              candidate: message.candidate,
              sdpMid: message.id,
              sdpMLineIndex: message.label,
            }),
          )
          .then((data) => {
            console.log("SUCCESS", data)
          })
          .catch((err) => {
            console.log("Error", err)
          })
      }
    })

    const isFront = true

    mediaDevices.enumerateDevices().then((sourceInfos: any[]) => {
      let videoSourceId: number
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i]
        if (
          sourceInfo.kind === "videoinput" &&
          sourceInfo.facing === (isFront ? "user" : "environment")
        ) {
          videoSourceId = sourceInfo.deviceId
        }
      }

      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? "user" : "environment",
            optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
          },
        })
        .then((stream) => {
          // Got stream!

          setLocalStream(stream)

          // setup stream listening
          // peerConnection.current.addStream(stream)
        })
        .catch((error) => {
          console.log("getUserMedia Error", error)
        })
    })

    peerConnection.current.onaddstream = (event: any) => {
      setRemoteStream(event.stream)
    }

    // Setup ice handling
    peerConnection.current.onicecandidate = (event: any) => {
      if (event.candidate) {
        sendICEcandidate({
          calleeId: otherUserId.current,
          rtcMessage: {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          },
        })
      } else {
        console.log("End of candidates.")
      }
    }

    return () => {
      socket.off("newCall")
      socket.off("callAnswered")
      socket.off("ICEcandidate")
    }
  }, [])

  function sendICEcandidate(data) {
    socket.emit("ICEcandidate", data)
  }

  async function processCall() {
    const sessionDescription = await peerConnection.current.createOffer(offerOptions)
    await peerConnection.current.setLocalDescription(sessionDescription)
    sendCall({
      calleeId: otherUserId.current,
      rtcMessage: sessionDescription,
    })
  }

  async function processAccept() {
    peerConnection.current.setRemoteDescription(new RTCSessionDescription(remoteRTCMessage.current))
    const sessionDescription = await peerConnection.current.createAnswer()
    await peerConnection.current.setLocalDescription(sessionDescription)
    answerCall({
      callerId: otherUserId.current,
      rtcMessage: sessionDescription,
    })
  }

  function answerCall(data) {
    socket.emit("answerCall", data)
  }

  function sendCall(data) {
    socket.emit("call", data)
  }

  function switchCamera() {
    localStream.getVideoTracks().forEach((track) => {
      track._switchCamera()
    })
  }

  function toggleCamera() {
    localWebcamOn ? setLocalWebcamOn(false) : setLocalWebcamOn(true)
    localStream.getVideoTracks().forEach((track) => {
      localWebcamOn ? (track.enabled = false) : (track.enabled = true)
    })
  }

  function toggleMic() {
    localMicOn ? setLocalMicOn(false) : setLocalMicOn(true)
    localStream.getAudioTracks().forEach((track) => {
      localMicOn ? (track.enabled = false) : (track.enabled = true)
    })
  }

  function leave() {
    peerConnection.current.close()
    setLocalStream(null)
    setType("JOIN")
  }

  return {
    otherUserId,
    localStream,
    remoteStream,
    type,
    setType,
    processCall,
    processAccept,
    switchCamera,
    toggleCamera,
    toggleMic,
    leave,
    localWebcamOn,
    localMicOn,
  }
}
