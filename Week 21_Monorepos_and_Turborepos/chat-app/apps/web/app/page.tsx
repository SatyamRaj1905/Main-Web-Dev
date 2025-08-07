"use client"
import { TextInput } from "@repo/ui/text-input"
import { useRouter } from "next/navigation"

export default function Home(){
  const router = useRouter()
  return(
    <div style = {{
            height : "100vh",
            width : "100vw",
            background : "black",
            display : "flex",
            justifyContent : "center",
            alignItems : "center"
        }}>
      <TextInput placeholder="Room Name" size = "small"></TextInput>
      <button onClick={() => {
        router.push("/chat/123")
      }}>Join Room</button>
    </div>
  )
}