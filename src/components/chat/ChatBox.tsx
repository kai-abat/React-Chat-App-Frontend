import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hook/useFetchRecipientUser";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    messages,
    isMessagesLoading,
    sendTextMessage,
    notifications,
    updateCurrentChat,
  } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState<string>("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // if (!currentChat) return;
    // const scrollToBottom = () => {
    //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // };
    // console.log("executing scrollToBottom...");
    // scrollToBottom();
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentChat, notifications]);

  if (!user || !currentChat) return;

  // this message should display if
  // no selected user to chat or if we close the chatbox
  if (!recipientUser) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversion selected yet...
      </p>
    );
  }
  if (isMessagesLoading) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading Chat...</p>
    );
  }

  const handleEnterKeyPress = (event: KeyboardEvent) => {
    if (event.key == "Enter") {
      sendTextMessage(textMessage, user, currentChat?.id, setTextMessage);
      setTextMessage("");
    }
  };

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser.name}</strong>
        <strong className="chat-close" onClick={() => updateCurrentChat(null)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => {
            return (
              <Stack
                ref={messagesEndRef}
                key={index}
                className={`${
                  message.senderId === user.id
                    ? "message self align-self-end flex-grow-0"
                    : "message align-self-start flex-grow-0"
                }`}
              >
                <span>{message.text}</span>
                <span className="message-footer">
                  {moment(message.createdAt).calendar()}
                </span>
              </Stack>
            );
          })}
        {/* <div ref={messagesEndRef} /> */}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72,112,223,0.2)"
          shouldReturn
          shouldConvertEmojiToImage={false}
          onKeyDown={handleEnterKeyPress}
        />
        <button
          className="send-btn"
          onClick={() =>
            sendTextMessage(textMessage, user, currentChat?.id, setTextMessage)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
};
export default ChatBox;
