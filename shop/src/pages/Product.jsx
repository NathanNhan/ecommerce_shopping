import { Add, Remove } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
 import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import {useState, useEffect} from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../cartRedux/cartRedux";
import {useSelector} from "react-redux";
import { createReviews, deleteReviewUser, getReviews, updateReviewProduct } from "../cartRedux/apiCall";
import { deleteReview } from "../cartRedux/reviewRedux";



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Images = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Buttons = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  
  const [quantity,setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const {id} = useParams();
  const dispatch = useDispatch();
  
  const product = useSelector((state) => state.product.products.find(item => item._id === id));
  const userInfo = useSelector(state => state.user.currentUser?.username);
  const allReviews = useSelector(state => state.review.reviews);
  //useEffect
  useEffect(()=>{
  //write your effect here...
    getReviews(id,dispatch)
  },[])
  // decrease quantity
  const handleDecrease = (type) => {
    if(type === "decrease") {
      quantity > 1 && setQuantity(quantity - 1)

    }
  }
  //increase quantity
  const handleIncrease = (type) => {
    if(type === "increase") {
      setQuantity(quantity + 1 )

    }
  }
  //add to cart
  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
    
  };
  //submit review
 const submitReview = (e) => {
   e.preventDefault();
  
   createReviews(id, { username: userInfo, comment,rating} , dispatch);
 }
 //delete review
 const deleteReview = (reviewId, productID) => {
  deleteReviewUser(reviewId, dispatch, productID);
 };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Images src={product.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product?.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product?.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleDecrease("decrease")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleIncrease("increase")} />
            </AmountContainer>
            <Buttons onClick={handleAddToCart}>ADD TO CART</Buttons>
          </AddContainer>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>

              {allReviews &&
                allReviews?.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.username}</strong>
                    <p class="starability-result" data-rating={review.rating}>
                      Rated: {review.rating}
                    </p>

                    <p>{review.comment}</p>
                    {userInfo === review.username && (
                      <button
                        style={{
                          margin: "5px",
                          padding: "7px 12px",
                          color: "white",
                          background: "#DB1024",
                          outline: "none",
                          border: "none",
                        }}
                        onClick={() => deleteReview(review._id, product._id)}
                      >
                        Delete
                      </button>
                    )}
                  </ListGroup.Item>
                ))}

              {/* <ListGroup.Item>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )} */}
              <form
                className="form"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                onSubmit={submitReview}
              >
                <div>
                  <h2>Write a customer review</h2>
                </div>
                <div>
                  <label htmlFor="rating">Rating</label>
                  <select
                    style={{ margin: "25px" }}
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="1">1- Bad</option>
                    <option value="2">2- Fair</option>
                    <option value="3">3- Good</option>
                    <option value="4">4- Very good</option>
                    <option value="5">5- Excelent</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>

                <div>
                  <label />
                  <button
                    style={{
                      margin: "5px",
                      padding: "7px 12px",
                      color: "white",
                      background: "teal",
                      outline: "none",
                      border: "none",
                    }}
                    className="primary"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>

              {/* </ListGroup.Item>
              </ListGroup> */}
            </Col>
          </Row>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
