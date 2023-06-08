const axios = require('axios');

// var client_id = 'YOUR_CLIENT_ID';
// var client_secret = 'YOUR_CLIENT_SECRET';
// var query = "번역할 문장을 입력하세요.";

async function translateText(text: string) {
    const sourceLang = 'ko';
    const targetLang = 'en';

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            '',
            ''
        }
    };

    try {
        const response = await axios.post(
            'https://openapi.naver.com/v1/papago/n2mt',
            `source=${sourceLang}&target=${targetLang}&text=${encodeURIComponent(text)}`,
            config
        );

        console.log(response)
        const translatedText = response.data.message.result.translatedText;
        console.log(`Translated text: ${translatedText}`);
        return translatedText
    } catch (error) {
        console.error('Translation error:', error);
    }
}

export {
    translateText
}