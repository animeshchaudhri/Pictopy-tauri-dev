// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use walkdir::WalkDir;
use std::path::PathBuf;



#[tauri::command]
fn get_images_in_folder(folder_path: &str) -> Vec<PathBuf> {
    let mut image_paths = Vec::new();

   
    for entry in WalkDir::new(folder_path).into_iter().filter_map(|e| e.ok()) {
        
        if entry.file_type().is_file() {
            
            if let Some(extension) = entry.path().extension() {
                if let Some(extension_str) = extension.to_str() {
                    if is_image_extension(extension_str) {
                        image_paths.push(entry.path().to_owned());
                    }
                }
            }
        }
    }

    image_paths
}




#[tauri::command]
fn get_folders_with_images(directory:&str) -> Vec<PathBuf> {
    let mut folder_paths = Vec::new();
    // let directory = "C:/Users/Asus";
   println!("Directory: {}", directory);
 
    for entry in WalkDir::new(directory).into_iter().filter_map(|e| e.ok()) {
       
        if entry.file_type().is_file() {
          
            if let Some(extension) = entry.path().extension() {
                if let Some(extension_str) = extension.to_str() {
                    if is_image_extension(extension_str) {
                       
                        let folder_path = entry.path().parent().unwrap().to_owned();
                        if !folder_paths.contains(&folder_path) {
                            folder_paths.push(folder_path);
                        }
                    }
                }
            }
        }
    }

    folder_paths
}


fn is_image_extension(extension: &str) -> bool {
    match extension.to_lowercase().as_str() {
        "jpg" | "jpeg" | "png" | "gif" | "bmp" | "tiff" | "webp" => true,
        _ => false,
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            get_folders_with_images,
            get_images_in_folder,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}