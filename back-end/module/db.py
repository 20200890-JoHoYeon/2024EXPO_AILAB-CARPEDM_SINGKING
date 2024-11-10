import pymysql

# DATABASE_HOST = ""
# DATABASE_USER = ""
# DATABASE_PASSWORD = ""

DATABASE_DB = "singking_db"
DATABASE_PORT = 3307

DATABASE_HOST = "localhost"
DATABASE_USER = "root"
DATABASE_PASSWORD = "011129"

class Database:
    def __init__(self):                                          
        self.conn = pymysql.connect(                               # MYSQL Connection 연결
            host=DATABASE_HOST,
            user=DATABASE_USER,
            password=DATABASE_PASSWORD,
            port=DATABASE_PORT,
            db=DATABASE_DB,
            charset="utf8",
        )  
        self.cursor = self.conn.cursor(pymysql.cursors.DictCursor) # DB를 조작할 Cursor 생성

    def db_login(self, user_id, user_password):
        try:
            SQL = 'SELECT * FROM singking_db.user_info WHERE user_id = %s AND user_pw = %s'
            self.cursor.execute(SQL, (user_id, user_password))
            data = self.cursor.fetchall()

            if data != ():
                user_id = data[0]['user_id']
                user_name = data[0]['user_name']
                print(user_id, user_name)
                return {'status': 'success', 'user_id': user_id, 'user_name': user_name}
            else:
                return {'status': 'fail'}
        except:
            return {'message': 'error'}

    def db_register(self, user_id, user_name, user_age, user_gender, user_pw):
        try:
            SQL = '''INSERT INTO singking_db.user_info (user_id, user_name, user_age, user_gender, user_pw, user_membership)
            VALUES (%s, %s, %s, %s,  %s, %s)'''

            self.cursor.execute(SQL, (user_id, user_name, user_age, user_gender, user_pw, 'X'))
            self.conn.commit()
            return {'status': 'success'}
        except:
            return {'message': 'fail'}

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
            VALUES (%s, %s, %s, %s, %s)'''

            self.cursor.execute(SQL, (user_id, 0, pitch_score, beat_score, pronunciation_score))
            self.conn.commit()
            return {'status': 'success'}
        except:
            return {'message': 'fail'}

    def get_vocal_data(self, user_id):
        try:
            SQL = '''SELECT pitch_score, beat_score, pronunciation_score 
            FROM singking_db.user_scores 
            WHERE user_id = %s'''

            self.cursor.execute(SQL, (user_id,))
            data = self.cursor.fetchall()
            print(data)
            return data
        except:
            return {'message': 'fail'}

    def get_weekly_ranking(self):
        try:
            SQL = '''
            SELECT u.user_name, w.score, RANK() OVER (ORDER BY w.score DESC) As 'rank'
            FROM weekly_ranking w
            JOIN user_info u ON w.user_id = u.user_id
            ORDER BY w.score DESC;
            '''
            self.cursor.execute(SQL)
            data = self.cursor.fetchall()

            return data  # 데이터 반환
        except Exception as e:
            return {'message': 'fail', 'error': str(e)}

    # user_info 테이블에서 user_tone 값을 업데이트하는 함수
    def update_user_tone(self, user_id, tone):
        try:
            # SQL 실행 (트랜잭션 없이 바로 커밋)
            SQL = "UPDATE singking_db.user_info SET user_tone = %s WHERE user_id = %s"
            self.cursor.execute(SQL, (tone, user_id))
            
            # 자동 커밋 설정이 되어 있다면 별도의 커밋이 필요 없을 수도 있음
            self.conn.commit()  # 쿼리가 자동으로 커밋되지 않으면 커밋해줘야 함

            print(f"Successfully updated user_tone for user_id: {user_id}")

        except pymysql.MySQLError as e:  # pymysql 오류 처리
            print(f"MySQL Error: {e}")
        except Exception as e:  # 다른 일반적인 오류 처리
            print(f"Error updating user_info: {e}")

