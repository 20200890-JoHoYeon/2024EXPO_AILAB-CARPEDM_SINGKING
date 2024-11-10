from spleeter.separator import Separator
import os

# 2stems = vocals and accompaniment
# 4stems = vocals, drums, bass, and other
# 5stems = vocals, drums, bass, piano, and other

path = 'back-end/'

os.chdir(path)
file_name = str(input('음악 파일의 이름을 적어주세요. >>>'))

nsfile_name = file_name.replace(' ', '-')

try:
    os.rename(path+file_name+'.wav', path+nsfile_name+'.wav')
except FileNotFoundError:
    pass
print('기다려주세요.')
spl = r'spleeter separate -p spleeter:2stems -o output '+nsfile_name+'.wav'

# 'spleeter separate -p spleeter:2stems -o output my_song.mp3'
os.system(spl)