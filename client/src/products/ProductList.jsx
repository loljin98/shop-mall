import { Link } from "react-router-dom";
import api from "../api/api";
import { useEffect, useState } from "react";

const ProductList = () => {
    const [products, setproducts] = useState([]);

    // db에서 데이터 가져오기
    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await api.get('/products');
                setproducts(response.data) // data속성 불러줌
                console.log("상품 목록 조회 에러 : ", err);
                
            }catch(error){

            }
        }
        fetchProducts(); // 함수 호출
    }, []); // 최초 1번 렌더링

    return(
        <div className="product-list">
            <h2>상품 리스트</h2>
            <table>
                <thead>
                    <tr>
                        <th>번호</th><th>상품명</th><th>가격</th>
                    </tr>
                </thead>
                <tbody>
                        {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>
                            <Link to={`/products/${product.id}`}>{product.product_name}</Link>
                        </td>
                        <td>{product.name}</td>
                    </tr>
                        ))}
                </tbody>
             
            </table>
        </div>
    )
}

export default ProductList;