import os;

# Turn on camera

# Start Streaming

os.system("raspivid -n -vf -hf -t 0 -w 1280 -h 720 -fps 30 -b 500000 -o - | ffmpeg -framerate 30 -i - -f mpeg1video -vf \"crop=iw-mod(iw\,2):ih-mod(ih\,2)\" -b 0 http://localhost:8082/my_secret_yo");

# Notify API that we are at a functional status
