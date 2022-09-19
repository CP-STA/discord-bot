import { Client, GatewayIntentBits, SlashCommandBuilder, Routes, Role, GuildMemberRoleManager, SlashCommandRoleOption } from 'discord.js';
import { REST } from '@discordjs/rest';
import { clientId, token } from "./config";

const commands = [
  new SlashCommandBuilder().setName('subscribe').setDescription('Subscribe to announcements'),
  new SlashCommandBuilder().setName('unsubscribe').setDescription('Unsubscribe from announcements'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

const guildId = "900757860793843752";

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);


// Create a new client instance
const client = new Client({ intents: [
  GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);
client.on('interactionCreate', async interaction => {
  try {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, member } = interaction;
  if (commandName === 'subscribe') {
    const role = interaction.guild?.roles.cache.get('1021357949031039016');
    await (member?.roles as GuildMemberRoleManager).add(role!);
    await interaction.reply(`You have successfully subscribed to news`);
  } else if (commandName === 'unsubscribe') {
    const role = interaction.guild?.roles.cache.get('1021357949031039016');
    await (member?.roles as GuildMemberRoleManager).remove(role!);
    await interaction.reply(`You have successfully unsubscribed from news`);
  }
} catch (e) {
  console.log(e)
}
});

client.login(token);