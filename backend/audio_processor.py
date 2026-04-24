import os

def analyze_audio(video_path):
    try:
        return os.path.getsize(video_path) > 5_000_000
    except:
        return False
