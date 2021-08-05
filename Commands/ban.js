const Discord = require('discord.js')

module.exports = {
	name: 'ban',
	description: 'Bans the User from the Guild',
	execute(message, args) {

        message.delete()
		
        if(!message.member.hasPermission("BAN_MEMBERS")) {
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
            return message.reply(`\n Please Mention the user that you want to ban.`).then(
                msg => {
                    msg.delete({
                        timeout: 1000 * 5
                    })
                }
            )
        }

        if(target.hasPermission('ADMINISTRATOR')) {
            return message.reply(`You can't ban admins!`).then(
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

        target.ban({reason: reason}).catch(err => {if (err) return message.reply(`There has bin an error while executing this Command!`);
        }).then(message.channel.send(`${target} has been banned from the server!`))

	},
};