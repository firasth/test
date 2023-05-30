const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed,
         Collection, ButtonBuilder, ButtonStyle, ActivityType, ModalBuilder, TextInputBuilder, TextInputStyle,
            ActionRowBuilder, 
            ApplicationCommandType,
            InteractionType} = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [3276799] }); 

client.commands = new Collection();

const config = require("../config.json")

const functions = fs.readdirSync("./src/Functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/Events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/Commands");

(async () => {
    for (file of functions) {
        require(`./Functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/Events");
    client.handleCommands(commandFolders, "./src/Commands");
    client.login(config.token)
})();

client.on("ready", () => {
    console.log("Bot is online")
    client.guilds.cache.forEach((guild) => {
        client.user.setPresence({
            activities: [{
                name: guild.name,
                type: ActivityType.Playing
            }],
            status: "dnd"
        })
    })
    })

    client.on("messageCreate", async message => {
        if (message.content === "-order") {
            if (!message.member.permissions.has("Administrator")) return
            else {
                const orderEmbed = new EmbedBuilder()
                    .setDescription("**Order** `Section`\n>>> - Press The Button to Order")
                    .setFooter({ text: "Dev By FirasThemrii#1513"})
    
                const orderRow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("order")
                            .setLabel("طلب")
                            .setStyle(ButtonStyle.Primary),
                )
    
                message.channel.send({
                    embeds: [orderEmbed],
                    components: [orderRow]
                })
            }
    
        }
    })
    
    client.on("interactionCreate", async interaction => {
        if (!interaction.isButton()) return
        if (interaction.customId === "order"){
            const orderModal = new ModalBuilder()
                .setCustomId("orderModal")
                .setTitle("الطلبات")
    
            const order = new TextInputBuilder()
                .setLabel("طلبك")
                .setCustomId("yourOrder")
                .setRequired(true)
                .setPlaceholder("طلبك هنا")
                .setStyle(TextInputStyle.Paragraph)
    
            const orderRow = new ActionRowBuilder().addComponents(order)
            orderModal.addComponents(orderRow)
            await interaction.showModal(orderModal)
        }
    })
    
    client.on("interactionCreate", async interaction => {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === "orderModal") {
            const order = interaction.fields.getTextInputValue("yourOrder")
    
            const embed = new EmbedBuilder()
                .setTitle("نوع الطلب")
                .setDescription("1: منتج\n2: تصميم\n3: برمجة")
                .setThumbnail(interaction.user.avatarURL({ size: 4096, dynamic: true}))
                .setTimestamp()
                .setFooter({ text: "Dev By FirasThemrii#1513"})
    
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("object")
                        .setLabel("منتج")
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId("art")
                        .setLabel("تصميم")
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId("dev")
                        .setLabel("برمجة")
                        .setStyle(ButtonStyle.Primary)
                )
    
            interaction.reply({ embeds: [embed], components: [row], ephemeral: true})
            
    
            client.on("interactionCreate", async action => {
                if (!action.isButton()) return
                if (action.customId === "object") {
                    const role = "seller role id"
                
                    const em = new EmbedBuilder()
                        .setTitle("طلب جديد")
                        .setDescription(`طلب من <@${action.user.id}>\nالطلب: ${order}`)
                        .setThumbnail(interaction.user.avatarURL({size: 4096, dynamic: true}))
                        .setTimestamp()
                        .setFooter({ text: "Dev By FirasThemrii#1513"})
    
                    const channel = interaction.guild.channels.cache.get("1112420520093286410")
                    channel.send({content: `<@&${role}>`, embeds: [em]})
                    action.reply({ content: "تم ارسال الطلب بنجاح", ephemeral: true})
                } else if (action.customId === "art") {
                    const role = "mosamem role id"
                
                    const em = new EmbedBuilder()
                        .setTitle("طلب جديد")
                        .setDescription(`طلب من <@${action.user.id}>\nالطلب: ${order}`)
                        .setThumbnail(interaction.user.avatarURL({size: 4096, dynamic: true}))
                        .setTimestamp()
                        .setFooter({ text: "Dev By FirasThemrii#1513"})
    
                    const channel = interaction.guild.channels.cache.get("1112420520093286410")
                    channel.send({content: `<@&${role}>`, embeds: [em]})
    
                    action.reply({ content: "تم ارسال الطلب بنجاح", ephemeral: true})
                } else if (action.customId === "dev") {
                    const role = "programmer role id"
                
                    const em = new EmbedBuilder()
                        .setTitle("طلب جديد")
                        .setDescription(`طلب من <@${action.user.id}>\nالطلب: ${order}`)
                        .setThumbnail(interaction.user.avatarURL({size: 4096, dynamic: true}))
                        .setTimestamp()
                        .setFooter({ text: "Dev By FirasThemrii#1513"})
    
                    const channel = interaction.guild.channels.cache.get("your channel id")
                    channel.send({content: `<@&${role}>`, embeds: [em]})
                    action.reply({ content: "تم ارسال الطلب بنجاح", ephemeral: true})
                }
            })
        }
    })

client.on("interactionCreate", async interaction => {
    if (interaction.type === InteractionType.ApplicationCommand){
        if (interaction.commandName === "roles") {
            const member = interaction.options.getMember("العضو")

            client.on("interactionCreate", async action => {
                if (action.isRoleSelectMenu()) {
                    if (action.customId === "role1"){
                        const role = action.values[0]
                        member.roles.add(role)

                        action.reply({
                            content: "تم اضافة الرتبة بنجاح",
                            ephemeral: true
                        })
                    } if (action.customId === "role2"){
                        const role = action.values[0]
                        member.roles.add(role)

                        action.reply({
                            content: "تم اضافة الرتبة بنجاح",
                            ephemeral: true
                        })
                    } if (action.customId === "role3"){
                        const role = action.values[0]
                        member.roles.add(role)

                        action.reply({
                            content: "تم اضافة الرتبة بنجاح",
                            ephemeral: true
                        })
                    } if (action.customId === "role4"){
                        const role = action.values[0]
                        member.roles.add(role)

                        action.reply({
                            content: "تم اضافة الرتبة بنجاح",
                            ephemeral: true
                        })
                    }
                }
            })
        }
    }
})