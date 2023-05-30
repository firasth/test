const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, RoleSelectMenuBuilder, ActionRowBuilder, ComponentType, Client} = require('discord.js')

module.exports = {
data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("Add Role")
    .addUserOption(option => option.setName("العضو").setDescription("منشن العضو").setRequired(true)),
/**
 * @param { ChatInputCommandInteraction } interaction
 */
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return
        else {
            const user = interaction.options.getMember('العضو')

            const select1 = new RoleSelectMenuBuilder()
                .setCustomId("role1")
                .setPlaceholder("Rare Roles | رتب نادرة")

            const select2 = new RoleSelectMenuBuilder()
                .setCustomId("role2")
                .setPlaceholder("Roles | رولات الشوب")

            const select3 = new RoleSelectMenuBuilder()
                .setCustomId("role3")
                .setPlaceholder("Special Rooms | رومات خاصة")

            const select4 = new RoleSelectMenuBuilder()
                .setCustomId("role4")
                .setPlaceholder("Lifes and Warns | تحذيرات اضافية")


            const row1 = new ActionRowBuilder().addComponents(select1)
            const row2 = new ActionRowBuilder().addComponents(select2)
            const row3 = new ActionRowBuilder().addComponents(select3)
            const row4 = new ActionRowBuilder().addComponents(select4)

            interaction.reply({
                content: `يرجى اختيار الرتبة التي تريد اعطائها الى <@${user.id}>`,
                components: [row1, row2, row3, row4]
            })
        }
    }
}
