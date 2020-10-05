import React, {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import {config} from "../../../config/authorization";
import api from "../../../shared/api";

const ShowProduct = () => {

  const {id} = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);

  const _getProduct = () => {
    api.get(`products/${id}`, config)
      .then(response => setProduct(response.data))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    _getProduct();
  }, [])

  return (
    <div>
      <h1>Produto {id}</h1>
      {
        <div>
          {
            !loading &&
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              {
                product.color_variations[0].color == null &&
                <>
                  <p>Estoque inicial: {product.color_variations[0].first_stock}</p>
                  <p>Estoque disponível: {product.color_variations[0].available_stock}</p>
                  <p>Preço: {product.color_variations[0].price}</p>
                </>
              }
              <br/>
              {
                product.color_variations[0].color !== null &&
                <>
                  <h4>Variações</h4>
                  <table>
                    <thead>
                    <tr>
                      <th>Cor</th>
                      <th>Estoque inicial</th>
                      <th>Estoque disponível</th>
                      <th>Preço</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      product.color_variations.map((variation, index) => (
                        <tr key={index}>
                          <td>{variation.color.name}</td>
                          <td>{variation.first_stock}</td>
                          <td>{variation.available_stock}</td>
                          <td>{variation.price}</td>
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>
                </>
              }
            </div>
          }
        </div>
      }
      <Link to={`/products/update/${id}`}>Editar</Link>
    </div>
  )
}

export default ShowProduct