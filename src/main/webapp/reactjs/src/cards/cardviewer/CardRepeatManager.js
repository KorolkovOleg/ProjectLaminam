import {Component} from "react";
import {Button, ButtonGroup, ButtonToolbar} from "reactstrap";

class CardRepeatManager extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {  currentCard: this.props.card,
                        ownTime: "1d"
        }

        this.handleNewNextRepeatDate = this.handleNewNextRepeatDate.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    async handleNewNextRepeatDate(event) {
        let currentCard = this.props.card;
        let stringValue = event.target.name === "ownTime" ? this.state.ownTime : event.target.value;
        let interval = parseInt(stringValue.toString());
        let timeUnit = stringValue.toString().replace(/\d/gm, "");
        alert(timeUnit);
        currentCard.nextRepeatDate = this.getNewNextRepeatDate(interval, timeUnit);
        alert(JSON.stringify(currentCard));
        this.props.putCard(currentCard);
    }



    getNewNextRepeatDate(interval, timeUnit) {
        let date = new Date();
        if(timeUnit === "d") {
            date.setDate(date.getDate() + interval);
        } else {
            date.setHours(date.getHours() + interval);
        }
        return date;
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({ownTime: value});
    }

    render() {
        return(
            <div>
                <ButtonGroup>
                    <Button onClick={this.handleNewNextRepeatDate} value = {"1h"}>1h</Button>
                    <Button onClick={this.handleNewNextRepeatDate} value = {"6h"}>6h</Button>
                    <Button onClick={this.handleNewNextRepeatDate} value = {"12h"}>12h</Button>
                    <Button onClick={this.handleNewNextRepeatDate} value = {"1d"}>1d</Button>
                    <Button onClick={this.handleNewNextRepeatDate} value = {"2d"}>2d</Button>
                    <Button onClick={this.handleNewNextRepeatDate} value = {"4d"}>4d</Button>
                    <Button onClick={this.handleNewNextRepeatDate} value = {"7d"}>7d</Button>
                    <Button onClick={this.handleNewNextRepeatDate} value = {"14d"}>14d</Button>
                    <Button onClick={this.handleNewNextRepeatDate} value = {"30d"}>30d</Button>
                    <Button onClick={this.handleNewNextRepeatDate} value = {"60d"}>60d</Button>
                    <Button onClick={this.handleNewNextRepeatDate} value = {"90d"}>90d</Button>
                    <div className="row">
                        <input onChange={this.handleChange} value={this.state.ownTime}/>
                        <Button onClick={this.handleNewNextRepeatDate}  name="ownTime">Own time</Button>
                    </div>
                </ButtonGroup>
            </div>
        )
    }
}
export default CardRepeatManager