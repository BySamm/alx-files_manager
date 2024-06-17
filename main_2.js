import dbClient from './utils/db';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            await new Promise((res) => setTimeout(res, 1000)); // Properly awaiting setTimeout
            i += 1;
            if (i >= 10) {
                reject(new Error('Failed to connect after 10 attempts')); // Provide error message
            } else if (!dbClient.isAlive()) {
                repeatFct();
            } else {
                resolve();
            }
        };
        repeatFct();
    });
};

(async () => {
    try {
        console.log(dbClient.isAlive());
        await waitConnection();
        console.log(dbClient.isAlive());
        console.log(await dbClient.nbUsers());
        console.log(await dbClient.nbFiles());
    } catch (error) {
        console.error('Error:', error.message); // Catch and log errors
    }
})();

