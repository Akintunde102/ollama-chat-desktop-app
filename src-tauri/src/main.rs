// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Command, Stdio};

fn run_command_silently(command: &str) -> Result<(), std::io::Error> {
    Command::new("sh")
        .arg("-c")
        .arg(command)
        .stdout(Stdio::null()) // Redirect stdout to /dev/null
        .stderr(Stdio::null()) // Redirect stderr to /dev/null
        .status()
        .map(|_| ()) // Ignore the output and return ()
}

fn main() {
    let output = run_command_silently("OLLAMA_ORIGINS=* OLLAMA_HOST=127.0.0.1:11436 ollama serve");

    match output {
        Ok(_) => {
            println!("Server command executed successfully.");
        }
        Err(error) => {
            eprintln!("Error running the server command: {}", error);
        }
    }

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
