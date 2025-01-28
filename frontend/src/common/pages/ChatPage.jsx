import Chat from "common/components/chat/Chat";
import ChatForm from "common/components/chat/ChatForm";
import SigninChatForm from "common/components/chat/SigninChatForm";

export default function ChatPage() {
  return (
    <>
      <h2>Chat Page</h2>
      <SigninChatForm />
      <ChatForm />
      <Chat />
    </>
  );
}
