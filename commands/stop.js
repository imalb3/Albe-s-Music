const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function stop(client, interaction) {
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
        player.destroy();

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription('**⏹️ La riproduzione è stata interrotta e il lettore è stato distrutto!**');

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Error processing stop command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('❌ Si è verificato un errore durante l\'elaborazione della richiesta.');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "stop",
    description: "Interrompi la canzone corrente",
    permissions: "0x0000000000000800",
    options: [],
    run: stop
};
