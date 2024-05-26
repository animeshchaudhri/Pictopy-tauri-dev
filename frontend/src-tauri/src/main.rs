// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use anyhow::Result;
use std::fs;
use std::path::Path;
use tauri::command;

#[command]
fn get_images_in_folder(folder_path: String) -> Result<Vec<String>, String> {
    let mut images = Vec::new();
    find_images_in_directory(&folder_path, &mut images)?;
    Ok(images)
}

fn find_images_in_directory(directory: &str, images: &mut Vec<String>) -> Result<(), String> {
    for entry in fs::read_dir(directory).map_err(|e| format!("Error reading directory: {}", e))? {
        let entry = entry.map_err(|e| format!("Error accessing directory entry: {}", e))?;
        let path = entry.path();
        if path.is_dir() {
            find_images_in_directory(&path.to_string_lossy(), images)?;
        } else if is_image_file(&path) {
            images.push(path.to_string_lossy().into_owned());
        }
    }
    Ok(())
}

#[command]
fn get_folders_with_images(root_directory: String) -> Result<Vec<String>, String> {
    let mut folders_with_images = Vec::new();
    scan_directory(&root_directory, &mut folders_with_images)?;
    Ok(folders_with_images)
}

fn scan_directory(directory: &str, folders_with_images: &mut Vec<String>) -> Result<(), String> {
    for entry in fs::read_dir(directory).map_err(|e| format!("Error reading directory: {}", e))? {
        let entry = entry.map_err(|e| format!("Error accessing directory entry: {}", e))?;
        let path = entry.path();
        if path.is_dir() {
            if contains_images(&path)
                .map_err(|e| format!("Error checking images in directory: {}", e))?
            {
                folders_with_images.push(path.to_string_lossy().into_owned());
            } else {
                scan_directory(&path.to_string_lossy(), folders_with_images)
                    .map_err(|e| format!("Error scanning directory: {}", e))?;
            }
        }
    }
    Ok(())
}

fn contains_images(directory: &Path) -> Result<bool, std::io::Error> {
    for entry in fs::read_dir(directory)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_file() && is_image_file(&path) {
            return Ok(true);
        }
    }
    Ok(false)
}

fn is_image_file(path: &Path) -> bool {
    if let Some(extension) = path.extension() {
        return matches!(
            extension.to_str().unwrap().to_lowercase().as_str(),
            "jpg" | "jpeg" | "png" | "gif" | "bmp" | "tiff"
        );
    }
    false
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_folders_with_images,
            get_images_in_folder,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
