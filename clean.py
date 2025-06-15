from pdf2image import convert_from_path
import os
import zipfile

def pdf_to_png_and_zip(pdf_path, output_folder, zip_path, dpi=600, poppler_path=r"C:/poppler-23.11.0/Library/bin"):
    print(f"[INFO] Starting conversion for: {pdf_path}")
    print(f"[INFO] DPI set to: {dpi}")

    # # Create output folder
    # if not os.path.exists(output_folder):
    #     print(f"[INFO] Creating output folder at: {output_folder}")
    #     os.makedirs(output_folder)

    # Convert PDF to images
    print("[INFO] Converting PDF pages to images...")
    images = convert_from_path(pdf_path, dpi=dpi)
    print(f"[INFO] Total pages found: {len(images)}")

    # Save each image as PNG
    image_paths = []
    for i, img in enumerate(images, start=1):
        img_path = os.path.join(output_folder, f"page_{i}.png")
        print(f"[DEBUG] Saving page {i} to {img_path}")
        img.save(img_path, "PNG")
        image_paths.append(img_path)


    print(f"[SUCCESS] Conversion completed: {zip_path}")
    return zip_path

# Example usage
pdf_path = "Spice&Grill Menu.pdf"
output_folder = "/spice_grill_png"
zip_path = "/SpiceGrillMenu_PNG_600DPI.zip"

pdf_to_png_and_zip(pdf_path, output_folder, zip_path)
