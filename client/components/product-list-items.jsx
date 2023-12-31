import React, { Component } from 'react';

class ProductListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.handleProductClick = this.handleProductClick.bind(this);
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
    this.handleRemoveFromCartClick = this.handleRemoveFromCartClick.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  handleProductClick() {
    this.props.setView('details', { productId: this.props.productId });
  }

  handleAddToCartClick() {
    const { productId, price, addToCart } = this.props;
    const addProduct = { productId, price };
    addToCart(addProduct);
  }

  handleRemoveFromCartClick() {
    const { productId, removeFromCart } = this.props;
    const removeProduct = { productId };
    removeFromCart(removeProduct);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { productId, name, price, image, shortDescription, formattedCurrency, amount } = this.props;
    const { width } = this.state;
    const { handleProductClick, handleAddToCartClick, handleRemoveFromCartClick } = this;

    let cardClass = 'col-md-4';
    if (width <= 900) {
      cardClass = 'col-sm-6';
    }

    return (
      <div className={`${cardClass} card-deck my-2`}>
        <div className="card" id={productId}>
          <img
            className="card-img-top img-fluid rounded my-2 mx-auto d-block list-img-custom"
            src={image}
            alt={name}
            onClick={handleProductClick} />
          <div className="card-body card-body-custom" onClick={handleProductClick}>
            <h5 className="card-title">{name}</h5>
            <p className="card-subtitle">{formattedCurrency(price)}</p>
            <p className="card-text">{shortDescription}</p>
          </div>
          <hr></hr>
          {
            amount > 0
              ? (
                <div className="text-center card-footer-custom mb-2">
                  <button
                    className="btn btn-outline-secondary btn-sm fade-in"
                    onClick={handleRemoveFromCartClick}>
                    {amount === 1
                      ? (<i className="fas fa-trash-alt"></i>)
                      : (<i className="fas fa-minus"></i>)
                    }
                  </button>
                  <span className="mx-5">{amount}</span>
                  <button autoFocus className="btn btn-outline-dark btn-sm fade-in" onClick={handleAddToCartClick}><i className="fas fa-plus"></i></button>
                </div>
              )
              : (
                <div className="text-center card-footer-custom mb-2">
                  <button className="mx-3 btn btn-outline-dark btn-sm fade-in" onClick={handleAddToCartClick}>Add to Cart</button>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

export default ProductListItem;