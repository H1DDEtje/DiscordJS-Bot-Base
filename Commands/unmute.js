const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
	name: 'unmute',
	description: 'Unmutes a user',
	execute(message, args) {

        message.delete()
		
        if(!message.member.hasPermission("MUTE_MEMBERS")) {
            return message.reply(`\n You can't use that!`).then(
                msg => {
                    msg.delete({
                        timeout: 1000 * 5
                    })
                }
            )
        }
        
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!target) {
            return message.reply(`\n Please Mention the user that you want to Unmute.`).then(
                msg => {
                    msg.delete({
                        timeout: 1000 * 5
                    })
                }
            )
        }

        let reason = args.slice(1).join(" ");

        if(!reason) {
            reason = 'No Reason Provided'
        }

        let role = message.guild.roles.cache.get(config.muteID)

        if(!role) {

            message.reply('There has bin an error while executing this Command!')
            return;

        }

        if(!target.roles.cache.has(role.id)) {

            return message.reply(`This user is not muted`)

        } else {

            target.roles.remove(role).then(
                message.reply(`\n ${target} Has been Unmuted`)
            )

        }

	},
};