import os
import logging


current_dir = os.path.dirname(os.path.abspath(__file__))

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,                  # Set the logging level
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',  # Set the format of the log messages
    datefmt='%Y-%m-%d %H:%M:%S',         # Set the date format
    handlers=[
        logging.FileHandler("app.log"),  # Log to a file named 'app.log'
        logging.StreamHandler()          # Also log to the console
    ]
)

LOCAL_INPUT_IMAGE_DIR=os.path.join(current_dir, "local_files", "input_images")
LOCAL_OCR_IMAGE_DIR=os.path.join(current_dir, "local_files", "ocr_images")
LOCAL_LOG_DIR=os.path.join(current_dir ,"local_files", "logs")