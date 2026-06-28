import { ChatInput } from "@/components/Chat/ChatRoom/ChatInput";
import { ChatMessageList } from "@/components/Chat/ChatRoom/ChatMessageList";
import { ChatRoomHeader } from "@/components/Chat/ChatRoom/ChatRoomHeader";
import { style } from "@/style/pages/chatroom";
import { KeyboardAvoidingView, View } from "react-native";

export default function ChatRoom() {
  return (
    <>
      <ChatRoomHeader />
      <KeyboardAvoidingView behavior="padding" style={style.container}>
        <View style={{ height: "85%" }}>
          <ChatMessageList />
        </View>
        <ChatInput />
      </KeyboardAvoidingView>
    </>
  );
}
