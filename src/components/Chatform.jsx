import React, { useRef } from 'react';

function ChatForm({ chatHistory ,setChatHistory,generateBotResponse }) {

    const inputRef = useRef();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const userMsg = inputRef.current.value.trim();
        if (!userMsg) return;

        inputRef.current.value = '';

        setChatHistory(history => [...history, { role: 'user', text: userMsg }]);

        setTimeout(() => {
            
          
            generateBotResponse([
              ...chatHistory,
              { role: 'user', text: userMsg }
            ]);
          }, 600);
          

       

        console.log(userMsg);
    };

    return (
        <>
            <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Message..."
                    className="message-input"
                    ref={inputRef}
                    required
                />
                <button type="submit" className="material-symbols-outlined">
                    arrow_upward
                </button>
            </form>
        </>
    );
}

export default ChatForm;
