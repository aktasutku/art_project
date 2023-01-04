import { replaceCart } from "./cartItemSlice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_REALTIMEDATABASE_URL}/cart.json`
      );
      if (!response.ok) throw new Error("Could not fetch data");
      const data = await response.json();

      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendCartData = (cart) => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_REALTIMEDATABASE_URL}/cart.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) throw new Error("Sending cart data failed.");
    };
    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
