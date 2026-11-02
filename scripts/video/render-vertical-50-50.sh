#!/bin/zsh
set -euo pipefail

if (( $# != 5 )); then
  echo "Uso: render-vertical-50-50.sh CONFIG_JSON TIMINGS_JSON AVATAR_MP4 SCREENSHOTS_DIR OUTPUT_MP4" >&2
  exit 2
fi

CONFIG=$1
TIMINGS=$2
AVATAR=$3
SHOTS=$4
OUT=$5
if [[ -n "${FFMPEG_BIN:-}" ]]; then
  FF=$FFMPEG_BIN
else
  FF=ffmpeg
fi
if [[ -n "${FONT_FILE:-}" ]]; then
  FONT=$FONT_FILE
elif [[ -f /System/Library/Fonts/Supplemental/Arial.ttf ]]; then
  FONT=/System/Library/Fonts/Supplemental/Arial.ttf
else
  FONT=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf
fi
CARDS=/tmp/vertical-50-50-cards
mkdir -p "$CARDS"

if jq -e '.scenes[].visual | select(. == "intro")' "$CONFIG" >/dev/null; then
  "$FF" -y -f lavfi -i color=c=0x071827:s=1080x960 \
    -vf "drawtext=fontfile=${FONT}:text='HOLA, SOY ARUCCI':fontcolor=white:fontsize=72:x=(w-text_w)/2:y=330,drawtext=fontfile=${FONT}:text='El avatar de Araceli':fontcolor=0x56D8C8:fontsize=42:x=(w-text_w)/2:y=435" \
    -frames:v 1 "$CARDS/intro.png" >/dev/null 2>&1
fi
if jq -e '.scenes[].visual | select(. == "outro")' "$CONFIG" >/dev/null; then
  "$FF" -y -f lavfi -i color=c=0x071827:s=1080x960 \
    -vf "drawtext=fontfile=${FONT}:text='¿SEGUIMOS APRENDIENDO?':fontcolor=white:fontsize=58:x=(w-text_w)/2:y=300,drawtext=fontfile=${FONT}:text='SIGUE A ARACELI EN SUS REDES':fontcolor=0x56D8C8:fontsize=38:x=(w-text_w)/2:y=415,drawtext=fontfile=${FONT}:text='@arucci1':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=520" \
    -frames:v 1 "$CARDS/outro.png" >/dev/null 2>&1
fi

typeset -a args labels
count=$(jq '.scenes | length' "$CONFIG")
for ((i=0; i<count; i++)); do
  visual=$(jq -r ".scenes[$i].visual" "$CONFIG")
  duration=$(jq -r ".scenes[$i].duration" "$TIMINGS")
  if [[ "$visual" == "intro" || "$visual" == "outro" ]]; then
    source="$CARDS/$visual.png"
  else
    source="$SHOTS/$visual"
  fi
  args+=( -loop 1 -t "$duration" -i "$source" )
done
args+=( -i "$AVATAR" )

filter=''
for ((i=0; i<count; i++)); do
  filter+="[$i:v]split=2[blur$i][main$i];"
  filter+="[blur$i]scale=1080:960:force_original_aspect_ratio=increase,crop=1080:960,boxblur=16:6[blurred$i];"
  filter+="[main$i]scale=1020:900:force_original_aspect_ratio=decrease[shot$i];"
  filter+="[blurred$i][shot$i]overlay=(W-w)/2:(H-h)/2,setsar=1[panel$i];"
done
for ((i=0; i<count; i++)); do filter+="[panel$i]"; done
filter+="concat=n=${count}:v=1:a=0[bottom];"
avatar_index=$count
filter+="[$avatar_index:v]crop=720:640:0:175,scale=1080:960,setsar=1[top];"
filter+="[top][bottom]vstack=inputs=2,drawbox=x=0:y=954:w=1080:h=12:color=0x56D8C8:t=fill[out]"
duration=$(jq -r '.duration' "$TIMINGS")

"$FF" -y "${args[@]}" -filter_complex "$filter" -map '[out]' -map "${avatar_index}:a" \
  -t "$duration" -r 30 -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -movflags +faststart "$OUT"
