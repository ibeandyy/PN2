import { User } from "discord.js";
import { Fighter } from "./Fighter";

/** 
 * CabinBoy extends Fighter and it used to easily create Fighter class based on
 * discord.js User.
 * */
export class CabinBoy extends Fighter {
  id: string;
  attack = 5;
  hp = 75;
  armor = 0;
  critChance = 0.05;
  critDamage = 1.2;
  user: User;

  /** Creates CabinBoy instance from User */
  constructor(user: User) {
    super(user.username);
    this.user = user;
    this.id = user.id;
    this.imageUrl = this.user.displayAvatarURL();
  }
}
