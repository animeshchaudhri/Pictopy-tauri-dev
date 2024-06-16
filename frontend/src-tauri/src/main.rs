use std::path::PathBuf;
use std::sync::Mutex;
use tauri::{Builder, State, Wry};
use tauri_plugin_store::{Store, StoreBuilder, JsonValue};
use walkdir::WalkDir;
use serde_json::json;
use tauri::Manager;
// use tauri::api::path::app_data_dir;
// use tauri::api::path::app_data_dir; // Import app_data_dir function

// Function to check if a file extension is an image extension
fn is_image_extension(extension: &str) -> bool {
    matches!(extension.to_lowercase().as_str(), "jpg" | "jpeg" | "png" | "gif" | "bmp" | "tiff" | "webp")
}

// Function to store paths in the store
fn store_paths(store: &mut Store<Wry>, key: String, paths: &[PathBuf]) {
    let paths_as_str: Vec<String> = paths.iter().map(|p| p.to_string_lossy().into_owned()).collect();
    let json_paths = JsonValue::Array(paths_as_str.into_iter().map(JsonValue::String).collect());
    store.insert(key.clone(), json_paths).expect("Failed to insert data into store");
    store.save().expect("Failed to save store to disk");  // Ensure changes are saved to disk
    println!("Stored paths under key {}: {:?}", key, store.get(&key));
}

// Function to retrieve stored paths from the store
fn get_stored_paths(store: &Store<Wry>, key: &str) -> Option<Vec<PathBuf>> {
    match store.get(key) {
        Some(value) => match value {
            JsonValue::Array(paths_as_str) => {
                let paths: Vec<PathBuf> = paths_as_str
                    .iter()
                    .filter_map(|p| p.as_str().map(PathBuf::from))
                    .collect();
                Some(paths)
            }
            _ => None,
        },
        None => None,
    }
}

// Command to get images in a folder and store the paths if not already stored
#[tauri::command]
fn get_images_in_folder(store: State<Mutex<Store<Wry>>>, folder_path: String) -> Vec<PathBuf> {
    let mut store = store.lock().unwrap();
    let key = format!("images_in_{}", folder_path);
    if let Some(stored_paths) = get_stored_paths(&*store, &key) {
        println!("Retrieved stored paths for key {}: {:?}", key, stored_paths);
        stored_paths
    } else {
        let mut image_paths = Vec::new();

        for entry in WalkDir::new(&folder_path).into_iter().filter_map(|e| e.ok()) {
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

        store_paths(&mut store, key.clone(), &image_paths);
        image_paths
    }
}

// Command to get folders containing images and store the paths if not already stored
#[tauri::command]
fn get_folders_with_images(store: State<Mutex<Store<Wry>>>, directory: String) -> Vec<PathBuf> {
    let mut store = store.lock().unwrap();
    let key = format!("folders_with_images_in_{}", directory);
    if let Some(stored_paths) = get_stored_paths(&*store, &key) {
        println!("Retrieved stored paths for key {}: {:?}", key, stored_paths);
        stored_paths
    } else {
        let mut folder_paths = Vec::new();

        for entry in WalkDir::new(&directory).into_iter().filter_map(|e| e.ok()) {
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

        store_paths(&mut store, key.clone(), &folder_paths);
        folder_paths
    }
}

// Command to clear stored paths from the store
#[tauri::command]
fn clear_paths(store: State<Mutex<Store<Wry>>>, key: String) {
    let mut store = store.lock().unwrap();
    store.delete(&key).expect("Failed to delete key from store");
    store.save().expect("Failed to save store to disk");  // Ensure changes are saved to disk
    println!("Cleared paths for key {}", key);
}

fn main() {
    Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let store_path = "app_data.bin";

            let store_mutex = Mutex::new(StoreBuilder::new(store_path).build(app.handle().clone()));
            
            app.manage(store_mutex);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_folders_with_images,
            get_images_in_folder,
            clear_paths,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
