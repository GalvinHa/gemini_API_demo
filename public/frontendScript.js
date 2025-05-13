document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('submit');
    const geminiResponseContainer = document.getElementById('geminiResponse');
  
    btn.addEventListener('click', async () => {
        const inputText = document.getElementById("userInput");
        const userQuery = inputText.value.trim();
        
        if (!userQuery) {
            alert('Please enter a query');
            return;
        }
        
        // Show loading state
        geminiResponseContainer.innerHTML = '<p>Loading response from Gemini...</p>';
        
        try {
            // Use fetch to send the data to your backend
            const response = await fetch('/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userQuery }),
            });
  
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
  
            // Get the response text
            const data = await response.text();
            
            // Format the response with proper styling
            geminiResponseContainer.innerHTML = formatGeminiResponse(data);
  
        } catch (error) {
            console.error('Error during fetch:', error);
            geminiResponseContainer.innerHTML = '<p class="error">Error: ' + error.message + '</p>';
        }
    });
    
    // Function to format Gemini response with syntax highlighting
    function formatGeminiResponse(text) {
        // Simple markdown-like formatting
        // Format code blocks (text between triple backticks)
        let formattedText = text.replace(/```([\s\S]*?)```/g, function(match, code) {
            const language = code.split('\n')[0];
            const codeBody = language ? code.substring(language.length + 1) : code;
            return `<pre class="code-block"><code>${codeBody}</code></pre>`;
        });
        
        // Format bold text (text between double asterisks)
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Format italic text (text between single asterisks)
        formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Format paragraphs
        formattedText = formattedText.split('\n\n').map(para => {
            if (!para.trim()) return '';
            if (!para.startsWith('<pre') && !para.startsWith('<ul') && !para.startsWith('<ol')) {
                return `<p>${para}</p>`;
            }
            return para;
        }).join('');
        
        // Format numbered lists
        formattedText = formattedText.replace(/(\d+\.\s.*?)(?=\n\d+\.|\n\n|$)/g, '<li>$1</li>');
        formattedText = formattedText.replace(/<li>(.*?)<\/li>(\s*<li>.*?<\/li>)+/g, '<ol>$&</ol>');
        
        return formattedText;
    }
  });