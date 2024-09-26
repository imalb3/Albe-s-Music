const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function volume(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);
        const volume = interaction.options.getInteger('level');

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('❌ Nessun giocatore attivo trovato.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        if (volume < 0 || volume > 100) {
            return interaction.reply({ content: 'Il livello del volume deve essere compreso tra 0 e 100.', ephemeral: true });
        }

        player.setVolume(volume);

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription(`🔊 Il volume è stato impostato su **${volume}%**`);

        return interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error setting volume:', error);
        await interaction.reply({ content: 'Si è verificato un errore durante l\'impostazione del volume.', ephemeral: true });
    }
}

module.exports = {
    name: "volume",
    description: "Imposta il volume del brano corrente",
    permissions: "0x0000000000000800",
    options: [{
        name: 'level',
        description: 'Livello del volume (0-100)',
        type: ApplicationCommandOptionType.Integer,
        required: true
    }],
    run: volume
};
