#!/usr/bin/env python3
"""Extract people-free RED2 frame sequences and short clips.

Ranges were checked visually against 1 fps contact sheets on 2026-11-02.
People appear in red2-salon.mp4 around 6.4–7.6s (car window and desk)
and from ~18.9s (two people), and in red2-servis.mp4 around 3.6–6.6s.
Those stretches are left out. See README.
"""
from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

ROOT = Path("/workspace")
SRC = Path("/tmp/red2-src")
TMP = Path("/tmp/seq")
FILES = {
    "hero": SRC / "red2-hero.mp4",
    "salon": SRC / "red2-salon.mp4",
    "servis": SRC / "red2-servis.mp4",
}

# (source key, start seconds, duration seconds, fps)
SCENES = {
    "s1": [("hero", 0.00, 2.05, 12)],
    "s2": [("salon", 0.00, 5.40, 7), ("salon", 8.00, 7.40, 7)],
    "s3": [("salon", 15.90, 2.80, 12)],
    "s4": [("servis", 2.00, 1.40, 12), ("servis", 6.90, 2.10, 12)],
}


def run(cmd: list[str]) -> None:
    print("+", " ".join(cmd), flush=True)
    subprocess.run(cmd, check=True)


def extract_span(src: Path, start: float, dur: float, fps: int, dest: Path) -> int:
    if dest.exists():
        shutil.rmtree(dest)
    (dest / "d").mkdir(parents=True)
    (dest / "m").mkdir(parents=True)
    run(
        [
            "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
            "-ss", f"{start:.3f}", "-t", f"{dur:.3f}", "-i", str(src),
            "-filter_complex",
            f"[0:v]fps={fps},split[a][b];"
            "[a]scale=1280:-2:flags=lanczos[d];"
            "[b]scale=720:-2:flags=lanczos[m]",
            "-map", "[d]", "-c:v", "libwebp", "-quality", "58", "-compression_level", "6",
            str(dest / "d" / "%04d.webp"),
            "-map", "[m]", "-c:v", "libwebp", "-quality", "60", "-compression_level", "6",
            str(dest / "m" / "%04d.webp"),
        ]
    )
    nd = len(list((dest / "d").glob("*.webp")))
    nm = len(list((dest / "m").glob("*.webp")))
    if nd == 0 or nd != nm:
        raise SystemExit(f"frame count mismatch in {dest}: desktop {nd} mobile {nm}")
    return nd


def concat(parts: list[Path], scene: str) -> int:
    for tier in ("m", "d"):
        out = ROOT / "media" / "frames" / tier / scene
        if out.exists():
            shutil.rmtree(out)
        out.mkdir(parents=True)
        n = 1
        for part in parts:
            files = sorted((part / tier).glob("*.webp"))
            for f in files:
                shutil.copy(f, out / f"{n:04d}.webp")
                n += 1
        count = n - 1
    return count


def still(src: Path, t: float, scene: str) -> None:
    for tier, width, q in (("d", 1280, "58"), ("m", 720, "62")):
        out = ROOT / "media" / "frames" / tier / scene
        if out.exists():
            shutil.rmtree(out)
        out.mkdir(parents=True)
        run(
            [
                "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
                "-ss", f"{t:.3f}", "-i", str(src), "-frames:v", "1",
                "-vf", f"scale={width}:-2:flags=lanczos",
                "-c:v", "libwebp", "-quality", q, "-compression_level", "6",
                str(out / "0001.webp"),
            ]
        )


def clip(src: Path, start: float, dur: float, width: int, dest: Path, crf: int) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    run(
        [
            "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
            "-ss", f"{start:.3f}", "-t", f"{dur:.3f}", "-i", str(src),
            "-an", "-vf", f"scale={width}:-2:flags=lanczos,fps=30",
            "-c:v", "libx264", "-preset", "slow", "-crf", str(crf),
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-g", "30",
            str(dest),
        ]
    )


def clip_concat(spans: list[tuple[str, float, float]], width: int, dest: Path, crf: int) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    inputs: list[str] = []
    parts: list[str] = []
    for i, (key, start, dur) in enumerate(spans):
        inputs += ["-ss", f"{start:.3f}", "-t", f"{dur:.3f}", "-i", str(FILES[key])]
        parts.append(
            f"[{i}:v]scale={width}:-2:flags=lanczos,fps=30,setsar=1[v{i}]"
        )
    chain = "".join(f"[v{i}]" for i in range(len(spans)))
    fc = ";".join(parts) + f";{chain}concat=n={len(spans)}:v=1:a=0[v]"
    run(
        [
            "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
            *inputs, "-filter_complex", fc, "-map", "[v]", "-an",
            "-c:v", "libx264", "-preset", "slow", "-crf", str(crf),
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-g", "30",
            str(dest),
        ]
    )


def poster_from(scene: str, index: int, name: str) -> None:
    src = ROOT / "media" / "frames" / "m" / scene / f"{index:04d}.webp"
    shutil.copy(src, ROOT / "media" / "posters" / name)


def main() -> None:
    TMP.mkdir(parents=True, exist_ok=True)
    (ROOT / "media" / "posters").mkdir(parents=True, exist_ok=True)
    counts: dict[str, int] = {}
    for scene, spans in SCENES.items():
        parts = []
        for i, (key, start, dur, fps) in enumerate(spans):
            dest = TMP / f"{scene}-{i}"
            n = extract_span(FILES[key], start, dur, fps, dest)
            print(f"{scene} part {i}: {n} frames", flush=True)
            parts.append(dest)
        counts[scene] = concat(parts, scene)
        print(f"{scene} total {counts[scene]}", flush=True)

    still(FILES["servis"], 8.20, "s5")
    counts["s5"] = 1

    poster_from("s1", 1, "s1.webp")
    poster_from("s2", 1, "s2.webp")
    mid = max(1, counts["s2"] // 2)
    poster_from("s2", mid, "s2-mid.webp")
    poster_from("s3", 1, "s3.webp")
    poster_from("s4", max(1, counts["s4"] // 2), "s4.webp")
    poster_from("s5", 1, "s5.webp")

    clip(FILES["hero"], 0.00, 2.05, 720, ROOT / "media" / "clips" / "hero-m.mp4", 28)
    clip(FILES["hero"], 0.00, 2.05, 1280, ROOT / "media" / "clips" / "hero-d.mp4", 27)
    clip(FILES["salon"], 15.90, 2.80, 720, ROOT / "media" / "clips" / "badges-m.mp4", 28)
    clip(FILES["salon"], 15.90, 2.80, 1280, ROOT / "media" / "clips" / "badges-d.mp4", 27)
    workshop = [("servis", 2.00, 1.40), ("servis", 6.90, 2.10)]
    clip_concat(workshop, 720, ROOT / "media" / "clips" / "workshop-m.mp4", 28)
    clip_concat(workshop, 1280, ROOT / "media" / "clips" / "workshop-d.mp4", 27)

    lines = ["window.RED2_MEDIA = " + __import__("json").dumps(counts) + ";\n"]
    (ROOT / "media" / "manifest.js").write_text("".join(lines))
    print("COUNTS", counts, flush=True)

    # contact sheets, 8 frames per scene
    qa = ROOT / "qa"
    qa.mkdir(exist_ok=True)
    for scene, count in counts.items():
        folder = ROOT / "media" / "frames" / "m" / scene
        files = sorted(folder.glob("*.webp"))
        if count == 1:
            shutil.copy(files[0], qa / f"{scene}.webp")
            continue
        step = max(1, (len(files) - 1) / 7)
        picks = [files[min(len(files) - 1, round(i * step))] for i in range(8)]
        lst = TMP / f"{scene}-sheet.txt"
        lst.write_text("".join(f"file '{p}'\nduration 1\n" for p in picks))
        run(
            [
                "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
                "-f", "concat", "-safe", "0", "-i", str(lst),
                "-vf", "scale=240:-1,tile=4x2",
                "-frames:v", "1", "-update", "1",
                str(qa / f"{scene}.jpg"),
            ]
        )
    print("done", flush=True)


if __name__ == "__main__":
    main()
