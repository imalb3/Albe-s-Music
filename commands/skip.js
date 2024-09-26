const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function skip(client, interaction) {
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

        player.stop();

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription('**⏭️ Il lettore riprodurrà la canzone successiva!**');

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Error processing skip command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('❌ Si è verificato un errore durante l\'elaborazione della richiesta.');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "skip",
    description: "Salta la canzone corrente",
    permissions: "0x0000000000000800",
    options: [],
    run: skip
};
