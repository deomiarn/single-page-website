#!/bin/bash

# WebP Image Converter for Reale Continental
# Converts PNG, JPG, JPEG images to WebP format
# Usage: ./scripts/convert-to-webp.sh [input_dir] [output_dir] [quality]

# Default values
INPUT_DIR="${1:-./raw-images}"
OUTPUT_DIR="${2:-./app/public/images}"
QUALITY="${3:-85}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}WebP Image Converter${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Input directory:  $INPUT_DIR"
echo "Output directory: $OUTPUT_DIR"
echo "Quality:          $QUALITY%"
echo ""

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo -e "${RED}Error: cwebp is not installed.${NC}"
    echo ""
    echo "Install with:"
    echo "  macOS:   brew install webp"
    echo "  Ubuntu:  sudo apt-get install webp"
    echo "  Windows: Download from https://developers.google.com/speed/webp/download"
    exit 1
fi

# Check if input directory exists
if [ ! -d "$INPUT_DIR" ]; then
    echo -e "${RED}Error: Input directory '$INPUT_DIR' does not exist.${NC}"
    echo ""
    echo "Create it and add your images:"
    echo "  mkdir -p $INPUT_DIR"
    echo ""
    echo "Expected folder structure:"
    echo "  $INPUT_DIR/"
    echo "    home/"
    echo "      hero-home.png"
    echo "      feature-why-us.jpg"
    echo "      about-preview.png"
    echo "      cta-home.jpg"
    echo "    about/"
    echo "      hero-about.png"
    echo "      mission.jpg"
    echo "      expertise-bodywork.png"
    echo "      expertise-windshield.png"
    echo "      expertise-insurance.png"
    echo "    services/"
    echo "      hero-services.png"
    echo "      service-bodywork.jpg"
    echo "      service-windshield.jpg"
    echo "    contact/"
    echo "      cta-contact.png"
    exit 1
fi

# Create output directory structure
mkdir -p "$OUTPUT_DIR/home"
mkdir -p "$OUTPUT_DIR/about"
mkdir -p "$OUTPUT_DIR/services"
mkdir -p "$OUTPUT_DIR/contact"

# Counter for converted files
converted=0
skipped=0
errors=0

# Function to convert a single image
convert_image() {
    local input_file="$1"
    local output_file="$2"

    # Get relative path for display
    local rel_input="${input_file#$INPUT_DIR/}"
    local rel_output="${output_file#$OUTPUT_DIR/}"

    # Skip if output already exists and is newer
    if [ -f "$output_file" ] && [ "$output_file" -nt "$input_file" ]; then
        echo -e "${YELLOW}Skip:${NC} $rel_input (already converted)"
        ((skipped++))
        return
    fi

    # Convert to WebP
    if cwebp -q "$QUALITY" "$input_file" -o "$output_file" 2>/dev/null; then
        # Get file sizes
        input_size=$(stat -f%z "$input_file" 2>/dev/null || stat --printf="%s" "$input_file" 2>/dev/null)
        output_size=$(stat -f%z "$output_file" 2>/dev/null || stat --printf="%s" "$output_file" 2>/dev/null)

        # Calculate savings
        if [ "$input_size" -gt 0 ]; then
            savings=$(( (input_size - output_size) * 100 / input_size ))
            input_kb=$(( input_size / 1024 ))
            output_kb=$(( output_size / 1024 ))
            echo -e "${GREEN}Done:${NC} $rel_input -> $rel_output (${input_kb}KB -> ${output_kb}KB, ${savings}% smaller)"
        else
            echo -e "${GREEN}Done:${NC} $rel_input -> $rel_output"
        fi
        ((converted++))
    else
        echo -e "${RED}Error:${NC} Failed to convert $rel_input"
        ((errors++))
    fi
}

# Find and convert all images
echo -e "${GREEN}Converting images...${NC}"
echo ""

# Process each subdirectory
for subdir in home about services contact; do
    if [ -d "$INPUT_DIR/$subdir" ]; then
        echo -e "${YELLOW}Processing $subdir/${NC}"

        # Find all image files
        find "$INPUT_DIR/$subdir" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file; do
            # Get filename without extension
            filename=$(basename "$file")
            name="${filename%.*}"

            # Set output path
            output_file="$OUTPUT_DIR/$subdir/${name}.webp"

            convert_image "$file" "$output_file"
        done
    fi
done

# Also check root of input dir for any loose images
find "$INPUT_DIR" -maxdepth 1 -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file; do
    filename=$(basename "$file")
    name="${filename%.*}"
    output_file="$OUTPUT_DIR/${name}.webp"
    convert_image "$file" "$output_file"
done

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Conversion Complete${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Summary:"
echo "  Converted: $converted"
echo "  Skipped:   $skipped"
echo "  Errors:    $errors"
echo ""

# Show output directory structure
if [ "$converted" -gt 0 ] || [ "$skipped" -gt 0 ]; then
    echo "Output structure:"
    find "$OUTPUT_DIR" -name "*.webp" -type f 2>/dev/null | head -20 | while read -r f; do
        echo "  ${f#$OUTPUT_DIR/}"
    done
fi
