const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function resume(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('❌ Nessun giocatore attivo trovato.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        player.pause(false);

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription('**▶️ La riproduzione è ripresa!**');

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Error processing resume command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('❌ Si è verificato un errore durante l\'elaborazione della richiesta.');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "resume",
    description: "Riprendi la canzone corrente",
    permissions: "0x0000000000000800",
    options: [],
    run: resume
};
