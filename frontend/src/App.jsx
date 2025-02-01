import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function App() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!input) return;
        setLoading(true);
        setResponse("");

        try {
            const res = await axios.post("http://localhost:5000/generate", { prompt: input });
            setResponse(res.data.result);
        } catch (error) {
            setResponse("Error fetching response. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <motion.div 
                className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-center mb-4">AI Chatbot</h1>
                <textarea
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none"
                    placeholder="Ask OpenAI..."
                    rows="4"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                ></textarea>
                <button
                    className="w-full mt-3 p-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition duration-200"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Ask AI"}
                </button>
                {response && (
                    <motion.div 
                        className="mt-4 p-3 bg-gray-700 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="font-semibold">Response:</p>
                        <p>{response}</p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
