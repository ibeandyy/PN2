import { User } from "discord.js";
import { Fighter } from "./Fighter";

/** 
 * Seasoned Swashbuckler extends Fighter and it used to easily create Fighter class based on
 * discord.js User.
 * */
export class SeasonedSwashbuckler extends Fighter {
  id: string;
  attack = 8;
  hp = 145;
  armor = 0.04;
  critChance = 0.15;
  critDamage = 1.4;
  user: User;

  /** Creates Seasoned Swashbuckler instance from User */
  constructor(user: User) {
    super(user.username);
    this.user = user;
    this.id = user.id;
    this.imageUrl = this.user.displayAvatarURL();
  }
}
