import React, {Component} from "react";
import './Card.css'


class Card extends Component {
    state = {
      cardNumber: "0000 0000 0000 0000",
      cardHolderName: "",
      cardExpirationDate: "",
      cardCVV: "",
      cardType: "💳"
    };


    flipCard = () => {
      anime({
        targets: ".credit-card-inner",
        rotateY: "180deg",
        duration: "100",
        easing: "linear"
      });
    };


    unFlipCard = () => {
      anime({
        targets: ".credit-card-inner",
        rotateY: "360deg",
        duration: "100",
        easing: "linear"
      });
    };

    handlerClick = (e) => {
      e.preventDefault();

      console.log(JSON.stringify(this.state, null, 4))
    }


    setCardType = type => {
      this.setState({ cardType: type });
    };


    checkSubstring = (length, match) => {
      return this.state.cardNumber.substring(0, length) === match;
    };


    setNumber = e => {
      const cardNumber = e.target.value;

      this.setState({ cardNumber }, () => {

        const { cardNumber } = this.state;

        if (cardNumber[0] === "4") {

          this.setCardType("Visa");
        } 
        
        else if (this.checkSubstring(4, "6011")) {
          this.setCardType("Discover");
        } 
        
        else if (this.checkSubstring(2, "51")) {
          this.setCardType("MasterCard");
        } 
        
        else if (this.checkSubstring(2, "34")) {
          this.setCardType("American Express");
        } 
        
        else if (this.checkSubstring(3, "300")) {
          this.setCardType("Diners Club");
        } 
        
        else if (this.checkSubstring(2, "35")) {
          this.setCardType("JCB");
        } 
        
        else {
          this.setCardType("💳");
        }

      });
    };

    setName = e => {
      const cardHolderName = e.target.value.toUpperCase();
      this.setState({ cardHolderName });
    };


    setDate = e => {
      let data = (e.target.value).split("");
      console.log(data)
      let cardExpirationDate = (data.map((x) => {
        return x === "-" ? "/" : x
      })).join("");


      console.log(cardExpirationDate)
      this.setState({ cardExpirationDate });
    };


    setCVV = e => {
      const cardCVV = e.target.value;
      this.setState({ cardCVV });
    };

    render() {
      const {
        cardNumber,
        cardHolderName,
        cardExpirationDate,
        cardCVV,
        cardType
      } = this.state;

      return (
        <div className="container">
          <div className="credit-card">
            <div className="credit-card-inner">
              <div className="credit-card-front">
                
                <div id="card-type">{cardType}</div>
                <div id="card-number">{cardNumber}</div>
  
                <div id="card-expiration">
                  {cardExpirationDate !== "" && <div id="validthru">Valid Thru</div>}
                  {cardExpirationDate}
                </div>
  
                <div id="card-holder-name">{cardHolderName}</div>
              </div>
              <div className="credit-card-back">
                <div className="card-stripe" />
                <div className="card-sig-container">
                  CVC {cardCVV}
                </div>
              </div>
            </div>
          </div>
          <form className="card-form" method="POST">
            <label className="input-label">
                Credit Card Number
            </label>
            <input
            
              placeholder="Your credit card number"
              options={{ creditCard: true }}
              id="number-input"
              name="number-input"
              className="text-input"
              maxLength="16"
              onChange={this.setNumber}
              style={{marginBottom: '20px'}}
              required
            />
            

            <label className="input-label">
                Full Card Name
            </label>
            <input
            
              type="text"
              placeholder="Your full card name"
              value={cardHolderName}
              onChange={e => this.setName(e)}
              className="text-input"
              maxLength="30"
              required
              style={{marginBottom: '20px'}}
            />

            

            <div className="date-and-csv" style={{ display: "flex" }}>
              <div
                style={{ display: "flex", flexDirection: "column", width: "50%" }}
              >
                <label className="input-label">
                  Expiration Date
                </label>

                <input
                
                  type="month"
                  placeholder="Your card expiration date"
                  className="text-input"
                  onChange={e => this.setDate(e)}
                  required
                />

              </div>
              <div
                style={{ display: "flex", flexDirection: "column", width: "50%", marginLeft: '30px' }}
              >
                <label className="input-label">
                    CVC Code
                </label>

                <input
                
                  options={{
                    numeral: "true"
                  }}
                  placeholder="Your CVC code"
                  maxLength="3"
                  value={cardCVV}
                  className="text-input"
                  onChange={e => this.setCVV(e)}
                  onFocus={this.flipCard}
                  onBlur={this.unFlipCard}
                  required/>
                
              </div>
            </div>

           <button 
           className="btn__card"
           type="submit"
           onClick={this.handlerClick}>
             Send
            </button>
          </form>

      
        </div>
      );
    }
  }


  
  
  export default Card