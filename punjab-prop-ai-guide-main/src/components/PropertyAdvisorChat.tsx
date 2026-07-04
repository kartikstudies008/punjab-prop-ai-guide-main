import * as React from "react";
import { MessageSquare, X, Send, Sparkles, Loader2, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  "Punjab stamp duty rates?",
  "Best sectors in Mohali?",
  "Is Kharar good for investment?",
  "What is RERA registration?"
];

export function PropertyAdvisorChat() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Sat Sri Akal! 🙏 I am your Punjab Property AI Advisor. Ask me anything about property prices, RERA, stamp duty, or the best investment locations in Punjab & Tricity!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes("stamp duty") || q.includes("registry") || q.includes("tax")) {
      return "In Punjab, stamp duty rates are generally **7%** for male buyers and **5%** for female buyers of the declared property value. There is also an additional 1% registration fee. Always factor these rates into your total purchase budget!";
    }
    
    if (q.includes("rera") || q.includes("law") || q.includes("registration")) {
      return "Punjab RERA (Real Estate Regulatory Authority) regulates the housing sector to ensure transparency. You should **always** verify a project's RERA registration ID on the official Punjab RERA website before putting down any booking amount to avoid legal issues.";
    }

    if (q.includes("mohali") || q.includes("aerocity") || q.includes("sector")) {
      return "Mohali is currently a high-growth hub! **Aerocity** and **IT City** (near airport) are premium spots with average rates of ₹5,500 - ₹8,000/sqft. For budget options, check out **Sector 125 / Sunny Enclave** where rates range between ₹3,500 - ₹4,800/sqft.";
    }

    if (q.includes("chandigarh") || q.includes("tricity")) {
      return "Chandigarh is highly premium with limited land supply. Prices are high, often starting at ₹8,000/sqft and exceeding ₹15,000/sqft in prime sectors (like Sectors 35, 15, 9). Construction is strictly governed, with Stilt+4 floors rules being a hot topic currently.";
    }

    if (q.includes("zirakpur") || q.includes("vip road")) {
      return "Zirakpur (bordering Chandigarh/Haryana) is popular for high-rise societies like VIP Road and Peer Muchalla. It offers great rental yields and prices range from ₹3,200 to ₹5,500 per sq ft. Very well-connected to Himachal and Delhi highways.";
    }

    if (q.includes("kharar") || q.includes("university")) {
      return "Kharar is a major educational and student hub (near Chandigarh University). It offers excellent rental demand for 1BHK/2BHK units. Average property rates are highly affordable: ₹2,500 - ₹3,800 per sq ft, making it a great entry point for investors.";
    }

    if (q.includes("ludhiana")) {
      return "Ludhiana is Punjab's industrial powerhouse. High-end residential zones like Sarabha Nagar, Pakhowal Road, and BRS Nagar command premium prices (₹4,000 - ₹8,000/sqft). Great commercial property potential here.";
    }

    if (q.includes("amritsar")) {
      return "Amritsar features strong tourism-driven real estate. Premium locales like Ranjit Avenue and Cantonment are popular. Property prices average ₹3,000 - ₹6,000/sqft, and boutique holiday home rentals are in high demand.";
    }

    if (q.includes("price") || q.includes("rent") || q.includes("cost")) {
      return "Property values in Punjab span from ₹20 Lakhs (budget flat in Kharar) to over ₹2 Crore (premium flat in Chandigarh/IT City Mohali). Average monthly rentals hover around ₹12,000 - ₹18,000 for standard 2BHK configurations, representing a solid 3% to 4.5% yield.";
    }

    if (q.includes("best") || q.includes("invest") || q.includes("where")) {
      return "If your goal is **rental income**, Kharar (student hub) and Zirakpur (commuter hub) are outstanding. If your goal is **capital appreciation**, Aerocity/IT City in Mohali or upcoming sectors along PR7 Ring Road are your best bets.";
    }

    return "I can help you with questions about Punjab property rates, stamp duty, RERA registrations, top sectors in Mohali/Chandigarh, and investment tips. Could you specify which city or topic you'd like to discuss?";
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString() + "-user",
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now().toString() + "-bot",
        sender: "bot",
        text: getAIResponse(textToSend),
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none ${
            isOpen 
              ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" 
              : "gold-gradient text-accent-foreground shadow-gold/30 hover:shadow-gold/40 border border-gold-light"
          }`}
          aria-label="Toggle chat advisor"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-40 w-[360px] h-[500px] md:w-[400px] md:h-[550px] bg-card/90 backdrop-blur-xl border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scale-in">
          {/* Header */}
          <div className="p-4 bg-primary text-primary-foreground border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight text-white">Punjab Prop AI Advisor</h3>
                <span className="text-[10px] text-primary-foreground/75 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online Assistant
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gold text-accent-foreground font-medium rounded-tr-none"
                      : "bg-card text-foreground border rounded-tl-none leading-relaxed"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="block text-[9px] text-muted-foreground/80 mt-1 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Typing Loader */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card text-foreground border rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gold" />
                  <span className="text-xs text-muted-foreground">Typing response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && (
            <div className="p-3 bg-muted/20 border-t border-b">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground block mb-2 px-1">
                Suggested Questions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="text-[11px] bg-card hover:bg-gold/10 hover:border-gold/50 hover:text-gold text-foreground border rounded-full px-2.5 py-1 text-left transition-all duration-300 font-medium"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 border-t bg-card flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about stamp duty, Mohali sectors, RERA..."
              className="flex-1 bg-secondary/35 text-sm text-foreground placeholder:text-muted-foreground border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:bg-card transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-xl gold-gradient text-accent-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
