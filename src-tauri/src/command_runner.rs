use tauri::api::process::Command;

use std::collections::HashMap;

pub struct CommandRunner;

impl CommandRunner {
    pub fn run_command(
        env_vars: HashMap<String, String>,
        command: &str,
        args: Vec<&str>,
        success_message: &str,
        error_message: &str,
    ) {
        let output = Command::new(command)
            .envs(env_vars)
            .args(args)
            .output()
            .expect("Failed to run command");

        if output.status.success() {
            println!("{}", success_message);
            println!("Output:\n{}", &output.stdout);
        } else {
            // println!("{}: {:?}", error_message, output.status);
            println!("{}: {}", error_message, &output.stderr);
        }
    }

    pub fn start_ollama_server() {
        let mut env_vars = HashMap::new();
        env_vars.insert("OLLAMA_ORIGINS".to_string(), "*".to_string());
        env_vars.insert("OLLAMA_HOST".to_string(), "127.0.0.1:11436".to_string());

        CommandRunner::run_command(
            env_vars,
            "ollama",
            vec!["serve"],
            "Ollama Server Started Successfully on 127.0.0.1:11436",
            "Error Starting Ollama Server",
        );
    }

    pub fn end_ollama_server() {
        CommandRunner::run_command(
            HashMap::new(),
            "killall",
            vec!["ollama"],
            "Ollama Server killed successfully.",
            "Ollama Server could not be killed",
        );
    }
}
