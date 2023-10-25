import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import styled from 'styled-components';

interface Product {
  id: any;
  title: any;
  price: any;
  description: any;
  Catego: any;
  image: any;

}
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div.attrs<{ direction: string }>((props) => ({
  direction: props.direction,
}))`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 3;
`;

const Wrapper = styled.div<{ slideIndex: number }>`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div<{ bg: string }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 70%;
  flex: 1;
  margin: 100;

    max-width: 800px;
`;

const Image = styled.img`
  height: 80%;
  margin-top: 0; /* Remove top margin */
  margin-bottom: 0; /* Remove bottom margin */
  max-width: 400px;
`;

const InfoContainer = styled.div`
  flex: 5;
  max-width: 500px; /* Set a maximum width to prevent overflow */
  display: flex;
  flex-direction: column; /* Stack contents vertically */
  align-items: flex-start; /* Push content to the left */

`;

const Title = styled.h1`
  font-size: 50px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderItems, setsliderItems] = useState<Product[]>([]);
  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then(res => res.json())
      .then((json) => setsliderItems(json));

  }, []);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={"f5fafd"} key={item.id}>
            <ImgContainer>
              <Image src={item.image} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.description}</Desc>
              <Button  >SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;