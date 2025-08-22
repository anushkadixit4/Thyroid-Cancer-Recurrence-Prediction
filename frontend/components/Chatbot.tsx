"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PredictionModal from "@/components/PredictionForm";
import { AnimatePresence, motion } from "framer-motion";

// Message types for our chat
const MESSAGE_TYPES = {
  SYSTEM: "system",
  USER: "user",
  BOT: "bot",
  RESULT: "result",
  QUICK_REPLY: "quick_reply",
};

// Simulated LLM response (replace with real API call in production)
const simulateLLMResponse = (userMessage, userName = "") => {
  const lowerMsg = userMessage.toLowerCase().trim();
  if (lowerMsg.includes("start assessment")) {
    return "Great! Let's begin your thyroid cancer recurrence assessment. I'll need some details via the assessment form. Ready when you are!";
  } else if (lowerMsg.includes("what is thyroid cancer")) {
    return "Thyroid cancer is a condition where cells in the thyroid gland grow abnormally. It’s often treatable, especially when caught early. Want to know more or start an assessment?";
  } else if (lowerMsg.includes("how accurate")) {
    return "This tool uses medical data and AI to estimate recurrence risk, but it’s a guide, not a diagnosis. Consult your doctor for certainty. What else can I help with?";
  } else if (lowerMsg.includes("tell me more")) {
    return "I can provide info on the assessment process, risk factors, or thyroid cancer basics. What specifically interests you? Or we can start your assessment!";
  } else if (!userName && !lowerMsg.includes("start")) {
    return "Nice to meet you! Please tell me your name to personalize this, or ask anything to get started!";
  } else {
    return `I'm here to assist, ${userName || "friend"}! I can answer questions about thyroid cancer, the assessment process, or start an evaluation. What would you like to explore?`;
  }
};

export default function ChatbotInterface() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [currentStage, setCurrentStage] = useState("greeting");
  const [modalOpen, setModalOpen] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-focus input field
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  // Enhanced scroll to bottom function
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Improved scroll handling with useEffect dependencies
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Enhanced initial greeting when component mounts
  useEffect(() => {
    const initialGreeting = {
      type: MESSAGE_TYPES.BOT,
      content: "👋 Hello! I'm your AI thyroid health assistant. Tell me your name or ask me anything to get started!",
      timestamp: new Date(),
    };
    setMessages([initialGreeting]);
  }, []);

  // Handle send message with dynamic response
  const handleSendMessage = (messageOverride = null) => {
    const message = messageOverride || inputMessage;
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = {
      type: MESSAGE_TYPES.USER,
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setShowQuickReplies(false);

    // Process message
    let responseContent = simulateLLMResponse(message, userName);
    if (message.toLowerCase().includes("start assessment")) {
      setTimeout(() => {
        const botResponse = {
          type: MESSAGE_TYPES.BOT,
          content: responseContent,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setTimeout(() => {
          const startButtonMessage = {
            type: MESSAGE_TYPES.SYSTEM,
            content: "startAssessment",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, startButtonMessage]);
          setIsTyping(false);
          setShowQuickReplies(true);
        }, 800);
      }, 1000);
    } else if (!userName && !message.toLowerCase().includes("start")) {
      setTimeout(() => {
        const botResponse = {
          type: MESSAGE_TYPES.BOT,
          content: responseContent,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
        setShowQuickReplies(true);
      }, 1000);
    } else {
      setTimeout(() => {
        const botResponse = {
          type: MESSAGE_TYPES.BOT,
          content: responseContent,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
        setShowQuickReplies(true);
      }, 1000);
    }

    if (!userName && !message.toLowerCase().includes("start")) {
      setUserName(message); // Treat input as name if no name set and not a start command
      setCurrentStage("post_name");
    } else if (message.toLowerCase().includes("start assessment")) {
      setCurrentStage("post_assessment");
    } else {
      setCurrentStage("questioning");
    }

    setInputMessage("");
  };

  // Enhanced quick reply handler
  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    setTimeout(() => handleSendMessage(reply), 100);
  };

  // Get appropriate quick replies for current stage
  const getCurrentQuickReplies = () => {
    switch (currentStage) {
      case "greeting":
        return ["What is thyroid cancer?", "How accurate is this test?", "Start assessment"];
      case "post_name":
        return ["Start my assessment", "Tell me about the process", "What information do you need?"];
      case "post_assessment":
        return ["Explain my results", "What should I do next?", "Start new assessment"];
      case "questioning":
        return ["Tell me more", "Start assessment", "What else can you do?"];
      default:
        return ["Ask a different question", "Start assessment", "Tell me more"];
    }
  };

  const handleStartAssessment = () => {
    setModalOpen(true);
    setShowQuickReplies(false);

    const assessmentMessage = {
      type: MESSAGE_TYPES.BOT,
      content: "🏥 Let’s gather your medical history for an accurate assessment. Please fill out the form.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assessmentMessage]);
  };

  const handlePredictionSubmit = (data) => {
    const fixedPredictionResult = {
      ...data.predictionResult,
      recurrence_probability: data.predictionResult.recurrence_prediction ? 
        Math.max(0.01, data.predictionResult.recurrence_probability) : 
        data.predictionResult.recurrence_probability
    };

    setPredictionResult(fixedPredictionResult);
    setModalOpen(false);
    setIsTyping(true);
    setCurrentStage("post_assessment");

    const completionMessage = {
      type: MESSAGE_TYPES.BOT,
      content: "✅ Thanks for your input! I’ve analyzed your risk factors.",
      timestamp: new Date(),
    };

    const resultProbability = (fixedPredictionResult.recurrence_probability * 100).toFixed(2);
    const isHighRisk = fixedPredictionResult.recurrence_prediction;

    const resultMessage = {
      type: MESSAGE_TYPES.RESULT,
      content: {
        prediction: isHighRisk ? "Positive" : "Negative",
        probability: resultProbability,
        isHighRisk: isHighRisk,
      },
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, completionMessage, resultMessage]);

    if (data.groqResponse) {
      setTimeout(() => {
        const introRecommendation = {
          type: MESSAGE_TYPES.BOT,
          content: "📋 Based on your assessment, here are some recommendations:",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, introRecommendation]);

        const formattedResponses = processAIResponseForChat(data.groqResponse);
        formattedResponses.forEach((message, index) => {
          setTimeout(() => {
            setMessages((prev) => [...prev, {
              type: MESSAGE_TYPES.BOT,
              content: message,
              timestamp: new Date(),
            }]);
            if (index === formattedResponses.length - 1) {
              setTimeout(() => {
                const finalMessage = {
                  type: MESSAGE_TYPES.BOT,
                  content: `💬 Any questions, ${userName || "friend"}? I can explain more!`,
                  timestamp: new Date(),
                };
                setMessages(prev => [...prev, finalMessage]);
                setIsTyping(false);
                setShowQuickReplies(true);
              }, 800);
            }
          }, 1000 + (index * 1200));
        });
      }, 1500);
    } else {
      setIsTyping(false);
      setShowQuickReplies(true);
    }
  };

  const processAIResponseForChat = (response) => {
    if (!response) return [];
    let cleanedResponse = response
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/#{1,6}\s/g, "")
      .replace(/\n\n+/g, "\n\n");
    const paragraphs = cleanedResponse.split(/\n\n+/);
    const messages = [];
    let currentMessage = "";
    paragraphs.forEach(paragraph => {
      if (paragraph.trim().match(/^[-*]\s/) || paragraph.trim().match(/^\d+\.\s/)) {
        paragraph = paragraph.replace(/^[-*]\s+/gm, "• ").replace(/^\d+\.\s+/gm, "• ");
      }
      if (currentMessage.length + paragraph.length > 200 && currentMessage.length > 0) {
        messages.push(currentMessage.trim());
        currentMessage = paragraph;
      } else {
        if (currentMessage.length > 0) currentMessage += "\n\n";
        currentMessage += paragraph;
      }
    });
    if (currentMessage.length > 0) messages.push(currentMessage.trim());
    return messages;
  };

  const renderMessage = (message) => {
    switch (message.type) {
      case MESSAGE_TYPES.USER:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-end mb-4"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg py-3 px-4 max-w-[80%] shadow-md">
              {message.content}
            </div>
          </motion.div>
        );
      case MESSAGE_TYPES.BOT:
        return (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex mb-4"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
              <span role="img" aria-label="bot icon" className="text-lg">🤖</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg py-3 px-4 max-w-[80%] shadow-sm">
              {message.content}
            </div>
          </motion.div>
        );
      case MESSAGE_TYPES.SYSTEM:
        if (message.content === "startAssessment") {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center mb-4"
            >
              <Button
                onClick={handleStartAssessment}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all duration-300 hover:scale-105 text-white font-medium px-6 py-2"
              >
                🎯 Start Assessment
              </Button>
            </motion.div>
          );
        }
        return null;
      case MESSAGE_TYPES.RESULT:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex mb-4"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
              <span role="img" aria-label="bot icon" className="text-lg">🤖</span>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg py-4 px-5 max-w-[80%] shadow-lg">
              <div className="font-semibold mb-3 text-gray-800 flex items-center">
                📊 Your Assessment Results:
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm border">
                  <span className="font-medium">Recurrence Prediction:</span>
                  <span className={`font-bold px-3 py-1 rounded-full text-sm ${message.content.isHighRisk ? "text-red-700 bg-red-100" : "text-green-700 bg-green-100"}`}>
                    {message.content.prediction}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm border">
                  <span className="font-medium">Confidence Level:</span>
                  <span className="font-bold text-blue-700">{message.content.probability}%</span>
                </div>
                {parseFloat(message.content.probability) < 5 && message.content.isHighRisk && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="text-sm text-yellow-800">
                      ⚠️ <strong>Note:</strong> Low confidence with positive prediction suggests consulting your doctor.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const renderQuickReplies = () => {
    if (!showQuickReplies || isTyping) return null;
    const replies = getCurrentQuickReplies();
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap gap-2 mb-4 px-4"
      >
        {replies.map((reply, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleQuickReply(reply)}
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-sm transition-all duration-200 hover:scale-105 shadow-sm"
          >
            {reply}
          </motion.button>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 border-b rounded-t-lg shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-center text-white flex items-center justify-center gap-2">
          🏥 Thyroid Cancer Recurrence Assistant
        </h1>
        <p className="text-blue-100 text-sm text-center mt-1">AI-powered risk assessment tool</p>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100"
        style={{ height: "calc(100vh - 180px)" }}
      >
        <div className="max-w-full mx-auto space-y-1">
          <AnimatePresence>
            {messages.map((message, index) => (
              <div key={index}>{renderMessage(message)}</div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex mb-4"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mr-3 flex-shrink-0">
                <span role="img" aria-label="bot icon" className="text-lg">🤖</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg py-3 px-4 shadow-sm">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                </div>
              </div>
            </motion.div>
          )}

          {renderQuickReplies()}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="rounded-b-lg border-t border-gray-200 p-4 bg-white shadow-lg sticky bottom-0">
        <div className="flex gap-3">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={userName ? `Ask me anything, ${userName}...` : "Type a message..."}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 shadow-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            disabled={isTyping}
          />
          <Button
            onClick={() => handleSendMessage()}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md transition-all duration-200 hover:scale-105 px-6"
            disabled={isTyping || !inputMessage.trim()}
          >
            {isTyping ? "..." : "Send"}
          </Button>
        </div>
      </div>

      {modalOpen && (
        <PredictionModal
          ref={modalRef}
          onSubmit={handlePredictionSubmit}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}