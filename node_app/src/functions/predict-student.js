const { predictStudent } = require('../src/controllers/aI.controllers.js'); // Adjust the path as necessary

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            const body = JSON.parse(event.body);
            const result = await predictStudent(body);
            return {
                statusCode: 200,
                body: JSON.stringify(result),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
            };
        }
    }
    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
};
