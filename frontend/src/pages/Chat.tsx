import React, { useState, useRef, useEffect } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import red from "@mui/material/colors/red";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import {
  getUserChats,
  sendChatRequest,
  deleteUserChats,
} from "../helpers/api-communicator";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ChatItem = ({
  content,
  role,
  onThumbsUp,
  onThumbsDown,
  isFirstMessage,
}: {
  content: string;
  role: "user" | "assistant";
  onThumbsUp: () => void;
  onThumbsDown: () => void;
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
        <img src="logo.png" alt="openai" width={"45px"} />
      </Avatar>
      <Box>
        <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        <Button variant="contained" onClick={onThumbsUp} style={{ backgroundColor: "transparent",boxShadow: "none",fontSize: "24px"}}>
          👍
        </Button>
        <Button variant="contained" onClick={onThumbsDown}style={{ backgroundColor: "transparent",boxShadow: "none",fontSize: "24px" }}>
          👎
        </Button>
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
  const [language, setLanguage] = useState<string>("English"); // Default language is English
  const chatContainerRef = useRef(null); // Create a ref for the chat container

  useEffect(() => {
    // Fetch user chats and append to chatMessages
    const fetchChatHistory = async () => {
      try {
        const chatHistory = await getUserChats();

        // console.log(chatHistory);

        // Create an array of messages from chatHistory
        const chatMessagesFromHistory = chatHistory.chats.map((message) => ({
          role: message.role,
          content: message.content,
        }));

        // console.log(chatHistory);

        // Add the initial assistant message to the beginning
        const initialAssistantMessage: Message = {
          role: "assistant",
          content: "Hi, I am a banking chatbot. How can I help you today?",
        };

        setChatMessages([initialAssistantMessage, ...chatMessagesFromHistory]);

        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      } catch (error) {
        console.error("Error fetching chat history: ", error);
      }
    };

    fetchChatHistory();
  }, []);

  const handleDeleteChats = async () => {
    try {
      await deleteUserChats();
      const initialAssistantMessage: Message = {
        role: "assistant",
        content: "Hi, I am a banking chatbot. How can I help you today?",
      };
      setChatMessages([initialAssistantMessage]);
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    } catch (error) {
      console.error("Error deleting chats: ", error);
    }
  };

  const handleSubmit = async () => {
    if (newMessage.trim() !== "") {
      const userMessage: Message = { role: "user", content: newMessage };
      setChatMessages((prev) => [...prev, userMessage]);
      setNewMessage("");

      // Send user's message to the backend and get a response
      try {
        const response = await sendChatRequest(newMessage, language);
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
        };
        setChatMessages((prev) => [...prev, assistantMessage]);

        // Scroll to the last message
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      } catch (error) {
        console.error("Error sending chat request: ", error);
      }
    }
  };

  const handleThumbsUp = () => {
    // Handle the thumbs up action (e.g., send feedback to your backend)
  };

  const handleThumbsDown = () => {
    // Handle the thumbs down action (e.g., send feedback to your backend)
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
          <Typography
            sx={{ mx: "auto", fontFamily: "work sans", my: 0.25, px: 3 }}
          >
            Hello I am BotMora, your personal banking assistant.
          </Typography>
          <Typography
            sx={{ mx: "auto", fontFamily: "work sans", my: 3, px: 3 }}
          >
            Looking for an AI-powered assistant to help with anything you need?
            Our lightning-fast chatbot is here to provide accurate answers and
            valuable insights. Experience the power of AI today!
          </Typography>

          {/* put a drop down with three options English, Tamil and Sinhala */}
          <Typography
            sx={{ mx: "auto", fontFamily: "work sans", my: 1, px: 3 }}
          >
            Select your language
          </Typography>
          <select
            style={{
              width: "60%",
              height: "30px",
              borderRadius: 3,
              alignSelf: "center",
              my: 3,
              px: 3,
              fontSize: 16,
              backgroundColor: "rgb(17,29,39)",
              color: "white",
              fontFamily: "work sans"
            }}
            onChange={(e) => {
              setLanguage(e.target.value);
              axios.defaults.headers.common["Accept-Language"] =
                e.target.value;
            }}
          >
            <option value="English" style={{fontFamily:"work sans"}}>English</option>
            <option value="Tamil" style={{fontFamily:"work sans"}}>Tamil</option>
            <option value="Sinhala" style={{fontFamily:"work sans"}}>Sinhala</option>
          </select>
        </Box>
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
            <ChatItem
              content={chat.content}
              role={chat.role}
              key={index}
              onThumbsUp={handleThumbsUp} // Pass the thumbs up action handler
              onThumbsDown={handleThumbsDown} // Pass the thumbs down action handler
            />
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
