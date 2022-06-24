import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { BLUE, BROWN } from "../../utils";


export default class ShopCommand extends Command {
    name = "shop";
    aliases = [];

    async exec(msg: Message, args: string[]) {


    const embed = new MessageEmbed()
      .setTitle("Typho Redbeard's Marketplace")
      .setDescription("No more than one of each Weapon or Armor piece. No more than one Skill or Pet at a time.")
      .setColor(BROWN)
      .addField("Armor", "!buyarmor -Leather Armor: +20% damage reduction - 20 silver\n!buyboots -Leather Boots: +7% damage reduction - 7 silver\n!buybreeches -Leather Breeches: +10% damage reduction - 10 silver\n!buygloves -Leather Gloves: +5% damage reduction - 5 silver", false)
      .addField("Weapons", "!buydagger -Dagger: +5 to damage - 5 silver\n!buycutlass -Iron Cutlass: +10 to damage - 10 silver\n!buymusket -Flintlock Musket: +20 to damage - 20 silver\n!buycannon -Cannon: +50 to damage - 50 silver", false)
      .addField("Pets", "!buyraven -Raven: heals the player 15 hitpoints - 15 silver\n!buyparrot -Parrot: deals 15 damage to opponent - 15 silver", false)
      .addField("Skills", "!buyswashbuckle -Swashbuckle: deals 25 damage to opponent - 25 silver\n!buyrally -Rally: player heals 25 hitpoints - 25 silver", false)
      .addField("WARNING", "NO REFUNDS!!", false)
    msg.channel.send({ embeds: [embed] });    
    }
}
