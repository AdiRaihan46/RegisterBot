const { Client } = require("discord.js");
const db = require("quick.db");
const bot = new Client();
const prefix = "YOUR PREFIX"; //PREFIX BOT KAMU
const got = require("got")
const fetch = require("node-fetch")
const ms = require('ms');
const token = "YOUR TOKEN"; // TOKEN BOT KAMU

const welcome = require("./welcome");

bot.on("ready", () => {
  console.log(`${bot.user.username} Sudah Online - Reedit Richo`);

  bot.user.setActivity(`${prefix}help | Manado Roleplay Indonesia`, {
      type: "PLAYING"
    })
    .catch(console.error);
});

bot.on("message", message => {
  if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

    if (message.mentions.has(bot.user.id)) {
        message.channel.send(`\nMy prefix for \`${message.guild.name}\` is \`${prefix}\` Type \`${prefix}help\` for help | Gb Team Development`);
    };
  
    // checks if the message author is afk
    if (db.has(message.author.id + '.afk')) {
        message.reply("Oh you're back ! i removed your afk")
        db.delete(message.author.id + '.afk')
        db.delete(message.author.id + '.messageafk')
    }
    if (message.content.includes('>afk')) {
        message.member.setNickname(`[AFK] ${message.author.username}`).catch(error => message.channel.send("You're AFK Now"));
        // then here you use the database :
        db.set(message.author.id + '.afk', 'true')
        db.set(message.author.id + '.messageafk', message.content.split(' ').slice(2))

        // I made .slice(2) so that in the message array it also delete the command and the "start-afk"
    }
    if (message.content.includes('>endafk')) {
        message.member.setNickname('').catch(error => message.channel.send("Couldn't update your nickname."));
        // Here you delete it
        db.delete(message.author.id + '.afk')
        db.delete(message.author.id + '.messageafk')
    }
  
  message.mentions.users.forEach(user =>{
  if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;
if(db.has(user.id + '.afk')) message.channel.send(`${message.author}, the user you mentioned is currently AFK.. Leave a message if urgent by DMing him`)
})
  
  if (message.content.startsWith(">kick ")) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    if (message.mentions.members.first()) {
        message.mentions.members.first.kick().then((member) => {
            message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
        }).catch(() => {
            message.channel.send("I do not have permissions to do this");
        });
    }
}else if (message.content.startsWith(">ban ")) {
   if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    if (message.mentions.members.first()) {
        message.mentions.members.first.ban().then((member) => {
            message.channel.send(":wave: " + member.displayName + " has been successfully banned :point_right: ");
        }).catch(() => {
            message.channel.send("I do not have permissions to do this");
        });
    }
}
  
  if(message.author.bot || message.channel.type === "dm") return;

  let args = message.content.substring(prefix.length).split(" ");
  if (!message.content.startsWith(prefix)) return;
  switch (args[0]) {
    
    case "register":
      if (message.channel.type == "dm")
        return message.channel.send("Kamu tidak bisa registrasi dari DM");
      const shifter = args.shift();
      if (!args.length)
        return message.channel.send("Mohon berikan nama untuk di set");
      const nick = " " + args.join(" ");
      if (nick.length > 32)
        return message.channel.send("Nickname terlalu panjang, mohon berikan yang lebih singkat"
        );
      if (message.channel.id !== "874215023130591232")
        return message.channel.send("**You Can't Register Here!**,Gak Bisa Basa Inggris? Nih Gua Terjemahin `(kamu tidak bisa register disini)` Gb Team Development"
        );
      try {
        message.member.roles.add("874205886128726016"); //Role Yang Mau DiSet
        message.member.setNickname(nick);
        return message.reply("**✅Accept** ,Terimakasih Telah Register");
      } catch (e) {
        
        return message.channel.send("Ada sebuah kesalahan disaat melaksanakan command.");
      }
      break;

    case "uptime":
      {
        if (message.channel.send.type == "dm");
        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

        const { MessageEmbed } = require("discord.js");
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("⏰__**Uptime**__")
          .setDescription(`**${days}d ${hours}h ${minutes}m ${seconds}s**`)
          .setFooter(`${bot.user.username}`)
          .setTimestamp(new Date());

        message.channel.send(embed);
      }
      break;

    case "ping": {
        const { MessageEmbed } = require("discord.js");
        const embed = new MessageEmbed()
          .addField(
            "⌛ Latency",
            `**${message.createdTimestamp - message.createdTimestamp}ms**`)
          .addField("💓 API", `**${Math.floor(bot.ws.ping)}ms**`)
          .setAuthor(message.author.username, message.author.displayAvatarURL)
          .setColor("RANDOM")
          .setTimestamp();
        message.channel.send(embed);
      }
      break;
      
    case "web": {
      const { MessageEmbed } = require("discord.js")
      const reportEmbed = new MessageEmbed()
        .setAuthor(`Website Manado Roleplay`, message.author.avatarURL())
        .setTimestamp(new Date())
        .setFooter(`${bot.user.username}`)
        .setDescription(`[Click To Website](https://mrpteam.glitch.me)`);

    return message.channel.send(reportEmbed);
    }
      break;
      
    case "Halo": {
    let text = args.join(' ');
    if (!text) return message.channel.send('Please provide a text you want me to say.');
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

    message.channel.send(text);
    message.delete();
  }
      break;
      
    case "Info":{
    let text = args.join(' ');
    if (!text) return message.channel.send('You don\'t provide any arguments for me to say in embed message!');
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

    let { MessageEmbed } = require("discord.js");
    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(bot.user.username, bot.user.displayAvatarURL())
      .setDescription(text) // Di sini argumen user yang diambil diletakkan
      .setFooter(`By ${message.author.tag}`)
      .setTimestamp(new Date());

    message.channel.send(embed);
    message.delete();
  }
      break;
      
      case "report": {
 let user = message.mentions.users.first()
    if (!user) return message.channel.send('Silahkan Tag Player Yg Akan Direport')

    let reason = args.slice(1).join(" ")
    if (!reason) return message.channel.send("Silahkan Masukan Alasan Anda")

    let Avatar = user.displayAvatarURL();
    let Channel = message.guild.channels.cache.find((ch) => ch.name === "⛔report-player❗ooc❗"); //masukan channel report
    if (!Channel) return message.channel.send("Channel Report Eror,Silahkan Tag Moderator/Bot Handle Untuk Dibenarkan");

    const { MessageEmbed } = require("discord.js")
    const embed = new MessageEmbed()
    .setTitle('New Report!')
    .setDescription(`Player \`${message.author.tag}\` Telah Mereport Player \`${user.tag}\`!`)
    .setColor("RED")
    .setThumbnail(Avatar)
    .addFields(
        { name: "Member ID", value: `${message.author.id}`, inline: true},
        { name: "Member Tag", value: `${message.author.tag}`, inline: true},
        { name: "Reported ID", value: `${user.id}`, inline: true},
        { name: "Reported Tag", value: `${user.tag}`, inline: true},
        { name: "Reason", value: `${reason}`, inline: true}
    )
    Channel.send(embed)
    message.channel.send('Terimakasih Telah Mereport,Tunggu Hingga Kami Respon!')

}
      break
      
      case "botsleep": {
      if(message.author.id != "745923074179989605") return message.channel.send("You're the bot the owner!")

    try {
         return message.channel.send("Bot is shutting down...")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
      }
      break;
      
    case "reload": {
      if(message.author.id != "745923074179989605") return message.channel.send("You're the bot the owner!")

    if(!args[0]) return message.channel.send("Please provide a command to reload!")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`)

}
      break;
      
    case "serverinfo": {
      const ServerLogo = message.guild.iconURL();
            const { MessageEmbed } = require("discord.js")
            const ServerInfoEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Server Info")
                .setImage(ServerLogo)
                .setDescription(`About **${message.guild}**`)
                .addField("**Date Created**", `Server Created on **${message.guild.createdAt.toLocaleString()}**`)
                .addField("**Owner**", `The Owner of This Server is ${message.guild.owner}`)
                .addField("**Member Count**", "This Server Has ` " + `${message.guild.memberCount}` + " ` **Members**")
                .addField("**Emoji Count**", "This Server Has ` " + `${message.guild.emojis.cache.size}` + " ` **Emojis**")
                .addField("**Roles Count**", "This Server Has ` " + `${message.guild.roles.cache.size}` + " ` **Roles**")
                .addField("**AFK Channel**", "This AFK Channel ` " + `${message.guild.afkChannelID}` + " ` **Channel**")
                .addField("**Location**", "This Location ` " + `${message.guild.region}` + " ` **Location**")
                .addField("**Channels Count**", "This Server Has ` " + `${message.guild.channels.cache.size}` + " ` **Channels**")
                .addField("**Server Logo**", "**Downlaod Server Logo**")
                .setURL(ServerLogo)
                .setFooter(`Request By ${message.author.tag}`)
                .setTimestamp(new Date());
            message.channel.send(ServerInfoEmbed)
        }
      break;
      
    case "userinfo": {
     const { MessageEmbed } = require("discord.js")
      const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Server Info")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
    .addField("**Username:**", `${message.author.username}`, true)
    .addField("**Discriminator:**", `${message.author.discriminator}`, true)
    .addField("**ID:**", `${message.author.id}`, true)
    .addField("**Status:**", `${message.author.presence.status}`, true)
    .addField("**Created At:**", `${message.author.createdAt}`, true)
    .setFooter(`ManadoRp | Team Bot`, bot.user.displayAvatarURL);

    message.channel.send(embed);
}
      break;
      
    case "meme": {
      const { MessageEmbed } = require("discord.js")
      const embed = new MessageEmbed();
	got('https://www.reddit.com/r/memes/random/.json')
		.then(response => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;

			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setColor('RANDOM');
			embed.setImage(memeImage);
			embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

			message.channel.send(embed);
		})
		.catch(console.error);
};
      break;
      
    case "tweet": {
      fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${args.join(' ')}`)
        .then((res) => res.json())
        .then((data) => {
            const { MessageEmbed } = require("discord.js")
            const embed = new MessageEmbed()
            .setTitle("Tweet!")
            .setImage(data.message)
            .setTimestamp()
            message.channel.send(embed)
        })
    }
      break;
      
    case "sm": {
      if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("You don't have enough perms to use this command!")
        }
        let duration = args[0]
        if(isNaN(duration)) return message.reply("Please give the time in seconds.")
        let reason = args.slice(1).join(" ")
        if(!reason) return message.reply("Please specify a reason!")
        
        message.channel.setRateLimitPerUser(duration, reason)
        message.reply(`Successfully set the slowmode to ${duration} seconds with Reason - ${reason}`)
    }
      break;
      
    case "nuked": {
      message.channel.send('Proses Nuked 1-5 Menit....')
.then((msg)=> {
  setTimeout(function(){
    msg.edit('Anda Tidak Dapat Mengakses Command Ini/**Owner Only!** ,Hubungi `Richo` Untuk Menambahkan Anda');
  }, 15000)
});
    }
      break;
      
      case "timer": {
        let Timer = args[0];

        if(!args[0]){
            return message.channel.send("Usage: !timer + durée + s|m|h")
        }

        if(args[0] <= 0){
            return message.channel.send("Usage: !timer + durée + s|m|h")
        }

        message.channel.send("Timer lancé pour:"+ ms(ms(Timer), {long: true}))
        setTimeout(function(){
            message.channel.send(message.author.toString()+ `Timer fini, il à durer: ${ms(ms(Timer), {long: true})}`)
        }, ms(Timer));
    }
      break;
      
    case "reportbot": {
      const { MessageEmbed } = require("discord.js")
      const reportEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Report`, message.author.avatarURL())
        .setTimestamp(new Date())
        .setFooter(`MRPBOT v0.0.1`)
        .setDescription(`Report a bug [click here](https://github.com/AdiRaihan46/RegisterBot/issues).`);

    return message.channel.send(reportEmbed);
    }
      break;
      
    case "rr": {
      let role;
    if(args[1] && isNaN(args[1])) role = message.mentions.roles.first()
    if(args[1] && !isNaN(args[1])){
        role = message.guild.roles.cache.get(args[1])
    }
    let user;
    if(args[0] && isNaN(args[0])) user = message.mentions.users.first()
    if(args[0] && !isNaN(args[0])){
        user = bot.users.cache.get(args[0])

        if(!message.guild.members.cache.has(args[0])) return message.reply("User not found")
    }
    if(!user) return message.reply(":x: You must mention a user")
    if(!role) return message.reply(":x: You must mention role")
if(!message.guild.members.cache.get(user.id).roles.cache.has(role.id)) return message.reply(":x:")
    message.guild.members.cache.get(user.id).roles.remove(role.id).catch(e => message.reply(e))
    message.reply("ok")
    }
  break;
      
    case "unbanall": {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                message.guild.fetchBans().then(bans => {
                    if (bans.size == 0) {message.reply("There are no banned users."); throw "No members to unban."};
                    bans.forEach(ban => {
                        message.guild.members.unban(ban.user.id);
                    });
                }).then(() => message.reply("Unbanned all users.")).catch(e => console.log(e))
            } else {message.reply("You do not have enough permissions for this command.")}
        break;
    }
  
      welcome(bot);
  }
});

bot.login(token);
