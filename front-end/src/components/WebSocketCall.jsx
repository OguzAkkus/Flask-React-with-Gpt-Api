import { useEffect, useState } from "react";

export default function WebSocketCall({ socket }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState("sw");

  const handleText = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage);
  };

  const handleSubmit = () => {
    if (!message) {
      return;
    }
    socket.emit("data", {selectedFunction,message});
    setMessage("");
  };
  const handleSelectChange = (e) => {
    setSelectedFunction(e.target.value);
  };

  useEffect(() => {
    socket.on("data", (data) => {
      setMessages([...messages, data.data]);
    });
    return () => {
      socket.off("data", () => {
        console.log("data event was removed");
      });
    };
  }, [socket, messages]);

  return (
    <div>
      <input type="text" placeholder="Enter a word" value={message} onChange={handleText} />
      <button type="submit" value="Geberate sentence" onClick={handleSubmit}>submit</button>
      <select name="functions" id="functions-select" onChange={handleSelectChange}>
          <option value="sw">Sentence from word</option>
          <option value="mw">Meaning of the word</option>
          <option value="ms">Meaning of the sentence</option>
      </select>

      <div className="massage">
        <ul>
            {messages.map((message, ind) => {
              return <li key={ind}>{message}</li>;
            })}
        </ul>
      </div>

    </div>
  );
}