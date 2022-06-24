import { GuildMember } from "discord.js";
import { LeatherArmor, LeatherBoots, LeatherBreeches, LeatherGloves } from "./Armor";
import { CabinBoy } from "./CabinBoy";
import { Captain } from "./Captain";
import { Fighter } from "./Fighter";
import { Parrot, Raven } from "./Pet";
import { SeasonedCaptain } from "./SeasonedCaptain";
import { SeasonedSwashbuckler } from "./SeasonedSwashbuckler";
import { Crush, Rally, Swashbuckle } from "./Skill";
import { Swashbuckler } from "./Swashbuckler";
import { Cannon, Dagger, FlintlockMusket, IronCutlass } from "./Weapon";


// Level roles
export const levelSailor = "983807884599123978"; // Level up - Treasure Seeker
export const levelShark = "983873186582110348"; // Level up - Cargo Counter
export const levelKraken = "983902031033028668"; // Level up - 983902031033028668
export const levelFFA = "983191471274463262"; // Level up -

// Armor roles
export const leather_armor = "984201194668970004"; // Leather Armor - Deck Hand
export const leather_boots = "984201478757580821"; // Leather Boots
export const leather_breeches = "984201402559639572"; // Leather Breeches
export const leather_gloves = "984201556519964712"; // Leather Gloves

// Weapon roles
export const dagger = "984201777677230130"; // Dagger - 
export const cutlass = "984201833855733760"; // Iron Cutlass
export const musket = "984201955930931270"; // Flintlock Musket - Dueler
export const cannon = "984201910242394133"; // Cannon

// Pet roles
export const raven = "984202147900063784"; // Raven - 
export const parrot = "980959662906150963"; // Parrot - TownCrier

// Skill roles
export const swashbuckle = "984202211221454928"; // Swashbuckle
export const rally = "984203254550392862"; // Rally

// Crew Roles
export const crew = "984481848602292294"; // Crew


// Array of level up roles
export let level_array: string[] = [];
level_array.push(levelSailor);
level_array.push(levelShark);
level_array.push(levelKraken);
level_array.push(levelFFA);



// Andy's sweet function to apply the correct power level for the corresponding number of roles

export function powerUpCheck(member: GuildMember | null | undefined ) {

    if (member === null || member === undefined) {
        return new Fighter("null");
    }
    else{

        // Set the level up roles the player has
         
        // Check how many level up roles a player has
        let level = 0;

        for (let i of level_array) {
            if (member.roles.cache.has(i)) level +=1;
            console.log(i);
            console.log(level);
        }
        if (level == 4) {
            // Give player Seasoned Captain class for having four level up roles
            const pirate = new SeasonedCaptain(member.user);
            skillsPetsArmsCheck(pirate, member);
            whichLevels(pirate, member);
            return pirate;
        }
        else if (level == 3) {
            // Give player Captain class for having three level up roles
            const pirate = new Captain(member.user);
            skillsPetsArmsCheck(pirate, member);
            whichLevels(pirate, member);
            return pirate;
        }
        else if (level == 2) {
            // Give player Seasoned Swashbuckler class for having two level up roles
            const pirate = new SeasonedSwashbuckler(member.user);
            skillsPetsArmsCheck(pirate, member);
            whichLevels(pirate, member);
            return pirate;
        }
        else if (level == 1) {
            // Give player Swashbuckler class for having one level up role
            const pirate = new Swashbuckler(member.user);
            skillsPetsArmsCheck(pirate, member);
            whichLevels(pirate, member);
            return pirate;
        }
        else {
            const pirate = new CabinBoy(member.user);
            skillsPetsArmsCheck(pirate, member);
            return pirate;            
        }
    }
}

// Function to check for armor, weapons, pets and skills

export function skillsPetsArmsCheck(pirate: Fighter, member: GuildMember) {

    //Check for ARMOR roles

    // Give player Leather Armor for having the proper role
    if (member.roles.cache.has(leather_armor)) {
        const leather_armor = new LeatherArmor();
        pirate.equipArmor(leather_armor);
    }
    // Give player Leather Breeches for having the proper role
    if (member.roles.cache.has(leather_breeches)) {
        const leather_breeches = new LeatherBreeches();
        pirate.equipArmor(leather_breeches);
    }
    // Give player Leather Boots for having the proper role
    if (member.roles.cache.has(leather_boots)) {
        const leather_armor = new LeatherBoots();
        pirate.equipArmor(leather_armor);
    }
    // Give player Leather Gloves for having the proper role
    if (member.roles.cache.has(leather_gloves)) {
        const leather_gloves = new LeatherGloves();
        pirate.equipArmor(leather_gloves);
    }


    // Check for WEAPON roles

    // Give player the Dagger for having the proper role
    if (member.roles.cache.has(dagger)) {
        const dagger = new Dagger();
        pirate.equipWeapon(dagger);
    }
    // Give player Iron Cutlass for having the proper role
    if (member.roles.cache.has(cutlass)) {
        const iron_cutlass = new IronCutlass();
        pirate.equipWeapon(iron_cutlass);
    }
    // Give player the Musket for having the proper role
    if (member.roles.cache.has(musket)) {
        const musket = new FlintlockMusket();
        pirate.equipWeapon(musket);
    }
    // Give player Cannon for having the proper role
    if (member.roles.cache.has(cannon)) {
        const cannon = new Cannon();
        pirate.equipWeapon(cannon);
    }


    // Check for PET roles

    // Give player Parrot pet for having the proper role
    if (member.roles.cache.has(parrot)) {
        const pet = new Parrot();
        pet.setOwner(pirate);
    }
    // Give player Raven pet for having the proper role
    if (member.roles.cache.has(raven)) {
        const pet = new Raven();
        pet.setOwner(pirate);
    }


    // Check for SKILL roles

    // Give player the Swashbuckle skill for having the proper role
    if (member.roles.cache.has(swashbuckle)) {
        pirate.skill = new Swashbuckle();
    }
    // Give player the Rally skill for having the proper role
    if (member.roles.cache.has(rally)) {
        pirate.skill = new Rally();
    }

    // Check for CREW roles
    if (member.roles.cache.has(crew)) {

        pirate.hasCrew = true;
    }

}

export function whichLevels(pirate: Fighter, member: GuildMember) {

    // Set which level roles the player already has
    if (member.roles.cache.has(levelFFA)) pirate.ffaLevel = true;
    if (member.roles.cache.has(levelSailor)) pirate.sailorLevel = true;
    if (member.roles.cache.has(levelShark)) pirate.sharkLevel = true;
    if (member.roles.cache.has(levelKraken)) pirate.krakenLevel = true;

}
