
### mysql - jsdb
create table product(<br>
	-- 칼럼명 자료형 
    id int auto_increment primary key,	-- PRIMARY KEY = 숫자형 기본키<br>
    product_name varchar(30) not null, -- not null = 문자열 필수 입력<br>
    price int not null,
    created_at timestamp default current_timestamp -- 날짜 및 시간
    <br>
);