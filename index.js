const { Client } = require("discord.js");
const db = require("quick.db");
const bot = new Client();
const prefix = ".";
const token = "YOUR TOKEN"; // TOKEN BOT KAMU


bot.on("ready", () => {
  console.log(`${bot.user.username} Sudah Online - Reedit Richo`);

  var time = new Date();
            Date.prototype.timeNow = function () {
                return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
            }
            var wtime = time.timeNow();
  
  bot.user
    .setActivity(`${prefix}help | Timer ${wtime} |  Manado Roleplay Indonesia`, {
      type: "PLAYING"
    })
    .catch(console.error);
});

bot.on("message", message => {
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
      if (message.channel.id !== "818875660788301911")
        return message.channel.send("**You Can't Register Here!**,Gak Bisa Basa Inggris? Nih Gua Terjemahin `(kamu tidak bisa register disini)` Richo-Dev"
        );
      try {
        message.member.roles.add("818875659647844390"); //Role Yang Mau DiSet
        message.member.setNickname(nick);
        return message.reply("**Telah Diregistrasi**");
      } catch (e) {
        return message.channel.send("Ada sebuah kesalahan disaat melaksanakan command."
        );
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

    case "help": {
        const { MessageEmbed } = require("discord.js");
        const embed = new MessageEmbed()
          .setTitle(`⛑__**Help Command ${prefix}help**__`)
          .addField(`🔔 ${prefix}register`, `Untuk Register Role Discord`)
          .addField(`♻️ ${prefix}ping`, `Untuk Mengetahui Ping Kamu`)
          .addField(`⏰ ${prefix}uptime`, `Untuk Melihat Berapa Waktu Yg Bot Gunakan`)
          .addField(`⛑ ${prefix}help`, `Untuk Mengatahui Cmd Bot`)
          .addField(`👑 ${prefix}Info`, `Command Ini Hanya Bisa Digunakan Oleh Administrator | Harap Gunakan **I** Besar,Contoh .Info`)
          .addField(`👋 ${prefix}link`, `Link Discord Server Dan Whatsapp`)
          .setColor("RANDOM")
          .setDescription("Masih Butuh Perbaikan Hehe")
          .setFooter(`${bot.user.username}`)
          .setTimestamp();
      message.channel.send(embed);
      }
      break;

    case "link": {
        const { MessageEmbed } = require("discord.js");
        const embed = new MessageEmbed()
          .setTitle("__**Official Link Manado Roleplay**__")
          .addField("https://bit.ly/ManadoRoleplay", `Official Website Manado Roleplay`)
          .addField("https://discord.gg/gCF5A5PtHv", `Official Discord Community`)
          .addField("https://chat.whatsapp.com/CTW31GGPnz22y7l9KC4uqH", `Official Whatsapp Group`)
          .setColor("RANDOM")
          .setDescription("Office Bot Manado Roleplay Untuk Menggunakan Command Silahkan .link - Richo-Bot")
          .setFooter(`${bot.user.username}`)
          .setTimestamp();
      message.channel.send(embed);
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
      
      
        }
})

bot.login(token);
