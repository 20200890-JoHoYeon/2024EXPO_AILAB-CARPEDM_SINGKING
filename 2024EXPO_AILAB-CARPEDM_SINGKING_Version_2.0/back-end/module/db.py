import pymysql

# DATABASE_HOST = ""
# DATABASE_USER = ""
# DATABASE_PASSWORD = ""

DATABASE_DB = "singking_db"
DATABASE_PORT = 3306

DATABASE_HOST = ""
DATABASE_USER = "root"
DATABASE_PASSWORD = ""

# Database 클래스는 MySQL 데이터베이스와 연결을 담당
class Database:
    def __init__(self):                                          
        self.conn = pymysql.connect(                               # (1) MYSQL Connection 연결 (연결자 = pymysql.connect(연결옵션))
            host=DATABASE_HOST,
            user=DATABASE_USER,
            password=DATABASE_PASSWORD,
            port=DATABASE_PORT,
            db=DATABASE_DB,
            charset="utf8",
        )  
        self.cursor = self.conn.cursor(pymysql.cursors.DictCursor) # (2) 연결자로 부터 DB를 조작할 Cusor 생성 (커서이름 = 연결자.cursor()) 

    def db_login(self, user_id, user_password):
        try:

            SQL = 'SELECT * FROM singking_db.user_info WHERE user_id = %s AND user_pw = %s'
            self.cursor.execute(SQL, (user_id, user_password))
            data = self.cursor.fetchall()

            if data!=():
                user_id = data[0]['user_id']
                user_name = data[0]['user_name']
                print(user_id, user_name)
                return {'status':'success', 'user_id': user_id, 'user_name':user_name}
            else:
                return {'status':'fail'}
        except:
            return {'message':'error'}
    
    def db_register(self, user_id, user_name, user_age, user_gender, user_pw):
        try:
            SQL = '''INSERT INTO singking_db.user_info (user_id, user_name, user_age, user_gender, user_pw, user_membership)
            VALUES (%s, %s, %s, %s,  %s, %s)'''

            self.cursor.execute(SQL, (user_id, user_name, user_age, user_gender, user_pw, 'X'))
            self.conn.commit()
            return {'status':'success'}
        except:
            return {'message':'fail'}
        
       
    def get_user_info(self, user_id):
        try:
            print(user_id)
            SQL = 'SELECT user_name, user_tone, user_level, user_membership FROM singking_db.user_info WHERE user_id = %s'
            self.cursor.execute(SQL, (user_id,))
            data = self.cursor.fetchone()
            print(data, '이거 유저 인포임')

            return data
        except Exception as e:
            return {'message': 'error', 'error': str(e)}
 
    def vocal_data(self, user_id, user_level, pitch_score, beat_score, pronunciation_score):
        try:
            SQL = '''INSERT INTO singking_db.user_scores (user_id, user_level, pitch_score, beat_score, pronunciation_score)

            VALUES (%s, %s, %s, %s,  %s)'''

            self.cursor.execute(SQL, (user_id, 0, pitch_score, beat_score, pronunciation_score))
            self.conn.commit()
            return {'status':'success'}
        except:
            return {'message':'fail'}
    def get_vocal_data(self, user_id):
        try:
            SQL = '''SELECT pitch_score, beat_score, pronunciation_score 
            FROM singking_db.user_scores 
            WHERE user_id = %s
            '''
            self.cursor.execute(SQL, (user_id, ))
            data = self.cursor.fetchall()
 
            return data
        except:
            return {'message':'fail'}
        
    #주간 랭킹 데이터를 가져오는 메서드 -- 민지원
    def get_weekly_ranking(self):
        try:
            SQL='''
            SELECT u.user_name, w.score, RANK() OVER (ORDER BY w.score DESC) As 'rank'
            FROM weekly_ranking w
            JOIN user_info u ON w.user_id = u.user_id
            ORDER BY w.score DESC;
            '''
            self.cursor.execute(SQL)
            data=self.cursor.fetchall()

            return data # 데이터 반환
        except Exception as e:
            return{'message': 'fail','error':str(e)}
        
if __name__ == '__main__':
    dd = Database()

    dd.vocal_data('9dongb', 0, 80.25, 50.25, 70.25)
