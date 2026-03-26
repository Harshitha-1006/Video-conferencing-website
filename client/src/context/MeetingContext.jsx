import { createContext, useState } from "react"

export const MeetingContext = createContext()

export const MeetingProvider = ({ children }) => {

  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)
  const [participants, setParticipants] = useState([])

  const toggleMic = () => {
    setMicOn(!micOn)
  }

  const toggleCamera = () => {
    setCameraOn(!cameraOn)
  }

  const leaveRoom = () => {
    window.location.href = "/dashboard"
  }

  return (
    <MeetingContext.Provider
      value={{
        micOn,
        cameraOn,
        participants,
        setParticipants,
        toggleMic,
        toggleCamera,
        leaveRoom
      }}
    >
      {children}
    </MeetingContext.Provider>
  )
}