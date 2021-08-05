const Discord = require('discord.js');
const config = require('./config.json');

const fs = require('fs')

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.once('ready', () => {
	console.log('Bot is Ready!');
});

client.login(config.token);

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was een error while executing that Command!');
	}

});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);

	client.commands.set(command.name, command);
}


// Welcome Command

client.on('guildMemberAdd', async (member) => {

	let welcomeCh = member.guild.channels.cache.get(config.welcomeID)

	welcomeCh.send(`${member} joined the server!`)

}) 

// Message Delete

client.on('messageDelete', (message) => {

	let logCH = message.guild.channels.cache.get(config.welcomeID)

	logCH.send("A Admin" + ' Deleted \n the following Message :  \n \n ' + '`' + message.content + '\n`' + '\n Message From : ' + `${"<@" + message.author + ">"}`)

})

// Message Edit

client.on('messageUpdate', (oldMessage, newMessage , message) => {

	let logCH = newMessage.guild.channels.cache.get(config.welcomeID)

	logCH.send(`${"<@" + newMessage.author + ">"} ` + 'Updates his message from : \n \n ' + "`" + oldMessage.content + "` \n \n To : \n \n " + "`" + newMessage.content + "`")

})