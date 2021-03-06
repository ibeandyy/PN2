import { Client } from "discord.js";
import { CommandManager } from "@jiman24/commandment";
import path from "path";
import { config } from "dotenv";
import * as ubb from 'unb-api';

config();

const COMMAND_PREFIX = "!";
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const commandManager = new CommandManager(COMMAND_PREFIX);
export const ubbClient = new ubb.Client(UBB_TOKEN);

commandManager.verbose = true;
commandManager.registerCommands(path.resolve(__dirname, "./commands"));

commandManager.registerCommandNotFoundHandler((msg, cmdName) => {
  msg.channel.send(`Cannot find command "${cmdName}"`);
})

commandManager.registerCommandOnThrottleHandler((msg, cmd, timeLeft) => {
  const time = (timeLeft / 1000).toFixed(2);
  msg.channel.send(`You cannot run ${cmd.name} command after ${time} s`);
})

client.on("ready", () => console.log(client.user?.username, "is ready!"))
client.on("messageCreate", msg => { 
  commandManager.handleMessage(msg);
});

client.login(process.env.BOT_TOKEN);
