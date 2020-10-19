import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import useForm from '../utils/useForm';
import SEO from '../components/SEO';
import calculatePizzaPrice from '../utils/pizzaPrice';
import formatMoney from '../utils/formatMoney';

function OrderPage({ data }) {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const pizzas = data.pizzas.nodes;
  console.log({ pizzas });
  return (
    <div>
      <SEO title="Order a Pizza!" />
      <form>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <div key={pizza.id}>
              <Img width="50" height="50" fluid={pizza.image.asset.fluid} />
              <h3>{pizza.name}</h3>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button type="button">
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </div>
  );
}

export default OrderPage;

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        price
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
