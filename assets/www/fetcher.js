// fetcher.js

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const messageTextInput = document.getElementById('messageText');
    const messageAccountInput = document.getElementById('messageAccount');
    const cookie = document.getElementById('currentCookie');
    const currenturl = document.getElementById('currentUrl');
    console.log("this is from the fetcher "+  cookie);
    sendButton.addEventListener('click', async () => {
        const messageText = messageTextInput.value.trim();
        const messageAccount = messageAccountInput.value.trim();
        const cookieValue = cookie.textContent;
        const url = currenturl.textContent;
        console.log("this is from the fetcher URL: "+  url);
        const match = url.match(/\/ask\/(\d+)\//);

        let aid = null;
        if (match) {
        aid = match[1];
        console.log(aid); // 18809414
        } 

        console.log("this is from the fetcher AID: "+  aid);

        if (!messageText || !messageAccount) {
            alert('Please fill in both fields!');
            return;
        }

        try {
            const response = await fetch('https://patient-earwig-current.ngrok-free.app/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messageText: messageText,
                    messageAccount: messageAccount,
                    cookieValue: cookieValue,
                    aid: aid
                })
            });

            let dataText = '';
            try {
                dataText = await response.text();
            } catch (e) {
                dataText = 'Could not read response body';
            }

            if (!response.ok) {
                throw new Error(`HTTP ${response.status} - ${dataText}`);
            }

            alert('Message sent! Response:\n' + dataText);

        } catch (error) {
            // Show everything we can inside the alert
            let fullError = `Error: ${error.message || error}\n`;
            if (error.stack) fullError += `Stack: ${error.stack}\n`;
            alert(fullError);
        }
    });
});
