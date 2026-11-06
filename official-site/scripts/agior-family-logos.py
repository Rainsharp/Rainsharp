"""Build AGIORCLOUD / AGIORGO logo variants from the official AGIOR artwork.

Traces public/brand/agior/agior-mark-color.png and agior-wordmark-navy.png to SVG
paths, then adds a cloud (AGIORCLOUD) or speed streaks (AGIORGO) to the mark and
composes the wordmarks from AGIOR's own letterforms.

    pip install opencv-python-headless pillow numpy
    python3 scripts/agior-family-logos.py
"""
import cv2, numpy as np, os, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(ROOT, 'public/brand/agior/')
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'public/brand')
S = 8  # supersampling factor for tracing
NAVY = '#0A0D3F'
G0, G1 = '#7356F0', '#7379FB'  # swoosh gradient: bottom-left -> top-right


def upmask(alpha):
    big = cv2.resize(alpha.astype(np.float32), None, fx=S, fy=S, interpolation=cv2.INTER_CUBIC)
    big = cv2.GaussianBlur(big, (0, 0), S * 0.45)
    return (big > 127).astype(np.uint8)


def trace(mask, eps=0.35, scale=1.0 / S, dx=0.0, dy=0.0):
    cs, _ = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    d = []
    for c in cs:
        if cv2.contourArea(c) < (S * S * 4):
            continue
        p = cv2.approxPolyDP(c, eps * S, True).reshape(-1, 2)
        pts = [f'{x * scale + dx:.1f} {y * scale + dy:.1f}' for x, y in p]
        d.append('M' + ' L'.join(pts) + 'Z')
    return ''.join(d)


# ---------- mark ----------
m = np.array(Image.open(B + 'agior-mark-color.png').convert('RGBA')).astype(np.float32)
alpha = m[:, :, 3]
is_sw = m[:, :, 0] >= 60
navy_a = np.where(~is_sw, alpha, 0)
sw_a = np.where(is_sw, alpha, 0)
MW, MH = 337, 280
navy_d = trace(upmask(navy_a))
sw_d = trace(upmask(sw_a))

GRAD = (f'<linearGradient id="{{id}}" x1="20" y1="265" x2="310" y2="60" gradientUnits="userSpaceOnUse">'
        f'<stop offset="0" stop-color="{G0}"/><stop offset="1" stop-color="{G1}"/></linearGradient>')


def cloud_path(cx, cy, s):
    """Rounded cloud outline centred at (cx, cy), unit size s."""
    return (f'M{cx - 1.55 * s:.1f} {cy + 0.55 * s:.1f}'
            f'a{0.55 * s:.1f} {0.55 * s:.1f} 0 0 1 {0.1 * s:.1f} -{1.05 * s:.1f}'
            f'a{0.8 * s:.1f} {0.8 * s:.1f} 0 0 1 {1.45 * s:.1f} -{0.55 * s:.1f}'
            f'a{0.62 * s:.1f} {0.62 * s:.1f} 0 0 1 {1.05 * s:.1f} {0.55 * s:.1f}'
            f'a{0.55 * s:.1f} {0.55 * s:.1f} 0 0 1 {0.0 * s:.1f} {1.05 * s:.1f}Z')


def cloud_outline_d():
    """Cloud outline built from a union of circles, traced like the official mark."""
    oy = 40  # canvas offset so the cloud may extend above y=0
    Wc, Hc = MW * S, (MH + oy) * S
    cv = np.zeros((Hc, Wc), np.uint8)
    def circ(x, y, r):
        cv2.circle(cv, (int(x * S), int((y + oy) * S)), int(r * S), 1, -1)
    circ(250, 24, 21); circ(283, 4, 29); circ(314, 24, 20)
    cv2.rectangle(cv, (int(250 * S), int((24 + oy) * S)), (int(314 * S), int((45 + oy) * S)), 1, -1)
    k = int(18 * S)
    inner = cv2.erode(cv, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k)))
    ring = (cv - inner).astype(np.uint8)
    return trace(ring, eps=0.3, dy=-oy)


CLOUD_D = cloud_outline_d()
STREAKS = [(64, 40, 54), (34, 66, 70), (48, 92, 44)]


def extras(variant, fill_accent, fill_navy):
    if variant == 'cloud':
        return f'<path d="{CLOUD_D}" fill="{fill_accent}" fill-rule="evenodd"/>'
    if variant == 'go':
        return ''.join(
            f'<path d="M{x0} {y0}h{L}" stroke="{fill_accent}" stroke-width="12" stroke-linecap="round"/>'
            for x0, y0, L in STREAKS)
    return ''


VIEWBOX = {None: (0, 0, MW, MH), 'cloud': (0, -28, MW, MH + 28), 'go': (0, 0, MW, MH)}


def mark_svg(variant, tone, gid):
    if tone == 'color':
        acc = f'url(#{gid})'
        nav = NAVY
        defs = '<defs>' + GRAD.format(id=gid) + '</defs>'
    else:
        acc = nav = '#FFFFFF' if tone == 'white' else '#000000'
        defs = ''
    vx, vy, vw, vh = VIEWBOX[variant]
    body = (f'<path d="{navy_d}" fill="{nav}" fill-rule="evenodd"/>'
            f'<path d="{sw_d}" fill="{acc}" fill-rule="evenodd"/>' + extras(variant, acc, nav))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vx} {vy} {vw} {vh}" width="{vw}" height="{vh}">'
            f'{defs}{body}</svg>')


# ---------- wordmark letters ----------
w = np.array(Image.open(B + 'agior-wordmark-navy.png').convert('RGBA'))[:, :, 3].astype(np.float32)
H = w.shape[0]
boxes = {'A': (8, 133), 'G': (138, 261), 'I': (282, 308), 'O': (331, 463), 'R': (476, 585)}
glyph = {k: w[:, a:b] for k, (a, b) in boxes.items()}

TOP, BOT = 8, 134  # cap line / baseline for straight letters
SW_V, SW_H = 26, 23  # vertical / horizontal stroke weights


def blank(width):
    return np.zeros((H, width), np.float32)


g = glyph['G']
o = glyph['O']
# C: top half of G mirrored onto the bottom half (G's bar lives below the midline)
mid = 72.5
top = g[: int(mid) + 1].copy()
top[56:, 70:] = 0
C = blank(g.shape[1])
C[: top.shape[0]] = top
fl = top[::-1][1:]
C[int(mid) + 1: int(mid) + 1 + fl.shape[0]] = np.maximum(C[int(mid) + 1: int(mid) + 1 + fl.shape[0]], fl[: H - int(mid) - 1])
C = C[:, :114]

L = blank(92)
L[TOP:BOT, 0:SW_V] = 255
L[BOT - SW_H:BOT, 0:92] = 255

# U: bottom half of O + straight stems
U = blank(o.shape[1])
U[int(mid):, :] = o[int(mid):, :]
U[TOP:int(mid) + 1, 0:27] = 255
U[TOP:int(mid) + 1, o.shape[1] - 27:] = 255

# D: stem + right half of O
half = o[:, 66:]
D = blank(26 + 30 + half.shape[1])
D[TOP:BOT, 0:SW_V] = 255
ox = 30 + 26 - 26
D[:, ox + 26: ox + 26 + half.shape[1]] = np.maximum(D[:, ox + 26: ox + 26 + half.shape[1]], half)
D[TOP:TOP + SW_H, 0:ox + 30] = 255
D[BOT - SW_H:BOT, 0:ox + 30] = 255

letters = {'A': glyph['A'], 'G': g, 'I': glyph['I'], 'O': o, 'R': glyph['R'], 'C': C, 'L': L, 'U': U, 'D': D}
# side bearings (px) tuned to match the official AGIOR spacing
GAP = {'AG': 5, 'GI': 21, 'IO': 23, 'OR': 13, 'RC': 26, 'CL': 18, 'LO': 6, 'OU': 18, 'UD': 21, 'RG': 24, 'GO': 14}


def wordmark(word, accent_from, tone, gid):
    x = 0
    parts = []
    for i, ch in enumerate(word):
        if i:
            x += GAP.get(word[i - 1] + ch, 18)
        gl = letters[ch]
        d = trace(upmask(gl), eps=0.3, dx=x)
        parts.append((i >= accent_from, d))
        x += gl.shape[1]
    width = x
    if tone == 'color':
        nav, acc = NAVY, f'url(#{gid})'
        defs = (f'<defs><linearGradient id="{gid}" x1="0" y1="{H}" x2="{width}" y2="0" gradientUnits="userSpaceOnUse">'
                f'<stop offset="0" stop-color="{G0}"/><stop offset="1" stop-color="{G1}"/></linearGradient></defs>')
    else:
        nav = '#FFFFFF' if tone == 'white' else '#000000'
        acc = 'url(#%s)' % gid if tone == 'white' else nav
        defs = (f'<defs><linearGradient id="{gid}" x1="0" y1="{H}" x2="{width}" y2="0" gradientUnits="userSpaceOnUse">'
                f'<stop offset="0" stop-color="#A99BFF"/><stop offset="1" stop-color="#AFC3FF"/></linearGradient></defs>'
                if tone == 'white' else '')
    base = ''.join(d for a, d in parts if not a)
    accent = ''.join(d for a, d in parts if a)
    body = f'<path d="{base}" fill="{nav}" fill-rule="evenodd"/>'
    if accent:
        body += f'<path d="{accent}" fill="{acc}" fill-rule="evenodd"/>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {H}" width="{width}" height="{H}">'
            f'{defs}{body}</svg>')


for name, variant, word in [('agiorcloud', 'cloud', 'AGIORCLOUD'), ('agiorgo', 'go', 'AGIORGO')]:
    os.makedirs(f'{OUT}/{name}', exist_ok=True)
    for tone in ['color', 'white', 'black']:
        open(f'{OUT}/{name}/{name}-mark-{tone}.svg', 'w').write(mark_svg(variant, tone, f'{name}-g-{tone}'))
        open(f'{OUT}/{name}/{name}-wordmark-{tone}.svg', 'w').write(wordmark(word, 5, tone, f'{name}-w-{tone}'))
    print('wrote', f'{OUT}/{name}/')
