import cv2
import numpy as np

def detect_pose_violence(video_path):
    cap = cv2.VideoCapture(video_path)
    ret, prev = cap.read()
    if not ret:
        return {"pose_violence": False, "score": 0.0}

    prev = cv2.resize(prev, (320, 240))
    prev_gray = cv2.cvtColor(prev, cv2.COLOR_BGR2GRAY)

    scores = []
    frame_id = 0

    while cap.isOpened() and frame_id < 150:
        ret, frame = cap.read()
        if not ret:
            break

        frame_id += 1
        if frame_id % 5 != 0:
            continue

        frame = cv2.resize(frame, (320, 240))
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        flow = cv2.calcOpticalFlowFarneback(
            prev_gray, gray, None, 0.5, 3, 15, 3, 5, 1.2, 0
        )

        mag, _ = cv2.cartToPolar(flow[..., 0], flow[..., 1])
        scores.append(float(np.mean(mag)))
        prev_gray = gray

    cap.release()
    avg = sum(scores) / len(scores) if scores else 0.0

    return {
        "pose_violence": avg > 4.5,
        "score": round(avg, 2)
    }
