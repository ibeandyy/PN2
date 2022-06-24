import { User } from "discord.js";
import { Fighter } from "./Fighter";

/** 
 * Swashbuckler extends Fighter and it used to easily create Fighter class based on
 * discord.js User.
 * */
export class Swashbuckler extends Fighter {
  id: string;
  attack = 7;
  hp = 100;
  armor = 0.02;
  critChance = 0.1;
  critDamage = 1.3;
  user: User;

  /** Creates Swashbuckler instance from User */
  constructor(user: User) {
    super(user.username);
    this.user = user;
    this.id = user.id;
    this.imageUrl = this.user.displayAvatarURL();
  }
}
