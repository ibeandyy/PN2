import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { BLUE } from "../../utils";


export default class HelpCommand extends Command {
    name = "rpghelp";
    aliases = [];

    async exec(msg: Message, args: string[]) {


    const embed = new MessageEmbed()
      .setTitle("Pirate Nation RPG Help")
      .setDescription("How to use the Pirate Nation RPG Bot.")
      .setColor(BLUE)
      .addField("!rpghelp", "Displays this embed", false)
      .addField("!stats", "Displays your stats. Also, displays any weapons, armor, pet or skill.", false)
      .addField("!shop", "See what items/pets/skills Typho Redbeard has to offer!", false)
      .addField("!compare", "Compares your stats to the stats of the first mentioned user. \nGreen indicates your stat is higher than theirs\nRed indicates your stat is lower than theirs", false)
      .addField("!armor", "Displays any armor worn", false)
      .addField("!weapons", "Displays any weapons carried", false)
      .addField("!skill", "Displays skill, if you have one", false)
      .addField("!pet", "Displays pet, if you have one", false)
      .addField("!battle", "Mention at least one other user to start a free for all battle.\nOnly the tougest will survive!", false)
      .addField("!sailor, !shark, !kraken", "Starts a raid against a Navy Sailor, Shark or The Kraken, respectively. \nAll users mentioned join the raid!", false)
    msg.channel.send({ embeds: [embed] });    
    }
}
