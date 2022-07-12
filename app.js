const { Client, Intents, MessageEmbed } = require('discord.js');
const { token, togg_token, topgg_auth, oy_log, oy_linki } = require('./config.json');
const DBL = require('dblapi.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

const dbl = new DBL(togg_token, { webhookPort: 3000, webhookAuth: topgg_auth});
dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});

dbl.webhook.on('vote', vote => {
  const channel = client.channels.cache.get(oy_log)
  const embed = new MessageEmbed()
  .setTitle("__Oy verdiģin Ìçin Teşekkürler!__")
  .setDescription(`⭐ **Oy Veren:-**\n<@${vote.user}>\n\n🔗 ** Oy Linki:-**\n${oy_linki}\n\n💖 **12 Saat Sonra Tekrar Oy Verebilirsin** 💖`)
  .setFooter({text:"Top.gg Oy Log"})
  .setColor("GREEN")
  channel.send({ embeds: [embed] })
});

client.login(token);
