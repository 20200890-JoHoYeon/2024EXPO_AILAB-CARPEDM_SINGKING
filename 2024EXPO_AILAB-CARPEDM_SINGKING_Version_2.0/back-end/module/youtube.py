import yt_dlp
import os
import moviepy.editor as mp

def download_audio_with_ytdlp(artist, song_title, inst=0, output_filename='output.wav'):
    
    inst = 'TJ 노래방' if inst == 1 else 'offical audio'
    query = f"{artist} {song_title} {inst}"
    ydl_opts = {
        'format': 'bestaudio/best',
        'noplaylist': True,
        'quiet': True,
        'default_search': 'ytsearch',
        'extractaudio': True,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
        'outtmpl': '%(title)s.%(ext)s',
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(query, download=True)
        audio_file = ydl.prepare_filename(info)
        return audio_file

def convert_to_wav(input_file, output_file='output.wav'):
    # mp4 파일을 wav 파일로 변환
    clip = mp.AudioFileClip(input_file)
    clip.write_audiofile(output_file, codec='pcm_s16le')

    # 임시 mp4 파일 삭제
    os.remove(input_file)
    print(f"WAV file saved as: {output_file}")

# 가수와 곡 제목 입력
artist = "정준일"
song_title = "안아줘"

# 유튜브에서 다운로드 후 WAV로 변환
audio_file = download_audio_with_ytdlp(artist, song_title)
convert_to_wav(audio_file, 'song.wav')
