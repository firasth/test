const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require('discord.js')
let i = 0
module.exports = {
data: new SlashCommandBuilder()
    .setName("sellwarn")
    .setDescription("Seller Warns")
    .addUserOption(option => option.setName("العضو").setDescription("منشن العضو").setRequired(true))
    .addStringOption(option => option.setName("الاجراء").setDescription("حدد الاجراء").setRequired(true).addChoices(
        { name: "25%", value: "25%" },
        { name: "50%", value: "50%"},
        { name: "100%", value: "100%"},
        { name: "سحب", value: "remove"}
    ))
    .addStringOption(option => option.setName("السبب").setDescription("سبب التحذير").setRequired(true))
    .addAttachmentOption(option => option.setName("الدليل").setDescription("دليل العملية").setRequired(true)),
/**
 * @param { ChatInputCommandInteraction } interaction
 */
    async execute(interaction){
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return
        else {
            i++
            const member = interaction.options.getMember("العضو")
            const user = interaction.options.getUser("العضو")
            const action = interaction.options.getString("الاجراء")
            const reason = interaction.options.getString("السبب")
            const attachment = interaction.options.getAttachment("الدليل")

            const role1ToRemove = interaction.guild.roles.cache.get("role id")
            const role2ToRemove = interaction.guild.roles.cache.get("role id")

            const twentyFive = interaction.guild.roles.cache.get("25% role id")
            const fifty = interaction.guild.roles.cache.get("50% role id")
            const handred = interaction.guild.roles.cache.get("100% role id")

            if (action === "remove"){
                member.roles.remove(twentyFive)
                member.roles.remove(fifty)
                member.roles.remove(handred)
                if (member.roles.cache.some(r => r.name === role1.name)) {
                    member.roles.remove(role1)
                    interaction.reply({
                        content: `تم ازالة الرتبة من <@${member.id}> بنجاح`
                    })

                    const logEmbed = new EmbedBuilder()
                        .setTitle("تحذير جديد")
                        .setDescription(`البائع: <@${member.id}>\nالسبب: ${reason}\nالاجراء: سحب رتبة\nتحذير من: <@${interaction.user.id}>`)
                        .setImage(attachment.url)
                        .setThumbnail(user.avatarURL({ size: 4096, dynamic: true}))
                        .setTimestamp()
                        .setFooter({ text: "Dev By FirasThemrii#1513"})
                    
                    const logChannel1 = interaction.guild.channels.cache.get("log channel id")
                    logChannel1.send({ embeds: [logEmbed]})

                    const logChannel2= interaction.guild.channels.cache.get("log channel id")
                    logChannel2.send(`<@${interaction.user.id}> قام بتحذير <@${member.id}>\nتحذير رقم ${i}`)


                } else if (member.roles.cache.some(r => r.name === role2.name)) {
                    member.roles.remove(role2)
                    interaction.reply({
                        content: `تم ازالة الرتبة من <@${member.id}> بنجاح`
                    })

                    const logEmbed = new EmbedBuilder()
                        .setTitle("تحذير جديد")
                        .setDescription(`البائع: <@${member.id}>\nالسبب: ${reason}\nالاجراء: سحب رتبة\nتحذير من: <@${interaction.user.id}>`)
                        .setImage(attachment.url)
                        .setThumbnail(user.avatarURL({ size: 4096, dynamic: true}))
                        .setTimestamp()
                        .setFooter({ text: "Dev By FirasThemrii#1513"})
                
                    const logChannel = interaction.guild.channels.cache.get("log channel id")
                    logChannel.send({ embeds: [logEmbed]})

                    const logChannel2= interaction.guild.channels.cache.get("log channel id")
                    logChannel2.send(`<@${interaction.user.id}> قام بتحذير <@${member.id}>\nتحذير رقم ${i}`)
                } else {
                    interaction.reply({
                        content: `${user.tag} ليس لديه هذة الرتبة`,
                        ephemeral: true
                    })
                }
            } else if (action === "100%") {
                member.roles.add(handred)
                interaction.reply({
                    content: "تم اضافة الرتبة بنجاح",
                    ephemeral: true
                })

                const logEmbed = new EmbedBuilder()
                .setTitle("تحذير جديد")
                .setDescription(`البائع: <@${member.id}>\nالسبب: ${reason}\nالاجراء: تحذير 100%\nتحذير من: <@${interaction.user.id}>`)
                .setImage(attachment.url)
                .setThumbnail(user.avatarURL({ size: 4096, dynamic: true}))
                .setTimestamp()
                .setFooter({ text: "Dev By FirasThemrii#1513"})
        
            const logChannel = interaction.guild.channels.cache.get("log channel id")
            logChannel.send({ embeds: [logEmbed]})

            const logChannel2= interaction.guild.channels.cache.get("log channel id")
            logChannel2.send(`<@${interaction.user.id}> قام بتحذير <@${member.id}>\nتحذير رقم ${i}`)
            } else if (action === "50%") {
                member.roles.add(fifty)
                interaction.reply({
                    content: "تم اضافة الرتبة بنجاح",
                    ephemeral: true
                })

                const logEmbed = new EmbedBuilder()
                .setTitle("تحذير جديد")
                .setDescription(`البائع: <@${member.id}>\nالسبب: ${reason}\nالاجراء: تحذير 50%\nتحذير من: <@${interaction.user.id}>`)
                .setImage(attachment.url)
                .setThumbnail(user.avatarURL({ size: 4096, dynamic: true}))
                .setTimestamp()
                .setFooter({ text: "Dev By FirasThemrii#1513"})
        
            const logChannel = interaction.guild.channels.cache.get("log channel id")
            logChannel.send({ embeds: [logEmbed]})

            const logChannel2= interaction.guild.channels.cache.get("log channel id")
            logChannel2.send(`<@${interaction.user.id}> قام بتحذير <@${member.id}>\nتحذير رقم ${i}`)

            } else if (action === "25%") {
                member.roles.add(twentyFive)
                interaction.reply({
                    content: "تم اضافة الرتبة بنجاح",
                    ephemeral: true
                })

                const logEmbed = new EmbedBuilder()
                    .setTitle("تحذير جديد")
                    .setDescription(`البائع: <@${member.id}>\nالسبب: ${reason}\nالاجراء: تحذير 25%\nتحذير من: <@${interaction.user.id}>`)
                    .setImage(attachment.url)
                    .setThumbnail(user.avatarURL({ size: 4096, dynamic: true}))
                    .setTimestamp()
                    .setFooter({ text: "Dev By FirasThemrii#1513"})
        
                const logChannel = interaction.guild.channels.cache.get("log channel id")
                logChannel.send({ embeds: [logEmbed]})

                const logEmbed2 = new EmbedBuilder()
                    .setTitle("التحذيرات")
                    .setDescription(`الاداري: <@${interaction.user.id}>\nعدد التحذيرات: ${i}`)

                const logChannel2= interaction.guild.channels.cache.get("log channel id")
                logChannel2.send({ embeds: [logEmbed2]})
            }
        }
    }
}