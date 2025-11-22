# Video Background Setup

## Required Video File

Place your background video at: `/public/bg-video.mp4`

### Recommendations for Best Results

1. **Format**: MP4 (H.264 codec)
2. **Resolution**: 1920x1080 (Full HD) or 4K
3. **Duration**: 10-30 seconds (will loop seamlessly)
4. **File Size**: Keep under 5MB for good performance
   - Use video compression if needed
5. **Content Suggestions**:
   - Abstract motion graphics
   - Slow cinematic footage
   - City nightlife scenes
   - Romantic/date night atmosphere
   - Subtle, atmospheric content (not too distracting)

### Example Sources

- **Stock Video Sites**: 
  - Pexels Videos (free)
  - Pixabay Videos (free)
  - Unsplash (some video content)
  - Adobe Stock
  - Shutterstock

- **Keywords to Search**:
  - "city night lights bokeh"
  - "abstract motion"
  - "romantic atmosphere"
  - "date night ambiance"
  - "urban nightlife"

### Compression Tips

If your video is too large, compress it using:

```bash
# Using FFmpeg (install via: brew install ffmpeg)
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -vf scale=1920:1080 public/bg-video.mp4
```

### Fallback

If the video doesn't load, the site will fall back to a black background with overlay, which still looks good!

## Current Styling

- Video plays automatically
- Muted (no audio)
- Loops infinitely
- Covers full screen
- Dark overlay (60% black) for text readability
