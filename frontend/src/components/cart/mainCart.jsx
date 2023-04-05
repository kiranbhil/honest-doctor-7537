import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import PriceDetails from "./priceDetails";
import SingleProduct from "./singleProduct";
import { useNavigate } from "react-router-dom";
const getData=async()=>{
  return await axios.get("https://concerned-rose-bighorn-sheep.cyclic.app/cartproduct")
}
const MainCart = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  var sum = [];

  if (data.length > 0) {
    let intval = 0;
    sum = data.map((elem) => {
      const val1 = elem.price.cost;
      return (intval = intval + val1);
    });
  }

  const total = sum[sum.length - 1];

  var sumMrp = [];

  if (data.length > 0) {
    let intval = 0;
    sumMrp = data.map((elem) => {
      const val1 = elem.price.mrp;
      return (intval = intval + val1);
    });
  }

  const totalMrp = sumMrp[sumMrp.length - 1];

  const handleClickOrder = () => {
    navigate("/checkout");
  };

  useEffect(() => {
      getData().then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ChakraProvider>
      <Flex gap={4} padding="50px">
        <Box w={"70%"}>
          {data.length > 0 &&
            data.map((elem) => (
              <SingleProduct
                key={elem._id}
                image={elem.url}
                Prodquan={elem.quantity}
                Proname={elem.title.longTitle}
                id={elem._id}
                MRP={elem.price.mrp}
                cost={elem.price.cost}
                discount={elem.price.discount}
                setData={setData}
                getData={getData}
              />
            ))}
          <Flex
            justifyContent={"flex-end"}
            p="20px"
            boxShadow={
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;"
            }
          >
            <Button
              w={"25%"}
              fontSize="19"
              bgColor={"#fb641b"}
              _hover={"none"}
              borderRadius="0"
              color={"whiteAlpha.900"}
              onClick={handleClickOrder}
            >
              Place Orders
            </Button>
          </Flex>
        </Box>
        <Box w={"30%"} backdropBlur>
          <PriceDetails total={total} totalMrp={totalMrp} />
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default MainCart;
