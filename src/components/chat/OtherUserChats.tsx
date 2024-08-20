import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

// Other user that has no chat history
const OtherUserChats = () => {
  const { user } = useContext(AuthContext);
  const { otherUsersChat, createChat, onlineUsers } = useContext(ChatContext);

  if (!user) return;

  return (
    <>
      <div className="all-users">
        {otherUsersChat &&
          otherUsersChat.map((u, index) => {
            return (
              <div
                className="single-user"
                key={index}
                onClick={() => createChat(user.id, u.id)}
              >
                {u.name}
                <span
                  className={`${
                    onlineUsers.some((olUser) => olUser.userId === u.id)
                      ? "user-online"
                      : ""
                  }`}
                ></span>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default OtherUserChats;
