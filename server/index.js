import express from 'express'
import mysql from "mysql2"

// 앱 객체 생성
const app = express();
const PORT = 8000;

// mysql 연결 설정
// host
const db = mysql.createConnection({
    host: "localhost",
    user: 'jsuser',
    password: "pwjs",
    database: "jsdb"
});

// mysql dbms에 연결
db.connect((err) => {
    if(err){
        console.error("DB 연결오류!!", err)
        return;
    }
    console.log("데이터베이스에 연결했습니다.")   
});



// 기본 라우트 설정
app.get('/', (req, res) => {
    res.send("<h1>API 서버와 DB연동</h1>");
})

// 상품목록조회
// db.query(sql, 데이터, 콜백함수)
app.get("/api/products", (req, res) => {
    const sql = "SELECT * FROM product";
    db.query(sql, (err, results) => {
        if(err){
            console.log("상품 조회 오류!!", err);
            res.send("상품 조회 중 오류 발생!!");
            return;
            
        }
        res.json(results);  // json형태로 응답
    });
});

// 본문 요청 파싱
app.use(express.json());

// 상품등록
app.post("/api/products", (req,res)=> {
    const {productName, price} = req.body; // 요청한 속성 데이터
    const sql = "INSERT INTO product(product_name, price) VALUES(?, ?)"
    db.query(sql, [productName, price], (err, results) => {
        if(err){
            console.log("상품 조회 오류!!", err);
            res.send("상품 조회 중 오류 발생!!");
            return;
            
        }
        res.send("상품 등록 완료!!")

    });
})

// 상품 상세 보기 (1건)
app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const sql = "SELECT * FROM product WHERE id = ?"
    db.query(sql, [productId], (err, results) => {
        if(err){
            console.log("상품 조회 에러", err);
            res.send("상품 조회 중 오류가 발생했습니다.");
            return;
            
        }
        res.json(results[0]);
    });
})

// 상품 삭제(1건)
//  app.delete(경로, 콜백함수)
    app.delete("/api/products/:id",(req, res) => {
        const productId = req.params.id;
        const sql = "DELETE FROM product WHERE id = ?";
        db.query(sql, [productId], (err, results) => {
            if(err){
            console.log("상품 조회 에러", err);
            res.send("상품 조회 중 오류가 발생했습니다.");
            return;
            
        }
            res.send("상품이 성공적으로 삭제되었습니다.")
        });
    });

    // 상품수정
    // app.put(경로, 콜백함수)
    app.put("/api/products/:id", (req, res) => {
        // 수정을 하려면 이미 존재하는 상품을 가져와야 함
         const productId = req.params.id;
         const {productName, price} = req.body; // 수정된 데이터
         const sql = "UPDATE product SET product_Name = ?, price = ? WHERE id = ?"
         db.query(sql, [productName, price, productId], (err, results) => {
            if(err){
            console.log("상품 조회 에러", err);
            // 500 : 코드 오류, 404 : 페이지없음, 200 : 정상
            res.status(501).send("상품 조회 중 오류가 발생했습니다.");
            return;   
        }
            res.status(200).send("상품이 성공적으로 수정되었습니다.");
         })

    })




// 서버 실행
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}에서 서버 실행중...`);
    
})

