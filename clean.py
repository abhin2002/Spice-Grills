import os
import re

def sanitize_filename(filename):
    # Remove special characters, keep alphanumeric, dash and underscore
    name, ext = os.path.splitext(filename)
    # Remove anything that's not letter, digit, hyphen or underscore
    name = re.sub(r'[^A-Za-z0-9_-]', '', name)
    return name + ext

def rename_pdfs_in_folder(parent_folder):
    renamed_files = []

    for root, dirs, files in os.walk(parent_folder):
        for file in files:
            if file.lower().endswith(".pdf"):
                old_path = os.path.join(root, file)
                new_filename = sanitize_filename(file)
                new_path = os.path.join(root, new_filename)

                # Rename if different
                if new_filename != file:
                    os.rename(old_path, new_path)
                    renamed_files.append((file, new_filename))
    
    return renamed_files


# Example usage
if __name__ == "__main__":
    folder_path = "extracted-pages"
    if os.path.exists(folder_path):
        results = rename_pdfs_in_folder(folder_path)
        if results:
            print("\nRenamed files:")
            for old, new in results:
                print(f"{old} -> {new}")
        else:
            print("No files needed renaming.")
    else:
        print("❌ Folder not found. Please check the path.")
