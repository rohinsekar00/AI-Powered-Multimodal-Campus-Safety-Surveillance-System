def fuse_signals(motion_score, pose_violence, weapon_detected, audio_alert):
    reasons = []
    score = 0.0

    if motion_score > 5:
        score += 0.3
        reasons.append("high_motion")

    if pose_violence:
        score += 0.3
        reasons.append("aggressive_pose")

    if weapon_detected:
        score += 0.4
        reasons.append("weapon_detected")

    if audio_alert:
        score += 0.2
        reasons.append("audio_distress")

    final = score >= 0.5

    if not final:
        vtype = "normal"
    elif weapon_detected:
        vtype = "fight"
    elif motion_score > 7:
        vtype = "chase"
    elif pose_violence:
        vtype = "crowd"
    else:
        vtype = "normal"

    return {
        "final_violence": final,
        "confidence": round(min(score, 1.0), 2),
        "violence_type": vtype,
        "reasons": reasons
    }
