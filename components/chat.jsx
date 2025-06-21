"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Bot, Loader2, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { z } from "zod";

import { answerQuestionWithContext } from "@/ai/flows/answer-question-with-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import personalData from "@/data/personal-data.json";
import { useToast } from "@/hooks/use-toast";
import { useUsageLimit } from "@/hooks/use-usage-limit";
import { cn } from "@/lib/utils";

const PERSONAL_CONTEXT = `
You are a personal AI assistant for ${personalData.name}.
Your goal is to answer questions about ${personalData.name} based on the information provided below.
Be friendly, engaging, and professional. Do not make up information.
If you don't know the answer or the question is not related to the provided data, politely say that you can only answer questions about ${personalData.name} based on the information you have.

Here is the information about ${personalData.name}:
---
${JSON.stringify(personalData, null, 2)}
---
`;
const DAILY_MESSAGE_LIMIT = 20;
const CHAT_HISTORY_KEY = 'chatHistory';

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

export function Chat() {
  const { toast } = useToast();
  const { count, limit, limitReached, increment } = useUsageLimit(DAILY_MESSAGE_LIMIT);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "What are his skills?",
    "Tell me about his projects",
    "What is his competitive programming experience?",
  ]);
  const scrollAreaRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    // Load messages from localStorage on mount
    try {
      const storedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([
          {
            role: "ai",
            content: `Hello! I'm an AI assistant for ${personalData.name}. Feel free to ask me anything about their skills, experience, or projects.`,
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to load messages from localStorage", error);
      setMessages([
        {
          role: "ai",
          content: `Hello! I'm an AI assistant for ${personalData.name}. Feel free to ask me anything about their skills, experience, or projects.`,
        },
      ]);
    }
  }, []); // Run only once on mount

  useEffect(() => {
    // Save messages to localStorage whenever they change
    if (messages.length > 0) {
      try {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save messages to localStorage", error);
      }
    }
  }, [messages]);

  useEffect(() => {
    if (limitReached && messages.length > 0 && messages[messages.length-1].content !== "You have reached your message limit for today. Please try again tomorrow.") {
        setMessages(prev => [
            ...prev,
            { role: 'ai', content: "You have reached your message limit for today. Please try again tomorrow." }
        ]);
    }
  }, [limitReached, messages]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (values) => {
    if (limitReached || loading) return;

    setSuggestedQuestions([]);
    const userMessage = { role: "user", content: values.message };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    form.reset();
    increment();

    // Create context from conversation history
    const conversationHistory = [...messages, userMessage]
      .map((msg) => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
      .join("\n");
    
    const fullContext = `${PERSONAL_CONTEXT}\n\nPrevious conversation:\n${conversationHistory}`;

    try {
      const response = await answerQuestionWithContext({
        context: fullContext,
        question: values.message,
      });

      const aiMessage = { 
        role: "ai", 
        content: response.answer,
        actions: response.actions || [] 
      };
      setMessages((prev) => [...prev, aiMessage]);
      setSuggestedQuestions(response.suggestedQuestions || []);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with the AI. Please try again later.",
      });
      // Rollback user message on error
      setMessages(prev => prev.slice(0, prev.length -1));
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedQuestionClick = (question) => {
    handleSendMessage({ message: question });
  };

  return (
    <Card className="w-full max-w-2xl h-[calc(84svh-45px)] flex flex-col shadow-2xl">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Chat about {personalData.name}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {count}/{limit} uses
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500",
                  message.role === "user" && "justify-end"
                )}
              >
                {message.role === "ai" && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-sm sm:max-w-md md:max-w-lg rounded-xl px-4 py-3 shadow",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                   {message.role === 'user' ? (
                     <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                   ) : (
                    <>
                      <div className="markdown-content text-sm text-secondary-foreground">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      {message.actions && message.actions.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 border-t border-secondary-foreground/20 pt-3">
                          {message.actions.map((action, i) => (
                            <Button
                              key={i}
                              variant="outline"
                              size="sm"
                              className="h-auto py-1.5 text-xs bg-background/20 hover:bg-background/40"
                              asChild
                            >
                              <a href={action.link} target="_blank" rel="noopener noreferrer">
                                {action.label}
                              </a>
                            </Button>
                          ))}
                        </div>
                      )}
                    </>
                   )}
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8 border">
                     <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {loading && (
                 <div className="flex items-start gap-4">
                    <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                    </Avatar>
                    <div className="bg-secondary text-secondary-foreground rounded-xl px-4 py-3 shadow flex items-center space-x-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-4 flex-col items-start gap-4">
        {suggestedQuestions.length > 0 && !loading && (
            <div className="w-full">
                <p className="text-xs text-muted-foreground mb-2">Suggestions</p>
                <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                    <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-1.5"
                    onClick={() => handleSuggestedQuestionClick(q)}
                    >
                    {q}
                    </Button>
                ))}
                </div>
            </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSendMessage)}
            className="flex w-full items-center space-x-2"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder={`Ask a question about ${personalData.name}...`}
                      {...field}
                      disabled={loading || limitReached}
                      autoComplete="off"
                      onChange={(e) => {
                        field.onChange(e);
                        if (suggestedQuestions.length > 0) {
                          setSuggestedQuestions([]);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" disabled={loading || limitReached}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
