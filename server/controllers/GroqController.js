const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const groq = require('../utils/groqAi.js');

module.exports.buildWorkout = async (req, res, next) => {
    try { 
        const { prompt } = req.body;

        const messages = [
            { 
                role: "system", 
                content: process.env.SYSTEM_PROMPT
            },
            {
                role: "user",
                content: prompt
            },
        ];

        // Call Groq API using the SDK
        const response = await groq.chat.completions.create({
            messages: messages,
            model: "llama3-8b-8192",
            temperature: 0.7,
        });

        // Send the AI response back to the client
        res.status(200).json({
            success: true,
            response: response.choices[0].message.content, 
        });

    } catch (error) {
        console.error('Error calling Groq API:', error);
        res.status(500).json({ error: 'Failed to fetch response from Groq AI' });
    }
};
