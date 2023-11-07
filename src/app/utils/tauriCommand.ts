import { Command } from '@tauri-apps/api/shell'

export const ollamaServer = function () {
    const start = async () => await new Command('start-ollama-server', ["serve"], {
        env: { "OLLAMA_ORIGINS": "*", "OLLAMA_HOST": "127.0.0.1:11436" }
    }).execute();

    const kill = async () => new Command('kill-all-ollama-servers').execute();

    return {
        start: async () => {
            let a = await start();

            if (a.code === 1) {
                await kill();
                a = await start();
            }

            return a;
        },
        kill: async () => {
            const a = await kill();
            return a;
        }
    }


}