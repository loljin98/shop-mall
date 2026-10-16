import mainPhoto from '../assets/hero.png'

const Main = () => {

    return(
        <div className="main">
            <h2>컴퓨터 기기 쇼핑몰</h2>
            <div>
                <img src={mainPhoto} alt="메인 이미지" />
            </div>
        </div>
    )
}

export default Main;