const enrichOrdersWithPizzaTitles = (pizzas, orders) => {
  return orders.map((order) => ({
    ...order,
    dishes: order.dishes.map((orderDish) => {
      const matchedPizza = pizzas.find((pizza) => pizza._id === orderDish.dish);

      if (matchedPizza) {
        const price = orderDish.size === 'family' ? matchedPizza.price.family : matchedPizza.price.normal;

        return {
          ...orderDish,
          title: matchedPizza.title,
          price
        };
      }

      return orderDish;
    })
  }));
};

export default enrichOrdersWithPizzaTitles;
