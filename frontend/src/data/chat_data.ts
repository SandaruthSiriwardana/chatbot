// chat_data.ts

type Message = {
  role: "user" | "assistant";
  content: string;
};

const chatData: Message[] = [
  {
    role: "assistant",
    content: "Hello, how can I help you?",
  },
  {
    role: "user",
    content: "I have a coding question...",
  },
];

export default chatData;
