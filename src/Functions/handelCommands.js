const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const clientId = 'your bot id'; 

const config = require("../../config.json")

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
    client.commandArray = [];
        for (folder of commandFolders) {
    const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../Commands/${folder}/${file}`);
            client.commands.set(command.data.name, command);
            client.commandArray.push(command.data.toJSON());
        }
    }

        const rest = new REST({
            version: '10'
        }).setToken(config.token);

        (async () => {
                  try {
                        console.log('(/) Started refreshing the application commands! (/)');

                          await rest.put(
                          Routes.applicationCommands(clientId), {
                          body: client.commandArray
                      },
                  );

                        console.log('(/) Successfully reloaded your application commands! (/)');
                             } catch (error) {
                             console.error(error);
                        }
           })();
    };
};