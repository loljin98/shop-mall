import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { useEffect, useState } from "react";

const ProductInfo = () => {
    // URL의 경로 추출(받기)
    const {id} = useParams();
    const [product, setProducts] = useState(null);
    // 페이지 이동
    const navigate = useNavigate();

    // db에서 해당 id의 상품 가져오기
    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await api.get(`/products/${id}`)
                setProducts(response.data);
            }catch(error){
                console.log("상품 상세 조회 에러: ", error);
                
            }
        }
        fetchProducts(); // 함수호출
    }, [id]);

    // id에 해당하는 상품 가져오기
    // id는 문자이므로 숫자형으로 변환 - Number(), ParseInt()
    // const product = products.find(p => p.id === Number(id));

    return(
        <div className="product-info">
            <h2>상품 정보</h2>
            {product && ( <div className="product-detail">
                <p>상품명: {product.product_name}</p>
                <p>가격: {product.price}원</p>
                <p>등록일: {product.created_at}</p>
                {/* <p>설명: {product.description}</p> */}
            </div>
        )}
            <div>
                <button onClick={() => {navigate('/products')}}>목록 보기</button>
            </div>
        </div>
    )
}

export default ProductInfo;