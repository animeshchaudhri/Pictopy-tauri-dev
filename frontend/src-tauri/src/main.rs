use walkdir::WalkDir;
use std::path::PathBuf;
use std::fs::{File};
use std::io::{BufRead, BufReader, Write};

const FOLDERS_CACHE_FILE_PATH: &str = "folders_cache.txt";
const IMAGES_CACHE_FILE_PATH: &str = "images_cache.txt";
const VIDEOS_CACHE_FILE_PATH: &str = "videos_cache.txt";

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
fn get_folders_with_images(directory: &str) -> Vec<PathBuf> {
    // Check if the cache file exists
    if let Ok(file) = File::open(FOLDERS_CACHE_FILE_PATH) {
        // Read the cached folder paths from the file
        let reader = BufReader::new(file);
        let folder_paths: Vec<PathBuf> = reader.lines()
            .filter_map(|line| line.ok().map(PathBuf::from))
            .collect();
        return folder_paths;
    }

    // If the cache file does not exist, compute the folder paths
    let mut folder_paths = Vec::new();
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

    // Write the folder paths to the cache file
    if let Ok(mut file) = File::create(FOLDERS_CACHE_FILE_PATH) {
        for path in &folder_paths {
            if let Some(path_str) = path.to_str() {
                writeln!(file, "{}", path_str).unwrap();
            }
        }
    }

    folder_paths
}

#[tauri::command]
fn get_all_images_with_cache(directory: &str) -> Vec<PathBuf> {
    // Check if the cache file exists
    // println!("Checking cache file");
    if let Ok(file) = File::open(IMAGES_CACHE_FILE_PATH) {
        // Read the cached image paths from the file
      
        let reader = BufReader::new(file);
        let image_paths: Vec<PathBuf> = reader.lines()
            .filter_map(|line| line.ok().map(PathBuf::from))
            .collect();
        return image_paths;
    }

    
    let mut image_paths = Vec::new();
    println!("Directory: {}", directory);

    for entry in WalkDir::new(directory).into_iter().filter_map(|e| e.ok()) {
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

   
    if let Ok(mut file) = File::create(IMAGES_CACHE_FILE_PATH) {
        for path in &image_paths {
            if let Some(path_str) = path.to_str() {
                writeln!(file, "{}", path_str).unwrap();
            }
        }
    }
 
    image_paths
}

#[tauri::command]
fn get_all_videos_with_cache(directory: &str) -> Vec<PathBuf> {
    // Check if the cache file exists
    if let Ok(file) = File::open(VIDEOS_CACHE_FILE_PATH) {
        // Read the cached video paths from the file
        let reader = BufReader::new(file);
        let video_paths: Vec<PathBuf> = reader.lines()
            .filter_map(|line| line.ok().map(PathBuf::from))
            .collect();
        return video_paths;
    }

    // If the cache file does not exist, compute the video paths
    let mut video_paths = Vec::new();
    println!("Directory: {}", directory);

    for entry in WalkDir::new(directory).into_iter().filter_map(|e| e.ok()) {
        if entry.file_type().is_file() {
            if let Some(extension) = entry.path().extension() {
                if let Some(extension_str) = extension.to_str() {
                    if is_video_extension(extension_str) {
                        video_paths.push(entry.path().to_owned());
                    }
                }
            }
        }
    }

    // Write the video paths to the cache file
    if let Ok(mut file) = File::create(VIDEOS_CACHE_FILE_PATH) {
        for path in &video_paths {
            if let Some(path_str) = path.to_str() {
                writeln!(file, "{}", path_str).unwrap();
            }
        }
    }

    video_paths
}



#[tauri::command]
fn delete_cache() -> bool {
    let mut success = true;

    if std::fs::remove_file(FOLDERS_CACHE_FILE_PATH).is_ok() {
        println!("Folders cache file deleted.");
    } else {
        println!("Failed to delete folders cache file.");
        success = false;
    }

    if std::fs::remove_file(IMAGES_CACHE_FILE_PATH).is_ok() {
        println!("Images cache file deleted.");
    } else {
        println!("Failed to delete images cache file.");
        success = false;
    }
    if std::fs::remove_file(VIDEOS_CACHE_FILE_PATH).is_ok() {
        println!("videos cache file deleted.");
    } else {
        println!("Failed to delete videos cache file.");
        success = false;
    }

    success
}

fn is_image_extension(extension: &str) -> bool {
    match extension.to_lowercase().as_str() {
        "jpg" | "jpeg" | "png" | "gif" | "bmp" | "tiff" | "webp" => true,
        _ => false,
    }
}

fn is_video_extension(extension: &str) -> bool {
    matches!(extension.to_lowercase().as_str(), "mp4" | "avi" | "mkv" | "mov" | "flv" | "wmv" | "m4v")
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            get_folders_with_images,
            get_images_in_folder,
            get_all_images_with_cache,
            delete_cache,
            get_all_videos_with_cache,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
