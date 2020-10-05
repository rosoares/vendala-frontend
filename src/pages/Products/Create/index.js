import React, {useEffect, useState} from "react";
import api from "../../../shared/api";
import {config} from "../../../config/authorization";
import {useHistory} from "react-router-dom";

const CreateProduct = () => {

  const [colors, setColors] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [slug, setSlug] = useState();
  const [firstStock, setFirstStock] = useState();
  const [availableStock, setAvailableStock] = useState();
  const [price, setPrice] = useState();
  const [color, setColor] = useState();
  const [hasColorVariation, setHasColorVariation] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [variations, setVariations] = useState([])

  const _createProduct = (event) => {
    event.preventDefault();
    setLoading(true)
    let data = undefined;

    if (! hasColorVariation) {
      data = {
        name : name,
        description : description,
        slug : slug,
        first_stock : firstStock,
        available_stock : availableStock,
        price : price,
        hasColorVariation : hasColorVariation
      }
    }
    else {
      data = {
        name : name,
        description : description,
        slug : slug,
        hasColorVariation : hasColorVariation,
        variations: variations
      }
    }

    api.post('products', data, config)
      .then(response => {
        alert(response.statusText)
        history.push('/products');
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }

  const _getColors = () => {
    api.get('/colors', config)
      .then(response => setColors(response.data))
      .catch(error => alert(error))
  }

  const _addColorVariation = () => {
    let newVariations = variations;

    newVariations.push({
      color_id: color,
      first_stock: firstStock,
      available_stock: availableStock,
      price: price
    });

    setVariations(newVariations);
    setColor(null);
    setFirstStock(null);
    setAvailableStock(null);
    setPrice(null);
  }

  useEffect(() => {
    _getColors();
  }, [])

  console.log(variations);

  return (
    <div>
      <h1>Novo Produto</h1>
      <form onSubmit={_createProduct}>
        <label>Variação de Cor ?</label>
        <br />
        <select name="hasColorVariation" onChange={(event) => setHasColorVariation(!hasColorVariation)}>
          <option value={false}>Não</option>
          <option value={true}>Sim</option>
        </select>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Nome"
          required
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <label>Descrição</label>
        <br />
        <textarea
          name="description"
          required
          onChange={(event) => setDescription(event.target.value)}
        />
        <br />
        <input
          type="text"
          name="slug"
          placeholder="Chave"
          required
          onChange={(event) => setSlug(event.target.value)}
        />
        <br />
        {
          ! hasColorVariation &&
            <>
              <input
                type="text"
                name="first_stock"
                placeholder="Estoque inicial"
                required
                onChange={(event) => setFirstStock(event.target.value)}
              />
              <br />
              <input
                type="text"
                name="available_stock"
                placeholder="Estoque disponível"
                required
                onChange={(event) => setAvailableStock(event.target.value)}
              />
              <br />
              <input
                type="text"
                name="price"
                placeholder="Preço"
                required
                onChange={(event) => setPrice(event.target.value)}
              />
            </>
        }
        {
          hasColorVariation &&
          <>
            <select onChange={(event) => setColor(event.target.value)}>
              <option value="">Selecione a cor</option>
              {
                colors.map((color, index) => (
                  <option key={index} value={color.id}>{color.name}</option>
                ))
              }
            </select>
            <br />
            <input
              type="text"
              name="first_stock"
              placeholder="Estoque inicial"
              required
              onChange={(event) => setFirstStock(event.target.value)}
            />
            <br />
            <input
              type="text"
              name="available_stock"
              placeholder="Estoque disponível"
              required
              onChange={(event) => setAvailableStock(event.target.value)}
            />
            <br />
            <input
              type="text"
              name="price"
              placeholder="Preço"
              required
              onChange={(event) => setPrice(event.target.value)}
            />
            <br />
            <button type="button" onClick={_addColorVariation}>Adcionar Variação</button>
            <br />
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
                variations.map((variation, index) => (
                  <tr key={index}>
                    <td>{variation.color_id}</td>
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
        <br />
        {
          loading ?
            <p>Carregando...</p> :
            <button type="submit">Cadastrar</button>
        }
      </form>
    </div>
  )
}

export default CreateProduct;