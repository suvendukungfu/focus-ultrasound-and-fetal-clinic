from pathlib import Path
from math import sin, cos, pi
import random
import time

from PIL import Image, ImageDraw, ImageFilter, ImageFont


OUT_DIR = Path("public/images/scans")
W, H = 1400, 920

SCANS = [
    ("whole-abdomen", "USG WHOLE ABDOMEN (UPPER + KUB)", "Liver", "Gallbladder", "Right kidney", "Samsung V7", "abdomen"),
    ("kub-male-pelvis", "KUB / LOWER ABDOMEN (MALE PELVIS)", "Bladder", "Prostate", "Pelvis", "Samsung V7", "kub"),
    ("female-pelvis", "TRANSABDOMINAL PELVIS (FEMALE)", "Uterus", "Ovary", "Endometrium", "Samsung V7", "pelvis"),
    ("tvs", "TVS (TRANSVAGINAL SCAN)", "Uterus", "Endometrium", "Cervix", "Samsung V7", "tvs"),
    ("thyroid", "SMALL PARTS (THYROID)", "Right lobe", "Isthmus", "Nodule", "Samsung V7", "thyroid"),
    ("bilateral-breast", "USG BILATERAL BREAST", "Glandular tissue", "Duct", "Lesion marker", "Samsung V7", "breast"),
    ("scrotum-soft-tissues", "SCROTUM / SOFT TISSUES", "Testis", "Epididymis", "Soft tissue", "Samsung V7", "scrotum"),
    ("routine-obs", "ROUTINE OBS (EARLY PREGNANCY)", "Gestational sac", "Yolk sac", "Fetal pole", "GE Voluson", "early"),
    ("level-1-nt-nb", "LEVEL 1 (NT/NB SCAN)", "NB", "NT", "Crown rump length", "GE Voluson", "nt"),
    ("level-2-anomaly", "LEVEL 2 (TIFFA / ANATOMY SCAN)", "Spine", "Heart", "Limbs", "GE Voluson", "anomaly"),
    ("fetal-echo", "FETAL ECHOCARDIOGRAPHY", "Four chamber", "Aorta", "Color flow", "GE Voluson", "echo"),
    ("obs-doppler-growth-bpp", "OBS DOPPLER / GROWTH SCAN / BPP", "Umbilical artery", "BPD", "AFI", "GE Voluson", "doppler"),
    ("fibroscan-elastography", "FIBROSCAN / ELASTOGRAPHY", "Liver stiffness", "ROI", "kPa map", "Samsung V7", "fibro"),
    ("cervical-uterine-doppler", "CERVICAL ASSESSMENT + UTERINE DOPPLER", "Cervix", "Uterine artery", "Doppler trace", "GE Voluson", "cervical"),
]


def font(size, bold=False):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


FONT_XS = font(18)
FONT_SM = font(24)
FONT_MD = font(32, True)
FONT_LG = font(48, True)
FONT_MONO = font(20)


def draw_organic_texture(draw, seed, x_range, y_range):
    rnd = random.Random(seed)
    for _ in range(200):
        x = rnd.randint(*x_range)
        y = rnd.randint(*y_range)
        rx = rnd.randint(20, 100)
        ry = rnd.randint(10, 50)
        shade = rnd.randint(40, 160)
        alpha = rnd.randint(10, 40)
        draw.ellipse((x-rx, y-ry, x+rx, y+ry), fill=(shade, shade, shade, alpha))

def draw_caliper(draw, p1, p2, label):
    # Draw a measurement line with '+' at ends
    draw.line((p1[0], p1[1], p2[0], p2[1]), fill=(255, 255, 100, 180), width=1)
    for p in [p1, p2]:
        draw.line((p[0]-5, p[1], p[0]+5, p[1]), fill=(255, 255, 255, 255), width=2)
        draw.line((p[0], p[1]-5, p[0], p[1]+5), fill=(255, 255, 255, 255), width=2)
    
    mid_x, mid_y = (p1[0] + p2[0]) // 2, (p1[1] + p2[1]) // 2
    draw.text((mid_x + 10, mid_y + 10), label, font=FONT_XS, fill=(255, 255, 100, 255))

def scan_sector(seed, scan_type):
    rnd = random.Random(seed)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")
    
    cx, cy = W // 2, 120
    left, top, right, bottom = 100, 100, W - 100, 850
    
    # Base dark sector
    draw.pieslice((left, top, right, bottom), 25, 155, fill=(10, 15, 25, 255))
    
    # Ultrasonic wave arcs
    for i in range(40):
        radius = 150 + i * 18
        alpha = int(40 * (1 - i/40))
        draw.arc((W//2 - radius, 120 - radius, W//2 + radius, 120 + radius), 25, 155, fill=(100, 150, 200, alpha), width=1)

    # Organic tissue simulation
    draw_organic_texture(draw, seed, (300, 1100), (200, 750))
    
    # Specific organ blobs
    if "abdomen" in scan_type or "kub" in scan_type:
        # Liver/Kidney shape
        for _ in range(5):
            ox, oy = rnd.randint(400, 1000), rnd.randint(300, 600)
            draw.ellipse((ox-150, oy-80, ox+150, oy+80), fill=(80, 80, 80, 50))
            draw.arc((ox-150, oy-80, ox+150, oy+80), 0, 360, fill=(150, 150, 150, 30), width=2)

    # Clipping mask for the sector
    mask = Image.new("L", (W, H), 0)
    md = ImageDraw.Draw(mask)
    md.pieslice((left, top, right, bottom), 25, 155, fill=255)
    layer.putalpha(mask)
    
    return layer.filter(ImageFilter.GaussianBlur(1.0))

def add_monitor_ui(draw, title, machine):
    # Outer frame
    draw.rectangle((0, 0, W, H), fill=(2, 5, 10))
    
    # Inner monitor area with subtle gradient look
    draw.rounded_rectangle((20, 20, W - 20, H - 20), radius=30, fill=(5, 8, 15), outline=(30, 50, 80), width=2)
    
    # Top Bar - Medical Info
    draw.rectangle((40, 40, W - 40, 100), fill=(10, 25, 45))
    draw.text((60, 55), "FOCUS ULTRASOUND & FETAL CLINIC", font=FONT_SM, fill=(100, 200, 255))
    
    now = time.strftime("%d-%m-%Y %H:%M")
    draw.text((W - 350, 55), f"DATE: {now}", font=FONT_MONO, fill=(150, 170, 190))
    
    # Machine Specs
    draw.text((60, 110), f"MODE: B-MODE / {machine}", font=FONT_XS, fill=(120, 140, 160))
    draw.text((60, 135), "FREQ: 5.0 MHz", font=FONT_XS, fill=(120, 140, 160))
    draw.text((60, 160), "GAIN: 72 dB", font=FONT_XS, fill=(120, 140, 160))
    
    # Bottom Bar - Scan Name
    draw.rectangle((40, H - 100, W - 40, H - 40), fill=(10, 20, 35))
    draw.text((70, H - 85), title.upper(), font=FONT_MD, fill=(240, 250, 255))
    
    # Sidebar - Measurements / Settings
    for i in range(10):
        y = 200 + i * 50
        draw.line((W - 80, y, W - 50, y), fill=(80, 100, 120), width=1)
        if i % 2 == 0:
            draw.text((W - 120, y - 10), f"{i}cm", font=FONT_XS, fill=(80, 100, 120))

def add_doppler_effect(draw, seed):
    rnd = random.Random(seed)
    # Blue and Red color blobs for doppler
    for _ in range(15):
        x = rnd.randint(500, 900)
        y = rnd.randint(400, 600)
        color = (255, 50, 50, 100) if rnd.random() > 0.5 else (50, 100, 255, 100)
        draw.ellipse((x-40, y-25, x+40, y+25), fill=color)

def make_scan(slug, title, a, b, c, machine, scan_type):
    seed = sum(ord(ch) for ch in slug)
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img, "RGBA")
    
    # Monitor Background
    add_monitor_ui(draw, title, machine)
    
    # Add Scan Sector
    img.alpha_composite(scan_sector(seed, scan_type))
    
    # Re-draw on top of sector
    draw = ImageDraw.Draw(img, "RGBA")
    
    # Annotations & Measurements
    rnd = random.Random(seed)
    points = [
        ((450, 350), (550, 450), a, "2.4 cm"),
        ((700, 400), (850, 500), b, "1.8 cm"),
        ((600, 600), (750, 650), c, "3.1 cm")
    ]
    
    for p_start, p_end, label, val in points:
        # Annotation Line
        draw.line((p_start[0], p_start[1], p_start[0]-50, p_start[1]-50), fill=(200, 220, 240, 150), width=1)
        draw.text((p_start[0]-120, p_start[1]-80), label, font=FONT_XS, fill=(200, 230, 255))
        
        # Measurement
        if rnd.random() > 0.4:
            draw_caliper(draw, p_start, p_end, val)

    # Special effects
    if scan_type in {"echo", "doppler", "cervical"}:
        add_doppler_effect(draw, seed)

    # Vignette & Final Polish
    vignette = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    for r in range(W, 400, -50):
        alpha = int(100 * (1 - r/W))
        vd.ellipse((W//2-r, H//2-r, W//2+r, H//2+r), outline=(0, 0, 0, alpha), width=50)
    img.alpha_composite(vignette)

    # Save as WebP
    img.convert("RGB").save(OUT_DIR / f"{slug}.webp", "WEBP", quality=95, method=6)

def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for scan in SCANS:
        make_scan(*scan)
    print(f"Successfully generated {len(SCANS)} ultra-premium scan assets in {OUT_DIR}")

if __name__ == "__main__":
    main()
