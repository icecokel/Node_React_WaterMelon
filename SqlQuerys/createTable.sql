-- 기존 테이블 날리기
DROP TABLE USERS;

-- USERS 테이블

CREATE TABLE USERS (
user_id INT(100) PRIMARY KEY AUTO_INCREMENT COMMENT '사용자 코드',
email VARCHAR(30) NOT NULL COMMENT '사용자 이메일',
PASSWORD VARCHAR(30) NOT NULL COMMENT '비밀번호', 
sns VARCHAR(30) COMMENT 'SNS 로그인 여부', 
create_date DATETIME DEFAULT NOW() COMMENT '사용자 가입일',
update_date DATETIME COMMENT '수정일',
nickname VARCHAR(30) NOT NULL COMMENT '별명',
profile_image VARCHAR(50) COMMENT '프로필 사진',
del_yn VARCHAR(1) CHECK(del_yn IN ('Y','N')) DEFAULT 'N' COMMENT '삭제 여부'
)DEFAULT CHARSET = utf8;

CREATE TABLE ROOMS (
room_id INT(200) NOT NULL, AUTO_INCREMENT COMMENT '채팅방 코드',
user_id INT(100) NOT NULL COMMENT '사용자 코드',
create_date DATETIME DEFAULT NOW() COMMENT '채팅방 생성일',
update_date DATETIME COMMENT '수정일'
del_yn VARCHAR(1) CHECK(del_yn IN ('Y','N')) DEFAULT 'N' COMMENT '삭제 여부'
)

