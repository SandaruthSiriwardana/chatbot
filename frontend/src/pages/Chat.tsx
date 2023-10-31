import React, { useState, useRef } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import red from "@mui/material/colors/red";
import { IoMdSend } from "react-icons/io";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>U</Avatar>
      <Box>
        <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
      </Box>
    </Box>
  );
};

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatContainerRef = useRef(null); // Create a ref for the chat container

  // Function to add a dummy response from the assistant
  const addAssistantResponse = () => {
    const assistantMessage: Message = {
      role: "assistant",
      content: "This is Chad Llama",
    };
    setChatMessages((prev) => [...prev, assistantMessage]);
  };

  // Initial message from the assistant
  // This message is displayed when the user visits the chat
  const initialAssistantMessage: Message = {
    role: "assistant",
    content: "Hi, I am a banking chatbot. How can I help you today?",
  };

  // Display the initial message from the assistant when the component is mounted
  useState(() => {
    setChatMessages([initialAssistantMessage]);
  }, []);

  const handleSubmit = () => {
    if (newMessage.trim() !== "") {
      const userMessage: Message = { role: "user", content: newMessage };
      setChatMessages((prev) => [...prev, userMessage]);
      setNewMessage(""); // Clear the input field
      // Add a dummy response from the assistant
      addAssistantResponse();

      // Scroll to the last message
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }
  };

  const handleDeleteChats = () => {
    // Set the chat messages to include only the initial assistant message
    setChatMessages([initialAssistantMessage]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            A
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 0.8,
          flexDirection: "column",
          px: 3,
        }}
      >
        <Box
          ref={chatContainerRef} // Attach the ref to the container
          sx={{
            width: "100%",
            height: "70vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>

        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                // Add a new line character
                setNewMessage((prev) => prev + "\n");
              } else if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent the default Enter key behavior
                handleSubmit(); // Send the message
              }
            }}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px", // Reduce padding for better appearance
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
              minHeight: "50px", // Adjust the minimum height to accommodate the text
            }}
            placeholder="Type your message..."
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );

};

export default Chat;
