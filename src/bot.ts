import { Client, Events, GatewayIntentBits, Message, Role } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, (message:Message) => {
    if (message.content === '!ping') {
        console.log('pinged');
        message.reply('Pong!');
    }
});

client.on(Events.GuildRoleCreate, (role: Role) => {
    console.log('roleCreate');
    console.log(role);
});

client.on(Events.GuildRoleDelete, (role: Role) => {
    console.log('roleDelete');
    console.log(role);
});

client.on(Events.GuildRoleUpdate, (oldRole: Role, newRole: Role) => {
    console.log('roleUpdate');
    console.log(oldRole);
    console.log(newRole);
});

client.on(Events.GuildMemberUpdate, (member) => {
    console.log('GuildMemberUpdate');
    console.log(member);
});

if (!BOT_TOKEN) {
    console.error('BOT_TOKEN is not defined in the environment variables.');
    process.exit(1);
}

client.login(process.env.BOT_TOKEN);