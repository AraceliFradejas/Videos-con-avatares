#!/bin/zsh
set -euo pipefail

if (( $# < 4 || $# > 5 )); then
  echo "Uso: mezclar-musica-fondo.sh VIDEO MUSICA DURACION SALIDA [loop]" >&2
  exit 2
fi

VIDEO=$1
MUSIC=$2
DURATION=$3
OUT=$4
MODE=${5:-single}
if [[ -n "${FFMPEG_BIN:-}" ]]; then
  FF=$FFMPEG_BIN
else
  FF=ffmpeg
fi
FADE_OUT=$(awk -v duration="$DURATION" 'BEGIN { printf "%.3f", duration - 3 }')

if [[ "$MODE" == "loop" ]]; then
  "$FF" -y -i "$VIDEO" -i "$MUSIC" -i "$MUSIC" \
    -filter_complex "[1:a]atrim=0:233.4,asetpts=PTS-STARTPTS[m1];[2:a]atrim=0:233.4,asetpts=PTS-STARTPTS[m2];[m1][m2]acrossfade=d=4:c1=tri:c2=tri,atrim=0:${DURATION},volume=0.095,afade=t=in:st=0:d=2,afade=t=out:st=${FADE_OUT}:d=3[music];[music][0:a]sidechaincompress=threshold=0.025:ratio=8:attack=20:release=450[ducked];[0:a][ducked]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[aout]" \
    -map 0:v -map '[aout]' -c:v copy -c:a aac -b:a 192k -movflags +faststart -t "$DURATION" "$OUT"
else
  "$FF" -y -i "$VIDEO" -i "$MUSIC" \
    -filter_complex "[1:a]atrim=0:${DURATION},asetpts=PTS-STARTPTS,volume=0.113,afade=t=in:st=0:d=1.5,afade=t=out:st=${FADE_OUT}:d=3[music];[music][0:a]sidechaincompress=threshold=0.025:ratio=8:attack=20:release=350[ducked];[0:a][ducked]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[aout]" \
    -map 0:v -map '[aout]' -c:v copy -c:a aac -b:a 192k -movflags +faststart -t "$DURATION" "$OUT"
fi
