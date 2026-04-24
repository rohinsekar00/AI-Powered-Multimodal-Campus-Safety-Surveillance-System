import torch
import cv2
import numpy as np
import os

EVIDENCE_DIR = "evidence"
os.makedirs(EVIDENCE_DIR, exist_ok=True)

# Load YOLO once
model = torch.hub.load(
    "ultralytics/yolov5",
    "yolov5s",
    pretrained=True
)
model.eval()

# ---------------- OBJECT + WEAPON DETECTION ----------------

def analyze_video(video_path):
    cap = cv2.VideoCapture(video_path)

    detections = []
    weapon_detected = False

    frame_count = 0
    SKIP_FRAMES = 5
    MAX_FRAMES = 300

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        if frame_count % SKIP_FRAMES != 0:
            continue
        if frame_count > MAX_FRAMES:
            break

        frame = cv2.resize(frame, (640, 480))
        results = model(frame, size=640)

        for *box, conf, cls in results.xyxy[0]:
            label = model.names[int(cls)]
            confidence = float(conf)

            detections.append({
                "label": label,
                "confidence": confidence
            })

            if label in ["knife", "gun"]:
                weapon_detected = True
                cap.release()
                return detections, True

    cap.release()
    return detections, weapon_detected


# ---------------- MOTION + EVIDENCE FRAME ----------------

def detect_motion_violence(video_path):
    cap = cv2.VideoCapture(video_path)
    ret, prev = cap.read()
    if not ret:
        return 0.0, None

    prev = cv2.resize(prev, (640, 480))
    prev_gray = cv2.cvtColor(prev, cv2.COLOR_BGR2GRAY)

    motion_scores = []
    max_motion = 0.0
    evidence_frame = None

    frame_count = 0
    SKIP_FRAMES = 5
    MAX_FRAMES = 300

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        if frame_count % SKIP_FRAMES != 0:
            continue
        if frame_count > MAX_FRAMES:
            break

        frame = cv2.resize(frame, (640, 480))
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        flow = cv2.calcOpticalFlowFarneback(
            prev_gray, gray, None, 0.5, 3, 15, 3, 5, 1.2, 0
        )

        mag, _ = cv2.cartToPolar(flow[..., 0], flow[..., 1])
        score = float(np.mean(mag))
        motion_scores.append(score)

        if score > max_motion:
            max_motion = score
            evidence_frame = frame.copy()

        prev_gray = gray

    cap.release()

    avg_motion = round(sum(motion_scores) / len(motion_scores), 2) if motion_scores else 0.0
    return avg_motion, evidence_frame
