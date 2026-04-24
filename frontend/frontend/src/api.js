const API_BASE = "http://127.0.0.1:8000";

export async function uploadVideoForAnalysis(videoFile, location) {
  const formData = new FormData();
  formData.append("file", videoFile);
  formData.append("location", location); // optional tag

  const response = await fetch(`${API_BASE}/analyze-video/`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}
