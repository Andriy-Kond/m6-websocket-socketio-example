import { chat, userMessage, yourMessage } from "./Chat.styled";

export default function Chat({ messages = [] }) {
  console.log("Chat >> messages:::", messages);
  const elements = messages.map(({ id, type, message }) => {
    const className = type === "your" ? yourMessage : userMessage;

    return (
      <p key={id} className={className}>
        {message}
      </p>
    );
  });

  return (
    <>
      <h2>Chat</h2>

      <div className={chat}>{elements}</div>
    </>
  );
}
